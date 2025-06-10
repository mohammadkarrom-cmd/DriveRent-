"use client"


import { endpoints } from '@/app/api/common'
import NormalLoading from '@/app/components/loaders/NormalLoading'
import Empty from '@/app/components/views/Empty'
import MyCarousel from '@/app/components/views/MyCarousel'
import fetchApi from '@/lib/api/data/dataFetcher'
import { TextPrimary } from '@/lib/ui/class/classNames'
import { Typography } from '@/lib/ui/MTFix'
import clsx from 'clsx'
import { uniqueId } from 'lodash'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import Error from '../../error'
import Loading from '../../loading'

const TopCarCard  = dynamic(() => import("../../components/car/TopCarCard"), { loading: () => <NormalLoading />, ssr: false });
const CarsList  = dynamic(() => import("../../components/home/CarsList"), { loading: () => <NormalLoading />, ssr: false });


const CarsPageContent = () => {
    const { data: carsData, error, isLoading } = useSWR(endpoints.cars.cars, fetchApi);


    if (error) return <Error error={error} />;
    if (isLoading) return <Loading />

    const cars = carsData.data as AllCarsType

    if (!cars || cars?.cars.length === 0) {
        return Empty({ title: "sorry no cars available yet" })
    }
    const recommendedCars = {
        title: "موصى بها",
        cars: []
    };

    const categories = cars.cars_category.map(cat => (
        {
            title:cat.name,
            value: cat.id_car_type,
            cars: []
        }
    ))

    cars.cars.forEach(car => {
        if (car.status === "متاحة") {
            recommendedCars.cars.push(car)
        };

        categories.forEach(category => {
            if (car.category === category.value) {
                car.category_disaply = category.title
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