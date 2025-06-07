"use client"


import { endpoints } from '@/app/api/common'
import CountDown from '@/app/components/views/CountDown'
import dataMutate from '@/lib/api/data/dataMutate'
import { METHODS } from '@/lib/api/setup/api'
import useBoolean from '@/lib/hooks/use-boolean'
import { CardBackgrounds, TextPrimary, TextSecondary } from '@/lib/ui/class/classNames'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@/lib/ui/MTFix'
import { isoTo_YYY_MM_DD_HH_MM } from '@/lib/utils/dateFormater'
import { AxiosResponse } from 'axios'
import clsx from 'clsx'
import Image from 'next/image'
import { FaCalendarCheck, FaHourglassEnd, FaHourglassStart, FaIdCard } from 'react-icons/fa'
import { GiHouseKeys, GiSteeringWheel } from 'react-icons/gi'
import { IoIosCloseCircle } from 'react-icons/io'
import { IoCarSport } from 'react-icons/io5'
import { MdOutlineShortText } from 'react-icons/md'
import { PiCurrencyDollarBold } from 'react-icons/pi'
import { TbListDetails } from 'react-icons/tb'
import { toast } from 'react-toastify'
import { KeyedMutator } from 'swr'

type Props = {
  Reservation: customerTemporaryReservationsType
  refetch: KeyedMutator<AxiosResponse<unknown, unknown>>

}

const CustomerReservation = ({ Reservation, refetch }: Props) => {
  const open = useBoolean({ initialState: false });

  const handleCancel = async () => {
    const response = dataMutate(endpoints.customer.cancel(Reservation.id_reservation), METHODS.PUT, {});

    await response.then(() => {
      toast.success("تم الغاء الحجز بنجاح");
      refetch();
      open.onFalse();
    }).catch((error => {
      console.log(error);
      toast.error("حدث خطأ أثناء الغاء الحجز");
      refetch();
      open.onFalse();
    }))
  }

  return (
    <>
      <Button
        variant='text'
        color='green'
        className='flex items-center gap-1.5'
        onClick={open.onTrue}
      >
        <TbListDetails />
        تفاصيل الحجز
      </Button>
      <Dialog
        open={open.value}
        handler={open.onToggle}
        className={clsx(CardBackgrounds)}
        size='xl'
      >
        <DialogHeader
          className='flex justify-between items-center'
        >
          <Typography
            variant='h3'
            color='green'
          >
            <TbListDetails className='inline-block me-1' />تفاصيل الحجز رقم {Reservation.id_reservation}
          </Typography>
          <IoIosCloseCircle
            className='text-red-500 text-3xl opacity-50 hover:opacity-100 cursor-pointer transition-all active:scale-105'
            onClick={open.onFalse}
          />
        </DialogHeader>
        <DialogBody
          className={clsx(TextPrimary, "flex flex-col gap-5 max-h-[75vh] overflow-y-scroll")}
        >
          <section>
            <Typography
              variant='lead'
              className={clsx(TextSecondary)}
              as="h2"
            >
              معلومات الحجز
            </Typography>
            <div
              className='flex justify-start items-center gap-10 flex-wrap'
            >
              <Typography
                variant='paragraph'
              >
                <FaIdCard className='inline-block me-1.5' />
                {`رقم الححز ${Reservation.id_reservation}`}
              </Typography>
              {
                !!Reservation.remaining_time &&
                <Typography
                  variant='paragraph'
                >
                  <FaHourglassEnd className='inline-block me-1.5' />
                  {
                    !!Reservation.remaining_time
                      ? <CountDown mint={Reservation.remaining_time.mint} second={Reservation.remaining_time.second} />
                      : "الحجز غير مؤقت"
                  }
                </Typography>
              }
              <Typography
                variant='paragraph'
              >
                <FaHourglassStart className='inline-block me-1.5' />
                {`تاريخ الأستلام ${isoTo_YYY_MM_DD_HH_MM(Reservation.start_date)}`}
              </Typography>
              <Typography
                variant='paragraph'
              >
                <FaCalendarCheck className='inline-block me-1.5' />
                {`تاريخ أنتهاء الحجز ${isoTo_YYY_MM_DD_HH_MM(Reservation.end_date)}`}
              </Typography>
            </div>
            <Typography
              variant='paragraph'
            >
              <GiHouseKeys className='inline-block me-1.5' />
              {`نوع الحجز ${Reservation.type_reservation}`}
            </Typography>
          </section>
          <section>
            <Typography
              variant='lead'
              className={clsx(TextSecondary)}
              as="h2"
            >
              معلومات السيارة
            </Typography>
            <div
              className='flex justify-start items-center gap-10 flex-wrap'
            >
              <Typography
                variant='paragraph'
              >
                <IoCarSport className='inline-block me-1.5' />
                {`السيارة ${Reservation.car.brand} ${Reservation.car.model}`}
              </Typography>
              <Typography
                variant='paragraph'
              >
                <GiSteeringWheel className='inline-block me-1.5' />
                {`التصنيف ${Reservation.car.category_disaply}`}
              </Typography>
              <Typography
                variant='paragraph'
              >
                <MdOutlineShortText className='inline-block me-1.5' />
                {`حالة السيارة ${Reservation.car.status_disaply}`}
              </Typography>
            </div>
            <div
              className='flex justify-start items-center gap-10 flex-wrap'
            >
              {
                Reservation.car.is_available_daily &&
                <Typography
                  variant='paragraph'
                >
                  {`سعر الإيجار اليومي ${Reservation.car.daily_rent_price}`}
                  <PiCurrencyDollarBold
                    className='text-primary-main inline-block me-1.5'
                  />
                </Typography>
              }
              {
                Reservation.car.is_available_monthly &&
                <Typography
                  variant='paragraph'
                >
                  {`سعر الإيجار الشهري ${Reservation.car.monthly_rent_price}`}
                  <PiCurrencyDollarBold
                    className='text-primary-main inline-block me-1.5'
                  />
                </Typography>
              }
              {
                Reservation.car.is_available_yearly &&
                <Typography
                  variant='paragraph'
                >
                  {`سعر الإيجار السنوي ${Reservation.car.yearly_rent_price}`}
                  <PiCurrencyDollarBold
                    className='text-primary-main inline-block me-1.5'
                  />
                </Typography>
              }
              {
                Reservation.car.is_for_sale &&
                <Typography
                  variant='paragraph'
                >
                  {`سعر المبيع ${Reservation.car.sale_price}`}
                  <PiCurrencyDollarBold
                    className='text-primary-main inline-block me-1.5'
                  />
                </Typography>
              }
            </div>
            <figure
              className='flex justify-between gap-5 px-5 flex-wrap'
            >
              <Image
                src={Reservation.car.image1}
                width={2000}
                height={200}
                alt='people with car'
                className=' rounded-md aspect-square object-contain max-w-40'
              />
              <Image
                src={Reservation.car.image2}
                width={2000}
                height={200}
                alt='people with car'
                className=' rounded-md aspect-square object-contain max-w-40'
              />
              <Image
                src={Reservation.car.image3}
                width={2000}
                height={200}
                alt='people with car'
                className=' rounded-md aspect-square object-contain max-w-40'
              />
            </figure>
          </section>
        </DialogBody>
        {
          Reservation.status_reservation === "حجز مؤقت" &&
          <DialogFooter >
            <Button
              variant="filled"
              color="red"
              onClick={handleCancel}
              className="mr-1"
            >
              إلغاء الحجز
            </Button>
          </DialogFooter>
        }
      </Dialog >
    </>
  )
}

export default CustomerReservation