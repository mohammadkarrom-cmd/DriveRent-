"use client";

import { endpoints } from '@/app/api/common';
import dataMutate from '@/lib/api/data/dataMutate';
import { METHODS } from '@/lib/api/setup/api';
import useBoolean from '@/lib/hooks/use-boolean';
import { CardBackgrounds, CardBackgroundsReverse, TextPrimary, TextPrimaryReverse, TextSecondary } from '@/lib/ui/class/classNames';
import { Button, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Tooltip, Typography } from '@/lib/ui/MTFix';
import { AxiosError, AxiosResponse } from 'axios';
import clsx from 'clsx';
import { FaDeleteLeft } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { KeyedMutator } from 'swr';

type Props = {
    carId: number,
    brand: string,
    model: string,
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>
    isCustomer?: boolean

}

const DeleteCar = ({ brand, carId, model, mutate, isCustomer }: Props) => {
    const open = useBoolean({ initialState: false });

    const DeleteMutate = async () => {
        const promise = dataMutate(isCustomer ? endpoints.customer.customerCars.delete(carId) : endpoints.cars.update(carId), METHODS.DELETE, {});


        await promise.then(() => {
            mutate();
            toast.success("تم حذف السيارة بنجاح")
            open.onFalse();
        }).catch(error => {
            if (error instanceof AxiosError && error.status === 400) {
                toast.error("حدث خطأ أثناء حذف السيارة")
            } else {
                console.log(error);
            }
        })
    }

    return (
        <>
            <Tooltip
                content="حذف السيارة"
                className={clsx(CardBackgroundsReverse, TextPrimaryReverse)}
            >
                <IconButton
                    variant='outlined'
                    color="red"
                    className='p-0 shadow-none rounded-full'
                    onClick={open.onTrue}

                >
                    <FaDeleteLeft
                        size={20}
                    />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open.value}
                handler={open.onToggle}
                className={clsx(CardBackgrounds)}
                size='md'

            >
                <DialogHeader
                    className='text-red-500 flex justify-between'
                >
                    حذف {model}
                    <Chip
                        color='red'
                        variant='ghost'
                        value={`معرف السيارة ${carId}`} />
                </DialogHeader>
                <DialogBody>
                    <Typography
                        className={clsx(TextPrimary)}
                        variant='paragraph'
                    >
                        هل أنت متأكد أنك تريد حذف السيارة {brand} {model}
                    </Typography>
                    <Typography
                        className={clsx(TextSecondary)}
                        variant='paragraph'
                    >
                        هذا الإجراء لا يمكن التراجع عنه
                    </Typography>
                </DialogBody>
                <DialogFooter className='gap-5'>
                    <Button
                        variant="text"
                        color="green"
                        onClick={() => {
                            open.onFalse();
                        }}
                        className="mr-1"
                    >
                        إلغاء
                    </Button>
                    <Button
                        variant="filled"
                        color='red'
                        onClick={DeleteMutate}
                    >
                        حذف
                    </Button>
                </DialogFooter>
            </Dialog >
        </>
    )
}

export default DeleteCar