from django.urls import path
from cars import views

urlpatterns = [
    ##### cars
    path('list-create/', views.CarListCreateView.as_view(), name='car-list-create'),
    path('updata-delete/<int:pk>/', views.CarUpdateDestroyView.as_view(), name='car-detail'),
    path('serche/', views.CarSearchView.as_view(), name='car-serche'),
    ##### Customer
    path('home/', views.HomeCustomerView.as_view(), name='home'),
    path('list/', views.CarlistViewView.as_view(), name='car-list-view'),
    path('serche-customer/', views.CarSearchCustomerView.as_view(), name='car-serche-customer'),
    path('detail/<int:id_car>/', views.CarDetailView.as_view(), name='car-detail'),


]
