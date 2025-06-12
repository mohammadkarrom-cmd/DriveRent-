import { paths } from '@/app/components/layout/config-nav'
import MyCarousel from '@/app/components/views/MyCarousel'
import { CardBackgrounds, TextPrimary, TextSecondary } from '@/lib/ui/class/classNames'
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Typography } from '@/lib/ui/MTFix'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { BiSolidCategory } from 'react-icons/bi'
import { GiSteeringWheel } from 'react-icons/gi'
import { IoLogoModelS } from 'react-icons/io'
import { PiCurrencyDollarBold } from 'react-icons/pi'

type Props = {
    car: CarType
}

const CarNormalCard = ({ car }: Props) => {
    return (
        <Card
            className={clsx(CardBackgrounds, TextPrimary, "shadow-black/50 shadow-lg w-full min-w-full sm:min-w-96 max-w-96")}
            dir='ltr'
        >
            <CardHeader
                color='transparent'
                floated={false}
                shadow={false}
                className='text-inherit'
            >
                <section className='w-full flex justify-between '>
                    <div
                        className=''
                    >
                        <Typography
                            variant='h4'
                            className='flex gap-1 items-center'
                        >
                            <BiSolidCategory />
                            {car.brand}
                        </Typography>
                        <section
                            className='flex justify-between flex-wrap gap-x-5 gap-y-1'
                        >
                            <Typography
                                variant='paragraph'
                                className='w-fit flex items-center gap-1'
                            >
                                <IoLogoModelS />
                                {car.model}
                            </Typography>
                            <Typography
                                variant='paragraph'
                                className='w-fit flex items-center gap-1'
                            >
                                <GiSteeringWheel />
                                {car.category_disaply}
                            </Typography>
                            <Typography
                                variant='paragraph'
                                className='w-fit flex items-center gap-1'
                            >
                                <IoLogoModelS />
                                {
                                    car.owner_office
                                        ? `المكتب : ${car.owner_office}`
                                        : `المالك : ${car.owner_customer}`
                                }
                            </Typography>
                        </section>
                    </div>
                    {
                        typeof car.status === "string" &&
                        <Chip
                            value={car.status}
                            variant='filled'
                            color={car.status === "متاحة" ? "green" : (car.status === "حجز مؤقت للأجار" || car.status === "حجز مؤقت للبيع") ? "amber" : (car.status === "محجوزة للأجار" || car.status === "مباعة") ? "blue" : "red"}
                            className='h-fit'
                        />
                    }
                    {
                        typeof car.status === "number" &&
                        <Chip
                            value={car.status_disaply}
                            variant='filled'
                            color={car.status === 1 ? "green" : (car.status === 2 || car.status === 4) ? "amber" : (car.status === 3 || car.status === 6) ? "blue" : "red"}
                            className='h-fit'
                        />
                    }
                </section>
            </CardHeader>
            <CardBody
                className='w-full p-0 pt-1'
            >
                <section className={clsx(TextSecondary, 'flex justify-between flex- px-3')}>
                    {
                        car.is_available_daily &&
                        <Typography
                            variant='small'
                            className='flex gap-1 items-center'
                        >
                            <PiCurrencyDollarBold
                                className='text-primary-main'
                            />
                            {car.daily_rent_price + "/يومي"}
                        </Typography>
                    }
                    {
                        car.is_available_monthly &&
                        <Typography
                            variant='small'
                            className='flex gap-1 items-center'
                        >
                            <PiCurrencyDollarBold
                                className='text-primary-main'
                            />
                            {car.monthly_rent_price + "/شهري"}
                        </Typography>
                    }
                    {
                        car.is_available_yearly &&
                        <Typography
                            variant='small'
                            className='flex gap-1 items-center'
                        >
                            <PiCurrencyDollarBold
                                className='text-primary-main'
                            />
                            {car.yearly_rent_price + "/سنوي"}
                        </Typography>
                    }
                    {
                        car.is_for_sale &&
                        <Typography
                            variant='small'
                            className='flex gap-1 items-center'
                        >
                            <PiCurrencyDollarBold
                                className='text-primary-main'
                            />
                            {car.sale_price + "/مبيع"}
                        </Typography>
                    }
                </section>
                <MyCarousel
                    autoplay={false}
                    loop={true}
                    className='px-5'
                >
                    <Image
                        src={car.image1}
                        alt={car.model}
                        width={1000}
                        height={1000}
                        className='w-full aspect-square object-contain mx-auto'
                    />
                    <Image
                        src={car.image2}
                        alt={car.model}
                        width={1000}
                        height={1000}
                        className='w-full aspect-square object-contain mx-auto'
                    />
                    <Image
                        src={car.image3}
                        alt={car.model}
                        width={1000}
                        height={1000}
                        className='w-full aspect-square object-contain mx-auto'
                    />
                </MyCarousel>
            </CardBody>
            <CardFooter
            >
                <Link
                    href={paths.cars.car(car.id_car)}
                >
                    <Button
                        color='green'
                    >
                        عرض السيارة
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default CarNormalCard