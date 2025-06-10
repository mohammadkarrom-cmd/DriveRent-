import useChart, { AreaAndBarChartProps } from '@/app/components/chart/use-chart';
import { CardBackgrounds, TextSecondary } from '@/lib/ui/class/classNames';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { ApexOptions } from 'apexcharts';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type Props = {
    chartData:AreaAndBarChartProps,
    total: number
}

const IncomeChart = ({chartData,total}:Props) => {

    const options: ApexOptions = useChart({
        chart: {
            type: 'bar',
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        xaxis: {
            categories: chartData.categories,
            title: {
                text: "office"
            }
        },
        yaxis: {
            title: {
                text: 'Income ($)',
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        legend: {
            position: 'top',
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
                    options={options}
                    series={chartData.series}
                    type="bar" height={350}
                />

            </CardBody>
        </Card>
    );
};

export default IncomeChart;
