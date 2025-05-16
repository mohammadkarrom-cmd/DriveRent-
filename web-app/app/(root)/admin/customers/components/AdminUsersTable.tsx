import Table from "@/app/components/table/Table"
import { CardBackgrounds, TextPrimary } from "@/lib/ui/class/classNames"
import { Card, CardBody, Typography } from "@material-tailwind/react"
import clsx from "clsx"
import { FaIdCard } from "react-icons/fa"
import { FaPhoneFlip } from "react-icons/fa6"
import { MdOutlineShortText } from "react-icons/md"
import AdminViewUser from "./AdminViewUser"

type Props = {
    accounts: AdminCustomerType[],

}

const AdminUsersTable = ({ accounts }: Props) => {

    const tableHead: TableHead[] = [
        {
            id: 1,
            key: "",
            name: "الحساب",
            type: "string",
            icon: <FaIdCard size={17.5} />,
            render(row: AdminCustomerType) {
                return (
                    <div
                        className={clsx(TextPrimary, 'flex gap-2 p-2')}
                    >
                        <div>
                            <Typography
                                variant='small'
                            >
                                {row.email}
                            </Typography>
                            <Typography
                                variant='small'
                            >
                                {row.username}
                            </Typography>
                        </div>
                    </div>
                )
            },
        },
        {
            id: 2,
            key: "",
            name: "الاسم الأول",
            type: "string",
            icon: <MdOutlineShortText size={17.5} />,
            render: (row: AdminCustomerType) => row.first_name,
        },
        {
            id: 3,
            key: "",
            name: "الأسم الأخير",
            type: "string",
            icon: <MdOutlineShortText size={17.5} />,
            render: (row: AdminCustomerType) => row.last_name,
        },
        {
            id: 4,
            key: "",
            name: "رقم الهاتف",
            type: "string",
            icon: <FaPhoneFlip size={15} />,
            render: (row: AdminCustomerType) => row.phone,
        },
        {
            id: 5,
            key: "view",
            name: "",
            className: "",
            type: "string",
            render(row: AdminCustomerType) {
              return (
             <AdminViewUser 
                userId={row.id_customer}
             />
              )
            },
          },
    ]


    return (
        <Card
            className={clsx(CardBackgrounds, 'w-full')}
        >
            <CardBody
                className='p-0 min-w-full overflow-scroll'
            >
                <Table
                    tableHead={tableHead}
                    tableRows={accounts}
                    height={10}
                    size={5}
                />
            </CardBody>
        </Card>
    )
}

export default AdminUsersTable