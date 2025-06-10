"use client"

import useChart, { RadialAndDonutAndPieChartProps } from '@/app/components/chart/use-chart';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { CardBackgrounds } from "@/lib/ui/class/classNames";
import { Card, CardBody, CardHeader, Typography } from '@/lib/ui/MTFix';
import clsx from 'clsx';


const CarsStatusChart = ({ labels, series }: RadialAndDonutAndPieChartProps) => {
    const areaChart: ApexOptions = useChart({
        labels: labels,
        legend: {
            position: "right"
        },
        grid: {
            borderColor: "#00000000"
        },
        colors: ["#4ade80", "#38bdf8", "#f87171", "#a78baa", "#a78bff", "#fbbf24"]
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
                    حالات السيارات
                </Typography>
               
            </CardHeader>
            <CardBody
                className='p-0'
            >
                <Chart
                    type='donut'
                    options={areaChart}
                    series={series}
                    width='100%'
                    height={350}
                />
            </CardBody>
        </Card>

    )
}

export default CarsStatusChart