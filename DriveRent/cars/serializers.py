from rest_framework import serializers
from cars import models
from datetime import timedelta
from django.utils.timezone import now
from users.models import Customer

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Car
        fields = '__all__'
        
class ReservationViewCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reservation
        fields = ['start_date','end_date','type_reservation','time_reservation']
        
        
class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reservation
        fields = ['car', 'start_date', 'type_reservation']  # المستخدم لا يحتاج لإدخال `end_date`

    def validate(self, data):
        """التحقق من توفر السيارة"""
        car = data['car']
        start_date = data['start_date']
        type_reservation = data['type_reservation']

        # حساب `end_date` بناءً على `type_reservation`
        duration = {
            1: timedelta(days=1),
            2: timedelta(days=30),
            3: timedelta(days=365)
        }.get(type_reservation, timedelta(days=1))

        end_date = start_date + duration

        if models.Reservation.objects.filter(
            car=car, 
            start_date__lt=end_date, 
            end_date__gt=start_date,
            status_reservation__in=[2, 3]  
        ).exists():
            raise serializers.ValidationError("⚠️ السيارة غير متاحة في هذه الفترة.")

        return data
    
    
class ReservationDetialSerializer(serializers.ModelSerializer):
    remaining_time = serializers.SerializerMethodField() 
    car = CarSerializer()  
    type_reservation = serializers.SerializerMethodField() 
    status_reservation = serializers.SerializerMethodField() 

    class Meta:
        model = models.Reservation
        fields = [
            'id_reservation',
            'car',
            'start_date',
            'end_date',
            'type_reservation',
            'status_reservation',
            # 'time_reservation',
            'remaining_time'
        ]

    def get_remaining_time(self, obj):
        """
        حساب الوقت المتبقي قبل الإلغاء التلقائي للحجز المؤقت وإرجاعه كـ `timedelta`
        """
        if obj.status_reservation == 2:  
            elapsed_time = (now() - obj.time_reservation).total_seconds()
            remaining_seconds = max(0, 2 * 60 * 60 - elapsed_time) 

            return timedelta(seconds=int(remaining_seconds))  

        return None  
    def get_type_reservation(self, obj):
        """
        إرجاع النصوص بدلاً من معرف `type_reservation`
        """
        return dict(models.type_reservation_list).get(obj.type_reservation, "غير معروف")

    def get_status_reservation(self, obj):
        """
        إرجاع النصوص بدلاً من معرف `status_reservation`
        """
        return dict(models.status_list).get(obj.status_reservation, "غير معروف")
    
    
class CustomerSerializer(serializers.ModelSerializer):
    """سيريلز لتفاصيل العميل"""
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    phone = serializers.CharField(source='user.phone')

    class Meta:
        model = Customer
        fields = ['first_name', 'last_name', 'phone', 'id_number']    
    
    
class ReservationSrecheSerializer(serializers.ModelSerializer):
    """سيريلز الحجز مع تفاصيل العميل والسيارة"""
    customer = CustomerSerializer()  # تضمين تفاصيل المستخدم بدل ID
    car = CarSerializer()  # تضمين تفاصيل السيارة بدل ID

    class Meta:
        model = models.Reservation
        fields = ['id_reservation', 'start_date', 'end_date', 'type_reservation', 'status_reservation', 'time_reservation', 'car', 'customer']