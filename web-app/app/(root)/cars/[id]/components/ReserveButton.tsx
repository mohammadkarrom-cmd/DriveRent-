"use client"

import { endpoints } from '@/app/api/common'
import { paths } from '@/app/components/layout/config-nav'
import { ROLES } from '@/app/constants'
import dataMutate from '@/lib/api/data/dataMutate'
import { METHODS } from '@/lib/api/setup/api'
import { useAuthContext } from '@/lib/context/auth/auth-context'
import useBoolean from '@/lib/hooks/use-boolean'
import { Backgrounds, CardBackgrounds, shadowPrimary, TextPrimary } from '@/lib/ui/class/classNames'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select } from '@/lib/ui/MTFix'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PiCurrencyDollarBold } from 'react-icons/pi'
import { toast } from 'react-toastify'

type Props = {
    car: CarType,
    available: boolean
}

type reservationRequest = {
    car: number,
    start_date: string,
    type_reservation: number,
}

const ReserveButton = ({ car,available }: Props) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const minDate = `${year}-${month}-${day}`;

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const { user } = useAuthContext()
    const open = useBoolean({ initialState: false });
    const [rentType, setRentType] = useState<string>("");
    const [rentDate, setRentDate] = useState<string>(minDate);

    const router = useRouter();


    const handleSubmit = async () => {
        if (!rentType) {
            toast.error("قم بأختيار نوع الحجز");
        } else {
            const now = new Date();
            const date = new Date(rentDate);
            date.setHours(now.getHours());
            date.setMinutes(now.getMinutes());

            const data: reservationRequest = {
                car: car.id_car,
                type_reservation: parseInt(rentType),
                start_date: date.toISOString()
            }

            const response = dataMutate(endpoints.customer.reserveCar, METHODS.POST, data);

            await response.then((value: { message: string }) => {
                toast.success(value.message);
                router.push(paths.customer.temporaryReservations);
            }).catch((error) => {
                console.log(error);

                toast.error("حدث خطأ أثناء الحجز");

            });
        }
    }

    if (user && user.role === ROLES.CUSTOMER) {
        return (
            <>
                <Button
                    color='green'
                    size='lg'
                    className='text-center w-full lg:w-fit'
                    onClick={open.onTrue}
                    disabled={!available}
                >
                    حجز
                </Button>
                <Dialog
                    open={open.value}
                    handler={open.onToggle}
                    className={clsx(CardBackgrounds, TextPrimary)}
                >
                    <DialogHeader
                        className='text-primary-main'
                    >
                        {`حجز ${car.brand} ${car.model}`}
                    </DialogHeader>
                    <DialogBody
                        className='flex flex-col gap-5 text-inherit'
                    >
                        <Select
                            label='نوع الحجز'
                            color='green'
                            name='category'
                            className={TextPrimary}
                            menuProps={{
                                className: clsx(Backgrounds, shadowPrimary, TextPrimary, "shadow border-none")
                            }}
                            labelProps={{
                                dir: "ltr",
                                className: TextPrimary
                            }}
                            value={rentType}
                            onChange={(value) => setRentType(value)}
                        >
                            <Option
                                value=''
                                className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                            >
                                غير محدد
                            </Option>
                            <Option
                                value='1'
                                className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                            >
                                {`يومي ${car.daily_rent_price}`}
                                <PiCurrencyDollarBold
                                    className='text-primary-main inline-block'
                                />
                            </Option>
                            <Option
                                value='2'
                                className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                            >
                                {`شهري ${car.monthly_rent_price}`}
                                <PiCurrencyDollarBold
                                    className='text-primary-main inline-block'
                                />
                            </Option>
                            <Option
                                value='3'
                                className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                            >
                                {`سنوي ${car.yearly_rent_price}`}
                                <PiCurrencyDollarBold
                                    className='text-primary-main inline-block'
                                />
                            </Option>
                        </Select>
                        <Input
                            crossOrigin={undefined}
                            type='date'
                            min={minDate}
                            className={TextPrimary}
                            value={rentDate}
                            onChange={(e) => setRentDate(e.target.value)}
                        />
                    </DialogBody>
                    <DialogFooter
                        className='gap-5'
                    >
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => {
                                open.onFalse();
                                // methods.reset(defaultValues);
                            }}
                            className="mr-1"
                        >
                            إلغاء
                        </Button>
                        <Button
                            variant="gradient"
                            color="green"
                            onClick={handleSubmit}
                        >
                            تأكيد
                        </Button>
                    </DialogFooter>
                </Dialog>
            </>
        )
    }
}

export default ReserveButton