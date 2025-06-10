"use client"

import { endpoints } from "@/app/api/common";
import NormalLoading from "@/app/components/loaders/NormalLoading";
import fetchApi from "@/lib/api/data/dataFetcher";
import { AxiosError } from "axios";
import useSWR from "swr";
import Error from "../../error";
import ManagerStatics from "./ManagerStatics";

// const YearlyProfitChart = dynamic(() => import("./YearlyProfitChart"), { ssr: false, loading: () => <NormalLoading /> });
// const DailyProfitChart = dynamic(() => import("./DailyProfitChart"), { ssr: false, loading: () => <NormalLoading /> });
// const ReversionsChart = dynamic(() => import("./ReversionsChart"), { ssr: false, loading: () => <NormalLoading /> });


const AdminPageContent = () => {
    const { data: reservations, error, isLoading } = useSWR(endpoints.reservations.all.list, fetchApi);

    if (isLoading) {
        return <NormalLoading />
    }
    if (error) {
        if (error instanceof AxiosError) {
            if (error.status === 404) {
                return <ManagerStatics
                />
            }
        } else {
            return <Error error={error} />;
        }
    }


    const revData = (reservations.data || []) as reservationsType[];
    console.log(revData);




    return (
        <section
            className="p-5"
        >
            <ManagerStatics
            />
        </section>
    )
}

export default AdminPageContent