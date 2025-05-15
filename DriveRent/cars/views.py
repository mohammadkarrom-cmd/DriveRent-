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
    def get_permissions(self):
        return [IsRole(allowed_roles=['manager','employee'])]
    queryset = models.Car.objects.all()
    serializer_class = serializers.CarSerializer
    # permission_classes = [AllowAny]

    def perform_create(self, serializer):
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
class CarUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    def get_permissions(self):
        return [IsRole(allowed_roles=['manager','employee'])]
    queryset = models.Car.objects.all()
    serializer_class = serializers.CarSerializer
    # permission_classes = [AllowAny]

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
    def get_permissions(self):
        return [IsRole(allowed_roles=['manager','employee'])]
    serializer_class = serializers.CarSerializer
    # permission_classes = [AllowAny]

    def get_cars(self, brand=None, model=None):
        cars = models.Car.objects.all()

        if brand:
            cars = cars.filter(brand__icontains=brand)

        if model:
            cars = cars.filter(model__icontains=model)

        if not cars.exists():
            raise Http404("لا توجد استمارات متطابقة مع البحث")
        return cars

    def get(self, request, *args, **kwargs):
        brand = request.query_params.get('brand')
        model = request.query_params.get('model')

        if not brand and not model:
            return Response({'message': 'ادخل قيم في خيارات البحث'}, status=status.HTTP_400_BAD_REQUEST)

        cars = self.get_cars(brand=brand, model=model)

        cars_serializer = self.serializer_class(cars, many=True, context={'request': request})

        data = {
            "cars": cars_serializer.data,
        }

        return Response(data, status=status.HTTP_200_OK)
    
#####################
class HomeCustomerView(generics.GenericAPIView):
    # def get_permissions(self):
    #     return [IsRole(allowed_roles=['customer'])]
    serializer_class = serializers.CarSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        cars_new = models.Car.objects.order_by('-created_at')[:10]
        cars_random = models.Car.objects.order_by('?')[:10]
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
    serializer_class = serializers.CarSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        cars = models.Car.objects.all()
        cars = self.get_serializer(cars, many=True).data

        return Response(cars,status=status.HTTP_200_OK)

#####################
class CarSearchCustomerView(generics.GenericAPIView):
    # def get_permissions(self):
    #     return [IsRole(allowed_roles=['customer'])]
    serializer_class = serializers.CarSerializer
    permission_classes = [AllowAny]

    def get_cars(self, category=None, type_rent=None):
        cars = models.Car.objects.all()

        if category:
            cars = cars.filter(category=category)

        if type_rent == "1":
            cars = cars.filter(is_available_daily=True)
        elif type_rent == "2":
            cars = cars.filter(is_available_monthly=True)
        elif type_rent == "3":
            cars = cars.filter(is_available_yearly=True)

        if not cars.exists():
            raise Http404("لا توجد استمارات متطابقة مع البحث")

        return cars

    def get(self, request, *args, **kwargs):
        category = request.query_params.get('category')
        type_rent = request.query_params.get('type_rent')

        if not category and not type_rent:
            return Response({'message': 'ادخل قيم في خيارات البحث'}, status=status.HTTP_400_BAD_REQUEST)

        cars = self.get_cars(category=category, type_rent=type_rent)

        cars_serializer = self.serializer_class(cars, many=True, context={'request': request})

        return Response(cars_serializer.data, status=status.HTTP_200_OK)
    
class CarDetailView(generics.GenericAPIView):
    # def get_permissions(self):
        # return [IsRole(allowed_roles=['customer'])]
    serializer_class = serializers.CarSerializer
    permission_classes = [AllowAny]
    def get(self, request, id_car, *args, **kwargs):
        car = get_object_or_404(models.Car, id_car=id_car)
        reservations = models.Reservation.objects.filter(car=car)
        car_serialized = self.get_serializer(car).data
        reservations_serialized = serializers.ReservationViewCustomerSerializer(reservations, many=True).data

        return Response(
            {
                "car": car_serialized,
                "reservations": reservations_serialized
            },
            status=status.HTTP_200_OK
        )

    
from django_q.tasks import schedule
from datetime import timedelta
from django.utils.timezone import now
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from cars.tasks import expire_reservation
from cars import models, serializers
type_reservation_list = {
    1: timedelta(days=1),  
    2: timedelta(days=30),  
    3: timedelta(days=365)  
}

class CreateReservationView(generics.CreateAPIView):
    def get_permissions(self):
        return [IsRole(allowed_roles=['customer'])]
    queryset = models.Reservation.objects.all()
    serializer_class = serializers.ReservationSerializer
    # permission_classes = [IsAuthenticated]

    def calculate_end_date(self, start_date, type_reservation):
        """حساب تاريخ انتهاء الحجز تلقائيًا"""
        duration = type_reservation_list.get(type_reservation)
        if duration:
            return start_date + duration
        return start_date  # في حال كان الإدخال غير صحيح، يبقى كما هو

    def perform_create(self, serializer):
        customer = self.request.user.customer 
        start_date = serializer.validated_data['start_date']
        type_reservation = serializer.validated_data['type_reservation']
        
        car = serializer.validated_data['car']

        if car.status in [2, 3]: 
            raise serializers.ValidationError("🚫 هذه السيارة غير متاحة للحجز حاليًا.")

        end_date = self.calculate_end_date(start_date, type_reservation)

        car.status = 2  
        car.save()


        reservation = serializer.save(
            customer=customer,
            status_reservation=2,
            start_date=start_date,
            end_date=end_date,  # تحديد تاريخ الانتهاء المحسوب تلقائيًا
            time_reservation=now()  # وقت تسجيل الحجز
        )

        # جدولة وظيفة لإلغاء الحجز بعد ساعتين بالضبط
        schedule(
            'cars.tasks.expire_reservation',
            reservation.id_reservation,
            schedule_type='O',  # تشغيل المهمة مرة واحدة فقط
            next_run=now() + timedelta(hours=2)
        )

    def create(self, request, *args, **kwargs):
        """إرجاع رسالة تأكيد عند إنشاء الحجز"""
        response = super().create(request, *args, **kwargs)
        return Response({"message": "تم إنشاء الحجز المؤقت بنجاح، بانتظار التأكيد."}, status=status.HTTP_201_CREATED)
    


class CancelReservationView(generics.UpdateAPIView):
    """
    إلغاء الحجز المؤقت قبل انتهاء المهلة الزمنية (ساعتين)، مع إعادة السيارة إلى حالة متاحة.
    """
    queryset = models.Reservation.objects.all()

    def get_permissions(self):
        return [IsRole(allowed_roles=['customer'])]

    def update(self, request, *args, **kwargs):
        reservation = self.get_object()

        # التحقق من أن المستخدم الحالي هو مالك الحجز
        if reservation.customer != request.user.customer:
            return Response({"error": "⚠️ غير مصرح لك بإلغاء هذا الحجز."}, status=status.HTTP_403_FORBIDDEN)

        # التحقق من أن الحجز لا يزال مؤقتًا
        if reservation.status_reservation != 2:
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
    def get_permissions(self):
        return [IsRole(allowed_roles=['customer'])]
    serializer_class = serializers.ReservationDetialSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """إرجاع قائمة بالحجوزات المؤقتة (`status_reservation=2`) الخاصة بالزبون"""
        return models.Reservation.objects.filter(customer=self.request.user.customer,status_reservation__in=[ 2, 3])
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"message": "لا توجد حجوزات مؤقتة."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class OfficeEmployeeTemporaryReservationsView(generics.ListAPIView):
    """
    عرض قائمة الحجوزات المؤقتة (`status_reservation=2`) مع إمكانية البحث باستخدام:
    - الرقم الوطني
    - الاسم الأول
    - الاسم الثاني
    - رقم الهاتف
    """
    def get_permissions(self):
        return [IsRole(allowed_roles=['employee','manager'])]
    serializer_class = serializers.ReservationSrecheSerializer
    # permission_classes = [AllowAny]

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
            return Response({"message": " لا توجد حجوزات مؤقتة مطابقة للبحث."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class ConfirmReservationView(generics.UpdateAPIView):
    """
    تأكيد الحجز بعد التحقق من المعلومات، وطباعة البريد الإلكتروني في `Terminal`
    """
    def get_permissions(self):
        return [IsRole(allowed_roles=['employee'])]
    queryset = models.Reservation.objects.all()
    # permission_classes = [AllowAny]

    def update(self, request, *args, **kwargs):
        reservation = self.get_object()

        # التحقق من أن الحجز مؤقت
        if reservation.status_reservation != 2:
            return Response({"error": "⚠️ لا يمكن تأكيد هذا الحجز."}, status=status.HTTP_400_BAD_REQUEST)

        # تحديث الحجز إلى مؤكد (`status_reservation=3`)
        reservation.status_reservation = 3
        reservation.save()
        
        # تحديث حالة السيارة إلى (3: محجوزة)
        car = reservation.car
        car.status = 3  # 3 تعني "محجوزة"
        car.save()
        
        # الحصول على البريد الإلكتروني للعميل
        customer_email = reservation.customer.user.email
        ## TODO mk
        # طباعة البريد الإلكتروني في `Terminal` بدلاً من إرساله
        print("=" * 50)
        print("📩 محاكاة إرسال البريد الإلكتروني")
        print(f"📤 إلى: {customer_email}")
        print(f"📨 الموضوع: ✅ تأكيد حجز السيارة")
        print(f"📝 الرسالة: تم تأكيد حجزك للسيارة {reservation.car.brand} {reservation.car.model}. شكرًا لاختيارك خدمتنا!")
        print("=" * 50)

        return Response({"message": "✅ تم تأكيد الحجز. (تم طباعة البريد في `Terminal`) "}, status=status.HTTP_200_OK)
    

    
    
class CancelEmployeeReservationView(generics.UpdateAPIView):
    def get_permissions(self):
        return [IsRole(allowed_roles=['employee'])]
    queryset = models.Reservation.objects.all()
    serializer_class = serializers.ReservationSerializer
    # permission_classes = [AllowAny]

    def update(self, request, *args, **kwargs):
        reservation = self.get_object()

        # التحقق من أن حالة الحجز مؤقتة
        if reservation.status_reservation != 2:  # 2 تمثل الحالة "مؤقتة"
            return Response(
                {"error": "لا يمكن إلغاء الحجز لأن حالته ليست مؤقتة."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # تحديث حالة الحجز إلى "منتهي الصلاحية"
        reservation.status_reservation = 4  # 4 تمثل الحالة "منتهي الصلاحية"
        reservation.save()

        # تحديث حالة السيارة إلى (1: متاحة)
        car = reservation.car
        car.status = 1  # 1 تعني "متاحة"
        car.save()
        return Response(
            {"message": "تم تحويل الحجز إلى حالة منتهي الصلاحية."},
            status=status.HTTP_200_OK
        )
        
        

class OfficeListCreateView(generics.ListCreateAPIView):
    queryset = models.Office.objects.all()
    serializer_class = serializers.OfficeSerializer
    permission_classes = [AllowAny]

class OfficeRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = models.Office.objects.all()
    serializer_class = serializers.OfficeSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id_office'
    
    
class OfficeAccountListCreateView(generics.ListCreateAPIView):
    serializer_class = serializers.OfficeAccountSerializer
    permission_classes = [AllowAny]

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
    permission_classes = [AllowAny]
    
from django.core.mail import send_mail
from django.conf import settings
class SendEmail(generics.GenericAPIView):
    permission_classes = [AllowAny]
    
    def send_emails_to_users(self, users):
        subject = 'Email sent successfully:'
        message = 'هذا هو محتوى البريد الإلكتروني.'
        
        for user in users:
            self.send_custom_email(user, subject, message)
    
    def send_custom_email(self, recipient_email, subject, message):
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL, 
                [recipient_email],  
                fail_silently=False,
            )
        except Exception as e:
            print(f"Error occurred: {e}") 
            return Response({'error': str(e)}, status=500)

    def post(self, request, *args, **kwargs):
        user_email = 'abdohouir@gmail.com' 
        self.send_emails_to_users([user_email])
        return Response({'message': 'Email sent successfully!'}, status=status.HTTP_200_OK)