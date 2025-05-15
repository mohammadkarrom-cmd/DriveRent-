import Table from '@/app/components/table/Table';
import { CardBackgrounds } from '@/lib/ui/class/classNames';
import { Card, CardBody, Chip } from '@/lib/ui/MTFix'
import clsx from 'clsx';
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { FaCalendarCheck, FaHourglassEnd, FaHourglassStart, FaIdCard } from 'react-icons/fa';
import { IoCarSport } from 'react-icons/io5';
import Reservation from './Reservation';
import { carStatusParser } from '@/lib/api/data/carCategory';
import { KeyedMutator } from 'swr';
import { AxiosResponse } from 'axios';

type Props = {
    reservations: reservationsType[],
    refetch: KeyedMutator<AxiosResponse<unknown, unknown>>
}

const ReservationsTable = ({ reservations, refetch }: Props) => {
    const tableHead: TableHead[] = [
        {
            id: 1,
            key: "",
            name: "رقم الححز",
            type: "number",
            icon: <FaIdCard size={17.5} />,
            render: (row: reservationsType) => row.id_reservation,
        },
        {
            id: 2,
            key: "",
            name: "الزبون",
            type: "number",
            icon: <FaIdCard size={17.5} />,
            render: (row: reservationsType) => row.customer.first_name + " " + row.customer.last_name,
        },
        {
            id: 3,
            key: "",
            name: "السيارة",
            type: "number",
            icon: <IoCarSport size={17.5} />,
            render: (row: reservationsType) => row.car.brand + " " + row.car.model,
        },
        {
            id: 4,
            key: "",
            name: "تاريخ الحجز",
            type: "string",
            icon: <FaCalendarCheck size={17.5} />,
            render: (row: reservationsType) => {
                const isoString = row.time_reservation;
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
            id: 5,
            key: "",
            name: "تاريخ الأستلام",
            type: "string",
            icon: <FaHourglassStart size={17.5} />,
            render: (row: reservationsType) => {
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
            icon: <FaHourglassEnd size={17.5} />,
            render: (row: reservationsType) => {
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
            render: (row: reservationsType) => (
                <Chip
                    value={carStatusParser(row.status_reservation)}
                    variant='filled'
                    color={row.status_reservation === 4 ? "red" : row.status_reservation === 2 ? "amber" : row.status_reservation === 3 ? "green" : "blue"}
                    className='w-fit'
                />
            )
        },
        {
            id: 8,
            key: "",
            name: "",
            type: "string",
            render: (row: reservationsType) => (
                <Reservation
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

export default ReservationsTable