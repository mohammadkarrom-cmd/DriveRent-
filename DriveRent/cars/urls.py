from django.urls import path
from cars import views

urlpatterns = [
    ##### cars
    path('list-create/', views.CarListCreateView.as_view(), name='car-list-create'),

]
