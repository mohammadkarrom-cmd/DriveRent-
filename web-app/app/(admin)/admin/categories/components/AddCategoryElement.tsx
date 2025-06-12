"use client"
import { endpoints } from "@/app/api/common"
import MyFormProvider from "@/app/components/form/MyFormProvider"
import RHFInput from "@/app/components/form/RHFInput"
import dataMutate from "@/lib/api/data/dataMutate"
import { CategorySchemaType, categorySchema } from "@/lib/api/data/zod/schemas"
import { METHODS } from "@/lib/api/setup/api"
import useBoolean from "@/lib/hooks/use-boolean"
import { Button } from "@/lib/ui/MTFix"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError, AxiosResponse } from "axios"
import { useForm } from "react-hook-form"
import { BiSolidCategory } from "react-icons/bi"
import { GiConfirmed } from "react-icons/gi"
import { MdCancel } from "react-icons/md"
import { TbCategoryPlus } from "react-icons/tb"
import { toast } from "react-toastify"
import { KeyedMutator } from "swr"

type Props = {
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>
}

const AddCategoryElement = ({ mutate }: Props) => {
    const open = useBoolean({ initialState: false });
    const loading = useBoolean({ initialState: false });

    const defaultValues: CategorySchemaType = {
        name: ""
    };

    const methods = useForm({
        defaultValues: defaultValues,
        resolver: zodResolver(categorySchema)
    });

    const {reset} = methods
    const onSubmit = async (data: CategorySchemaType) => {
        loading.onTrue();
        const promise = dataMutate(endpoints.admin.categories.add, METHODS.POST, data);
        await promise.then(() => {
            toast.success("تم تعديل التصنيف بنجاح")
            loading.onFalse();
            reset();
            open.onFalse();
            mutate();
        }).catch(error => {
            if (error instanceof AxiosError && error.status === 400) {
                toast.error("التصنيف موجود بالفعل")
            } else {
                console.log(error);
                toast.error("حدث خطأ أثناء تعديل التصنيف")
            }
            loading.onFalse();
        })
    };
    return (
        <>
            {
                open.value
                    ? <MyFormProvider
                        methods={methods}
                        onSubmit={onSubmit}
                        className="flex justify-between gap-5"
                    >
                        <div className="w-full">

                            <RHFInput
                                name="name"
                                color="green"
                                label="اسم التصنيف"
                                icon={<BiSolidCategory />}
                                helperText=""
                                type="text"
                            />
                        </div>
                        <Button
                            color="red"
                            className="flex justify-center items-center gap-0.5"
                            type="button"
                            onClick={open.onFalse}
                            loading={loading.value}
                        >
                            <MdCancel />
                            الغاء
                        </Button>
                        <Button
                            color="green"
                            className="flex justify-center items-center gap-0.5"
                            type="submit"
                            onClick={open.onTrue}
                            loading={loading.value}
                        >
                            <GiConfirmed />
                            اضافة
                        </Button>
                    </MyFormProvider>
                    :
                    <Button
                        fullWidth
                        color="green"
                        className="flex justify-center items-center gap-0.5"
                        onClick={open.onTrue}
                    >
                        <TbCategoryPlus size={20} />
                        اضافة تصنيف جديد
                    </Button>
            }
        </>
    )
}

export default AddCategoryElement