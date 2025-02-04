from rest_framework import serializers
from cars import models

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Car
        fields = '__all__'