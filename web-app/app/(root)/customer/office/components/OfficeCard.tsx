import { paths } from "@/app/components/layout/config-nav"
import { CardBackgrounds, TextPrimary } from "@/lib/ui/class/classNames"
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Rating, Typography } from "@/lib/ui/MTFix"
import { AxiosResponse } from "axios"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { BsBuildingFill, BsFillPatchCheckFill, BsFillPatchExclamationFill } from "react-icons/bs"
import { FaMapLocationDot, FaPhoneFlip } from "react-icons/fa6"
import { KeyedMutator } from "swr"
import EvaluateOffice from "./EvaluateOffice"

type Props = {
    office: OfficeType,
    evaluate?: boolean,
    mutate?: KeyedMutator<AxiosResponse<unknown, unknown>>,
    view: boolean
}

const OfficeCard = ({ office, evaluate, mutate, view }: Props) => {
    return (
        <Card
            className={clsx(CardBackgrounds, "p-0 rounded-md")}
        >
            <CardHeader
                floated={false}
                shadow={false}
                className="m-0 relative"
                color="transparent"
            >
                <Image
                    src={office.image}
                    className="object-cover w-[375px] h-[350px]"
                    alt={office.name}
                    width={500}
                    height={500}
                />
                <Chip
                    className="absolute top-2 end-2"
                    color={office.status_office ? "green" : "red"}
                    value={office.status_office ? "نشط" : "غير نشط"}
                    icon={office.status_office ? <BsFillPatchCheckFill size={16} /> : <BsFillPatchExclamationFill size={16} />}
                />
            </CardHeader>
            <CardBody
                className="p-5 pb-1"
            >
                <Typography
                    color="green"
                    variant="h4"
                    className="flex justify-center items-center gap-0.5"
                >
                    <BsBuildingFill />
                    {office.name}
                </Typography>
                <section
                    className="mt-3"
                >
                    <Typography
                        variant="lead"
                        className={clsx(TextPrimary, "flex justify-center items-center gap-0.5")}
                    >
                        <FaMapLocationDot />
                        {office.location}
                    </Typography>
                    <div
                        className="flex w-full justify-between items-center flex-wrap mt-2 gap-x-3"
                    >
                        <Typography
                            variant="paragraph"
                            className={clsx(TextPrimary, "flex justify-start items-center gap-0.5")}
                        >
                            <FaPhoneFlip />
                            {office.phone_number_1}
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className={clsx(TextPrimary, "flex justify-start items-center gap-0.5")}
                        >
                            <FaPhoneFlip />
                            {office.phone_number_2}
                        </Typography>
                    </div>
                </section>
            </CardBody>
            <CardFooter
                className="pt-1 pb-3 px-4 flex justify-between items-center"
            >
                <Rating
                    readonly
                    value={office.ratings ? parseInt(office?.ratings.toString()) : 0}
                    count={5}
                />
                {
                    evaluate && mutate &&
                    <EvaluateOffice
                        officeId={office.id_office}
                        mutate={mutate}
                    />
                }
                {
                    view &&
                    <Link
                        href={paths.offices.office(office.id_office)}
                    >
                        <Button
                            color="green"
                            size="sm"
                            className="flex justify-center items-center gap-0.5"
                        >
                            عرض المكتب
                        </Button>
                    </Link>
                }
            </CardFooter>
        </Card>
    )
}

export default OfficeCard