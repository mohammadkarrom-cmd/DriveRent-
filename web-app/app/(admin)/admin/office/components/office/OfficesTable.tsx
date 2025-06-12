import { paths } from "@/app/components/layout/config-nav"
import Table from "@/app/components/table/Table"
import { CardBackgrounds } from "@/lib/ui/class/classNames"
import { Button, Card, CardBody } from "@/lib/ui/MTFix"
import { AxiosResponse } from "axios"
import clsx from "clsx"
import Link from "next/link"
import { FaBuilding } from "react-icons/fa"
import { FaMapLocationDot, FaPhoneFlip } from "react-icons/fa6"
import { MdManageAccounts } from "react-icons/md"
import { KeyedMutator } from "swr"
import EditOffice from "./EditOffice"

type Props = {
  offices: OfficeType[],
  mutate: KeyedMutator<AxiosResponse<unknown, unknown>>
}

const OfficesTable = ({ offices, mutate }: Props) => {
  const tableHead: TableHead[] = [
    {
      id: 1,
      key: "name",
      name: "اسم المكتب",
      type: "string",
      render: (row: OfficeType) => row.name,
      icon: <FaBuilding size={17.5} />
    },
    {
      id: 2,
      key: "location",
      name: "موقع المكتب",
      type: "string",
      render: (row: OfficeType) => row.location,
      icon: <FaMapLocationDot size={17.5} />
    },
    {
      id: 3,
      key: "phone_number_1",
      name: "رقم الهاتف الأول",
      type: "string",
      render: (row: OfficeType) => row.phone_number_1,
      icon: <FaPhoneFlip size={17.5} />
    },
    {
      id: 4,
      key: "phone_number_2",
      name: "رقم الهاتف الثاني",
      type: "string",
      render: (row: OfficeType) => row.phone_number_2,
      icon: <FaPhoneFlip size={17.5} />
    },
    {
      id: 5,
      key: "edit",
      name: "",
      className: "",
      type: "string",
      render(row: OfficeType) {
        return (
          <EditOffice
            mutate={mutate}
            office={row}
          />
        )
      },
    },
    {
      id: 6,
      key: "view",
      name: "",
      className: "",
      type: "string",
      render(row: OfficeType) {
        return (
          <Link href={paths.admin.office.managers(row.id_office,row.name)} >
            <Button
              variant='filled'
              color="blue"
              className='flex gap-0.5 shadow-none'
              size='sm'
            >
              <MdManageAccounts
                size={15}
              />
              عرض مدراء المكتب
            </Button>
          </Link>
        )
      },
    },
  ];

  return (
    <Card
      className={clsx(CardBackgrounds, 'w-full')}
    >
      <CardBody
        className='p-0 min-w-full overflow-scroll'
      >
        <Table
          tableHead={tableHead}
          tableRows={offices}
          height={10}
          size={5}
        />
      </CardBody>
    </Card>
  )
}

export default OfficesTable