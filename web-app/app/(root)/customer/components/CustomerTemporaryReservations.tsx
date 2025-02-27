"use client"

import Loading from '../../loading';
import Error from '../../error';
import useSWR from 'swr';
import { endpoints } from '@/app/api/common';
import fetchApi from '@/lib/api/data/dataFetcher';
import { AxiosError } from 'axios';
import Empty from '@/app/components/views/Empty';
import Link from 'next/link';
import { Button } from '@/lib/ui/MTFix'
import { paths } from '@/app/components/layout/config-nav';
import CustomerReservationTable from './CustomerReservationTable';
import PageHeader from '@/app/components/layout/header/PageHeader';


const CustomerTemporaryReservations = () => {

    const { data: data, error, mutate, isLoading } = useSWR(endpoints.customer.temporaryReservations, fetchApi);

    if (isLoading) return <Loading />
    if (error) {
        if (error instanceof AxiosError) {
            if (error.status === 404) {
                return Empty({
                    title: "لا يوجد لديك أي حجوزات جحوزات",
                    body: "تصفح سيارتنا الرائعة واختر ما يناسب حالتك المالية واحتياجاتك",
                    action: <Link
                        href={paths.cars.cars}
                    >
                        <Button
                            color='green'
                            variant='filled'
                            className='text-sm md:text-lg bg-opacity-40 text-green-400'
                        >
                            عرض كل السيارات
                        </Button>
                    </Link>
                })
            }
        } else {
            return <Error error={error} />;
        }
    }
    return (
        <section className='p-5'>
            <PageHeader
                title='الحجوزات'
                body='تفقد حجوزاتك المؤقتة قبل انتهاء صلاحيتها و راجع حجوزاتك الحالية و القديمة '
            />
            <div
                className='mt-5'
            >
                <CustomerReservationTable
                    reservations={data.data as customerTemporaryReservationsType[]}
                    refetch={mutate}
                />
            </div>
        </section>
    )
}

export default CustomerTemporaryReservations