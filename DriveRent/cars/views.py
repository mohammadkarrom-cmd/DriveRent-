from rest_framework import generics
from rest_framework.response import Response
from users.permissions import IsRole
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q
from django.core.mail import send_mail
from rest_framework import status
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status
from cars import serializers
from cars import models
from rembg import remove
from PIL import Image
import io
from django.core.files.base import ContentFile
from users import models as models_users
from django_q.tasks import schedule
from datetime import timedelta
from django.utils.timezone import now
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from cars.tasks import expire_reservation
from cars import models, serializers
from django.db.models import Avg

type_reservation_list = {
    1: timedelta(days=1),  
    2: timedelta(days=30),  
    3: timedelta(days=365)  
}

def remove_background(image_field):
    """إزالة الخلفية من صورة وإرجاع الصورة المعدلة."""
    if not image_field:
        return None  

    image = Image.open(image_field)

    image_io = io.BytesIO()
    image.save(image_io, format="PNG")

    image_no_bg = remove(image_io.getvalue())

    output_io = io.BytesIO(image_no_bg)
    
    return ContentFile(output_io.getvalue(), name=f"no_bg_{image_field.name}")

#####################
class CarListCreateView(generics.ListCreateAPIView):
    serializer_class = serializers.CarSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['manager'])]
    

    def get_office(self):
        user = self.request.user
        office_account = get_object_or_404(models.OfficeAccount, user=user)
        return office_account.office

    def get_queryset(self):
        office = self.get_office()
        return models.Car.objects.filter(owner_office=office)

    def list(self, request, *args, **kwargs):
        cars = self.get_queryset()
        category_list=models.CarCategory.objects.all()
        serializer_cars = self.get_serializer(cars, many=True)
        serializer_category_list = serializers.CarCategorySerializer(category_list, many=True)
        return Response({
            "cars":serializer_cars.data,
            "category_list":serializer_category_list.data

            }, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        office = self.get_office()
        images = {
            "image1": self.request.FILES.get("image1"),
            "image2": self.request.FILES.get("image2"),
            "image3": self.request.FILES.get("image3"),
        }

        for key, image in images.items():
            if image:
                images[key] = remove_background(image)

        serializer.save(owner_office=office, **images)
        
#####################
class CarUpdateDestroyView(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.CarSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['manager'])]
    lookup_field = 'id_car'

    def get_office(self):
        user = self.request.user
        office_account = get_object_or_404(models.OfficeAccount, user=user)
        return office_account.office

    def get_queryset(self):
        office = self.get_office()
        return models.Car.objects.filter(owner_office=office)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def perform_update(self, serializer):
        images = {
            "image1": self.request.FILES.get("image1"),
            "image2": self.request.FILES.get("image2"),
            "image3": self.request.FILES.get("image3"),
        }

        for key, image in images.items():
            if image:
                images[key] = remove_background(image)
        serializer.save(**images)

#####################
class CarSearchView(generics.GenericAPIView):
    serializer_class = serializers.CarSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['manager'])]
    
    def get_office(self):
        user = self.request.user
        office_account = get_object_or_404(models.OfficeAccount, user=user)
        return office_account.office

    def get_queryset(self):
        office = self.get_office()
        return models.Car.objects.filter(owner_office=office)
    def get_cars(self, brand=None, model=None,category=None):
        cars = self.get_queryset()

        if brand:
            cars = cars.filter(brand__icontains=brand)

        if model:
            cars = cars.filter(model__icontains=model)
            
        if category:
            cars = cars.filter(category=category)
            
        if not cars.exists():
            return None
        return cars

    def get(self, request, *args, **kwargs):
        brand = request.query_params.get('brand')
        model = request.query_params.get('model')
        category = request.query_params.get('category')

        if not brand and not model:
            return Response({'message': 'ادخل قيم في خيارات البحث'}, status=status.HTTP_400_BAD_REQUEST)

        cars = self.get_cars(brand=brand, model=model,category=category)
        if not cars:
            return Response({"message":"لا توجد سيارات متطابقة مع البحث"},status=status.HTTP_404_NOT_FOUND)

        cars_serializer = self.serializer_class(cars, many=True, context={'request': request})

        data = {
            "cars": cars_serializer.data,
        }

        return Response(data, status=status.HTTP_200_OK)
    
#####################
class HomeCustomerView(generics.GenericAPIView):
    # def get_permissions(self):
    #     return [IsRole(allowed_roles=['customer'])]
    serializer_class = serializers.CarCustomerListSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        cars = models.Car.objects.filter(
            Q(status=1) &
            Q(owner_office=None) & Q(owner_customer__user__is_active=True) |
            Q(owner_customer=None) & Q(owner_office__status_office=True) 
            )
        return cars

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        cars_new = queryset.order_by('-created_at')[:10]
        cars_random = queryset.order_by('?')[:10]
        cars_new_serialized = self.get_serializer(cars_new, many=True).data
        cars_random_serialized = self.get_serializer(cars_random, many=True).data

        return Response(
            {
                "cars_new": cars_new_serialized,
                "cars_random": cars_random_serialized
            },
            status=status.HTTP_200_OK
        )


#####################
class CarlistViewView(generics.GenericAPIView):
    # def get_permissions(self):
    #     return [IsRole(allowed_roles=['customer'])]
    serializer_class = serializers.CarCustomerListSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        cars = models.Car.objects.filter(
            # Q(status=1) &
            Q(owner_office=None) & Q(owner_customer__user__is_active=True) |
            Q(owner_customer=None) & Q(owner_office__status_office=True) 
            )
        return cars
    def get(self, request, *args, **kwargs):
        cars = self.get_queryset()
        cars = self.get_serializer(cars, many=True).data
        cars_category=models.CarCategory.objects.all()
        cars_category = serializers.CarCategorySerializer(cars_category, many=True).data

        return Response({
            "cars":cars,
            "cars_category":cars_category
            },status=status.HTTP_200_OK)

#####################
class CarSearchCustomerView(generics.GenericAPIView):
    # def get_permissions(self):
    #     return [IsRole(allowed_roles=['customer'])]
    serializer_class = serializers.CarSerializer
    permission_classes = [AllowAny]

    def get_cars(self, category=None, type_rent=None,min_price=None,max_price=None):
        cars = models.Car.objects.filter(
            Q(owner_office=None) & Q(owner_customer__user__is_active=True) |
            Q(owner_customer=None) & Q(owner_office__status_office=True) 
            )
        
        if category:
            cars = cars.filter(category=category)
        if type_rent == "1":
            cars = cars.filter(is_available_daily=True)
            if min_price:
                cars = cars.filter(daily_rent_price__gte=float(min_price))
            if max_price:
                cars = cars.filter(daily_rent_price__lte=float(max_price))
        elif type_rent == "2":
            cars = cars.filter(is_available_monthly=True)
            if min_price:
                cars = cars.filter(monthly_rent_price__gte=float(min_price))
            if max_price:
                cars = cars.filter(monthly_rent_price__lte=float(max_price))
        elif type_rent == "3":
            cars = cars.filter(is_available_yearly=True)
            if min_price:
                cars = cars.filter(yearly_rent_price__gte=float(min_price))
            if max_price:
                cars = cars.filter(yearly_rent_price__lte=float(max_price))
        elif type_rent == "4":
            cars = cars.filter(is_for_sale=True)
            if min_price:
                cars = cars.filter(sale_price__gte=float(min_price))
            if max_price:
                cars = cars.filter(sale_price__lte=float(max_price))
        if not cars.exists():
            raise serializers.ValidationError({
                "message": "لا توجد سيارات متطابقة مع البحث"
            })
        return cars

    def get(self, request, *args, **kwargs):
        category = request.query_params.get('category')
        type_rent = request.query_params.get('type_rent')
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        if not category and not type_rent:
            return Response({'message': 'ادخل قيم في خيارات البحث'}, status=status.HTTP_400_BAD_REQUEST)

        cars = self.get_cars(category=category, type_rent=type_rent,min_price=min_price,max_price=max_price)

        cars_serializer = self.serializer_class(cars, many=True, context={'request': request})

        return Response(cars_serializer.data, status=status.HTTP_200_OK)
    
class CarDetailView(generics.GenericAPIView):
    # def get_permissions(self):
        # return [IsRole(allowed_roles=['customer'])]
    serializer_class = serializers.CarCustomerSerializer
    permission_classes = [AllowAny]
    def get(self, request, id_car, *args, **kwargs):
        car = get_object_or_404(models.Car, id_car=id_car)
        reservations = models.Reservation.objects.filter(car=car)
        car_serialized = self.get_serializer(car).data
        reservations_serialized = serializers.ReservationViewCustomerSerializer(reservations, many=True).data

        return Response({
                "car": car_serialized,
                "reservations": reservations_serialized
                # car_serialized,
        },status=status.HTTP_200_OK
        )


class CreateReservationView(generics.CreateAPIView):
    queryset = models.Reservation.objects.all()
    serializer_class = serializers.ReservationSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['customer'])]


    def calculate_end_date(self, start_date, type_reservation):
        durations = {
            1: timedelta(days=1),
            2: timedelta(days=30),
            3: timedelta(days=365),
            4: timedelta(hours=2),  # شراء: مؤقت لمدة ساعتين
        }
        return start_date + durations.get(type_reservation, timedelta())

    def perform_create(self, serializer):
        customer = self.request.user.customer
        data = serializer.validated_data
        car = data['car']
        start_date = data['start_date']
        type_reservation = data['type_reservation']
        from cars.models import Reservation
        Reservation.objects.filter()
        
        if type_reservation == 1 and not car.is_available_daily:
            raise serializers.ValidationError({"message": "السيارة غير متاحة للأجار اليومي."})
        if type_reservation == 2 and not car.is_available_monthly:
            raise serializers.ValidationError({"message": "السيارة غير متاحة للأجار الشهري."})
        if type_reservation == 3 and not car.is_available_yearly:
            raise serializers.ValidationError({"message": "السيارة غير متاحة للأجار السنوي."})
        if type_reservation == 4 and not car.is_for_sale:
            raise serializers.ValidationError({"message": "السيارة غير متاحة للبيع."})

        if car.status == 6:
            raise serializers.ValidationError({"message": "السيارة غير متاحة للحجز حالياً لأنها تم بيعها."})
        
        # التحقق من وجود حجز سابق يتداخل مع الحجز الجديد
        proposed_end_date = self.calculate_end_date(start_date, type_reservation)
        overlapping_reservation = models.Reservation.objects.filter(
            car=car,
            status_reservation__in=[1, 2],  # المؤقت والمؤكد
            start_date__lt=proposed_end_date,
            end_date__gt=start_date
        ).order_by('-end_date').first()

        if overlapping_reservation:
            type_dict = {
                1: "أجار يومي",
                2: "أجار شهري",
                3: "أجار سنوي",
                4: "شراء"
            }
            current_type = type_dict.get(overlapping_reservation.type_reservation, "غير معروف")
            end = overlapping_reservation.end_date.strftime("%Y-%m-%d %H:%M")

            if overlapping_reservation.status_reservation == 1:
                raise serializers.ValidationError({
                    "message": f"السيارة في حالة حجز {current_type} مؤقت، تنتهي مهلة التأكيد في {end}"
                })
            elif overlapping_reservation.status_reservation == 2:
                raise serializers.ValidationError({
                    "message": f"السيارة محجوزة حالياً بنظام {current_type} حتى {end}"
                })
        num_reservation=models.Reservation.objects.filter(customer=customer,status_reservation=3).count()
        if num_reservation >= 2:        
            end_date = self.calculate_end_date(start_date, type_reservation)
            reservation = serializer.save(
                customer=customer,
                status_reservation=5,  # حجز وهمي
                start_date=start_date,
                end_date=end_date,
                time_reservation=now()
            )
            raise serializers.ValidationError({
                "message": "تم إنشاء الحجز بنجاح\nولكن تم تصنيف حجزك على أنه حجز وهمي يرجى التواصل مع المكتب صاحب السيارة أو مع مدير المنصة لتصنيف حجزك  مؤقت"})
        # تحديث حالة السيارة حسب نوع الحجز
        if type_reservation in [1, 2, 3]:
            car.status = 2  # حجز مؤقت للأجار
        elif type_reservation == 4:
            car.status = 4  # حجز مؤقت للبيع
        car.save()

        end_date = self.calculate_end_date(start_date, type_reservation)

        # إنشاء الحجز
        reservation = serializer.save(
            customer=customer,
            status_reservation=1,  # حجز مؤقت
            start_date=start_date,
            end_date=end_date,
            time_reservation=now()
        )

        # جدولة انتهاء صلاحية الحجز بعد ساعتين
        schedule(
            'cars.tasks.expire_reservation',
            reservation.id_reservation,
            schedule_type='O',
            next_run=now() + timedelta(hours=2)
        )

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response(
            {"message": "تم إنشاء الحجز المؤقت بنجاح، بانتظار التأكيد."},
            status=status.HTTP_201_CREATED
        )

class CancelReservationView(generics.UpdateAPIView):
    queryset = models.Reservation.objects.all()

    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['customer'])]

    def update(self, request, *args, **kwargs):
        reservation = self.get_object()

        # التحقق من أن المستخدم الحالي هو مالك الحجز
        if reservation.customer != request.user.customer:
            return Response({"error": "⚠️ غير مصرح لك بإلغاء هذا الحجز."}, status=status.HTTP_403_FORBIDDEN)

        # التحقق من أن الحجز لا يزال مؤقتًا
        if reservation.status_reservation != 1:
            return Response({"error": "⚠️ لا يمكنك إلغاء هذا الحجز، لأنه غير مؤقت."}, status=status.HTTP_400_BAD_REQUEST)

        # with transaction.atomic():  # ضمان تنفيذ جميع العمليات أو التراجع عند حدوث خطأ
            # تحديث حالة الحجز إلى "ملغى"
        reservation.status_reservation = 4  # 4 = ملغى يدويًا
        reservation.save()

            # إعادة حالة السيارة إلى "متاحة"
        car = reservation.car
        car.status = 1  # 1 = متاحة
        car.save()

        return Response({"message": "✅ تم إلغاء الحجز بنجاح، وأصبحت السيارة متاحة للحجز."}, status=status.HTTP_200_OK)


class CustomerTemporaryReservationsView(generics.ListAPIView):
    serializer_class = serializers.ReservationDetialSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['customer'])]

    def get_queryset(self):
        """إرجاع قائمة بالحجوزات المؤقتة (`status_reservation=1`) الخاصة بالزبون"""
        return models.Reservation.objects.filter(customer=self.request.user.customer,status_reservation__in=[1,2])
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"message": "لا توجد حجوزات مؤقتة."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class OfficeEmployeeReservationsView(generics.ListAPIView):
    serializer_class = serializers.ReservationSrecheSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['employee'])]
    
    def get_queryset(self):
        queryset = models.Reservation.objects.all()
        search_query = Q()

        # الحصول على قيم البحث من `query_params`
        status_reservation = self.request.query_params.get("status_reservation", None)
        first_name = self.request.query_params.get("first_name", None)
        last_name = self.request.query_params.get("last_name", None)
        phone = self.request.query_params.get("phone", None)
        id_number = self.request.query_params.get("id_number", None)
        # إضافة كل حقل إلى `Q` إذا تم إدخاله
        if status_reservation:
            search_query &= Q(status_reservation=status_reservation)
        if first_name:
            search_query &= Q(customer__user__first_name__icontains=first_name)
        if last_name:
            search_query &= Q(customer__user__last_name__icontains=last_name)
        if phone:
            search_query &= Q(customer__user__phone__icontains=phone)
        if id_number:
            search_query &= Q(customer__id_number__icontains=id_number)

        if search_query:
            queryset = queryset.filter(search_query)

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"message": " لا توجد حجوزات  مطابقة للبحث."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    

    
class OfficeEmployeeTemporaryReservationsView(generics.ListAPIView):
    serializer_class = serializers.ReservationSrecheSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['employee'])]
    
    def get_queryset(self):
        queryset = models.Reservation.objects.filter(status_reservation=1)
        search_query = Q()

        first_name = self.request.query_params.get("first_name", None)
        last_name = self.request.query_params.get("last_name", None)
        phone = self.request.query_params.get("phone", None)
        id_number = self.request.query_params.get("id_number", None)
        # إضافة كل حقل إلى `Q` إذا تم إدخاله
        if first_name:
            search_query &= Q(customer__user__first_name__icontains=first_name)
        if last_name:
            search_query &= Q(customer__user__last_name__icontains=last_name)
        if phone:
            search_query &= Q(customer__user__phone__icontains=phone)
        if id_number:
            search_query &= Q(customer__id_number__icontains=id_number)

        if search_query:
            queryset = queryset.filter(search_query)

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"message": " لا توجد حجوزات مؤقتة مطابقة للبحث."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


    
class OfficeEmployeeFakeReservationsView(generics.ListAPIView):
    serializer_class = serializers.ReservationSrecheSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['employee'])]
    
    def get_queryset(self):
        queryset = models.Reservation.objects.filter(status_reservation=5)
        search_query = Q()

        first_name = self.request.query_params.get("first_name", None)
        last_name = self.request.query_params.get("last_name", None)
        phone = self.request.query_params.get("phone", None)
        id_number = self.request.query_params.get("id_number", None)
        # إضافة كل حقل إلى `Q` إذا تم إدخاله
        if first_name:
            search_query &= Q(customer__user__first_name__icontains=first_name)
        if last_name:
            search_query &= Q(customer__user__last_name__icontains=last_name)
        if phone:
            search_query &= Q(customer__user__phone__icontains=phone)
        if id_number:
            search_query &= Q(customer__id_number__icontains=id_number)

        if search_query:
            queryset = queryset.filter(search_query)

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"message": " لا توجد حجوزات وهمية مطابقة للبحث."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    
    
    
    
class ConfirmReservationView(generics.UpdateAPIView):
    queryset = models.Reservation.objects.all()
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['employee'])]
    
    def update(self, request, *args, **kwargs):
        reservation = self.get_object()

        # التحقق من أن الحجز مؤقت
        if reservation.status_reservation != 1:
            return Response({"message": " لا يمكن تأكيد هذا الحجز لأن الحجز غير مؤقت"}, status=status.HTTP_400_BAD_REQUEST)

        # تحديث الحجز إلى مؤكد 
        reservation.status_reservation = 2
        reservation.save()
        
        type_reservation=reservation.type_reservation
        car=models.Car.objects.get(id_car=reservation.car.id_car)
        # تحديث حالة السيارة حسب نوع الحجز
        if type_reservation in [1, 2, 3]:
            car.status = 3  # حجز  للأجار
        elif type_reservation == 4:
            car.status = 6  # حجز  للبيع
        car.save()

        return Response({"message": " تم تأكيد الحجز بنجاح"}, status=status.HTTP_200_OK)
    
 
    
class ConfirmFakeReservationView(generics.UpdateAPIView):
    queryset = models.Reservation.objects.all()
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['employee'])]
    
    def update(self, request, *args, **kwargs):
        reservation = self.get_object()

        # التحقق من أن الحجز وهمي
        if reservation.status_reservation != 5:
            return Response({"message": " لا يمكن تحويل الحجز إلى حجز مؤقت لأن الحجز غير وهمي"}, status=status.HTTP_400_BAD_REQUEST)

        # تحديث الحجز إلى مؤقت 
        reservation.status_reservation = 1
        reservation.save()
        
        type_reservation=reservation.type_reservation
        car=models.Car.objects.get(id_car=reservation.car.id_car)
        # تحديث حالة السيارة حسب نوع الحجز
        if type_reservation in [1, 2, 3]:
            car.status = 3  # حجز  للأجار
        elif type_reservation == 4:
            car.status = 6  # حجز  للبيع
        car.save()

        return Response({"message": " تم تحويل الحجز إلى  حجز مؤقت بنجاح"}, status=status.HTTP_200_OK)


class CancelEmployeeReservationView(generics.UpdateAPIView):
    queryset = models.Reservation.objects.all()
    serializer_class = serializers.ReservationSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['employee'])]
    
    def update(self, request, *args, **kwargs):
        reservation = self.get_object()

        # التحقق من أن حالة الحجز مؤقتة
        if reservation.status_reservation != 2:  # 2 تمثل الحالة "مؤقتة"
            return Response(
                {"error": "لا يمكن إلغاء الحجز لأن حالته ليست مؤقتة."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # تحديث حالة الحجز إلى "منتهي الصلاحية"
        reservation.status_reservation = 4  # 4  ملغي
        reservation.save()
        car = reservation.car
        car.status = 1  # 1  "متاحة"
        car.save()
        return Response(
            {"message": "تم تحويل الحجز إلى حالة ملغي."},
            status=status.HTTP_200_OK
        )
        
        

class OfficeListCreateView(generics.ListCreateAPIView):
    queryset = models.Office.objects.all()
    serializer_class = serializers.OfficeSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['admin'])]
    
    
class OfficeRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = models.Office.objects.all()
    serializer_class = serializers.OfficeSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['admin'])]
    
    lookup_field = 'id_office'
    
    
class OfficeAccountListCreateView(generics.ListCreateAPIView):
    serializer_class = serializers.OfficeAccountSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['admin'])]
    
    def get_queryset(self):
        office_id = self.kwargs.get('office_id')
        return models.OfficeAccount.objects.filter(office__id_office=office_id)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        office_id = self.kwargs.get('office_id')
        office = get_object_or_404(models.Office, id_office=office_id)
        context['office'] = office
        return context


class OfficeAccountRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.OfficeAccount.objects.all()
    serializer_class = serializers.OfficeAccountSerializer
    lookup_field = 'id_office_account'
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['admin'])]
        
class OfficeRatingAminListCreateView(generics.ListAPIView):
    serializer_class = serializers.OfficeRatingAdminSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['admin'])]
    
    def get_queryset(self):
        office_id = self.kwargs.get('office_id')
        get_object_or_404(models.Office,id_office=office_id)
        return models.OfficeRating.objects.filter(office_id=office_id)

    def list(self, request, *args, **kwargs):
        ratings=self.get_queryset()
        ratings=self.get_serializer(ratings,many=True)
        return Response(ratings.data,status=status.HTTP_200_OK)

class MnagerOfficeRatingAminListCreateView(generics.ListAPIView):
    serializer_class = serializers.OfficeRatingAdminSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['manager'])]
    
    def get_office(self):
        user = self.request.user
        office_account = get_object_or_404(models.OfficeAccount, user=user).office.id_office
        office=get_object_or_404(models.Office,id_office=office_account)
        return office

    def get_queryset(self):
        office = self.get_office()
        return models.OfficeRating.objects.filter(office=office)

    def list(self, request, *args, **kwargs):
        ratings=self.get_queryset()
        ratings=self.get_serializer(ratings,many=True)
        rating=self.get_office().ratings
        return Response(
            {
              "total_rating": rating,
              "ratings" : ratings.data
                
            },status=status.HTTP_200_OK)




class CarCategoryListCreateView(generics.ListCreateAPIView):
    queryset = models.CarCategory.objects.all()
    serializer_class = serializers.CarCategorySerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['admin'])]
    
class CarCategoryRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = models.CarCategory.objects.all()
    serializer_class = serializers.CarCategorySerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['admin'])]
    lookup_field = 'id_car_type'
    
    
class CustomerCarListCreateView(generics.ListCreateAPIView):
    serializer_class = serializers.CarSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['customer'])]

    def get_customer(self):
        user = self.request.user
        customer = get_object_or_404(models_users.Customer, user=user)
        return customer

    def get_queryset(self):
        customer = self.get_customer()
        return models.Car.objects.filter(owner_customer=customer)

    def list(self, request, *args, **kwargs):
        cars = self.get_queryset()
        category_list=models.CarCategory.objects.all()
        serializer_cars = self.get_serializer(cars, many=True)
        serializer_category_list = serializers.CarCategorySerializer(category_list, many=True)
        return Response({
            "cars":serializer_cars.data,
            "category_list":serializer_category_list.data

            }, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        customer = self.get_customer()
        images = {
            "image1": self.request.FILES.get("image1"),
            "image2": self.request.FILES.get("image2"),
            "image3": self.request.FILES.get("image3"),
        }

        for key, image in images.items():
            if image:
                images[key] = remove_background(image)

        serializer.save(owner_customer=customer, **images)
        
        
class CustomerCarUpdateDestroyView(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.CarSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['customer'])]
    lookup_field = 'id_car'

    def get_customer(self):
        user = self.request.user
        customer = get_object_or_404(models_users.Customer, user=user).id_customer
        return customer

    def get_queryset(self):
        customer = self.get_customer()
        return models.Car.objects.filter(owner_customer=customer)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def perform_update(self, serializer):
        images = {
            "image1": self.request.FILES.get("image1"),
            "image2": self.request.FILES.get("image2"),
            "image3": self.request.FILES.get("image3"),
        }

        for key, image in images.items():
            if image:
                images[key] = remove_background(image)
        serializer.save(**images)

#####################
class CustomerEvaluableOfficesListView(generics.ListAPIView):
    serializer_class = serializers.OfficeSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['customer'])]
    
    def get_queryset(self):
        customer = models.Customer.objects.get(user=self.request.user)
        completed_reservations = models.Reservation.objects.filter(
            customer=customer,
            status_reservation=2  # "مؤكد"
        ).values_list('car__owner_office', flat=True).distinct()
        already_evaluated = models.OfficeRating.objects.filter(
            customer=customer
        ).values_list('office', flat=True)
        return models.Office.objects.filter(
            id_office__in=completed_reservations
        ).exclude(id_office__in=already_evaluated)

class CustomerEvaluateOfficeView(generics.CreateAPIView):
    serializer_class = serializers.OfficeRatingCreateSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['customer'])]
    
    def perform_create(self, serializer):
        user = self.request.user
        customer = getattr(user, 'customer', None)
        if not customer:
            raise serializers.ValidationError({"message": "لا يمكن التحقق من حساب الزبون."})

        office_id = self.kwargs.get('office_id')
        office = get_object_or_404(models.Office, id_office=office_id)

        # تحقق من وجود حجز مكتمل مع المكتب
        has_completed_reservation = models.Reservation.objects.filter(
            customer=customer,
            car__owner_office=office,
            status_reservation=2
        ).exists()

        if not has_completed_reservation:
            raise serializers.ValidationError({"message": "لا يمكنك تقييم هذا المكتب لعدم وجود حجز مكتمل."})

        # تحقق من عدم التقييم المسبق
        already_evaluated = models.OfficeRating.objects.filter(
            customer=customer,
            office=office
        ).exists()

        if already_evaluated:
            raise serializers.ValidationError({"message": "لقد قمت بتقييم هذا المكتب مسبقًا."})

        serializer.save(customer=customer, office=office)

        # تحديث متوسط التقييم للمكتب
        avg_rating = models.OfficeRating.objects.filter(office=office).aggregate(avg=Avg('rating'))['avg'] or 0
        office.ratings = avg_rating
        office.save()