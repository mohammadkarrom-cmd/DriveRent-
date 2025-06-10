import { AreaAndBarChartProps, RadialAndDonutAndPieChartProps } from '@/app/components/chart/use-chart';
import DailyProfitChart from './DailyProfitChart';
import ReversionsChart from './ReversionsChart';
import YearlyProfitChart from './YearlyProfitChart';
import MonthlyProfitFunnel from './charts/MonthlyProfitFunnel';


const ManagerStatics = () => {

    const dailyProfit: AreaAndBarChartProps = {
        series: [
            {
                name: 'فاخرة',
                data: [50, 0, 40, 90, 100, 30, 200]
            },
            {
                name: 'اقتصادية',
                data: [100, 10, 66, 85, 74, 72, 25]
            },
            {
                name: 'رياضية',
                data: [12, 5, 8, 12, 10, 7, 50]

            }
        ],
        categories: ["2025-5-7", "2025-5-6", "2025-5-5", "2025-5-4", "2025-5-3", "2025-5-2", "2025-5-1"]
    }
    const monthlyProfit = {
        series: [1200, 900, 1100, 950, 1400, 1300, 1250, 1150, 1000, 800, 950, 1050],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
    

    const yearlyProfit: AreaAndBarChartProps = {
        series: [
            {
                name: 'فاخرة',
                data: [4200, 5000]
            },
            {
                name: 'اقتصادية',
                data: [1200, 2500]

            },
            {
                name: 'رياضية',
                data: [6000, 500]

            }
        ],
        categories: ["2024", "2025"]
    }

    const todayReversions: RadialAndDonutAndPieChartProps = {
        labels: ["حجوزات كلية", " حجوزات مؤقتة", "حجوزات مؤكدة"],
        series: [66, 4,30]
    }
    return (
        <section className="w-full flex flex-col gap-10 mt-5">
            <DailyProfitChart
                categories={dailyProfit.categories}
                series={dailyProfit.series}
            />
            <MonthlyProfitFunnel
                labels={monthlyProfit.labels}
                series={monthlyProfit.series}
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
    )
}

export default ManagerStatics