"use client";

import { endpoints } from "@/app/api/common";
import { AreaAndBarChartProps, RadarChartProps, RadialAndDonutAndPieChartProps } from "@/app/components/chart/use-chart";
import NormalLoading from "@/app/components/loaders/NormalLoading";
import fetchApi from "@/lib/api/data/dataFetcher";
import useSWR from "swr";

import Error from "@/app/(root)/error";
import dynamic from "next/dynamic";
const AdminStatics = dynamic(() => import("./AdminStatics"), { loading: () => <NormalLoading /> })


type incomeBarType = {
  chartData: AreaAndBarChartProps,
  total: number
}

export type AdminStaticsType = {
  incomeBar: incomeBarType
  carsStatus: RadialAndDonutAndPieChartProps
  carsCategories: RadarChartProps
  carsCount: number
  customerCount: number
  officesCount: number
  categoriesCount: number
}

const AdminStaticsWarper = () => {
  const { data: data, error, isLoading } = useSWR(endpoints.admin.statics, fetchApi);

  if (isLoading) {
    return <NormalLoading />
  }
  if (error) {
    return <Error error={error} />;
  }


  const statics = data.data as AdminStaticsType


  return (
    <AdminStatics
      statics={statics}
    />

  )
}

export default AdminStaticsWarper