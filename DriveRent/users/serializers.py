from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import  authenticate
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from users import models
from django.db import IntegrityError
from django.contrib.auth import get_user_model
from cars import models as models_cars
from rest_framework.validators import UniqueValidator

# from .models import (
#     User,
#     Customer,
# )
User = get_user_model()

class LoginSerializer(TokenObtainPairSerializer):
    username_field = 'username'

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if not username or not password:
            raise serializers.ValidationError(
                {"message": "يجب إدخال اسم المستخدم وكلمة المرور"}
            )

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                {"message": "بيانات الدخول غير صحيحة"}
            )

        if not user.check_password(password):
            raise serializers.ValidationError(
                {"message": "بيانات الدخول غير صحيحة"}
            )

        if not user.is_active:
            raise serializers.ValidationError(
                {"message": "حسابك معطّل، يرجى الانتظار حتى يتم تفعيله من قبل الأدمن"}
            )

        return {
            'user': user,
            'refresh': str(self.get_token(user)),
            'access': str(self.get_token(user).access_token),
        }

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField(required=True)
    
    
###############
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'account_type', 'is_active', 'phone']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
        }

    def create(self, validated_data):
        user = models.User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            username=validated_data['username'],
            account_type=validated_data['account_type'],
            is_active=validated_data.get('is_active', True),
            phone=validated_data.get('phone', ''),
        )
        password = validated_data.pop('password', None)
        if password:
            user.set_password(password)  
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)  
        return super().update(instance, validated_data)
###############

class CustomerCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    class Meta:
        model = models.Customer
        fields = [
            "username", "password", "first_name", "last_name", "email", "phone",
            "id_number", "id_front_image", "id_back_image", "driving_license_image"
        ]

    def validate(self, data):
        if models.User.objects.filter(username=data.get("username")).exists():
            raise ValidationError({"message": "حصل خطأ ما"})  
        if models.Customer.objects.filter(id_number=data.get("id_number")).exists():
            raise ValidationError({"message": "الرقم الوطني المدخل مسجل سابقاً تحقق من الرقم"})  
        return data

    def create(self, validated_data):
        user_data = {
            "username": validated_data.pop("username"),
            "first_name": validated_data.pop("first_name"),
            "last_name": validated_data.pop("last_name"),
            "email": validated_data.pop("email"),
            "phone": validated_data.pop("phone", None),
            "account_type": "customer",  
            "is_active":False
        }
        password = validated_data.pop("password")

        user = models.User.objects.create(**user_data)
        user.set_password(password)  
        user.save()

        customer = models.Customer.objects.create(user=user, **validated_data)
        return customer
    
    

class CustomerViewListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    phone = serializers.CharField(source="user.phone", read_only=True)
    is_active = serializers.BooleanField(source="user.is_active", read_only=True)

    class Meta:
        model = models.Customer
        fields = [
            "id_customer","first_name", "last_name", "email", "phone","username","is_active"
        ]

class CustomerViewSerializer(serializers.ModelSerializer):
    id_user= serializers.IntegerField(source="user.id", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    phone = serializers.CharField(source="user.phone", read_only=True)
    is_active= serializers.BooleanField(source="user.is_active", read_only=True)
    class Meta:
        model = models.Customer
        fields = [
           "id_customer", "id_user","username", "first_name", "last_name", "email", "phone",'is_active',
            "id_number", "id_front_image", "id_back_image", "driving_license_image"
        ]


class OfficeAccountCreateSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    phone = serializers.CharField(required=False, allow_blank=True)
    account_type = serializers.ChoiceField(choices=[("employee", "موظف"), ("manager", "مدير")])
    is_active = serializers.BooleanField(default=True)

    def create(self, validated_data):
        username = validated_data.get("username")

        if models.User.objects.filter(username=username).exists():
            raise ValidationError({"username": "اسم المستخدم مستخدم مسبقًا."})

        if models.User.objects.filter(email=validated_data.get("email")).exists():
            raise ValidationError({"email": "البريد الإلكتروني مستخدم مسبقًا."})

        try:
            user = models.User(
                username=username,
                email=validated_data.pop("email"),
                first_name=validated_data.pop("first_name"),
                last_name=validated_data.pop("last_name"),
                phone=validated_data.pop("phone", ""),
                account_type=validated_data.pop("account_type"),
                is_active=validated_data.pop("is_active", True),
            )
            user.set_password(validated_data.pop("password"))
            user.save()
        except IntegrityError:
            raise ValidationError({"detail": "حدث خطأ أثناء إنشاء المستخدم."})

        office = self.context.get("office")
        if not office:
            raise ValidationError({"office": "لم يتم تمرير المكتب."})

        return models_cars.OfficeAccount.objects.create(user=user, office=office)

    def update(self, instance, validated_data):
        if models.User.objects.exclude(id=instance.id).filter(username=validated_data["username"]).exists():
            raise ValidationError({"username": "اسم المستخدم مستخدم مسبقًا."})

        if models.User.objects.exclude(id=instance.id).filter(email=validated_data["email"]).exists():
            raise ValidationError({"email": "البريد الإلكتروني مستخدم مسبقًا."})

        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.phone = validated_data.get("phone", instance.phone)
        instance.account_type = validated_data.get("account_type", instance.account_type)
        instance.is_active = validated_data.get("is_active", instance.is_active)

        if "password" in validated_data:
            instance.set_password(validated_data["password"])

        instance.save()
        return instance


    def to_representation(self, instance):
        return {
            "id": instance.id,
            "first_name": instance.first_name,
            "last_name": instance.last_name,
            "email": instance.email,
            "username": instance.username,
            "phone": instance.phone,
            "account_type": instance.account_type,
            "is_active": instance.is_active,
        }
        
        
# class OfficeUserUpdateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['first_name', 'last_name', 'email', 'username', 'phone', 'account_type', 'is_active']
#         extra_kwargs = {
#             'username': {'required': True},
#             'email': {'required': True},
#         }

#     def update(self, instance, validated_data):
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.save()
#         return instance

class UserCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone']
