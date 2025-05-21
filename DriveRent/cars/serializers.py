from rest_framework import serializers
from cars import models
from datetime import timedelta
from django.utils.timezone import now
from users import models as models_user
from rest_framework.exceptions import ValidationError
from django.db import IntegrityError
from users import serializers as users_serializers

class CarSerializer(serializers.ModelSerializer):
    category_disaply=serializers.CharField(source='category.name' ,read_only=True)
    status_disaply=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = models.Car
        fields = '__all__'
        read_only_fields = ['category_disaply']
        
    def get_status_disaply(self,obj):
        return dict(models.status_list).get(obj.status, "غير معروف")

        
class ReservationViewCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reservation
        fields = ['start_date','end_date','type_reservation','time_reservation']
        
        
class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reservation
        fields = ['car', 'start_date', 'type_reservation']  

    # def validate(self, data):
    #     """التحقق من توفر السيارة"""
    #     car = data['car']
    #     start_date = data['start_date']
    #     type_reservation = data['type_reservation']

    #     duration = {
    #         1: timedelta(days=1),
    #         2: timedelta(days=30),
    #         3: timedelta(days=365)
    #     }.get(type_reservation, timedelta(days=1))

    #     end_date = start_date + duration

    #     if models.Reservation.objects.filter(
    #         car=car, 
    #         start_date__lt=end_date, 
    #         end_date__gt=start_date,
    #         status_reservation__in=[2, 3]  
    #     ).exists():
    #         raise serializers.ValidationError("⚠️ السيارة غير متاحة في هذه الفترة.")

    #     return data
    
    
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
        if obj.status_reservation == 1:  
            elapsed_time = (now() - obj.time_reservation).total_seconds()
            remaining_seconds = max(0, 2 * 60 * 60 - elapsed_time)  # حساب الثواني المتبقية

            # استخراج الدقائق والثواني من الوقت المتبقي
            minutes = int(remaining_seconds // 60)  # تحويل الثواني إلى دقائق
            seconds = int(remaining_seconds % 60)   # استخراج الثواني المتبقية

            return {"mint": minutes, "second": seconds}  # إرجاع القيم كمصفوفة JSON

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
        return dict(models.status_reservation_list).get(obj.status_reservation, "غير معروف")
    
    
class CustomerSerializer(serializers.ModelSerializer):
    """سيريلز لتفاصيل العميل"""
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    phone = serializers.CharField(source='user.phone')

    class Meta:
        model = models.Customer
        fields = ['first_name', 'last_name', 'phone', 'id_number']    
    
    
class ReservationSrecheSerializer(serializers.ModelSerializer):
    """سيريلز الحجز مع تفاصيل العميل والسيارة"""
    customer = CustomerSerializer()  
    car = CarSerializer()  
    remaining_time=serializers.SerializerMethodField()
    type_reservation=serializers.SerializerMethodField()
    status_reservation=serializers.SerializerMethodField()
    class Meta:
        model = models.Reservation
        fields = ['id_reservation', 'start_date', 'end_date', 'type_reservation', 'status_reservation','remaining_time', 'time_reservation', 'car', 'customer']
        
    def get_remaining_time(self, obj):
        """
        حساب الوقت المتبقي قبل الإلغاء التلقائي للحجز المؤقت وإرجاعه كـ `timedelta`
        """
        if obj.status_reservation == 1:  
            elapsed_time = (now() - obj.time_reservation).total_seconds()
            remaining_seconds = max(0, 2 * 60 * 60 - elapsed_time)  # حساب الثواني المتبقية

            # استخراج الدقائق والثواني من الوقت المتبقي
            minutes = int(remaining_seconds // 60)  # تحويل الثواني إلى دقائق
            seconds = int(remaining_seconds % 60)   # استخراج الثواني المتبقية

            return {"mint": minutes, "second": seconds}  # إرجاع القيم كمصفوفة JSON

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
        return dict(models.status_reservation_list).get(obj.status_reservation, "غير معروف")
        

class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Office
        fields = '__all__'
        
        
class OfficeAccountSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    phone = serializers.CharField(write_only=True, required=False, allow_blank=True)
    account_type = serializers.ChoiceField(write_only=True, choices=[('manager', 'مدير'), ('employee', 'موظف')])
    is_active = serializers.BooleanField(write_only=True, default=True)

    class Meta:
        model = models.OfficeAccount
        fields = [
            'id_office_account', 'first_name', 'last_name', 'email', 'username', 'password',
            'phone', 'account_type', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id_office_account', 'created_at', 'updated_at']

    def create(self, validated_data):
        username = validated_data.get("username")

        if models_user.User.objects.filter(username=username).exists():
            raise ValidationError({"username": "اسم المستخدم مستخدم مسبقًا، الرجاء اختيار اسم آخر."})

        email = validated_data.get("email") 
        if models_user.User.objects.filter(email=email).exists():
            raise ValidationError({"email": "البريد الإلكتروني مستخدم مسبقًا."})

        try:
            user = models_user.User(
                first_name=validated_data.pop("first_name"),
                last_name=validated_data.pop("last_name"),
                email=validated_data.pop("email"),
                username=username,
                account_type=validated_data.pop("account_type"),
                is_active=validated_data.pop("is_active", True),
                phone=validated_data.pop("phone", ""),
            )
            user.set_password(validated_data.pop("password"))
            user.save()
        except IntegrityError as e:
            raise ValidationError({"detail": "حدث خطأ أثناء إنشاء المستخدم. تأكد من عدم تكرار البيانات."})

        office = self.context['office']
        return models.OfficeAccount.objects.create(user=user, office=office)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        user = instance.user
        rep['user'] = {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'username': user.username,
            'phone': user.phone,
            'account_type': user.account_type,
            'is_active': user.is_active,
        }
        return rep
    
    def update(self, instance, validated_data):
        user_data = {
            "first_name": validated_data.pop("first_name", None),
            "last_name": validated_data.pop("last_name", None),
            "email": validated_data.pop("email", None),
            "username": validated_data.pop("username", None),
            "password": validated_data.pop("password", None),
            "phone": validated_data.pop("phone", None),
            "account_type": validated_data.pop("account_type", None),
            "is_active": validated_data.pop("is_active", None),
        }

        user = instance.user

        if user_data["username"] and user.username != user_data["username"]:
            if models_user.User.objects.filter(username=user_data["username"]).exclude(id=user.id).exists():
                raise ValidationError({"username": "اسم المستخدم مستخدم مسبقًا."})
            user.username = user_data["username"]

        if user_data["email"] and user.email != user_data["email"]:
            if models_user.User.objects.filter(email=user_data["email"]).exclude(id=user.id).exists():
                raise ValidationError({"email": "البريد الإلكتروني مستخدم مسبقًا."})
            user.email = user_data["email"]

        for field in ['first_name', 'last_name', 'phone', 'account_type', 'is_active']:
            value = user_data.get(field)
            if value is not None:
                setattr(user, field, value)

        if user_data["password"]:
            user.set_password(user_data["password"])

        user.save()

        return super().update(instance, validated_data)
    
    
class OfficeRatingAdminSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField()
    office=serializers.CharField(source='office.name')
    class Meta:
        model = models.OfficeRating
        fields = '__all__'
        
    def get_customer(self, obj):
        return f"{obj.customer.user.first_name}-{obj.customer.user.last_name}"
    
    
class CarCustomerListSerializer(serializers.ModelSerializer):
    owner_office = serializers.SerializerMethodField()
    owner_customer = serializers.SerializerMethodField()
    status=serializers.SerializerMethodField()
    class Meta:
        model = models.Car
        fields = '__all__'
        
    def get_owner_office(self, obj):
        return (
            f"{obj.owner_office.name}"
            if obj.owner_office else None
        )
        
    def get_owner_customer(self, obj):
        return (
            f"{obj.owner_customer.user.first_name}-{obj.owner_customer.user.last_name}"
            if obj.owner_customer and obj.owner_customer.user else None
        )
        
    def get_status(self,obj):
        return dict(models.status_list).get(obj.status, "غير معروف")



class CarCustomerSerializer(serializers.ModelSerializer):
    owner_office = serializers.SerializerMethodField()
    owner_customer = serializers.SerializerMethodField()
    status=serializers.SerializerMethodField()
    class Meta:
        model = models.Car
        fields = '__all__'

    def get_owner_office(self, obj):
        if obj.owner_office:
            return OfficeSerializer(obj.owner_office, context=self.context).data
        return None

    def get_owner_customer(self, obj):
        if obj.owner_customer and obj.owner_customer.user:
            return users_serializers.UserCustomerSerializer(obj.owner_customer.user).data
        return None
    
    
    def get_status(self,obj):
        return dict(models.status_list).get(obj.status, "غير معروف")




class CarCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CarCategory
        fields = '__all__'




