from django.urls import path
from cars import views

urlpatterns = [
    ##### admin
    path("admin/statistics/", views.AdminStatisticView.as_view(), name="admin-statistics"),

    path('office/list-create/', views.OfficeListCreateView.as_view(), name='office-list-create'),
    path('office/<int:id_office>/', views.OfficeRetrieveUpdateView.as_view(), name='office-detail'),

    path('office/<int:office_id>/accounts/', views.OfficeAccountListCreateView.as_view(), name='office-account-list-create'),
    path('office/accounts/<int:id_office_account>/', views.OfficeAccountRetrieveUpdateDestroyView.as_view(), name='offic-account-detail'),
    
    
    path('office/<int:office_id>/ratings/', views.OfficeRatingAminListCreateView.as_view(), name='list'),

    path('category/list-create/', views.CarCategoryListCreateView.as_view(), name='office-list-create'),
    path('category/<int:id_car_type>/', views.CarCategoryRetrieveUpdateView.as_view(), name='office-detail'),

    ##### manager
    ##################cars
    path('manager/statistic/', views.StatisticCreateView.as_view(), name='statistic'),

    
    path('list-create/', views.CarListCreateView.as_view(), name='car-list-create'),
    path('detail/<int:id_car>/', views.CarUpdateDestroyView.as_view(), name='car-detail'),
    path('serche/', views.CarSearchView.as_view(), name='car-serche'),
    path('ratings/', views.MnagerOfficeRatingAminListCreateView.as_view(), name='list'),

    
    
    
    ##### Customer
    path('home/', views.HomeCustomerView.as_view(), name='home'),
    path('list/', views.CarlistViewView.as_view(), name='car-list-view'),
    
    path('customer/category-list/', views.CustomerCarCategoryListCreateView.as_view(), name='category-list'),
    path('customer/offices-list/', views.CustomerOfficesListView.as_view(), name='customer-offices-list'),
    path('customer/office/<int:id_office>/', views.CustomerOfficeRetrieveView.as_view(), name='office-detail'),

    
    
    path('serche-customer/', views.CarSearchCustomerView.as_view(), name='car-serche-customer'),
    path('customer/detail/<int:id_car>/', views.CarDetailView.as_view(), name='car-detail'),
    path('customer/list-create/', views.CustomerCarListCreateView.as_view(), name='car-list-create'),
    path('customer/detail-car/<int:id_car>/', views.CustomerCarUpdateDestroyView.as_view(), name='car-detail'),

    path('reserve/', views.CreateReservationView.as_view(), name='reserve-car'),
    path('reserve/cancel/<int:pk>/',  views.CancelReservationView.as_view(), name='cancel-reservation'),  
    path('my-temporary-reservations/', views.CustomerTemporaryReservationsView.as_view(), name='customer-temporary-reservations'),

    # Customer: List offices the customer can evaluate
    path('customer/evaluable-offices/', views.CustomerEvaluableOfficesListView.as_view(), name='customer-evaluable-offices'),

    # Customer: Evaluate an office (only if in the list above)
    path('customer/evaluate-office/<int:office_id>/', views.CustomerEvaluateOfficeView.as_view(), name='customer-evaluate-office'),

    ##### Office Employee
    path('list/reservations/', views.OfficeEmployeeReservationsView.as_view(), name='office-all-reservations'),
    path('list/temporary-reservations/', views.OfficeEmployeeTemporaryReservationsView.as_view(), name='office-temporary-reservations'),
    path('list/fake-reservations/', views.OfficeEmployeeFakeReservationsView.as_view(), name='office-fake-reservations'),
    path('confirm-reservation/<int:pk>/', views.ConfirmReservationView.as_view(), name='confirm-reservation'),
    path('reservations/cancel/<int:pk>/', views.CancelEmployeeReservationView.as_view(), name='cancel-reservation'),
    path('confirm-fake-reservations/<int:pk>/', views.ConfirmFakeReservationView.as_view(), name='confirm-fake-reservation'),

]
