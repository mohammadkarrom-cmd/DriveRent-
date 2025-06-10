"use client"

import { endpoints } from "@/app/api/common";
import NormalLoading from "@/app/components/loaders/NormalLoading";
import fetchApi from "@/lib/api/data/dataFetcher";
import useSWR from "swr";
import OfficesList from "../../customer/office/components/OfficesList";
import Error from "../../error";

const OfficesPageContent = () => {
    const { data: data, error, isLoading } = useSWR(endpoints.offices.list, fetchApi);

    if (isLoading) {
        return <NormalLoading />
    }
    if (error) {
        return Error(error)
    }

    const offices = data.data as OfficeType[];
    return (
        <>
            <OfficesList
                offices={offices}
                view
            />
        </>
    )
}

export default OfficesPageContent