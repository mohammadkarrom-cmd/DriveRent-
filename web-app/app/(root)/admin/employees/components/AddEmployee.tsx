"use client"

import MyFormProvider from '@/app/components/form/MyFormProvider'
import RHFInput from '@/app/components/form/RHFInput'
import { useSettingsContext } from '@/lib/context/settings/setting-context'
import useBoolean from '@/lib/hooks/use-boolean'
import { Backgrounds, CardBackgrounds, TextPrimary } from '@/lib/ui/class/classNames'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Option, Typography } from '@/lib/ui/MTFix'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { IoIosMail, IoIosPersonAdd } from 'react-icons/io'
import { addEmployeeSchema, AddEmployeeSchemaType } from '@/lib/api/data/zod/schemas'
import { MdOutlineShortText } from 'react-icons/md'
import { RiShieldUserFill } from 'react-icons/ri'
import { FaPhoneFlip } from 'react-icons/fa6'
import RHFSelect from '@/app/components/form/RHFSelect'
import { IoEye } from 'react-icons/io5'
import { PiEyeClosedDuotone } from 'react-icons/pi'
import dataMutate from '@/lib/api/data/dataMutate'
import { endpoints } from '@/app/api/common'
import { METHODS } from '@/lib/api/setup/api'
import { KeyedMutator } from 'swr'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { unset } from 'lodash'

type Props = {
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>
}

const AddEmployee = ({ mutate }: Props) => {
    const { theme } = useSettingsContext();
    const open = useBoolean({ initialState: false });
    const showPassword = useBoolean({ initialState: false });
    const showConfirmPassword = useBoolean({ initialState: false });


    const defaultValues: AddEmployeeSchemaType = {
        account_type: "employee",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        username: "",
        password: "",
        confirm_password: ""
    };

    const methods = useForm<AddEmployeeSchemaType>({
        resolver: zodResolver(addEmployeeSchema),
        defaultValues: defaultValues
    });

    const onSubmit = async (data: AddEmployeeSchemaType) => {
        const formData = data;
        unset(formData, "confirm_password");
        const promise = dataMutate(endpoints.employee.add, METHODS.POST, formData)

        await promise.then(() => {
            mutate();
            toast.success("تمت انشاء الحساب بنجاح ")
            methods.reset(defaultValues)
            open.onFalse();
        }).catch(error => {
            if (error instanceof AxiosError && error.status === 400) {
                toast.error("اسم المستخدم موجود بالفعل")
            } else {
                console.log(error);
            }
        })
    };

    return (
        <>
            <Button
                color='green'
                variant='filled'
                onClick={open.onTrue}
                className='flex gap-1 items-center'
            >
                <IoIosPersonAdd size={20} /> إضافة موظف جديد
            </Button>

            <Dialog
                open={open.value}
                handler={() => {
                    methods.reset(defaultValues);
                    open.onToggle();
                }}
                className={clsx(CardBackgrounds)}
                size='xl'
            >
                <DialogHeader>
                    <Typography
                        variant='h3'
                        color='green'
                    >
                        <IoIosPersonAdd className='inline-block me-1' />إضافة موظف جديد
                    </Typography>
                </DialogHeader>
                <MyFormProvider
                    methods={methods}
                    onSubmit={onSubmit}
                >
                    <DialogBody
                        className='grid grid-cols-1 gap-5 md:grid-cols-2'
                    >
                        <RHFInput
                            label='الاسم الأول'
                            type='text'
                            color={theme === "dark" ? 'white' : "black"}
                            icon={<MdOutlineShortText size={25} />}
                            name='first_name'
                            helperText=''
                        />
                        <RHFInput
                            label='الاسم الأخير'
                            type='text'
                            color={theme === "dark" ? 'white' : "black"}
                            icon={<MdOutlineShortText size={25} />}
                            name='last_name'
                            helperText=''
                        />
                        <RHFInput
                            label='البريد الإلكتروني'
                            type='email'
                            color={theme === "dark" ? 'white' : "black"}
                            icon={<IoIosMail size={25} />}
                            name='email'
                            helperText=''
                        />
                        <RHFInput
                            label='اسم المستخدم'
                            type='text'
                            color={theme === "dark" ? 'white' : "black"}
                            icon={<RiShieldUserFill size={25} />}
                            name='username'
                            helperText=''
                        />
                        <RHFInput
                            label='رقم الهاتف'
                            type='text'
                            color={theme === "dark" ? 'white' : "black"}
                            icon={<FaPhoneFlip size={25} />}
                            name='phone'
                            helperText=''
                        />
                        <RHFSelect
                            label='نوع الحساب'
                            color='green'
                            name='account_type'
                        >
                            <Option
                                value='employee'
                                className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                            >
                                موظف
                            </Option>
                            <Option
                                value='manager'
                                className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                            >
                                مدير
                            </Option>
                            <Option
                                value='customer'
                                className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                            >
                                زبون
                            </Option>
                        </RHFSelect>
                        <RHFInput
                            label='كلمة المرور'
                            color={theme === "dark" ? 'white' : "black"}
                            name='password'
                            helperText=''
                            type={showPassword.value ? "text" : "password"}
                            icon={
                                showPassword.value
                                    ? <IoEye
                                        size={25}
                                        onClick={showPassword.onToggle}
                                        className='cursor-pointer hover:scale-105 mb-1'
                                    />
                                    : <PiEyeClosedDuotone
                                        size={25}
                                        onClick={showPassword.onToggle}
                                        className='cursor-pointer hover:scale-105'
                                    />
                            }
                        />
                        <RHFInput
                            label='كلمة المرور المؤكدة'
                            color={theme === "dark" ? 'white' : "black"}
                            name='confirm_password'
                            helperText=''
                            type={showConfirmPassword.value ? "text" : "password"}
                            icon={
                                showConfirmPassword.value
                                    ? <IoEye
                                        size={25}
                                        onClick={showConfirmPassword.onToggle}
                                        className='cursor-pointer hover:scale-105 mb-1'
                                    />
                                    : <PiEyeClosedDuotone
                                        size={25}
                                        onClick={showConfirmPassword.onToggle}
                                        className='cursor-pointer hover:scale-105'
                                    />
                            }
                        />

                    </DialogBody>
                    <DialogFooter className='gap-5'>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => {
                                open.onFalse();
                                methods.reset(defaultValues);
                            }}
                            className="mr-1"
                        >
                            إلغاء
                        </Button>
                        <Button
                            variant="gradient"
                            color="green"
                            type='submit'
                        >
                            تأكيد
                        </Button>
                    </DialogFooter>
                </MyFormProvider>
            </Dialog >
        </>
    )
}

export default AddEmployee