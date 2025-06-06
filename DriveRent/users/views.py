from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import login
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.core.cache import cache
from users import serializers
from users import models
from .permissions import IsRole
from cars import models as models_cars
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from axes.decorators import axes_dispatch

#######################################
@method_decorator(axes_dispatch, name='dispatch') 
class LoginView(TokenObtainPairView):
    serializer_class = serializers.LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data['user']
            
            
        account_type_redirect_map = {
            'manager': '/manager',
            'employee': '/employee',
            'admin': '/admin',
        }
        if user.account_type == 'customer':
            customer = getattr(user, 'customer', None) 
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')  
            tokens = {  
                'refresh': serializer.validated_data['refresh'],
                'access': serializer.validated_data['access'],
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'phone': user.phone,
                'id_number': customer.id_number if customer else None,
                'id_front_image': customer.id_front_image.url if customer and customer.id_front_image else None,
                'id_back_image': customer.id_back_image.url if customer and customer.id_back_image else None,
                'driving_license_image': customer.driving_license_image.url if customer and customer.driving_license_image else None,
            }
            return Response(tokens)
        
        redirect_url = account_type_redirect_map.get(user.account_type)
        
        if redirect_url:
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')  
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
class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    def get_permissions(self):
        return [IsRole(allowed_roles=['manager'])]
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    # permission_classes = [AllowAny]
    

class BulkUserActionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['admin'])]
    
    def post(self, request, *args, **kwargs):
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
        
        user = customer.user

        if not user.is_active:
            return Response(
                {
                    "message": "تم إنشاء الحساب بنجاح. يرجى انتظار تفعيل الحساب من قبل الإدارة.",
                },
                status=status.HTTP_201_CREATED
            )

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "message": "تم إنشاء الحساب بنجاح",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'phone': user.phone,
                'id_number': customer.id_number if customer else None,
                'id_front_image': customer.id_front_image.url if customer and customer.id_front_image else None,
                'id_back_image': customer.id_back_image.url if customer and customer.id_back_image else None,
                'driving_license_image': customer.driving_license_image.url if customer and customer.driving_license_image else None,                
            },
            status=status.HTTP_201_CREATED
        )

###############
class CustomerUserListView(generics.ListAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerViewListSerializer
    permission_classes = [AllowAny]
    def get_permissions(self):
        return [IsRole(allowed_roles=['admin'])]
    
class CustomerUserView(generics.RetrieveAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerViewSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['admin'])]    
    
    
class OfficeAccountListCreateView(generics.ListCreateAPIView):
    serializer_class = serializers.OfficeAccountCreateSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['manager'])]

    def get_queryset(self):
        user = self.request.user
        try:
            office = models_cars.OfficeAccount.objects.get(user=user).office
        except models_cars.OfficeAccount.DoesNotExist:
            return models.User.objects.none()
        office_users = models_cars.OfficeAccount.objects.filter(office=office).values_list('user_id', flat=True)
        return models.User.objects.filter(id__in=office_users, account_type__in=["employee", "manager"])

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        data = [
            {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "username": user.username,
                "phone": user.phone,
                "account_type": user.account_type,
                "is_active": user.is_active,
            }
            for user in queryset
        ]
        return Response(data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        user = request.user
        try:
            office = models_cars.OfficeAccount.objects.get(user=user).office
        except models_cars.OfficeAccount.DoesNotExist:
            return Response({"detail": "الحساب الحالي لا ينتمي إلى أي مكتب."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data, context={"office": office})
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.to_representation(instance), status=status.HTTP_201_CREATED)
    
    
class OfficeAccountRetrieveUpdateView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.OfficeAccountCreateSerializer
    permission_classes = [IsAuthenticated]
    def get_permissions(self):
        return [IsRole(allowed_roles=['manager'])]

    def get_object(self):
        manager = self.request.user
        office = get_object_or_404(models_cars.OfficeAccount, user=manager).office

        target_user_id = self.kwargs['user_id']
        # التحقق من أن المستخدم المطلوب ينتمي لنفس المكتب
        get_object_or_404(models_cars.OfficeAccount, user_id=target_user_id, office=office)

        # نعيد كائن المستخدم مباشرة للتعديل
        return get_object_or_404(models.User, id=target_user_id)