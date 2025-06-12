'use client'

import AddCar from '@/app/(root)/components/car/add/AddCar';
import CarsManger from '@/app/(root)/components/car/mangers/CarsManger';
import Error from '@/app/(root)/error';
import { endpoints } from '@/app/api/common';
import ManagementPageHeader from '@/app/components/layout/header/ManagementPageHeader';
import NormalLoading from '@/app/components/loaders/NormalLoading';
import Empty from '@/app/components/views/Empty';
import fetchApi from '@/lib/api/data/dataFetcher';
import { AxiosError } from 'axios';
import useSWR from 'swr';

const CarsMangerContent = () => {
    const { data: response, error, mutate, isLoading } = useSWR(endpoints.cars.list, fetchApi);


    if (isLoading) return <NormalLoading />
    if (error) {
        if (error instanceof AxiosError) {
            if (error.status === 404) {
                return Empty({
                    title: "لا يوجد اي سيارات حاليا",
                    body: "قم باضافة سيارة جديدة للتأجير الأن",
                    action: <AddCar
                        mutate={mutate}
                        categories={[]}
                    />
                })
            }
        } else {
            return <Error error={error} />;
        }
    }
    const data: MangerCarsListResponseType = response.data as MangerCarsListResponseType
    return (
        <>
            <ManagementPageHeader
                title='قائمة السيارات'
                body='هنا يمكنك عرض جميع السيارات وإدارتها'
                actions={<AddCar mutate={mutate} categories={data.category_list} />}
            />
            <section className='my-5'>
                <CarsManger
                    response={data as MangerCarsListResponseType}
                    mutate={mutate}
                />
            </section>
        </>
    )
}

export default CarsMangerContent