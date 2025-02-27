import { Button, Card, CardBody, CardHeader, Typography } from '@/lib/ui/MTFix'
import CarsList from './CarsList'
import { TextSecondary } from '@/lib/ui/class/classNames'
import clsx from 'clsx'
import Link from 'next/link'
import { paths } from '@/app/components/layout/config-nav'

type Props = {
    cars: CarType[]
}

const RandomCars = ({ cars }: Props) => {
    return (
        <Card
            color='transparent'
            shadow={false}
            className='text-inherit'
            id="r-cars"
        >
            <CardHeader
                color='transparent'
                shadow={false}
                floated={false}
                className='text-inherit'
            >
                <div className='flex justify-between'>
                    <Typography
                        variant='h2'
                        className='text-lg sm:text-2xl md:text-3xl min-w-fit'
                    >
                        أفضل سيارات للإيجار
                    </Typography>
                    <Link
                        href={paths.cars.cars}
                    >
                        <Button
                            size='sm'
                            color='green'
                            className='active:scale-105 min-w-fit'
                        >
                            عرض الكل
                        </Button>
                    </Link>
                </div>
                <Typography
                    variant='paragraph'
                    className={clsx(TextSecondary, 'max-w-[450px]')}
                >
                    اكتشف أفضل السيارات الموصى بها للإيجار. تم اختيار هذه السيارات خصيصًا لك، وتأتي بأسعار ممتازة وجودة عالية
                </Typography>
            </CardHeader>
            <CardBody
                className='px-5'
            >
                <CarsList
                    cars={cars}
                />
            </CardBody>
        </Card>
    )
}

export default RandomCars