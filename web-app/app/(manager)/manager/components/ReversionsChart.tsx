"use client"

import useChart, { RadialAndDonutAndPieChartProps } from '@/app/components/chart/use-chart';
import { formatNumber } from '@/lib/utils/dateFormater';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { CardBackgrounds, TextSecondary } from "@/lib/ui/class/classNames";
import { Card, CardBody, CardHeader, Typography } from '@/lib/ui/MTFix'
import clsx from 'clsx';


const ReversionsChart = ({ labels, series }: RadialAndDonutAndPieChartProps) => {
  const areaChart: ApexOptions = useChart({
    tooltip: {
    },
    labels: labels,
    grid: {
      borderColor: "#00000000"
    },
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "68%",
        },
        dataLabels: {
          value: {
            offsetY: 25,
            formatter: (val) => formatNumber(val),
          },
          total: {
            label: "المجموع العام",
            formatter: () => formatNumber(series.reduce((acc, num) => acc + num, 0)),

          },
        },
      },
    },
    colors: ["#4caf50", "#fbbf24"]
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
          حجوزات اليوم
        </Typography>
        <Typography
          variant="paragraph"
          className={TextSecondary}
        >
          حجوزات اليوم المعالجة و المؤقتة
        </Typography>
      </CardHeader>
      <CardBody
        className='p-0'
      >
        <Chart
          type='radialBar'
          options={areaChart}
          series={series}
          width='100%'
          height={320}
        />
      </CardBody>
    </Card>

  )
}

export default ReversionsChart