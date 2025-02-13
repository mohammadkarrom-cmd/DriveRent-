from django_q.tasks import schedule
from django.utils.timezone import now
from cars.models import Reservation

def expire_reservation(reservation_id):
    try:
        reservation = Reservation.objects.get(id_reservation=reservation_id)
        if reservation.status_reservation == 2:  
            reservation.status_reservation = 4 
            reservation.save()
            
            # تحديث حالة السيارة إلى "متاحة" (status = 1)
            car = reservation.car
            car.status = 1  # 1 تعني "متاحة"
            car.save()
            
            
            print(f"✅ تم إلغاء الحجز ID: {reservation_id} تلقائيًا بعد ساعتين.")
    except Reservation.DoesNotExist:
        print(f"⚠️ الحجز ID: {reservation_id} غير موجود.")
