"use client"

import { endpoints } from '@/app/api/common'
import MyFormProvider from '@/app/components/form/MyFormProvider'
import RHFCheckbox from '@/app/components/form/RHFCheckbox'
import RHFInput from '@/app/components/form/RHFInput'
import RHFSelect from '@/app/components/form/RHFSelect'
import RHFSingleImageDropzone from '@/app/components/form/RHFSingleImageDropzone'
import RHFTextArea from '@/app/components/form/RHFTextArea'
import MyCarousel from '@/app/components/views/MyCarousel'
import dataMutate from '@/lib/api/data/dataMutate'
import { addCarSchema, AddCarSchema } from '@/lib/api/data/zod/schemas'
import { METHODS } from '@/lib/api/setup/api'
import { useSettingsContext } from '@/lib/context/settings/setting-context'
import useBoolean from '@/lib/hooks/use-boolean'
import { Backgrounds, CardBackgrounds, TextPrimary } from '@/lib/ui/class/classNames'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Option, Typography } from '@/lib/ui/MTFix'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError, AxiosResponse } from 'axios'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { BiSolidCategory } from 'react-icons/bi'
import { IoLogoModelS } from 'react-icons/io'
import { IoCarSport } from 'react-icons/io5'
import { PiCurrencyDollarBold } from 'react-icons/pi'
import { toast } from 'react-toastify'
import { KeyedMutator } from 'swr'


type Props = {
    categories: CategoryType[],
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>,
    isCustomer?: boolean
}

const AddCar = ({ mutate, categories,isCustomer }: Props) => {
    const { theme } = useSettingsContext();
    const open = useBoolean({ initialState: false });
    const loading = useBoolean({ initialState: false });

    const defaultValues: AddCarSchema = {
        brand: "",
        model: "",
        category: "",
        description: "",
        is_available_daily: true,
        is_available_monthly: true,
        is_available_yearly: true,
        daily_rent_price: 0,
        monthly_rent_price: 0,
        yearly_rent_price: 0,
        image1: null,
        image2: null,
        image3: null,
    };

    const methods = useForm<AddCarSchema>({
        resolver: zodResolver(addCarSchema),
        defaultValues: defaultValues
    });

    const { watch } = methods;

    const isAvailableDaily = watch("is_available_daily");
    const isAvailableMonthly = watch("is_available_monthly");
    const isAvailableYearly = watch("is_available_yearly");
    const isForSale = watch("is_for_sale");

    const onSubmit = async (data: AddCarSchema) => {
        loading.onTrue();
        const promise = dataMutate(isCustomer? endpoints.customer.customerCars.add : endpoints.cars.add, METHODS.POST, { status: 1, ...data }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        await promise.then(() => {
            mutate();
            loading.onFalse();
            methods.reset();
            open.onFalse();
            toast.success("تم اضافة السيارة بنجاح")
        }).catch(error => {
            if (error instanceof AxiosError && error.status === 400) {
                toast.error("حدث خطأ أثناء اضافة السيارة")
            } else {
                console.log(error);
            }
            loading.onFalse();
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
                <IoCarSport size={20} /> إضافة سيارة جديدة
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
                        <IoCarSport className='inline-block me-1' />إضافة سيارة جديدة إلى المخزون
                    </Typography>
                </DialogHeader>
                <MyFormProvider
                    methods={methods}
                    onSubmit={onSubmit}
                >
                    <DialogBody
                        className='max-h-[75vh] h-[75vh] overflow-scroll'
                    >
                        <div
                            className='flex flex-col  items-center gap-5 lg:flex-row lg:justify-center '
                        >
                            <section className='text-inherit max-w-96 lg:max-w-[550px]'>
                                <MyCarousel
                                    autoplay={false}
                                    loop={true}
                                >
                                    <RHFSingleImageDropzone
                                        label='الصورة الاولى للسيارة'
                                        name='image1'
                                        className='h-72 lg:h-80 w-full aspect-square object-contain mx-auto my-2'
                                    />
                                    <RHFSingleImageDropzone
                                        label='الصورة الثانية للسيارة'
                                        name='image2'
                                        className='h-72 lg:h-80 w-full aspect-square object-contain mx-auto my-2'
                                    />
                                    <RHFSingleImageDropzone
                                        label='الصورة الثالثة للسيارة'
                                        name='image3'
                                        className='h-72 lg:h-80 w-full aspect-square object-contain mx-auto my-2'
                                    />
                                </MyCarousel>
                            </section>
                            <section
                                className='flex flex-col gap-5'
                            >
                                <RHFInput
                                    label='العلامة التجارية'
                                    type='text'
                                    color={theme === "dark" ? 'white' : "black"}
                                    icon={<BiSolidCategory size={25} />}
                                    name='brand'
                                    helperText=''
                                />
                                <RHFInput
                                    label='النموذج'
                                    type='text'
                                    color={theme === "dark" ? 'white' : "black"}
                                    icon={<IoLogoModelS size={25} />}
                                    name='model'
                                    helperText=''
                                />
                                <RHFSelect
                                    label='التصنيف'
                                    color='green'
                                    name='category'
                                    isNumber
                                >
                                    <Option
                                        value=''
                                        className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                                    >
                                        غير محدد
                                    </Option>
                                    {
                                        categories.map(category => (
                                            <Option
                                                value={category.id_car_type.toString()}
                                                key={category.id_car_type}
                                            >
                                                {category.name}
                                            </Option>
                                        ))
                                    }
                                </RHFSelect>
                                <section
                                    className='flex justify-around w-full items-center text-nowrap flex-wrap'
                                >
                                    <RHFCheckbox
                                        color='green'
                                        label='متاح للإيجار اليومي'
                                        name='is_available_daily'
                                        helperText=''
                                        labelProps={{
                                            className: clsx(TextPrimary, "text-sm")
                                        }}
                                    />
                                    <RHFCheckbox
                                        color='green'
                                        label='متاح للإيجار الشهري'
                                        name='is_available_monthly'
                                        helperText=''
                                        labelProps={{
                                            className: clsx(TextPrimary, "text-sm")
                                        }}
                                    />
                                    <RHFCheckbox
                                        color='green'
                                        label='متاح للإيجار السنوي'
                                        name='is_available_yearly'
                                        helperText=''
                                        labelProps={{
                                            className: clsx(TextPrimary, "text-sm")
                                        }}
                                    />
                                    <RHFCheckbox
                                        color='green'
                                        label='متاح البيع'
                                        name='is_for_sale'
                                        helperText=''
                                        labelProps={{
                                            className: clsx(TextPrimary, "text-sm")
                                        }}
                                    />
                                </section>
                                {
                                    isAvailableDaily &&
                                    <RHFInput
                                        label='سعر الإيجار اليومي'
                                        type='number'
                                        color={theme === "dark" ? 'white' : "black"}
                                        icon={
                                            <PiCurrencyDollarBold
                                                className='text-primary-main'
                                                size={23}
                                            />
                                        }
                                        name='daily_rent_price'
                                        helperText=''
                                    />
                                }
                                {
                                    isAvailableMonthly &&
                                    <RHFInput
                                        label='سعر الإيجار الشهري'
                                        type='number'
                                        color={theme === "dark" ? 'white' : "black"}
                                        icon={
                                            <PiCurrencyDollarBold
                                                className='text-primary-main'
                                                size={23}
                                            />
                                        }
                                        name='monthly_rent_price'
                                        helperText=''
                                        className='w-64 lg:w-72 xl:w-full aspect-square mx-auto'
                                    />
                                }
                                {
                                    isAvailableYearly &&
                                    <RHFInput
                                        label='سعر الإيجار السنوي'
                                        type='number'
                                        color={theme === "dark" ? 'white' : "black"}
                                        icon={
                                            <PiCurrencyDollarBold
                                                className='text-primary-main'
                                                size={23}
                                            />
                                        }
                                        name='yearly_rent_price'
                                        helperText=''
                                    />
                                }
                                {
                                    isForSale &&
                                    <RHFInput
                                        label='سعر البيع'
                                        type='number'
                                        color={theme === "dark" ? 'white' : "black"}
                                        icon={
                                            <PiCurrencyDollarBold
                                                className='text-primary-main'
                                                size={23}
                                            />
                                        }
                                        name='sale_price'
                                        helperText=''
                                    />
                                }
                            </section>
                        </div>
                        <div
                            className='mt-5'
                        >
                            <RHFTextArea
                                label='تفاصيل السيارة'
                                rows={7}
                                helperText=''
                                name='description'
                                className=''
                            />
                        </div>
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
                            loading={loading.value}
                        >
                            إلغاء
                        </Button>
                        <Button
                            variant="gradient"
                            color="green"
                            type='submit'
                            loading={loading.value}
                        >
                            تأكيد
                        </Button>
                    </DialogFooter>
                </MyFormProvider>
            </Dialog >
        </>
    )
}

export default AddCar