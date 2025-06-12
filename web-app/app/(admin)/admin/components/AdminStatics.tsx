
"use client"

import { BiBuilding, BiCategory } from "react-icons/bi"
import { FaUserSecret } from "react-icons/fa"
import { IoCarSport } from "react-icons/io5"
import { AdminStaticsType } from "./AdminStaticsWarper"


import NormalLoading from "@/app/components/loaders/NormalLoading"
import dynamic from "next/dynamic"
const AdminStaticCount = dynamic(() => import("./AdminStaticCount"), { loading: () => <NormalLoading /> })
const CarCategoriesChart = dynamic(() => import("./charsts/CarCategoriesChart"), { loading: () => <NormalLoading /> })
const CarsStatusChart = dynamic(() => import("./charsts/CarsStatusChart"), { loading: () => <NormalLoading /> })
const IncomeChart = dynamic(() => import("./charsts/IncomeChart"), { loading: () => <NormalLoading /> })

type Props = {
    statics: AdminStaticsType
}
const AdminStatics = ({ statics }: Props) => {
    // type incomeBarType = {
    //     chartData:AreaAndBarChartProps,
    //     total: number
    // }

    // const carsStatus: RadialAndDonutAndPieChartProps = {
    //     labels: ["متاحة", "مباعة", "أجار يوي", "أجار شهري", "أجار سنوي", "حجز مؤقت"],
    //     series: [15, 3, 30, 17, 8, 40]
    // }

    // const carsCategories: RadarChartProps = {
    //     categories: ["رياضية", "كهرابائية", "فاخرة", "أقتصادية"],
    //     series: [
    //         {
    //             name: "cars",
    //             data: [5, 3, 4, 7]
    //         }
    //     ]
    // }


    // const incomeBar: incomeBarType = {
    //     chartData: {
    //         categories: ['Office A', 'Office B', 'Office C', 'Office d', 'Office e', "office f"],
    //         series: [
    //             {
    //                 name: 'مبيع',
    //                 data: [100000, 85000, 92000, 70000, 55000, 81000],
    //             },
    //             {
    //                 name: 'أجار يومي',
    //                 data: [4000, 3000, 4500, 1000, 3000, 25000],
    //             },
    //             {
    //                 name: 'أجار شهري',
    //                 data: [2000, 1500, 2250, 500, 1200, 12500],
    //             },
    //             {
    //                 name: 'أجار سنوي',
    //                 data: [40000, 30000, 45000, 10000, 30000, 25000],
    //             },
    //         ]
    //     },
    //     total: 1000000
    // }


    return (
        <div>
            <ul className="flex justify-center sm:justify-between items-center gap-10 py-7 flex-wrap">

                <AdminStaticCount
                    count={statics.customerCount}
                    icon={<FaUserSecret size={60} />}
                    label="users"
                    color="blue"
                />
                <AdminStaticCount
                    count={statics.carsCount}
                    icon={<IoCarSport size={60} />}
                    label="cars"
                    color="amber"
                />
                <AdminStaticCount
                    count={statics.officesCount}
                    icon={<BiBuilding size={60} />}
                    label="offices"
                    color="green"
                />
                <AdminStaticCount
                    count={statics.categoriesCount}
                    icon={<BiCategory size={60} />}
                    label="categories"
                    color="deep-purple"
                />
            </ul>
            <IncomeChart
                chartData={statics.incomeBar.chartData}
                total={statics.incomeBar.total}
            />
            <ol
                className="flex justify-between items-center gap-x-[4%] flex-wrap gap-y-5 mt-7"
            >
                <li className="w-full 2xl:w-[48%]">
                    <CarsStatusChart
                        labels={statics.carsStatus.labels}
                        series={statics.carsStatus.series}
                    />
                </li>
                <li className="w-full 2xl:w-[48%]">
                    <CarCategoriesChart
                        categories={statics.carsCategories.categories}
                        series={statics.carsCategories.series}
                    />
                </li>
            </ol>
        </div>
    )
}

export default AdminStatics