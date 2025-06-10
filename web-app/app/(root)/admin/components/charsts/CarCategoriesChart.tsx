"use client"

import useChart, { RadarChartProps } from '@/app/components/chart/use-chart';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { CardBackgrounds, TextSecondary } from "@/lib/ui/class/classNames";
import { Card, CardBody, CardHeader, Typography } from '@/lib/ui/MTFix';
import clsx from 'clsx';


const CarCategoriesChart = ({ categories, series }: RadarChartProps) => {
    const areaChart: ApexOptions = useChart({
        xaxis: {
            categories: categories
        },
        tooltip: {
            marker: {
                show: false
            }
        },
        chart: {
            type: "radar"
        },
        fill: {
            opacity: 0.4,
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 3,
        },
    });

    return (
        <Card
            className={clsx(CardBackgrounds, "p-0 pt-5 rounded-md w-full min-h-[450px]")}
            color="transparent"
        >

            <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className=" m-0 mb-1 px-5"
            >
                <Typography
                    variant="h3"
                    as="h2"
                    color="green"
                >
                    توزع السيارات
                </Typography>
                <Typography
                    variant="paragraph"
                    className={TextSecondary}
                >
                    توزع السيارات تبعا للتصنيف
                </Typography>

            </CardHeader>
            <CardBody
                className='p-0'
            >
                <Chart
                    type='radar'
                    options={areaChart}
                    series={series}
                    width='100%'
                    height={350}
                />
            </CardBody>
        </Card>

    )
}

export default CarCategoriesChart