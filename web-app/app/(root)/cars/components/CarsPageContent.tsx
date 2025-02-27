"use client"


import { endpoints } from '@/app/api/common'
import Empty from '@/app/components/views/Empty'
import fetchApi from '@/lib/api/data/dataFetcher'
import MyCarousel from '@/app/components/views/MyCarousel'
import {  Typography } from '@/lib/ui/MTFix'
import clsx from 'clsx'
import { TextPrimary } from '@/lib/ui/class/classNames'
import { uniqueId } from 'lodash'
import useSWR from 'swr'
import Error from '../../error'
import Loading from '../../loading'
import dynamic from 'next/dynamic'
import NormalLoading from '@/app/components/loaders/NormalLoading'

const TopCarCard  = dynamic(() => import("../../components/car/TopCarCard"), { loading: () => <NormalLoading />, ssr: false });
const CarsList  = dynamic(() => import("../../components/home/CarsList"), { loading: () => <NormalLoading />, ssr: false });


const CarsPageContent = () => {
    const { data: carsData, error, isLoading } = useSWR(endpoints.cars.cars, fetchApi);


    if (error) return <Error error={error} />;
    if (isLoading) return <Loading />

    const cars = carsData.data as CarType[]

    if (!cars || cars?.length === 0) {
        return Empty({ title: "sorry no cars available yet" })
    }
    const recommendedCars = {
        title: "موصى بها",
        cars: []
    };

    const categories = [
        {
            title: "فاخرة",
            value: 1,
            cars: []
        },
        {
            title: "اقتصادية",
            value: 2,
            cars: []
        },
        {
            title: "رياضية",
            value: 3,
            cars: []
        },
        {
            title: "شاحنة خفيفة (بيك أب)",
            value: 4,
            cars: []
        },
        {
            title: "كهربائية",
            value: 5,
            cars: []
        }
    ]

    cars.forEach(car => {
        if (car.status === 1) {
            recommendedCars.cars.push(car)
        };

        categories.forEach(category => {
            if (car.category === category.value) {
                category.cars.push(car)
            }
        });

    });
    return (
        <>
            {
                recommendedCars.cars.length !== 0 &&
                <section
                    className='flex flex-col gap-5'
                >
                    <Typography
                        variant='h2'
                        className={clsx(TextPrimary, "text-2xl")}
                    >
                        {recommendedCars.title}
                    </Typography>
                    <MyCarousel
                        autoplay={false}
                        loop
                    >
                        {recommendedCars.cars.map(car => (
                            <TopCarCard
                                car={car}
                                key={uniqueId()}
                            />
                        ))}
                    </MyCarousel>
                </section>
            }
            {
                categories.map(category => {
                    if (category.cars.length !== 0) {
                        return (
                            <section
                                className='flex flex-col'
                                key={uniqueId()}
                            >
                                <Typography
                                    variant='h2'
                                    className={clsx(TextPrimary, "text-2xl")}
                                >
                                    {category.title}
                                </Typography>
                                <CarsList
                                    cars={category.cars}
                                />
                            </section>
                        )
                    }
                })
            }</>
    )
}

export default CarsPageContent