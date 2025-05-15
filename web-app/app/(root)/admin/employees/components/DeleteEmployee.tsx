"use client"

import { endpoints } from '@/app/api/common'
import dataMutate from '@/lib/api/data/dataMutate'
import { METHODS } from '@/lib/api/setup/api'
import useBoolean from '@/lib/hooks/use-boolean'
import { CardBackgrounds, CardBackgroundsReverse, TextPrimary, TextPrimaryReverse, TextSecondary } from '@/lib/ui/class/classNames'
import { Button, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Tooltip, Typography } from '@/lib/ui/MTFix'
import { AxiosError, AxiosResponse } from 'axios'
import clsx from 'clsx'
import { FaTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { KeyedMutator } from 'swr'

type Props = {
    employee: EmployeeType,
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>
}

const DeleteEmployee = ({ employee, mutate }: Props) => {
    const open = useBoolean({ initialState: false });

    const DeleteMutate = async () => {
        const promise = dataMutate(endpoints.employee.delete(employee.id), METHODS.DELETE, {});

        
        await promise.then(() => {
            mutate();
            toast.success("تمت حذف الحساب بنجاح ")
            open.onFalse();
        }).catch(error => {
            if (error instanceof AxiosError && error.status === 400) {
                toast.error("حساب المستخدم غير موجود")
            } else {
                console.log(error);
            }
        })
    }
    return (
        <>
            <Tooltip
                content="حذف الموظف"
                className={clsx(CardBackgroundsReverse, TextPrimaryReverse)}
            >
                <IconButton
                    variant='filled'
                    color="red"
                    className='p-0 shadow-none rounded-full'
                    size='sm'
                    onClick={open.onTrue}
                >
                    <FaTrashAlt
                        size={15}
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
                    حذف الموظف {employee.username}
                    <Chip
                        color='red'
                        variant='ghost'
                        value={`معرف الموظف ${employee.id}`} />
                </DialogHeader>
                <DialogBody>
                    <Typography
                        className={clsx(TextPrimary)}
                        variant='paragraph'
                    >
                        هل أنت متأكد أنك تريد حذف الموظف {employee.first_name} {employee.last_name}
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

export default DeleteEmployee