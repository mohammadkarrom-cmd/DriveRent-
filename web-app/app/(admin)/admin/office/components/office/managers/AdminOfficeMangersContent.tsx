"use client"

import Error from "@/app/(root)/error"
import { endpoints } from "@/app/api/common"
import ManagementPageHeader from "@/app/components/layout/header/ManagementPageHeader"
import NormalLoading from "@/app/components/loaders/NormalLoading"
import fetchApi from "@/lib/api/data/dataFetcher"
import { AxiosError } from "axios"
import useSWR from "swr"
import AddOfficeAccount from "./AddOfficeAccount"
import OfficeMangersAccountsTable from "./OfficeMangersAccountsTable"

type Props = {
    id: string,
    name: string
}

const AdminOfficeMangersContent = ({ id, name }: Props) => {
    const { data: accounts, error, mutate, isLoading } = useSWR(endpoints.admin.office.accounts.list(id), fetchApi);

    if (isLoading) return <NormalLoading />

    if (error) {
        if (error instanceof AxiosError) {
            return <Error error={error} />;
        }
    }

    console.log(name);

    return (
        <div>
            <ManagementPageHeader
                title={name || "..."}
                body="هنا يمكنك عرض حسابات مدراء المكاتب وإدارتها"
                actions={
                    <AddOfficeAccount
                        mutate={mutate}
                        officeId={id}
                    />
                }
            />
            <section className='my-5'>
                <OfficeMangersAccountsTable
                    mutate={mutate}
                    accounts={accounts.data as OfficeManger[]}
                />
            </section>
        </div>
    )
}

export default AdminOfficeMangersContent