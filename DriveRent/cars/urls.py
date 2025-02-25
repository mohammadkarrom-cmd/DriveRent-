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
    path('reserve/', views.CreateReservationView.as_view(), name='reserve-car'),
    path('reserve/cancel/<int:pk>/',  views.CancelReservationView.as_view(), name='cancel-reservation'),  # ⬅️ مسار إلغاء الحجز
    path('my-temporary-reservations/', views.CustomerTemporaryReservationsView.as_view(), name='customer-temporary-reservations'),


    ##### Office Employee
    path('office/temporary-reservations/', views.OfficeEmployeeTemporaryReservationsView.as_view(), name='office-temporary-reservations'),
    path('office/confirm-reservation/<int:pk>/', views.ConfirmReservationView.as_view(), name='confirm-reservation'),

    path('reservations/cancel/<int:pk>/', views.CancelEmployeeReservationView.as_view(), name='cancel-reservation'),

]
