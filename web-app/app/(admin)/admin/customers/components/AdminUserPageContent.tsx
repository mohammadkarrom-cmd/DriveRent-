"use client"

import Error from "@/app/(root)/error";
import { endpoints } from "@/app/api/common";
import ManagementPageHeader from "@/app/components/layout/header/ManagementPageHeader";
import NormalLoading from "@/app/components/loaders/NormalLoading";
import fetchApi from "@/lib/api/data/dataFetcher";
import { AxiosError } from "axios";
import useSWR from "swr";
import AdminUsersTable from "./AdminUsersTable";


const AdminUserPageContent = () => {
    const { data: users, error, isLoading } = useSWR(endpoints.admin.users.list, fetchApi);

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
            />
            <section className='my-5'>
                <AdminUsersTable
                    accounts={users.data as AdminCustomerType[]}
                />
            </section>
        </>
    )
}

export default AdminUserPageContent