from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.deconstruct import deconstructible
import os
import uuid
from users.models import(
    Customer,
    User
)
category_list=(
        (1, 'فاخرة'),
        (2, 'اقتصادية'),
        (3,  'رياضية'),
        (4, 'شاحنة خفيفة (بيك أب)'),  
        (5, 'كهربائية'), 

    )
status_list=(
        (1, 'متاحة'),
        (2, 'حجز مؤقت للأجار'),
        (3, 'محجوزة للأجار'),
        (4, 'حجز مؤقت للبيع'),
        (5, 'منتهي الصلاحية'),  
        (6, 'مباعة'),  
    )
status_reservation_list=(
        (1, 'حجز مؤقت'),
        (2, 'حجز مؤكد'),
        (3, 'حجز منتهي الصلاحية'),  
        (4, 'حجز ملغي '),  
        (5,'حجز وهمي')

    )

type_reservation_list=(
        (1, 'أجار يومي'),
        (2, 'أجار شهري'),
        (3, 'أجار سنوي'),
        (4,'شراء')
    )

@deconstructible
class PathAndRename:
    def __init__(self, sub_path):
        self.sub_path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        filename = '{}.{}'.format(uuid.uuid4().hex, ext)
        return os.path.join(self.sub_path, filename)
    
    
class Office(models.Model):
    id_office = models.AutoField(primary_key=True, verbose_name="معرف المكتب")
    name = models.CharField(max_length=255, verbose_name="اسم المكتب")
    location = models.CharField(max_length=255, verbose_name="موقع المكتب")
    image = models.ImageField(upload_to=PathAndRename('image_office'), blank=True, null=True)
    status_office=models.BooleanField(default=True)
    ratings =models.FloatField(blank=True, null=True)  
    phone_number_1 = models.CharField(max_length=20, verbose_name="رقم التواصل 1")
    phone_number_2 = models.CharField(max_length=20, verbose_name="رقم التواصل 2", blank=True, null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} - {self.location}"
    
    
class OfficeAccount(models.Model):
    id_office_account = models.AutoField(primary_key=True, verbose_name="معرّف السجل")
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="معرف الحساب")
    office = models.ForeignKey('Office', on_delete=models.CASCADE, verbose_name="معرف المكتب")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الإنشاء")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاريخ التعديل")

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"حساب {self.user} - مكتب {self.office.name}"
    
    
    
class OfficeRating(models.Model):
    id_office_rating=models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    office = models.ForeignKey('Office', on_delete=models.CASCADE, verbose_name="المكتب")
    rating = models.FloatField(blank=True, null=True)  
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('customer', 'office')  

    def __str__(self):
        return f"{self.customer} rated {self.office} ({self.rating})"
    
    
class CarCategory(models.Model):
    id_car_type = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True, verbose_name="نوع السيارة")

    def __str__(self):
        return self.name
    
    
class Car(models.Model):
    id_car=models.AutoField(primary_key=True)
    brand = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(CarCategory, on_delete=models.SET_NULL, null=True, blank=True)
    is_available_daily = models.BooleanField(default=True)
    is_available_monthly = models.BooleanField(default=False)
    is_available_yearly = models.BooleanField(default=False)
    daily_rent_price = models.FloatField()
    monthly_rent_price = models.FloatField()
    yearly_rent_price = models.FloatField()
    
    is_for_sale = models.BooleanField(default=False, verbose_name="هل متاحة للبيع") 
    sale_price = models.FloatField(null=True, blank=True, verbose_name="سعر البيع") 
    
    owner_office = models.ForeignKey(Office,on_delete=models.SET_NULL,null=True,blank=True,related_name="cars_owned_by_office",verbose_name="صاحب السيارة (مكتب)")
    owner_customer = models.ForeignKey(Customer,on_delete=models.SET_NULL,null=True,blank=True,related_name="cars_owned_by_customer",verbose_name="صاحب السيارة (زبون)")
    
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
    status_reservation = models.IntegerField(choices=status_reservation_list)
    time_reservation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reservation {self.id_reservation} - {self.car} by {self.customer}"