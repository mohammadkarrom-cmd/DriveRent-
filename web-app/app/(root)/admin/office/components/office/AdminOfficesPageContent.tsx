"use client"

import Error from '@/app/(root)/error';
import { endpoints } from '@/app/api/common';
import ManagementPageHeader from '@/app/components/layout/header/ManagementPageHeader';
import NormalLoading from '@/app/components/loaders/NormalLoading';
import fetchApi from '@/lib/api/data/dataFetcher';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import AddOffice from "./AddOffice";
import OfficesTable from './OfficesTable';

const AdminOfficesPageContent = () => {
    const { data: offices, error, mutate, isLoading } = useSWR(endpoints.admin.office.list, fetchApi);

    if (isLoading) return <NormalLoading />

    if (error) {
        if (error instanceof AxiosError) {
            return <Error error={error} />;
        }
    }

    return (
        <>
            <ManagementPageHeader
                title='مكاتب السيارات'
                body='هنا يمكنك عرض جميع المكاتب وإدارتها'
                actions={<AddOffice mutate={mutate} />}
            />
            <section className='my-5'>
                <OfficesTable
                    offices={offices.data as OfficeType[]}
                    mutate={mutate}
                />
            </section>
        </>
    )
}

export default AdminOfficesPageContent