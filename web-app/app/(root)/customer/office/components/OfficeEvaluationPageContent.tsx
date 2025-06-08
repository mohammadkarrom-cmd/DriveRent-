"use client"

import Error from "@/app/(root)/error";
import { endpoints } from "@/app/api/common";
import NormalLoading from "@/app/components/loaders/NormalLoading";
import fetchApi from "@/lib/api/data/dataFetcher";
import useSWR from "swr";
import OfficesList from "./OfficesList";


const OfficeEvaluationPageContent = () => {
    const { data: data, error, mutate, isLoading } = useSWR(endpoints.customer.evaluations.evaluableOffices, fetchApi);

    if (isLoading) {
        return <NormalLoading />
    }
    if (error) {
        return Error(error)
    }


    const offices = data.data as OfficeType[]

    return (
        <>
            <OfficesList
                offices={offices}
                evaluate
                mutate={mutate}
            />
        </>
    )
}

export default OfficeEvaluationPageContent