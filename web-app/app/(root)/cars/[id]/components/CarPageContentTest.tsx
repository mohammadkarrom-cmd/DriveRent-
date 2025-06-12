"use client";

import Error from '@/app/(root)/error';
import { endpoints } from '@/app/api/common';
import { paths } from '@/app/components/layout/config-nav';
import NormalLoading from '@/app/components/loaders/NormalLoading';
import MyCarousel from '@/app/components/views/MyCarousel';
import fetchApi from '@/lib/api/data/dataFetcher';
import { CardBackgrounds, CardBackgroundsReverse, TextPrimary, TextPrimaryReverse, TextSecondary } from '@/lib/ui/class/classNames';
import { isoTo_YYY_MM_DD_HH_MM } from '@/lib/utils/dateFormater';
import { Button, Chip, Tooltip, Typography } from '@material-tailwind/react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { BsBuildingFill } from 'react-icons/bs';
import { FaCalendarCheck, FaHourglassEnd, FaHourglassStart } from 'react-icons/fa';
import { FaMapLocationDot, FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { PiCurrencyDollarBold } from 'react-icons/pi';
import { TbListDetails } from 'react-icons/tb';
import useSWR from 'swr';
import BuyButton from './BuyButton';
import ReserveButton from './ReserveButton';

type Props = {
    id: string
}

const parseReservationType = (typeID: number): string => {
    switch (typeID) {
        case 1:
            return 'أجار يومي'
        case 2:
            return 'أجار شهري'
        case 3:
            return 'أجار سنوي'
        case 4:
            return 'شراء'
        default:
            return 'غير معروف'

    }
}

const CarPageContentTest = ({ id }: Props) => {
    const { data: data, error, isLoading } = useSWR(endpoints.cars.car(parseInt(id)), fetchApi);

    if (isLoading) {
        return <NormalLoading />
    }
    if (error) {
        return Error(error)
    }



    const carData = data.data as CarDetailsPageType

    const car = carData.car

    return (
        <section>
            <Chip
                value={car.status}
                variant='filled'
                color={car.status === "متاحة" ? "green" : (car.status === "حجز مؤقت للأجار" || car.status === "حجز مؤقت للبيع") ? "amber" : (car.status === "محجوزة للأجار" || car.status === "مباعة") ? "blue" : "red"}
                className='text-xl font-serif m-5 w-fit'
            />
            <article
                className='flex flex-col justify-center items-center xl:flex-row relative h-full mb-20'
            >
                <MyCarousel
                    autoplay={false}
                    loop={true}
                    className='px-5'
                >
                    <Image
                        src={car.image1}
                        alt={car.model}
                        width={1000}
                        height={1000}
                        className='w-full max-w-[550px] aspect-square object-contain mx-auto'
                    />
                    <Image
                        src={car.image2}
                        alt={car.model}
                        width={1000}
                        height={1000}
                        className='w-full max-w-[550px] aspect-square object-contain mx-auto'
                    />
                    <Image
                        src={car.image3}
                        alt={car.model}
                        width={1000}
                        height={1000}
                        className='w-full max-w-[550px] aspect-square object-contain mx-auto'
                    />
                </MyCarousel>
                <section
                    className='p-10 flex flex-col justify-center items-center xl:w-3/4'
                >
                    <Typography
                        color='green'
                        variant='h2'
                        className='text-end font-serif font-bold uppercase'
                    >
                        {`${car.brand} `}
                    </Typography>
                    <Typography
                        color='green'
                        variant='h2'
                        className='text-start font-serif font-bold uppercase'
                    >
                        {`${car.model}`}
                    </Typography>
                    <Typography
                        color='white'
                        variant='paragraph'
                        className={clsx(TextPrimary, 'flex justify-center items-center font-serif font-bold max-h-96 overflow-scroll')}
                    >
                        {car.description}
                    </Typography>
                    <div className={clsx(TextSecondary, 'flex justify-center items-center gap-x-7 gap-y-3 my-5 flex-wrap')}>
                        <p
                            className='flex gap-1 justify-center items-center'
                        >
                            <Typography as="span">
                                {car.is_available_daily ? "متاح للإيجار اليومي" : "غير متاح للإيجار اليومي"}
                            </Typography>
                            {
                                car.is_available_daily &&
                                <Typography as="span" className='flex items-center justify-center'>
                                    {car.daily_rent_price}
                                    <PiCurrencyDollarBold
                                        className='text-primary-main'
                                    />
                                </Typography>
                            }
                        </p>
                        <p
                            className='flex gap-1 justify-center items-center'
                        >
                            <Typography as="span">
                                {car.is_available_monthly ? "متاح للإيجار الشهري" : "غير متاح للإيجار الشهري"}
                            </Typography>
                            {
                                car.is_available_monthly &&
                                <Typography as="span" className='flex items-center justify-center'>
                                    {car.monthly_rent_price}
                                    <PiCurrencyDollarBold
                                        className='text-primary-main'
                                    />
                                </Typography>
                            }
                        </p>
                        <p
                            className='flex gap-1 justify-center items-center'
                        >
                            <Typography as="span">
                                {car.is_available_yearly ? "متاح للإيجار السنوي" : "غير متاح للإيجار السنوي"}
                            </Typography>
                            {
                                car.is_available_yearly &&
                                <Typography as="span" className='flex items-center justify-center'>
                                    {car.yearly_rent_price}
                                    <PiCurrencyDollarBold
                                        className='text-primary-main'
                                    />
                                </Typography>
                            }
                        </p>
                        <p
                            className='flex gap-1 justify-center items-center'
                        >
                            <Typography as="span">
                                {car.is_for_sale ? "متاح للبيع" : "غير متاح للبيع"}
                            </Typography>
                            {
                                car.is_for_sale &&
                                <Typography as="span" className='flex items-center justify-center'>
                                    {car.sale_price}
                                    <PiCurrencyDollarBold
                                        className='text-primary-main'
                                    />
                                </Typography>
                            }
                        </p>
                    </div>
                    <Typography
                        variant='h4'
                        color='blue'
                        className='w-full flex justify-center items-center gap-1 font-bold font-serif'
                    >
                        {/* <IoLogoModelS /> */}
                        {
                            car.owner_office
                                ? `المكتب`
                                : `المالك`
                        }
                    </Typography>
                    <div className={clsx(TextSecondary, 'flex justify-center items-center gap-x-7 gap-y-3 flex-wrap')}>
                        <section
                            className='w-full flex flex-wrap justify-center items-center gap-x-7 gap-y-3'
                        >
                            {
                                car.owner_office &&
                                <>
                                    <Tooltip
                                        content="زيارة المكتب"
                                        className={clsx(CardBackgroundsReverse, TextPrimaryReverse)}
                                    >
                                        <Link
                                            href={paths.offices.office(car.owner_office.id_office)}
                                        >
                                            <Button
                                                color='green'
                                                variant='text'
                                                className={clsx("text-primary-main hover:text-text-light-primary dark:hover:text-text-dark-primary transition-all hover:no-underline flex justify-center items-center gap-0.5 text-lg underline")}
                                                size='sm'
                                            >

                                                <BsBuildingFill />
                                                {car.owner_office.name}
                                            </Button>
                                        </Link>
                                    </Tooltip>
                                    <Typography
                                        variant="paragraph"
                                        className="flex justify-center items-center gap-0.5"
                                    >
                                        <FaMapLocationDot />
                                        {car.owner_office.location}
                                    </Typography>
                                    <Typography
                                        variant="paragraph"
                                        className="flex justify-center items-center gap-0.5"
                                    >
                                        <FaPhoneFlip />
                                        {car.owner_office.phone_number_1}
                                    </Typography>
                                    <Typography
                                        variant="paragraph"
                                        className="flex justify-center items-center gap-0.5"
                                    >
                                        <FaPhoneFlip />
                                        {car.owner_office.phone_number_2}
                                    </Typography>
                                </>
                            }
                            {
                                car.owner_customer &&
                                <>
                                    <Typography
                                        variant="lead"
                                        className={clsx(TextPrimary, "flex justify-center items-center gap-0.5")}
                                    >
                                        <BsBuildingFill />
                                        {`${car.owner_customer.first_name} ${car.owner_customer.last_name}`}
                                    </Typography>
                                    <Typography
                                        variant="paragraph"
                                        className="flex justify-center items-center gap-0.5"
                                    >
                                        <MdEmail />
                                        {car.owner_customer.email}
                                    </Typography>
                                    <Typography
                                        variant="paragraph"
                                        className="flex justify-center items-center gap-0.5"
                                    >
                                        <FaPhoneFlip />
                                        {car.owner_customer.phone}
                                    </Typography>
                                </>
                            }
                        </section>
                    </div>
                    <section
                        className='flex  gap-10 w-full items-center mt-5'
                    >
                        <ReserveButton
                            car={car}
                            available={car.status === "متاحة" && (car.is_available_daily || car.is_available_monthly || car.is_available_yearly)}
                        />
                        <BuyButton
                            car={car}
                            available={car.status === "متاحة" && car.is_for_sale}
                        />
                    </section>
                </section>
            </article>
            {
                carData.reservations.length > 0 &&
                <section
                    className='p-5'
                >
                    <Typography
                        variant="h4"
                        className="flex justify-center items-center gap-0.5 w-fit"
                    >
                        <TbListDetails />
                        الحجوزات
                    </Typography>
                    <ul className='flex flex-col p-5 max-h-96 overflow-scroll gap-5'>
                        {
                            carData.reservations.map((reservation, index) => (
                                <li
                                    className={clsx(CardBackgrounds, "p-5 rounded-md shadow-sm shadow-current")}
                                    key={index}
                                >
                                    <div
                                        className='flex justify-start items-center gap-10 flex-wrap'
                                    >
                                        <Typography
                                            variant='paragraph'
                                        >
                                            <FaCalendarCheck className='inline-block me-1.5' />
                                            {`نوع الحجز ${parseReservationType(reservation.type_reservation)}`}
                                        </Typography>
                                        <Typography
                                            variant='paragraph'
                                        >
                                            <FaCalendarCheck className='inline-block me-1.5' />
                                            {`تاريخ الحجز ${isoTo_YYY_MM_DD_HH_MM(reservation.time_reservation)}`}
                                        </Typography>
                                        <Typography
                                            variant='paragraph'
                                        >
                                            <FaHourglassStart className='inline-block me-1.5' />
                                            {`تاريخ الأستلام ${isoTo_YYY_MM_DD_HH_MM(reservation.start_date)}`}
                                        </Typography>
                                        <Typography
                                            variant='paragraph'
                                        >
                                            <FaHourglassEnd className='inline-block me-1.5' />
                                            {`تاريخ أنتهاء الحجز ${isoTo_YYY_MM_DD_HH_MM(reservation.end_date)}`}
                                        </Typography>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            }
        </section>
    )
}

export default CarPageContentTest