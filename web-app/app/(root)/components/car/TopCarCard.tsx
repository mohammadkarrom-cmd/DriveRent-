import { paths } from '@/app/components/layout/config-nav'
import { CardBackgrounds, TextSecondary } from '@/lib/ui/class/classNames'
import { Button, Card, CardBody, CardHeader, Chip, Typography } from '@/lib/ui/MTFix'
import { TextSlice } from '@/lib/utils/textFormaters'
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
const TopCarCard = ({ car }: Props) => {
    return (
        <Card
            color='transparent'
            shadow={false}
            className={clsx(CardBackgrounds, 'rounded-md flex-col justify-start items-start text-inherit md:flex-row')}
        >
            <CardHeader
                color='transparent'
                shadow={false}
                floated={false}
                className='m-0 mx-auto rounded-md min-w-fit'
            >
                <Image
                    src={car.image1}
                    width={2000}
                    height={200}
                    alt='people with car'
                    className='w-full rounded-md aspect-square object-contain max-w-96 md:w-96'
                />
            </CardHeader>
            <CardBody
                className='m-0 px-5 py-0 md:py-5 gap-1 flex flex-col'
            >
                <section className='w-full flex justify-between gap-5 flex-wrap'>
                    <Typography
                        variant='h4'
                        className='flex gap-1 items-center'
                    >
                        <BiSolidCategory />
                        {car.brand}
                    </Typography>
                    <Chip
                        value={car.status}
                        variant='filled'
                        color={car.status === "متاحة" ? "green" : (car.status === "حجز مؤقت للأجار" || car.status === "حجز مؤقت للبيع" )? "amber" : (car.status === "محجوزة للأجار" || car.status === "مباعة") ? "blue" : "red"}
                    />
                </section>
                <section className='flex gap-x-20 flex-wrap'>
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
                <section className='flex gap-x-20 flex-wrap'>
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
                <Typography
                    variant='small'
                    className={clsx(TextSecondary, 'w-fit text-xs sm:text-sm lg:text-base h-28')}
                >
                    {TextSlice(car.description, 300)}
                </Typography>
                <Link
                    href={paths.cars.car(car.id_car)}
                >
                    <Button
                        color='green'
                        className='w-fit my-5'
                    >
                        عرض السيارة
                    </Button>
                </Link>
            </CardBody>
        </Card>
    )
}

export default TopCarCard