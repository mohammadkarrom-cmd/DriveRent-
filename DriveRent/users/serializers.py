from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import  authenticate
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from users import models
# from .models import (
#     User,
#     Customer,
# )
class LoginSerializer(TokenObtainPairSerializer):
    username_field = 'username'
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if not user:
                raise serializers.ValidationError('Invalid credentials')

            if not user.is_active:
                raise serializers.ValidationError('User account is disabled.')

            return {
                'user': user,
                'refresh': str(self.get_token(user)),
                'access': str(self.get_token(user).access_token),
            }
        else:
            raise serializers.ValidationError('Must include "username" and "password".')

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

        return data

    def create(self, validated_data):
        user_data = {
            "username": validated_data.pop("username"),
            "first_name": validated_data.pop("first_name"),
            "last_name": validated_data.pop("last_name"),
            "email": validated_data.pop("email"),
            "phone": validated_data.pop("phone", None),
            "account_type": "customer",  
        }
        password = validated_data.pop("password")

        user = models.User.objects.create(**user_data)
        user.set_password(password)  
        user.save()

        customer = models.Customer.objects.create(user=user, **validated_data)
        return customer