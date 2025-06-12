"use client"

import Error from "@/app/(root)/error"
import { endpoints } from "@/app/api/common"
import ManagementPageHeader from "@/app/components/layout/header/ManagementPageHeader"
import NormalLoading from "@/app/components/loaders/NormalLoading"
import fetchApi from "@/lib/api/data/dataFetcher"
import useSWR from "swr"
import AdminCategoriesTable from "./AdminCategoriesTable"

const AdminCategoriesPageContent = () => {
    const { data: categories, mutate, error, isLoading } = useSWR(endpoints.admin.categories.list, fetchApi);

    if (isLoading) {
        return <NormalLoading />
    }
    if (error) {
        return Error(error)
    }


    return (
        <>
            <ManagementPageHeader
                title="تصنيفات السيارات"
                body="هنا يمكنك عرض تصنيفات السيارت و ادارتها"
            />
            <section className="my-5">
                <AdminCategoriesTable
                    mutate={mutate}
                    categories={categories.data as CategoryType[]}
                />
            </section>
        </>
    )
}

export default AdminCategoriesPageContent