"use client";
import MyFormProvider from '@/app/components/form/MyFormProvider';
import RHFInput from '@/app/components/form/RHFInput';
import RHFSingleImageDropzone from '@/app/components/form/RHFSingleImageDropzone';
import { registerSchema, registerSchemaType } from '@/lib/api/data/zod/schemas';
import { useSettingsContext } from '@/lib/context/settings/setting-context';
import useBoolean from '@/lib/hooks/use-boolean';
import { Backgrounds, TextPrimary } from '@/lib/ui/class/classNames';
import { Button, Step, Stepper, Typography } from '@/lib/ui/MTFix';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPhoneFlip } from 'react-icons/fa6';
import { GiHouseKeys, GiIdCard } from 'react-icons/gi';
import { IoIosMail } from 'react-icons/io';
import { IoDocumentAttach, IoEye } from 'react-icons/io5';
import { MdAccountCircle, MdOutlineShortText } from 'react-icons/md';

import { paths } from '@/app/components/layout/config-nav';
import { useAuthContext } from '@/lib/context/auth/auth-context';
import Link from 'next/link';
import { PiEyeClosedDuotone } from 'react-icons/pi';



const RegisterPage = () => {
    const { register } = useAuthContext();

    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const { theme } = useSettingsContext();
    const password = useBoolean({ initialState: false });
    const confirmPassword = useBoolean({ initialState: false });

    const defaultValues: registerSchemaType = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phone: "",
        id_number: "",
        password: "",
        confirm_password: "",
        driving_license_image: null,
        id_back_image: null,
        id_front_image: null
    }

    const methods = useForm<registerSchemaType>({
        resolver: zodResolver(registerSchema),
        defaultValues: defaultValues
    });

    const { formState: { errors } } = methods;

    useEffect(() => {
        if (errors.driving_license_image || errors.id_back_image) {
            setActiveStep(1)
        }
        if (errors.first_name || errors.last_name || errors.email || errors.username || errors.phone || errors.id_number) {
            setActiveStep(0)
        }
    }, [errors])

    return (
        <>
            <Stepper
                className="mb-5"
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
                lineClassName={clsx(TextPrimary)}
                activeLineClassName="bg-primary-main"
                dir='ltr'
            >
                <Step
                    onClick={() => setActiveStep(0)}
                    activeClassName='bg-primary-main text-white'
                    completedClassName={clsx(Backgrounds, TextPrimary)}
                    className='text-inherit'
                >
                    <GiIdCard
                        className='size-5'
                    />
                </Step>
                <Step
                    onClick={() => setActiveStep(1)}
                >
                    <IoDocumentAttach
                        className='size-5'
                    />
                </Step>
                <Step
                    onClick={() => setActiveStep(2)}
                >
                    <GiHouseKeys
                        className='size-5'
                    />
                </Step>
            </Stepper>
            <MyFormProvider
                methods={methods}
                onSubmit={register}
                className='h-[50vh] overflow-scroll transition-all pt-2'

            >
                <section
                    className={(activeStep === 0 ? "flex" : "hidden") + ' flex-col gap-5'}
                    key={"register-user-info"}
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
                        label='اسم العائلة'
                        type='text'
                        color={theme === "dark" ? 'white' : "black"}
                        icon={<MdOutlineShortText size={25} />}
                        name='last_name'
                        helperText=''
                    />
                    <RHFInput
                        label='اسم المستخدم'
                        type='text'
                        color={theme === "dark" ? 'white' : "black"}
                        icon={<MdAccountCircle size={25} />}
                        name='username'
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
                        label='رقم الهاتف'
                        type='text'
                        color={theme === "dark" ? 'white' : "black"}
                        icon={<FaPhoneFlip size={25} />}
                        name='phone'
                        helperText=''
                    />
                    <RHFInput
                        label='رقم الهوية'
                        type='text'
                        color={theme === "dark" ? 'white' : "black"}
                        icon={<GiIdCard size={25} />}
                        name='id_number'
                        helperText=''
                    />
                </section>
                <section
                    className={(activeStep === 1 ? "flex" : "hidden") + ' flex-col w-full gap-5'}
                    key={"register-images"}
                >
                    <RHFSingleImageDropzone
                        label='صورة الوجه الخلفي للهوية'
                        name='id_back_image'
                        className='w-full h-64 aspect-square object-contain'
                    />
                    <RHFSingleImageDropzone
                        label='صورة الوجه الأمامي للهوية'
                        name='id_front_image'
                        className='w-full h-64 aspect-square object-contain'
                    />
                    <RHFSingleImageDropzone
                        label='صورة شهادة القيادة'
                        name='driving_license_image'
                        className='w-full h-64 aspect-square object-contain'
                    />
                </section>
                <section
                    className={(activeStep === 2 ? "flex" : "hidden") + ' flex-col gap-5'}
                    key={"register-password"}
                >
                    <RHFInput
                        label='كلمة المرور'
                        color={theme === "dark" ? 'white' : "black"}
                        name='password'
                        helperText=''
                        type={password.value ? "text" : "password"}
                        icon={
                            password.value
                                ? <IoEye
                                    size={25}
                                    onClick={password.onToggle}
                                    className='cursor-pointer hover:scale-105 mb-1'
                                />
                                : <PiEyeClosedDuotone
                                    size={25}
                                    onClick={password.onToggle}
                                    className='cursor-pointer hover:scale-105'
                                />
                        }
                    />
                    <RHFInput
                        label='كلمة المرور المؤكدة'
                        color={theme === "dark" ? 'white' : "black"}
                        name='confirm_password'
                        helperText=''
                        type={confirmPassword.value ? "text" : "password"}
                        icon={
                            confirmPassword.value
                                ? <IoEye
                                    size={25}
                                    onClick={confirmPassword.onToggle}
                                    className='cursor-pointer hover:scale-105 mb-1'
                                />
                                : <PiEyeClosedDuotone
                                    size={25}
                                    onClick={confirmPassword.onToggle}
                                    className='cursor-pointer hover:scale-105'
                                />
                        }
                    />
                    <Button
                        color='green'
                        className='w-full my-5'
                        type='submit'
                    >
                        إنشاء حساب
                    </Button>
                </section>
            </MyFormProvider>
            <div className="mt-5 flex justify-between">
                <Button
                    color='green'
                    onClick={handlePrev} disabled={isFirstStep}
                >
                    السابق
                </Button>
                <Button
                    color='green'
                    onClick={handleNext} disabled={isLastStep}
                >
                    التالي
                </Button>
            </div>
            <section className=''>
                <Typography
                    variant='small'
                    className='inline-block'
                >
                   هل لديك حساب بالفعل؟ سجل الدخول هنا للاستمرار والاستفادة من جميع المميزات والخدمات التي نقدمها
                </Typography>
                <Link
                    href={paths.login}
                >
                    <Button
                        variant='text'
                        size='sm'
                        color='green'
                        className='inline-block px-1.5'
                        type='submit'
                    >
                        تسجيل الدخول
                    </Button>
                </Link>
            </section>
        </>
    )
}

export default RegisterPage