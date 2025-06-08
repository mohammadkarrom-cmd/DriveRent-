"use client"

import { endpoints } from "@/app/api/common";
import { AreaAndBarChartProps, RadialAndDonutAndPieChartProps } from "@/app/components/chart/use-chart";
import PageHeader from "@/app/components/layout/header/PageHeader";
import NormalLoading from "@/app/components/loaders/NormalLoading";
import Empty from "@/app/components/views/Empty";
import fetchApi from "@/lib/api/data/dataFetcher";
import { useAuthContext } from "@/lib/context/auth/auth-context";
import { AxiosError } from "axios";
import dynamic from "next/dynamic";
import useSWR from "swr";
import Error from "../../error";
import Loading from "../../loading";

const YearlyProfitChart = dynamic(() => import("./YearlyProfitChart"), { ssr: false, loading: () => <NormalLoading /> });
const DailyProfitChart = dynamic(() => import("./DailyProfitChart"), { ssr: false, loading: () => <NormalLoading /> });
const ReversionsChart = dynamic(() => import("./ReversionsChart"), { ssr: false, loading: () => <NormalLoading /> });


const AdminPageContent = () => {
    const { data: reservations, error, isLoading } = useSWR(endpoints.reservations.temporary.list, fetchApi);
    const { user } = useAuthContext();

    if (isLoading) return <Loading />
    else if (error) {
        if (error instanceof AxiosError) {
            if (error.status !== 404) {
                return Empty({
                    title: "لا يوجد اي حجوزات مؤقتة حاليا",
                    body: "الرجاء التحلي بالصبر و المحاولة لاحقا"
                })
            }
        } else {
            return <Error error={error} />;
        }
    }

    const revData = (reservations.data || []) as reservationsType[];

    const lastWeekRecords = revData.filter(record => {
        const date = new Date(record.start_date);
        const todayDate = new Date()

        return todayDate.getFullYear() === date.getFullYear() && todayDate.getMonth() === date.getMonth() && (todayDate.getDay() === date.getDay() || (todayDate.getDay() - 1) === date.getDay() || (todayDate.getDay() - 2) === date.getDay() || (todayDate.getDay() - 3) === date.getDay() || (todayDate.getDay() - 4) === date.getDay() || (todayDate.getDay() - 5) === date.getDay() || (todayDate.getDay() - 6) === date.getDay() || (todayDate.getDay() - 7) === date.getDay())
    });

    const lastYearRecords = revData.filter(record => {
        const date = new Date(record.start_date);
        const todayDate = new Date()

        return todayDate.getFullYear() === date.getFullYear() || (todayDate.getFullYear() - 1) === date.getFullYear()
    })

    const todayRecords = revData.filter(record => {
        const date = new Date(record.start_date);
        const todayDate = new Date()

        return todayDate.getFullYear() === date.getFullYear() && todayDate.getMonth() === date.getMonth() && todayDate.getDay() === date.getDay()
    });

    const lastWeek = () => {
        const today = new Date();
        const date1 = new Date();
        date1.setDate(today.getDate() - 1);
        const date2 = new Date();
        date2.setDate(today.getDate() - 2);
        const date3 = new Date();
        date3.setDate(today.getDate() - 3);
        const date4 = new Date();
        date4.setDate(today.getDate() - 4);
        const date5 = new Date();
        date5.setDate(today.getDate() - 5);
        const date6 = new Date();
        date6.setDate(today.getDate() - 6);

        return [
            date1.toDateString(),
            date2.toDateString(),
            date3.toDateString(),
            date4.toDateString(),
            date5.toDateString(),
            date6.toDateString(),
            today.toDateString()
        ]
    }

    const lastYear = () => {
        const thisYearDate = new Date();
        const lastYearDate = new Date();
        lastYearDate.setFullYear(thisYearDate.getFullYear() - 1);

        return [
            lastYearDate.getFullYear(),
            thisYearDate.getFullYear(),
        ]
    }

    const getCategoryData = (cat: number, date: string, records: reservationsType[]) => {
        let data: number = 0;
        const category = records.filter(record => record.car.category === cat && (record.status_reservation === "حجز منتهي الصلاحية" || record.status_reservation === "حجز ملغي") && new Date(record.start_date).toDateString() === date);

        category.forEach(reservation => {
            if (reservation.type_reservation === "أجار يومي") {
                data = reservation.car.daily_rent_price
            }
            if (reservation.type_reservation === "أجار شهري") {
                data = reservation.car.monthly_rent_price
            }
            if (reservation.type_reservation === "أجار سنوي") {
                data = reservation.car.monthly_rent_price
            }
        })

        return data
    }

    const getCategoryYearly = (cat: number, date: number, records: reservationsType[]) => {
        let data: number = 0;
        const category = records.filter(record => record.car.category === cat && (record.status_reservation === "حجز منتهي الصلاحية" || record.status_reservation === "حجز ملغي") && new Date(record.start_date).getFullYear() === date);

        category.forEach(reservation => {
            if (reservation.type_reservation === "أجار يومي") {
                data = reservation.car.daily_rent_price
            }
            if (reservation.type_reservation === "أجار شهري") {
                data = reservation.car.monthly_rent_price
            }
            if (reservation.type_reservation === "أجار سنوي") {
                data = reservation.car.monthly_rent_price
            }
        })

        return data
    }

    const dailyProfit: AreaAndBarChartProps = {
        series: [
            {
                name: 'فاخرة',
                data: [
                    getCategoryData(1, lastWeek()[0], lastWeekRecords),
                    getCategoryData(1, lastWeek()[1], lastWeekRecords),
                    getCategoryData(1, lastWeek()[2], lastWeekRecords),
                    getCategoryData(1, lastWeek()[3], lastWeekRecords),
                    getCategoryData(1, lastWeek()[5], lastWeekRecords),
                    getCategoryData(1, lastWeek()[6], lastWeekRecords)
                ]
            },
            {
                name: 'اقتصادية',
                data: [
                    getCategoryData(2, lastWeek()[0], lastWeekRecords),
                    getCategoryData(2, lastWeek()[1], lastWeekRecords),
                    getCategoryData(2, lastWeek()[2], lastWeekRecords),
                    getCategoryData(2, lastWeek()[3], lastWeekRecords),
                    getCategoryData(2, lastWeek()[5], lastWeekRecords),
                    getCategoryData(2, lastWeek()[6], lastWeekRecords)
                ]
            },
            {
                name: 'رياضية',
                data: [
                    getCategoryData(3, lastWeek()[0], lastWeekRecords),
                    getCategoryData(3, lastWeek()[1], lastWeekRecords),
                    getCategoryData(3, lastWeek()[2], lastWeekRecords),
                    getCategoryData(3, lastWeek()[3], lastWeekRecords),
                    getCategoryData(3, lastWeek()[5], lastWeekRecords),
                    getCategoryData(3, lastWeek()[6], lastWeekRecords)
                ]
            },
            {
                name: 'شاحنة خفيفة (بيك أب)',
                data: [
                    getCategoryData(4, lastWeek()[0], lastWeekRecords),
                    getCategoryData(4, lastWeek()[1], lastWeekRecords),
                    getCategoryData(4, lastWeek()[2], lastWeekRecords),
                    getCategoryData(4, lastWeek()[3], lastWeekRecords),
                    getCategoryData(4, lastWeek()[5], lastWeekRecords),
                    getCategoryData(4, lastWeek()[6], lastWeekRecords)
                ]
            },
            {
                name: 'كهربائية',
                data: [
                    getCategoryData(5, lastWeek()[0], lastWeekRecords),
                    getCategoryData(5, lastWeek()[1], lastWeekRecords),
                    getCategoryData(5, lastWeek()[2], lastWeekRecords),
                    getCategoryData(5, lastWeek()[3], lastWeekRecords),
                    getCategoryData(5, lastWeek()[5], lastWeekRecords),
                    getCategoryData(5, lastWeek()[6], lastWeekRecords)
                ]
            },
        ],
        categories: lastWeek()
    }

    const yearlyProfit: AreaAndBarChartProps = {
        series: [
            {
                name: 'فاخرة',
                data: [
                    getCategoryYearly(1, lastYear()[0], lastYearRecords),
                    getCategoryYearly(1, lastYear()[1], lastYearRecords),
                ]
            },
            {
                name: 'اقتصادية',
                data: [
                    getCategoryYearly(2, lastYear()[0], lastYearRecords),
                    getCategoryYearly(2, lastYear()[1], lastYearRecords),
                ]
            },
            {
                name: 'رياضية',
                data: [
                    getCategoryYearly(3, lastYear()[0], lastYearRecords),
                    getCategoryYearly(3, lastYear()[1], lastYearRecords),
                ]
            },
            {
                name: 'شاحنة خفيفة (بيك أب)',
                data: [
                    getCategoryYearly(4, lastYear()[0], lastYearRecords),
                    getCategoryYearly(4, lastYear()[1], lastYearRecords),
                ]
            },
            {
                name: 'كهربائية',
                data: [
                    getCategoryYearly(5, lastYear()[0], lastYearRecords),
                    getCategoryYearly(5, lastYear()[1], lastYearRecords),
                ]
            },
        ],
        categories: lastYear()
    }

    const todayReversions: RadialAndDonutAndPieChartProps = {
        labels: ["حجوزات معالجة", " حجوزات مؤقتة"],
        series: [
            todayRecords.filter(record => record.status_reservation !== "حجز مؤكد").length,
            todayRecords.filter(record => record.status_reservation === "حجز مؤكد").length,
        ]
    }


    return (
        <section
            className="p-5"
        >
            <PageHeader
                title={`اهلا و سهلا أيها المدير ${user.first_name}`}
                body="تفقد اٍحصائياتنا لأتخاذ قراراتك بشكل أفضل"
            />
            <section className="w-full flex flex-col gap-10 mt-5">
                <DailyProfitChart
                    categories={dailyProfit.categories}
                    series={dailyProfit.series}
                />
                <YearlyProfitChart
                    categories={yearlyProfit.categories}
                    series={yearlyProfit.series}
                />
                <ReversionsChart
                    labels={todayReversions.labels}
                    series={todayReversions.series}
                />
            </section>
        </section>
    )
}

export default AdminPageContent