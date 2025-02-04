from django.urls import path
from users import views

urlpatterns = [
    ##### Authentication
    path("login/", views.LoginView.as_view(), name='token_obtain_pair'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path("refresh/token/", views.CustomTokenRefreshView.as_view(), name="token_refresh"),
    
    path("register/", views.CustomerCreateView.as_view(), name="customer-register"),

    
    ##### Users
    path('user/', views.UserListCreateView.as_view(), name='user-list-create'),
    path('user/<int:pk>/', views.UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
    path('bulk-action/', views.BulkUserActionAPIView.as_view(), name='users-bulk-action'),



]
