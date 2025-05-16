"use client"
import useChart, { AreaAndBarChartProps } from '@/app/components/chart/use-chart';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

import { CardBackgrounds, TextSecondary } from "@/lib/ui/class/classNames";
import { Card, CardBody, CardHeader, Typography } from '@/lib/ui/MTFix'
import clsx from 'clsx';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const YearlyProfitChart = ({ categories, series }: AreaAndBarChartProps) => {
    const areaChart: ApexOptions = useChart({
        xaxis: {
            type: "category",
            categories: categories,
        },
        tooltip: {
            x: {
                format: 'yyyy',
            },
        },
        grid: {
            borderColor: "#00000000"
        }
    });


    return (
        <Card
            className={clsx(CardBackgrounds, "p-0 pt-5 rounded-md")}
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
                    الربح السنوي
                </Typography>
                <Typography
                    variant="paragraph"
                    className={TextSecondary}
                >
                    الربح السنوي من الحجوزات لكل تصنيف
                </Typography>
            </CardHeader>
            <CardBody
                className='p-0'
            >                <Chart
                    type='bar'
                    options={areaChart}
                    series={series}
                    width='100%'
                    height={320}
                />
            </CardBody>
        </Card>
    );
};

export default YearlyProfitChart;
