from rest_framework import generics
from rest_framework.response import Response
from users.permissions import IsRole
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import redirect
from django.contrib.auth import login
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework import status
from django.http import Http404
from django.utils import timezone
from django.shortcuts import get_object_or_404
from datetime import date
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
    queryset = models.Car.objects.all()
    serializer_class = serializers.CarSerializer
    permission_classes = [AllowAny]

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
    queryset = models.Car.objects.all()
    serializer_class = serializers.CarSerializer
    permission_classes = [AllowAny]

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
    permission_classes = [AllowAny]

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
    serializer_class = serializers.CarSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        cars = models.Car.objects.all()
        cars = self.get_serializer(cars, many=True).data

        return Response(cars,status=status.HTTP_200_OK)

#####################
class CarSearchCustomerView(generics.GenericAPIView):
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

