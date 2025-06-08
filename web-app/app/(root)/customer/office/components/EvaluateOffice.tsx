"use client";

import MyFormProvider from "@/app/components/form/MyFormProvider";
import RHFRatting from "@/app/components/form/RHFRatting";
import RHFTextArea from "@/app/components/form/RHFTextArea";
import { RatingOfficeSchema, RattingOfficeType } from "@/lib/api/data/zod/schemas";
import useBoolean from "@/lib/hooks/use-boolean";
import { CardBackgrounds } from "@/lib/ui/class/classNames";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { AxiosResponse } from "axios";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { GiFallingStar } from "react-icons/gi";
import { KeyedMutator } from "swr";

type Props = {
    officeId: number,
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>,
}

const EvaluateOffice = ({ officeId, mutate }: Props) => {

    const open = useBoolean({ initialState: false });
    const loading = useBoolean({ initialState: false });

    const defaultValues: RattingOfficeType = {
        comment: "",
        rating: 0
    };

    const methods = useForm<RattingOfficeType>({
        resolver: zodResolver(RatingOfficeSchema),
        defaultValues: defaultValues
    });

    const onSubmit = async (data: RattingOfficeType) => {
        // loading.onTrue();
        // const promise = dataMutate(endpoints.cars.add, METHODS.POST, data, {
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     }
        // });
        // await promise.then(() => {
        //     mutate();
        //     loading.onFalse();
        //     methods.reset();
        //     open.onFalse();
        //     toast.success("تم اضافة السيارة بنجاح")
        // }).catch(error => {
        //     if (error instanceof AxiosError && error.status === 400) {
        //         toast.error("حدث خطأ أثناء اضافة السيارة")
        //     } else {
        //         console.log(error);
        //     }
        //     loading.onFalse();
        // })
        console.log(data);

    };

    return (
        <>
            <Button
                color="amber"
                size="sm"
                className="flex justify-center items-center gap-0.5"
                onClick={open.onTrue}
            >
                <GiFallingStar/>
                تقييم
            </Button>

            <Dialog
                open={open.value}
                handler={() => {
                    methods.reset(defaultValues);
                    open.onToggle();
                }}
                className={clsx(CardBackgrounds)}
                size='md'
            >
                <DialogHeader>
                    <Typography
                        variant='h3'
                        color='green'
                    >
                        <GiFallingStar className='inline-block me-1' />تقييم المكتب
                    </Typography>
                </DialogHeader>
                <MyFormProvider
                    methods={methods}
                    onSubmit={onSubmit}
                >
                    <DialogBody
                    >
                        <RHFRatting
                            name="rating"
                            label="تقييم المكتب"
                            ratingProps={{
                                count: 5
                            }}
                            className="mb-2"
                        />
                        <RHFTextArea
                            label='التعليق'
                            rows={7}
                            helperText=''
                            name='comment'
                            className=''
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

export default EvaluateOffice