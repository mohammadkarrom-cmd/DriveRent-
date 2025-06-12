"use client"
import useChart, { RadialAndDonutAndPieChartProps } from '@/app/components/chart/use-chart';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

import { CardBackgrounds, TextSecondary } from "@/lib/ui/class/classNames";
import { Card, CardBody, CardHeader, Typography } from '@/lib/ui/MTFix';
import clsx from 'clsx';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MonthlyProfitFunnel = ({ labels, series }: RadialAndDonutAndPieChartProps) => {
    const areaChart: ApexOptions = useChart({
        chart: {
            type: "polarArea"
        },
        labels: labels,
        fill: {
            opacity: 1
        },
        legend: {
            position: 'right',
        },
        plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 0
                },
                spokes: {
                    strokeWidth: 2
                },
            }
        },
        theme: {
            monochrome: {
                enabled: true,
                shadeTo: 'light',
                shadeIntensity: 0.6
              }
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
                    الربح الشهري
                </Typography>
                <Typography
                    variant="paragraph"
                    className={TextSecondary}
                >
                    الربح الشهري من الحجوزات
                </Typography>
            </CardHeader>
            <CardBody
                className='p-0'
            >
                <Chart
                    type='polarArea'
                    options={areaChart}
                    series={series}
                    width='100%'
                    height={400}
                />
            </CardBody>
        </Card>
    );
}

export default MonthlyProfitFunnel