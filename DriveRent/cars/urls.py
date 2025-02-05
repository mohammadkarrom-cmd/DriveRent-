from django.urls import path
from cars import views

urlpatterns = [
    ##### cars
    path('list-create/', views.CarListCreateView.as_view(), name='car-list-create'),
    path('updata-delete/<int:pk>/', views.CarUpdateDestroyView.as_view(), name='car-detail'),
    path('serche/', views.CarSearchView.as_view(), name='car-serche'),

]
