from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.deconstruct import deconstructible
import os
import uuid
from users.models import(
    Customer,
)
category_list=(
        (1, 'فاخرة'),
        (2, 'اقتصادية'),
        (3, 'منشوف شو لسا في أنواع'),
    )
status_list=(
        (1, 'متاحة'),
        (2, 'حجز مؤقت'),
        (3, 'محجوزة'),
        (4, 'منتهية الصلاحية'),  

    )
type_reservation_list=(
        (1, 'يومي'),
        (2, 'شهري'),
        (3, 'سنوي'),
    )

@deconstructible
class PathAndRename:
    def __init__(self, sub_path):
        self.sub_path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        filename = '{}.{}'.format(uuid.uuid4().hex, ext)
        return os.path.join(self.sub_path, filename)
    
class Car(models.Model):
    id_car=models.AutoField(primary_key=True)
    brand = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    description = models.TextField()
    category = models.IntegerField(choices=category_list)
    is_available_daily = models.BooleanField(default=True)
    is_available_monthly = models.BooleanField(default=False)
    is_available_yearly = models.BooleanField(default=False)
    daily_rent_price = models.FloatField()
    monthly_rent_price = models.FloatField()
    yearly_rent_price = models.FloatField()
    image1 = models.ImageField(upload_to=PathAndRename('cars'), blank=True, null=True)
    image2 = models.ImageField(upload_to=PathAndRename('cars'), blank=True, null=True)
    image3 = models.ImageField(upload_to=PathAndRename('cars'), blank=True, null=True)
    status = models.IntegerField(choices=status_list)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.id_car}- {self.brand} {self.model}"

class Reservation(models.Model):
    id_reservation =models.AutoField(primary_key=True)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    type_reservation = models.IntegerField(choices=type_reservation_list)
    status_reservation = models.IntegerField(choices=status_list)
    time_reservation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reservation {self.id_reservation} - {self.car} by {self.customer}"