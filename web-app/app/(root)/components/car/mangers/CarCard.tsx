import MyCarousel from '@/app/components/views/MyCarousel'
import { CardBackgrounds, TextPrimary, TextSecondary } from '@/lib/ui/class/classNames'
import { Card, CardBody, CardHeader, Chip, Typography } from '@/lib/ui/MTFix'
import { TextSlice } from '@/lib/utils/textFormaters'
import { AxiosResponse } from 'axios'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { BiSolidCategory } from 'react-icons/bi'
import { GiSteeringWheel } from 'react-icons/gi'
import { IoLogoModelS } from 'react-icons/io'
import { PiCurrencyDollarBold } from 'react-icons/pi'
import { KeyedMutator } from 'swr'

const EditCarModalHandler = dynamic(() => import('../edit/EditCarModalHandler'));
const DeleteCar = dynamic(() => import('../delete/DeleteCar'));


type Props = {
    car: CarType
    categories: CategoryType[],
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>
}

const CarCard = ({ car, mutate, categories }: Props) => {
    return (
        <Card
            className={clsx(CardBackgrounds, TextPrimary, 'xl:flex-row justify-between')}
            shadow={false}
        >
            <CardHeader
                floated={false}
                shadow={false}
                color='transparent'
                className='text-inherit p-0 m-0 max-w-96'
            >
                <MyCarousel
                    autoplay={false}
                    loop={true}
                >
                    <Image
                        src={car.image1}
                        alt={car.model}
                        width={1000}
                        height={1000}
                        className='w-64 aspect-square mx-auto object-contain'
                    />
                    <Image
                        src={car.image2}
                        alt={car.model}
                        width={1000}
                        height={1000}
                        className='w-64 aspect-square mx-auto object-contain'
                    />
                    <Image
                        src={car.image3}
                        alt={car.model}
                        width={1000}
                        height={1000}
                        className='w-64 aspect-square mx-auto object-contain'
                    />
                </MyCarousel>
            </CardHeader>
            <CardBody
                className='p-0 px-5 gap-1 flex flex-col items-start justify-start w-full'
            >
                <section
                    className='flex justify-between w-full'
                >
                    <Typography
                        variant='h4'
                        className='flex gap-1 items-center'
                    >
                        <BiSolidCategory />
                        {car.brand}
                    </Typography>
                    <Chip
                        value={car.status_disaply}
                        variant='filled'
                        color={car.status === 1 ? "green" : (car.status === 2 || car.status === 4) ? "amber" : car.status === 3 ? "blue" : "red"}
                    />
                </section>
                <section
                    className='flex justify-between items-center gap-10 flex-wrap'
                >
                    <Typography
                        variant='paragraph'
                        className='flex gap-1 items-center'
                    >
                        <IoLogoModelS />
                        {car.model}
                    </Typography>
                    <Typography
                        variant='paragraph'
                        className='flex gap-1 items-center'
                    >
                        <GiSteeringWheel />
                        {car.category_disaply}
                    </Typography>
                </section>
                <section
                    className='flex justify-between items-center gap-10 flex-wrap'
                >
                    <Typography
                        variant='small'
                        className='flex gap-1 items-center'
                    >
                        <PiCurrencyDollarBold
                            className='text-primary-main'
                        />
                        {car.daily_rent_price + "/يومي"}
                    </Typography>
                    <Typography
                        variant='small'
                        className='flex gap-1 items-center'
                    >
                        <PiCurrencyDollarBold
                            className='text-primary-main'
                        />
                        {car.monthly_rent_price + "/شهري"}
                    </Typography>
                    <Typography
                        variant='small'
                        className='flex gap-1 items-center'
                    >
                        <PiCurrencyDollarBold
                            className='text-primary-main'
                        />
                        {car.yearly_rent_price + "/سنوي"}
                    </Typography>
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
                    className={clsx('w-fit text-xs my-3', TextSecondary)}
                >
                    {TextSlice(car.description, 300)}
                </Typography>
                <section
                    className='flex justify-between items-center gap-5 pb-5'
                >
                    <EditCarModalHandler
                        car={car}
                        mutate={mutate}
                        categories={categories}
                    />
                    <DeleteCar
                        brand={car.brand}
                        carId={car.id_car}
                        model={car.model}
                        mutate={mutate}
                    />
                </section>
            </CardBody>
        </Card>
    )
}

export default CarCard