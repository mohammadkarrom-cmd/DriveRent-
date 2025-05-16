from django.contrib import admin
from cars import models
# Register your models here.
admin.site.register(models.Car)
admin.site.register(models.Reservation)
admin.site.register(models.Office)
admin.site.register(models.OfficeAccount)
admin.site.register(models.OfficeRating)
