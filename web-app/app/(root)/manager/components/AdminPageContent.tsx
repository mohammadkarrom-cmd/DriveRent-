"use client"

import { endpoints } from "@/app/api/common";
import { AreaAndBarChartProps, RadialAndDonutAndPieChartProps } from "@/app/components/chart/use-chart";
import NormalLoading from "@/app/components/loaders/NormalLoading";
import fetchApi from "@/lib/api/data/dataFetcher";
import useSWR from "swr";
import Error from "../../error";
import ManagerStatics from "./ManagerStatics";


export type managerStaticsType = {
    dailyProfit: AreaAndBarChartProps
    monthlyProfit: RadialAndDonutAndPieChartProps
    yearlyProfit: AreaAndBarChartProps
    todayReversions: RadialAndDonutAndPieChartProps
}


const AdminPageContent = () => {
    const { data: data, error, isLoading } = useSWR(endpoints.managerStatics, fetchApi);

    if (isLoading) {
        return <NormalLoading />
    }
    if (error) {
        return <Error error={error} />;
    }


    const statics = data.data as managerStaticsType


    return (
        <section
            className="p-5"
        >
            <ManagerStatics
                statics={statics}
            />
        </section>
    )
}

export default AdminPageContent