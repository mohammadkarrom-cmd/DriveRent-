from rest_framework import serializers
from cars import models

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Car
        fields = '__all__'
        
class ReservationViewCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reservation
        fields = ['start_date','end_date','type_reservation','time_reservation']
        