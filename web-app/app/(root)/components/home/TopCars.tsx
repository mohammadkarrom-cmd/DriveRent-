import MyCarousel from '@/app/components/views/MyCarousel'
import { Card, CardBody, CardHeader, Typography } from '@/lib/ui/MTFix'
import TopCarCard from '../car/TopCarCard'
import clsx from 'clsx'
import { TextSecondary } from '@/lib/ui/class/classNames'
import { uniqueId } from 'lodash'

type Props = {
    cars: CarType[]
};

function TopCars({ cars }: Props) {
    return (
        <Card
            color='transparent'
            shadow={false}
            className='text-inherit'
            id="t-cars"
        >
            <CardHeader
                color='transparent'
                shadow={false}
                floated={false}
                className='text-inherit'
            >
                <Typography
                    variant='h2'
                    className='text-lg sm:text-2xl md:text-3xl min-w-fit'
                >
                    سيارات جديدة للإيجار
                </Typography>
                <Typography
                    variant='paragraph'
                    className={clsx(TextSecondary, 'max-w-[450px]')}
                >
                    سارع و احجز الأن
                </Typography>
            </CardHeader>
            <CardBody>
                <MyCarousel
                    autoplay={false}
                    loop
                >
                    {cars.map(car => (
                        <TopCarCard
                            car={car}
                            key={uniqueId()}
                        />
                    ))}
                </MyCarousel>
            </CardBody>
        </Card>
    )
}

export default TopCars