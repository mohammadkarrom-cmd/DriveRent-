
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { FaCalendarCheck, FaHourglassEnd, FaHourglassStart, FaIdCard } from 'react-icons/fa';
import { IoCarSport } from 'react-icons/io5';
import { Card, CardBody, Chip } from '@/lib/ui/MTFix'
import Table from '@/app/components/table/Table';
import { CardBackgrounds } from '@/lib/ui/class/classNames';
import clsx from 'clsx';
import CustomerReservation from './CustomerReservation';
import { AxiosResponse } from 'axios';
import { KeyedMutator } from 'swr';
import CountDown from '@/app/components/views/CountDown';


type Props = {
    reservations: customerTemporaryReservationsType[],
    refetch: KeyedMutator<AxiosResponse<unknown, unknown>>
}

const CustomerReservationTable = ({ reservations, refetch }: Props) => {

    const tableHead: TableHead[] = [
        {
            id: 1,
            key: "",
            name: "رقم الححز",
            type: "number",
            icon: <FaIdCard size={17.5} />,
            render: (row: customerTemporaryReservationsType) => row.id_reservation,
        },
        {
            id: 3,
            key: "",
            name: "السيارة",
            type: "number",
            icon: <IoCarSport size={17.5} />,
            render: (row: customerTemporaryReservationsType) => row.car.brand + " " + row.car.model,
        },
        {
            id: 4,
            key: "",
            name: "الوقت المتبقي لالغاء الحجز",
            type: "string",
            icon: <FaHourglassEnd size={17.5} />,
            render: (row: customerTemporaryReservationsType) => {

                if (!!row.remaining_time) {
                    return <CountDown mint={row.remaining_time.mint} second={row.remaining_time.second} />
                } else {
                    return "الحجز غير مؤقت"
                }
            },
        },
        {
            id: 5,
            key: "",
            name: "تاريخ الأستلام",
            type: "string",
            icon: <FaHourglassStart size={17.5} />,
            render: (row: customerTemporaryReservationsType) => {
                const isoString = row.start_date;
                const date = new Date(isoString);

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');

                return `${year}/${month}/${day} ${hours}:${minutes}`;
            },
        },
        {
            id: 6,
            key: "",
            name: "تاريخ أنتهاء الحجز",
            type: "string",
            icon: <FaCalendarCheck size={17.5} />,
            render: (row: customerTemporaryReservationsType) => {
                const isoString = row.end_date;
                const date = new Date(isoString);

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');

                return `${year}/${month}/${day} ${hours}:${minutes}`;
            },
        },
        {
            id: 7,
            key: "",
            name: "حالة الحجز",
            type: "string",
            icon: <BsFillPatchQuestionFill size={17.5} />,
            render: (row: customerTemporaryReservationsType) => (
                <Chip
                    value={row.status_reservation}
                    variant='filled'
                    color={row.status_reservation === "محجوزة" ? "green" : row.status_reservation === "حجز مؤقت" ? "amber" : row.status_reservation === "منتهية الصلاحية" ? "red" : "blue"}
                    className='w-fit'
                />
            )
        },
        {
            id: 8,
            key: "",
            name: "",
            type: "string",
            render: (row: customerTemporaryReservationsType) => (
                <CustomerReservation
                    Reservation={row}
                    refetch={refetch}
                />
            )
        },
    ];
    return (
        <>
            <Card
                className={clsx(CardBackgrounds, 'w-full')}
            >
                <CardBody
                    className='p-0 min-w-full overflow-scroll'
                >

                    <Table
                        tableHead={tableHead}
                        tableRows={reservations}
                        height={10}
                        size={5}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default CustomerReservationTable