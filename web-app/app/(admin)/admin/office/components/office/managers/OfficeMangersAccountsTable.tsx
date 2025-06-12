import { endpoints } from "@/app/api/common"
import Table from "@/app/components/table/Table"
import dataMutate from "@/lib/api/data/dataMutate"
import { METHODS } from "@/lib/api/setup/api"
import { CardBackgrounds, TextPrimary } from "@/lib/ui/class/classNames"
import { Card, CardBody, Checkbox, Chip, Typography } from "@material-tailwind/react"
import { AxiosResponse } from "axios"
import clsx from "clsx"
import { BsFillPatchCheckFill, BsFillPatchExclamationFill, BsFillPatchQuestionFill } from "react-icons/bs"
import { FaIdCard } from "react-icons/fa"
import { FaPhoneFlip } from "react-icons/fa6"
import { MdManageAccounts, MdOutlineShortText } from "react-icons/md"
import { toast } from "react-toastify"
import { KeyedMutator } from "swr"
import EditOfficeAccount from "./EditOfficeAccount"

type Props = {
  mutate: KeyedMutator<AxiosResponse<unknown,unknown>>
  accounts: OfficeManger[],

}

const OfficeMangersAccountsTable = ({accounts,mutate}: Props) => {

  const tableHead: TableHead[] = [
    {
               id: 1,
               key: "",
               name: "الحساب",
               type: "string",
               icon: <FaIdCard size={17.5} />,
               render(row: OfficeManger) {
                   return (
                       <div
                           className={clsx(TextPrimary, 'flex gap-2 p-2')}
                       >
                           <div>
                               <Typography
                                   variant='small'
                               >
                                   {row.user.email}
                               </Typography>
                               <Typography
                                   variant='small'
                               >
                                   {row.user.username}
                               </Typography>
                           </div>
                       </div>
                   )
               },
           },
           {
               id: 2,
               key: "",
               name: "نوع الحساب",
               type: "string",
               icon: <MdManageAccounts size={17.5} />,
               render: (row: OfficeManger) => row.user.account_type,
           },
           {
               id: 2,
               key: "",
               name: "الاسم الأول",
               type: "string",
               icon: <MdOutlineShortText size={17.5} />,
               render: (row: OfficeManger) => row.user.first_name,
           },
           {
               id: 3,
               key: "",
               name: "الأسم الأخير",
               type: "string",
               icon: <MdOutlineShortText size={17.5} />,
               render: (row: OfficeManger) => row.user.last_name,
           },
           {
               id: 4,
               key: "",
               name: "رقم الهاتف",
               type: "string",
               icon: <FaPhoneFlip size={15} />,
               render: (row: OfficeManger) => row.user.phone,
           },
           {
               id: 5,
               key: "",
               name: "حالة الحساب",
               type: "boolean",
               className: "flex justify-center items-center",
               icon: <BsFillPatchQuestionFill size={17.5} />,
               render(row: OfficeManger) {
                   const ToggleActivation = async () => {
                       const action = row.user.is_active ? "deactivate" : "activate"
                       const data = {
                           id: [row.user.id],
                           action: action
                       }
   
                       const promise = dataMutate(endpoints.employee.switch, METHODS.POST, data);
   
                       await promise.then(() => {
                           toast.success(`تم ${row.user.is_active ? "الغاء" : ""} التنشيط بنجاح`)
                           mutate()
                       }).catch((error => {
                        toast.error("حدث خطاء بالاتصال")
                        console.log(error);
                      }))
   
                   }
                   return (
                       <div
                           className='w-full flex justify-center items-center'
                       >
                           <Checkbox
                               checked={row.user.is_active}
                               crossOrigin={undefined}
                               color='green'
                               onChange={ToggleActivation}
                           />
                           {row.user.is_active
                               ? <Chip
                                   value={
                                       <Typography
                                           className='flex items-center gap-1.5 text-inherit text-xs'
                                           variant='small'
                                       >
                                           <BsFillPatchCheckFill size={16} /> نشط
                                       </Typography>
                                   }
                                   color='green'
                                   className='w-fit'
                               />
                               : <Chip
                                   value={
                                       <Typography
                                           className='flex items-center gap-1.5 text-inherit text-xs'
                                           variant='small'
                                       >
                                           <BsFillPatchExclamationFill size={16} /> غير نشط
                                       </Typography>
                                   }
                                   color='red'
                                   className='w-fit'
                               />
                           }
                       </div>
                   )
               }
           },
           {
            id: 6,
            key: "edit",
            name: "",
            className: "",
            type: "string",
            render(row: OfficeManger) {
              return (
               <EditOfficeAccount 
                mutate={mutate}
                account={row}
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

export default OfficeMangersAccountsTable