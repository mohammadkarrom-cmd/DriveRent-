"use client"

import { endpoints } from '@/app/api/common'
import { paths } from '@/app/components/layout/config-nav'
import { ROLES } from '@/app/constants'
import dataMutate from '@/lib/api/data/dataMutate'
import { METHODS } from '@/lib/api/setup/api'
import { useAuthContext } from '@/lib/context/auth/auth-context'
import useBoolean from '@/lib/hooks/use-boolean'
import { CardBackgrounds, TextPrimary } from '@/lib/ui/class/classNames'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from '@/lib/ui/MTFix'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
    car: CarDetailsType,
    available: boolean
}

type reservationRequest = {
    car: number,
    start_date: string,
    type_reservation: number,
}

const BuyButton = ({ car, available }: Props) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const minDate = `${year}-${month}-${day}`;

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const { user } = useAuthContext()
    const open = useBoolean({ initialState: false });
    const rentType: string = "4";
    const [rentDate, setRentDate] = useState<string>(minDate);

    const router = useRouter();


    const handleSubmit = async () => {
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

    if (user && user.role === ROLES.CUSTOMER) {
        return (
            <>
                <Button
                    color='green'
                    size='lg'
                    className='text-center'
                    variant='outlined'
                    fullWidth
                    onClick={open.onTrue}
                    disabled={!available}
                >
                    شراء
                </Button>
                <Dialog
                    open={open.value}
                    handler={open.onToggle}
                    className={clsx(CardBackgrounds, TextPrimary)}
                >
                    <DialogHeader
                        className='text-primary-main'
                    >
                        {`شراء ${car.brand} ${car.model}`}
                    </DialogHeader>
                    <DialogBody
                        className='flex flex-col gap-5 text-inherit'
                    >
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
    } else {
        return (
            <Button
                color='green'
                size='lg'
                className='text-center'
                variant='outlined'
                disabled
                fullWidth
            >
                شراء
            </Button>
        )
    }
}

export default BuyButton