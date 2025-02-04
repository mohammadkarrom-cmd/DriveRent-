from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .permissions import IsRole
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import redirect
from django.contrib.auth import login
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework import status
from django.db.models import F, Q, Count
from django.utils import timezone
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from django.shortcuts import get_object_or_404
from datetime import date
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.views import APIView
from django.core.cache import cache
from users import serializers
from users import models
from rembg import remove
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile
#######################################
class LoginView(TokenObtainPairView):
    serializer_class = serializers.LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data['user']

        if not user or not user.is_active:
            return Response({'error': 'Invalid credentials or user is not active'}, status=status.HTTP_400_BAD_REQUEST)

        account_type_redirect_map = {
            'admin': '/admin',
            'evaluator': '/evaluator',
            'manager': '/manager',
            'candidate': '/student/step1'
        }
        redirect_url = account_type_redirect_map.get(user.account_type)

        if user.account_type == 'candidate':
            candidate = Candidates.objects.filter(Account=user).first()
            if candidate and candidate.is_finished:
                redirect_url = '/student'

        if redirect_url:
            login(request, user)
            tokens = {
                'refresh': serializer.validated_data['refresh'],
                'access': serializer.validated_data['access'],
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'username': user.username,
                'role': user.account_type,
                'redirect_url': redirect_url
            }
            return Response(tokens)

        return Response({'error': 'Invalid account type'}, status=status.HTTP_400_BAD_REQUEST)
    
###############################

class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"detail": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "تم تسجيل الخروج بنجاح"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
#####################
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            access_token = response.data.get('access', None)
            
            if access_token:
                token = AccessToken(access_token)
                user_id = token.get('user_id')
                
                user_data = cache.get(f'user_data_{user_id}')
                
                if not user_data:
                    try:
                        user = models.User.objects.get(id=user_id)
                        user_data = {
                            'role': user.account_type,
                            'username': user.username,
                            'email': user.email,
                            'last_name': user.last_name,
                            'first_name': user.first_name,
                        }
                        cache.set(f'user_data_{user_id}', user_data, timeout=300)
                    except models.User.DoesNotExist:
                        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

                response_data = {
                    **user_data,
                    "access": access_token,
                    "message": "success",
                }
                
                return Response(response_data, status=status.HTTP_200_OK)
        
        return response
    
#####################
class UserListCreateView(generics.ListCreateAPIView):
    # def get_permissions(self):
    #     return [IsRole(allowed_roles=['admin'])]
    queryset = models.User.objects.exclude(account_type='customer')
    serializer_class = serializers.UserSerializer
    permission_classes = [AllowAny]
########
class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # def get_permissions(self):
    #     return [IsRole(allowed_roles=['admin'])]
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [AllowAny]
    
    from rest_framework.views import APIView

class BulkUserActionAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # دعم تمرير الـ id عبر `POST` أو `GET`
        user_ids = request.data.get("id") or request.query_params.get("id")

        if not user_ids:
            return Response({"message": "No user IDs provided."}, status=status.HTTP_400_BAD_REQUEST)

        # السماح بإرسال معرف واحد أو قائمة من المعرفات
        if isinstance(user_ids, str):
            user_ids = [user_ids]  # تحويل `id` إلى قائمة إذا كان مفردًا

        users = models.User.objects.filter(id__in=user_ids)
        if not users.exists():
            return Response({"message": "No matching user found."}, status=status.HTTP_400_BAD_REQUEST)

        action = request.data.get("action")
        if action == "activate":
            users.update(is_active=True)
            return Response({"message": "تم تنشيط الحسابات بنجاح"}, status=status.HTTP_200_OK)

        elif action == "deactivate":
            users.update(is_active=False)
            for user in users:
                tokens = OutstandingToken.objects.filter(user=user)
                for token in tokens:
                    BlacklistedToken.objects.get_or_create(token=token)

            return Response({"message": "تم إلغاء تنشيط الحسابات بنجاح"}, status=status.HTTP_200_OK)

        return Response({"message": "Invalid action or missing parameters."}, status=status.HTTP_400_BAD_REQUEST)

########
class CustomerCreateView(generics.CreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerCreateSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        customer = serializer.save()
        
        return Response(
            {
                "message": "تم إنشاء الحساب بنجاح",
            },
            status=status.HTTP_201_CREATED
        )
