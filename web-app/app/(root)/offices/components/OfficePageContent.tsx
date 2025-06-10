"use client";

import { endpoints } from "@/app/api/common";
import NormalLoading from "@/app/components/loaders/NormalLoading";
import fetchApi from "@/lib/api/data/dataFetcher";
import { TextPrimary } from "@/lib/ui/class/classNames";
import { Card, CardBody, CardFooter, CardHeader, Chip, Rating, Typography } from "@/lib/ui/MTFix";
import clsx from "clsx";
import Image from "next/image";
import { BsBuildingFill, BsFillPatchCheckFill, BsFillPatchExclamationFill } from "react-icons/bs";
import { FaMapLocationDot, FaPhoneFlip } from "react-icons/fa6";
import { IoCarSharp } from "react-icons/io5";
import useSWR from "swr";
import CarsList from "../../components/home/CarsList";
import Error from "../../error";

type Props = {
    id: string
}
const OfficePageContent = ({ id }: Props) => {
    const { data: data, error, isLoading } = useSWR(endpoints.offices.get(parseInt(id)), fetchApi);

    if (isLoading) {
        return <NormalLoading />
    }
    if (error) {
        return Error(error)
    }
    console.log(data);

    const office = data.data as OfficePageType

    return (
        <Card
            color="transparent"
            shadow={false}
        >
            <div
                className="flex flex-row-reverse w-full"
            >

                <CardHeader
                    floated={false}
                    color="transparent"
                    className="m-0 rounded-none rounded-b-xl relative w-full"
                >
                    <Image
                        width={10000}
                        height={10000}
                        src={office.office.image}
                        alt={office.office.name}
                        className="w-full h-full object-cover max-h-[40vh]"
                    />
                    <Chip
                        className="absolute top-2 end-1 p-2 rounded-full min-w-fit min-h-fit"
                        color={office.office.status_office ? "green" : "red"}
                        // value={office.office.status_office ? "نشط" : "غير نشط"}
                        // value=""
                        value={office.office.status_office ? <BsFillPatchCheckFill size={50} /> : <BsFillPatchExclamationFill size={50} />}
                    />
                </CardHeader>
                <CardBody
                    className="p-5 pb-1 w-full"
                >
                    <Typography
                        color="green"
                        variant="h2"
                        className="flex justify-start items-center gap-0.5"
                    >
                        <BsBuildingFill />
                        {`اسم المكتب ${office.office.name}`}
                    </Typography>
                    <section
                        className="mt-3 flex flex-col gap-y-2"
                    >
                        <Typography
                            variant="h5"
                            className={clsx(TextPrimary, "flex w-fit justify-start items-center gap-0.5")}
                        >
                            <FaMapLocationDot />
                            {`موقع المكتب ${office.office.location}`}

                        </Typography>
                        <Typography
                            variant="h5"
                            className={clsx(TextPrimary, "flex justify-start items-center gap-0.5")}
                        >
                            <FaPhoneFlip />
                            {`رقم الهاتف الأول ${office.office.phone_number_1}`}
                        </Typography>
                        <Typography
                            variant="h5"
                            className={clsx(TextPrimary, "flex justify-start items-center gap-0.5")}
                        >
                            <FaPhoneFlip />
                            {`رقم الهاتف الثاني ${office.office.phone_number_2}`}
                        </Typography>
                        <Rating
                            readonly
                            value={office.office.ratings ? parseInt(office.office.ratings.toString()) : 0}
                            count={5}
                        />
                    </section>
                </CardBody>
            </div>
            <CardFooter>
            <Typography
                        color="green"
                        variant="h2"
                        className="flex justify-start items-center gap-0.5"
                    >
                        <IoCarSharp />
                        {`السيارات المتاحة لدى ${office.office.name}`}
                    </Typography>
                <CarsList
                    cars={office.cars}
                />
            </CardFooter>
        </Card>
    )
}

export default OfficePageContent