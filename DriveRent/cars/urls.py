from django.urls import path
from cars import views

urlpatterns = [
    ##### admin
    path('office/list-create/', views.OfficeListCreateView.as_view(), name='office-list-create'),
    path('office/<int:id_office>/', views.OfficeRetrieveUpdateView.as_view(), name='office-detail'),

    path('office/<int:office_id>/accounts/', views.OfficeAccountListCreateView.as_view(), name='officeaccount-list-create'),
    path('office/accounts/<int:id_office_account>/', views.OfficeAccountRetrieveUpdateDestroyView.as_view(), name='officeaccount-detail'),
    
    
    path('office/<int:office_id>/ratings/', views.OfficeRatingAminListCreateView.as_view(), name='list'),

    path('category/list-create/', views.CarCategoryListCreateView.as_view(), name='office-list-create'),
    path('category/<int:id_car_type>/', views.CarCategoryRetrieveUpdateView.as_view(), name='office-detail'),

    ##### manager
    ##################cars
    path('list-create/', views.CarListCreateView.as_view(), name='car-list-create'),
    path('detail/<int:pk>/', views.CarUpdateDestroyView.as_view(), name='car-detail'),
    path('serche/', views.CarSearchView.as_view(), name='car-serche'),
    
    
    
    
    ##### Customer
    path('home/', views.HomeCustomerView.as_view(), name='home'),
    path('list/', views.CarlistViewView.as_view(), name='car-list-view'),
    path('serche-customer/', views.CarSearchCustomerView.as_view(), name='car-serche-customer'),
    path('car-detail/<int:id_car>/', views.CarDetailView.as_view(), name='car-detail'),
    path('reserve/', views.CreateReservationView.as_view(), name='reserve-car'),
    path('reserve/cancel/<int:pk>/',  views.CancelReservationView.as_view(), name='cancel-reservation'),  
    path('my-temporary-reservations/', views.CustomerTemporaryReservationsView.as_view(), name='customer-temporary-reservations'),


    ##### Office Employee
    path('office/temporary-reservations/', views.OfficeEmployeeTemporaryReservationsView.as_view(), name='office-temporary-reservations'),
    path('office/confirm-reservation/<int:pk>/', views.ConfirmReservationView.as_view(), name='confirm-reservation'),
    path('reservations/cancel/<int:pk>/', views.CancelEmployeeReservationView.as_view(), name='cancel-reservation'),

]
