"use client"

import Error from "@/app/(root)/error";
import { endpoints } from "@/app/api/common";
import NormalLoading from "@/app/components/loaders/NormalLoading";
import fetchApi from "@/lib/api/data/dataFetcher";
import dataMutate from "@/lib/api/data/dataMutate";
import { METHODS } from "@/lib/api/setup/api";
import { Backgrounds } from "@/lib/ui/class/classNames";
import { Button, Typography } from "@material-tailwind/react";
import { AxiosError } from "axios";
import clsx from "clsx";
import Image from "next/image";
import { BsFillPatchCheckFill, BsFillPatchExclamationFill } from "react-icons/bs";
import { FaIdCard } from "react-icons/fa";
import { IoIosMailUnread } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { PiTextAlignLeftDuotone, PiTextAlignRightDuotone } from "react-icons/pi";
import { toast } from "react-toastify";
import useSWR from "swr";
import IconState from "./IconState";

type Props = {
    userId: number,
    onClose: () => void
}

const AdminUserDetails = ({ userId, onClose }: Props) => {
    const { data, error, mutate, isLoading } = useSWR(endpoints.admin.users.view(userId), fetchApi);

    if (isLoading) return <NormalLoading />

    if (error) {
        if (error instanceof AxiosError) {
            return <Error error={error} />;
        }
    }

    const user = data.data as AdminCustomerDetailsType
    const ToggleActivation = async () => {
        const action = user.is_active ? "deactivate" : "activate"
        const data = {
            id: [user.id_user],
            action: action
        }

        const promise = dataMutate(endpoints.employee.switch, METHODS.POST, data);

        await promise.then(() => {
            toast.success(`تم ${user.is_active ? "الغاء" : ""} التنشيط بنجاح`)
            mutate()
        }).catch((error => {
            toast.error("حدث خطاء بالاتصال")
            console.log(error);
        })).finally(() => {
            onClose();
        })

    }

    return (
        <>
            <section
                className="w-full flex justify-around items-center"
            >
                <Typography
                    variant='lead'
                    color={user.is_active ? "green" : "red"}
                    className='flex justify-center items-center gap-0.5'
                >

                    {
                        user.is_active ? "الحساب نشط" : "الحساب غير نشط"
                    }
                </Typography>
                <Button
                    className='w-fit flex justify-center items-center gap-1'
                    color={user.is_active ? "red" : "green"}
                    onClick={ToggleActivation}
                >
                    {user.is_active
                        ? <>
                            <BsFillPatchCheckFill size={16} /> الغاء التنشيط
                        </>
                        : <>
                            <BsFillPatchExclamationFill size={16} /> تنيشط
                        </>
                    }
                </Button>
            </section>
            <section
                className="w-full max-h-[75vh] overflow-scroll"
            >
                <section
                    className="flex  gap-3 justify-between md:justify-around flex-wrap"
                >
                    <IconState
                        description={user.first_name}
                        title="الاسم الأول"
                        titleColor="blue"
                        icon={<PiTextAlignRightDuotone />}
                    />
                    <IconState
                        description={user.last_name}
                        title="الاسم الأخير"
                        titleColor="indigo"
                        icon={<PiTextAlignLeftDuotone />}
                    />
                    <IconState
                        description={user.id_number}
                        title="الرقم الوطني"
                        titleColor="green"
                        icon={<FaIdCard />}
                    />
                    <IconState
                        description={user.email}
                        title="البريد الألكتروني"
                        titleColor="brown"
                        icon={<IoIosMailUnread />}
                    />
                    <IconState
                        description={user.username}
                        title="اسم المستخدم"
                        titleColor="cyan"
                        icon={<MdAccountCircle />}
                    />
                </section>
                <section
                    className="flex gap-5 p-5  flex-wrap"
                >
                    <figure
                        className={clsx(Backgrounds, "p-1 rounded-md")}
                    >
                        <Typography variant="lead">
                            صورة شهادة القيادة
                        </Typography>
                        <Image src={user.driving_license_image} alt="driving_license_image" className="h-52" width={500} height={500} />
                    </figure>
                    <figure
                        className={clsx(Backgrounds, "p-1 rounded-md")}
                    >
                        <Typography variant="lead">
                            صورة الوجه الأمامي للهوية
                        </Typography>
                        <Image src={user.id_front_image} alt="id_front_image" className="h-52" width={500} height={500} />
                    </figure>
                    <figure
                        className={clsx(Backgrounds, "p-1 rounded-md")}
                    >
                        <Typography variant="lead">
                            صورة الوجه الخلفي للهوية
                        </Typography>
                        <Image src={user.id_back_image} alt="id_back_image" className="h-52" width={500} height={500} />
                    </figure>
                </section>
            </section>
            <section
                className="flex gap-3 justify-end items-center"
            >
                <Button
                    variant="filled"
                    color="red"
                    onClick={() => onClose()}
                    className="mr-1"
                >
                    إغلاق
                </Button>
            </section>
        </>
    )
}

export default AdminUserDetails