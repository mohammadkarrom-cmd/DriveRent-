"use client"

import { endpoints } from "@/app/api/common";
import MyFormProvider from "@/app/components/form/MyFormProvider";
import RHFInput from "@/app/components/form/RHFInput";
import dataMutate from "@/lib/api/data/dataMutate";
import { CategorySchemaType, categorySchema } from "@/lib/api/data/zod/schemas";
import { METHODS } from "@/lib/api/setup/api";
import useBoolean from "@/lib/hooks/use-boolean";
import { TextPrimary } from "@/lib/ui/class/classNames";
import { Button, Typography } from "@/lib/ui/MTFix";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { BiSolidCategory } from "react-icons/bi";
import { GrServices } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";

type Props = {
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>,
    category: CategoryType
}

const AdminCategoryElement = ({ category, mutate }: Props) => {
    const open = useBoolean({ initialState: false });
    const loading = useBoolean({ initialState: false });

    const defaultValues: CategorySchemaType = {
        name: category.name
    };

    const methods = useForm({
        defaultValues: defaultValues,
        resolver: zodResolver(categorySchema)
    });

    const { reset } = methods;

    const onSubmit = async (data: CategorySchemaType) => {
        loading.onTrue();
        const promise = dataMutate(endpoints.admin.categories.edit(category.id_car_type), METHODS.PUT, data);
        await promise.then(() => {
            toast.success("تم تعديل التصنيف بنجاح")
            loading.onFalse();
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
        <div>
            <Typography
                className="flex justify-center items-center gap-1 w-fit"
                variant="h4"
                role="h3"
                color="green"
            >
                <BiSolidCategory />
                التصنيف
            </Typography>
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
                            type="button"
                            loading={loading.value}
                            className="flex justify-center items-center gap-0.5"
                            onClick={() => {
                                open.onFalse();
                                reset();
                            }}
                        >
                            <MdCancel />
                            الغاء
                        </Button>
                        <Button
                            color="green"
                            className="flex justify-center items-center gap-0.5"
                            onClick={open.onTrue}
                            type="submit"
                            loading={loading.value}
                        >
                            <GrServices />
                            تأكيد
                        </Button>
                    </MyFormProvider>
                    :
                    <div
                        className="flex justify-between items-center"
                    >
                        <Typography
                            variant="h5"
                            role="p"
                            className={clsx(TextPrimary)}
                        >
                            {category.name}
                        </Typography>
                        <Button
                            color="blue"
                            className="flex justify-center items-center gap-0.5"
                            onClick={open.onTrue}
                        >
                            <GrServices />
                            تعديل
                        </Button>
                    </div>
            }
        </div>
    )
}

export default AdminCategoryElement