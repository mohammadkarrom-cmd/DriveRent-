from django.urls import path
from users import views

urlpatterns = [
    ##### Authentication
    path("login/", views.LoginView.as_view(), name='token_obtain_pair'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path("refresh/token/", views.CustomTokenRefreshView.as_view(), name="token_refresh"),
    ##### Register
    path("register/", views.CustomerCreateView.as_view(), name="customer-register"),
    ##### Users
    path('bulk-action/', views.BulkUserActionAPIView.as_view(), name='users-bulk-action'),

    ############### admin
    path('customer/user-list/', views.CustomerUserListView.as_view(), name='customer-user-list'),
    path('customer/user/<int:pk>/', views.CustomerUserView.as_view(), name='customer-user-view'),
    ############### manager
    # path('office/user/list-create/', views.OfficeUserListCreateView.as_view(), name='user-list-create'),
    path("office/accounts/", views.OfficeAccountListCreateView.as_view(), name="office-account-list-create"),
    # path('office/account/<int:pk>/', views.UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
    path("office/account/<int:user_id>/", views.OfficeAccountRetrieveUpdateView.as_view(), name="office-account-retrieve-update"),

]
