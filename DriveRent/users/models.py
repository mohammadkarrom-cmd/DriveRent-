from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.deconstruct import deconstructible
import os
import uuid
ACCOUNT_TYPE_CHOICES = (
        ('admin', 'أدمن'),
        ('manager', 'مدير'),
        ('employee', 'موظف'),
        ('customer', 'زبون'),
    )


@deconstructible
class PathAndRename:
    def __init__(self, sub_path):
        self.sub_path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        filename = '{}.{}'.format(uuid.uuid4().hex, ext)
        return os.path.join(self.sub_path, filename)

class User(AbstractUser):
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPE_CHOICES)
    phone = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return f"{self.id} - {self.first_name} {self.last_name}"


class Customer(models.Model):
    id_customer=models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id_number = models.TextField()
    id_front_image =models.ImageField(upload_to=PathAndRename('media/id_front_image'), blank=True, null=True)
    id_back_image = models.ImageField(upload_to=PathAndRename('media/id_back_image'), blank=True, null=True)
    driving_license_image = models.ImageField(upload_to=PathAndRename('media/driving_license_image'), blank=True, null=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"
