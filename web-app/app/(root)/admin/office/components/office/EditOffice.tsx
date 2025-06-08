import { endpoints } from '@/app/api/common';
import MyFormProvider from '@/app/components/form/MyFormProvider';
import RHFCheckbox from '@/app/components/form/RHFCheckbox';
import RHFInput from '@/app/components/form/RHFInput';
import RHFSingleImageDropzone from '@/app/components/form/RHFSingleImageDropzone';
import dataMutate from '@/lib/api/data/dataMutate';
import { addOfficeSchema, AddOfficeSchemaType } from '@/lib/api/data/zod/schemas';
import { METHODS } from '@/lib/api/setup/api';
import { useSettingsContext } from '@/lib/context/settings/setting-context';
import useBoolean from '@/lib/hooks/use-boolean';
import { CardBackgrounds } from '@/lib/ui/class/classNames';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@/lib/ui/MTFix';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError, AxiosResponse } from 'axios';
import clsx from 'clsx';
import { unset } from 'lodash';
import { useForm } from 'react-hook-form';
import { BsBuildingFillAdd, BsBuildingFillGear } from 'react-icons/bs';
import { FaBuilding } from 'react-icons/fa';
import { FaMapLocationDot, FaPhoneFlip } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { KeyedMutator } from 'swr';

type Props = {
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>,
    office: OfficeType,
}
const EditOffice = ({ mutate, office }: Props) => {
    const { theme } = useSettingsContext();

    const open = useBoolean({ initialState: false });
    const loading = useBoolean({ initialState: false });

    const defaultValues: AddOfficeSchemaType = {
        name: office.name,
        location: office.location,
        phone_number_1: office.phone_number_1,
        phone_number_2: office.phone_number_2,
        image: office.image,
        status_office: office.status_office
    }

    const methods = useForm({
        defaultValues: defaultValues,
        resolver: zodResolver(addOfficeSchema)
    });

    const onSubmit = async (data: AddOfficeSchemaType) => {
        loading.onTrue();
        let formData = {}
        if (typeof data.image !== "object") {
            // const blob = await fetchImageAsBlob(data.image) as File;
            // data.image = new File([blob], "OfficeImage.jpg", { type: blob.type });
            // const {image,...leastData} = data;
            unset(data,"image");
            formData = data;
        } else {
            formData = data
        }
        const promise = dataMutate(endpoints.admin.office.edit(office.id_office), METHODS.PATCH, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        await promise.then(() => {
            mutate();
            loading.onFalse();
            open.onFalse();
            toast.success("تم تعديل المكتب بنجاح")
        }).catch(error => {
            if (error instanceof AxiosError && error.status === 400) {
                toast.error("حدث خطأ أثناء تعديل المكتب")
            } else {
                console.log(error);
            }
            loading.onFalse();
        })
    };

    return (
        <>
            <Button
                variant='filled'
                color="green"
                className='flex gap-0.5 shadow-none'
                size='sm'
                onClick={open.onTrue}
            >
                <BsBuildingFillGear
                    size={15}
                />
                تعديل بيانات المكتب
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
                        <BsBuildingFillAdd className='inline-block me-1' />تعديل بيانات المكتب
                    </Typography>
                </DialogHeader>
                <MyFormProvider
                    methods={methods}
                    onSubmit={onSubmit}
                >
                    <DialogBody
                        className='flex justify-between items-start gap-5'
                    >
                        <section
                            className='grid grid-cols-1 gap-5  w-full mt-1'
                        >
                            <RHFInput
                                label='اسم المكتب'
                                type='text'
                                color={theme === "dark" ? 'white' : "black"}
                                icon={<FaBuilding size={25} />}
                                name='name'
                                helperText=''
                            />
                            <RHFInput
                                label='موقع المكتب'
                                type='text'
                                color={theme === "dark" ? 'white' : "black"}
                                icon={<FaMapLocationDot size={25} />}
                                name='location'
                                helperText=''
                            />
                            <RHFInput
                                label='رقم الهاتف الأول'
                                type='text'
                                color={theme === "dark" ? 'white' : "black"}
                                icon={<FaPhoneFlip size={25} />}
                                name='phone_number_1'
                                helperText=''
                            />
                            <RHFInput
                                label='رقم الهاتف الثاني'
                                type='text'
                                color={theme === "dark" ? 'white' : "black"}
                                icon={<FaPhoneFlip size={25} />}
                                name='phone_number_2'
                                helperText=''
                            />
                            <RHFCheckbox
                                color='green'
                                label='حالة المكتب'
                                name='status_office'

                            />
                        </section>
                        <section
                            className='w-full'
                        >
                            <RHFSingleImageDropzone
                                label='صورة المكتب'
                                name='image'
                                className='h-72 lg:h-80 w-full aspect-square object-contain mx-auto my-2 '
                            />
                        </section>
                    </DialogBody>
                    <DialogFooter className='gap-5'>
                        <Button
                            variant="filled"
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

export default EditOffice