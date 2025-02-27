import { endpoints } from '@/app/api/common';
import fetchApi from '@/lib/api/data/dataFetcher';
import React from 'react'
import CarImageGallery from './components/CarImageGallery';
import { Chip, Typography } from '@/lib/ui/MTFix'
import { BiSolidCategory } from 'react-icons/bi';
import { IoLogoModelS } from 'react-icons/io';
import { GiSteeringWheel } from 'react-icons/gi';
import { PiCurrencyDollarBold } from 'react-icons/pi';
import { CardBackgrounds, TextSecondary } from '@/lib/ui/class/classNames';
import clsx from 'clsx';
import ReserveButton from './components/ReserveButton';
import { carCategoryParser } from '@/lib/api/data/carCategory';


type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const carPromise = await fetchApi(endpoints.cars.car(parseInt(id)));
    const carData = carPromise.data as {
        car: CarType
    }

    if (!carData) return {
        title: 'car Not Found'
    }
    const car = carData.car
    return {
        title: car.brand + " - " + car.model,
        description: `this is ${car.model} page`
    }
}

const CarPage = async ({ params }: Props) => {
    const { id } = await params;
    const carPromise = await fetchApi(endpoints.cars.car(parseInt(id)));

    const carData = carPromise.data as {
        car: CarType
    }

    const car = carData.car

    return (
        <div
            className='p-5'
        >
            <section className='flex justify-between items-start pb-10 gap-5 flex-col lg:flex-row'>
                <article className='w-full flex flex-col gap-5'>
                    <Chip
                        value={car.status === 1 ? "متاحة" : car.status === 2 ? "حجز مؤقت" : car.status === 3 ? "محجوزة" : "منتهية الصلاحية"}
                        variant='filled'
                        color={car.status === 1 ? "green" : car.status === 2 ? "amber" : car.status === 3 ? "blue" : "red"}
                        className='ps-5 text-xl'
                    />
                    <Typography
                        variant='h1'
                        className='flex gap-1 items-center text-4xl'
                    >
                        <BiSolidCategory />
                        {`العلامة التجارية : ${car.brand}`}
                    </Typography>
                    <Typography
                        variant='h2'
                        className='w-fit flex items-center gap-1 text-2xl'
                    >
                        <IoLogoModelS />
                        {`النموذج : ${car.model}`}
                    </Typography>
                    <Typography
                        variant='paragraph'
                        className='w-fit flex items-center gap-1 text-xl'
                    >
                        <GiSteeringWheel />
                        {carCategoryParser(car.category)}
                    </Typography>
                    {/* <Chip
                    value={car.status === 1 ? "متاحة" : car.status === 2 ? "حجز مؤقت" : car.status === 3 ? "محجوزة" : "منتهية الصلاحية"}
                    variant='filled'
                    color={car.status === 1 ? "green" : car.status === 2 ? "amber" : car.status === 3 ? "blue" : "red"}
                    /> */}
                    <section
                        className='w-full flex items-center justify-center gap-5 flex-wrap'
                    >
                        <Chip
                            value={
                                <p
                                    className='px-5 py-2 text-center'
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
                            }
                            variant='ghost'
                            color={car.is_available_daily ? 'green' : "red"}
                            className={(car.is_available_daily ? "dark:text-primary-light" : "dark:text-red-200") + ' w-fit'}
                        />
                        <Chip
                            value={
                                <p
                                    className='px-5 py-2 text-center'
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
                            }
                            variant='ghost'
                            color={car.is_available_daily ? 'green' : "red"}
                            className={(car.is_available_daily ? "dark:text-primary-light" : "dark:text-red-200") + ' w-fit'}
                        />
                        <Chip
                            value={
                                <p
                                    className='px-5 py-2 text-center'
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
                            }
                            variant='ghost'
                            color={car.is_available_yearly ? 'green' : "red"}
                            className={(car.is_available_daily ? "dark:text-primary-light" : "dark:text-red-200") + ' w-fit'}
                        />
                    </section>
                    <Typography
                        variant='small'
                        className={clsx(TextSecondary, CardBackgrounds, 'text-lg p-5 rounded-md h-[15.5rem] overflow-scroll shadow-inner shadow-black  hidden lg:block')}
                    >
                        <span
                            className='text-primary-main text-xl'
                        >
                            تفاصيل السيارة
                        </span>
                        {` : ${car.description}`}
                    </Typography>
                </article>
                <CarImageGallery
                    image1={car.image1}
                    image2={car.image2}
                    image3={car.image3}
                />
                <Typography
                    variant='small'
                    className={clsx(TextSecondary, CardBackgrounds, 'text-base sm:text-lg p-5 rounded-md shadow-inner shadow-black lg:hidden')}
                >
                    <span
                        className='text-primary-main text-lg sm:text-xl'
                    >
                        تفاصيل السيارة
                    </span>
                    {` : ${car.description}`}
                </Typography>
            </section>
            {
                car.status === 1 &&
                <ReserveButton
                    car={car}
                />
            }
        </div>
    )
}

// export async function generateStaticParams() {
//     const carsPromise = await fetchApi(endpoints.cars.cars);
//     const cars = carsPromise.data as CarType[];
//     return cars.map((car) => ({
//         id: car.id_car.toString()
//     }))
// }

export default CarPage