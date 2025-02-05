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

        # هنا يجب تمرير many=True لأن cars عبارة عن QuerySet
        cars_serializer = self.serializer_class(cars, many=True, context={'request': request})

        data = {
            "cars": cars_serializer.data,
        }

        return Response(data, status=status.HTTP_200_OK)