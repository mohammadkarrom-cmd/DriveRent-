"use client"

import Table from '@/app/components/table/Table'
import React from 'react'
import { FaIdCard } from 'react-icons/fa'
import { Card, CardBody, Checkbox, Chip, IconButton, Menu, MenuHandler, MenuList, Typography } from '@/lib/ui/MTFix'
import clsx from 'clsx'
import { CardBackgrounds, TextPrimary } from '@/lib/ui/class/classNames'
import { MdManageAccounts, MdOutlineShortText } from 'react-icons/md'
import { BsFillPatchCheckFill, BsFillPatchExclamationFill, BsFillPatchQuestionFill } from 'react-icons/bs'
import { TbDotsVertical } from 'react-icons/tb'
import { FaPhoneFlip } from 'react-icons/fa6'
import DeleteEmployee from './DeleteEmployee'
import EditEmployee from './EditEmployee'
import dataMutate from '@/lib/api/data/dataMutate'
import { endpoints } from '@/app/api/common'
import { METHODS } from '@/lib/api/setup/api'
import { KeyedMutator } from 'swr'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'


type Props = {
    employees: EmployeeType[]
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>
}

const EmployeesTable = ({ employees, mutate }: Props) => {
    const tableHead: TableHead[] = [
        {
            id: 1,
            key: "",
            name: "الحساب",
            type: "string",
            icon: <FaIdCard size={17.5} />,
            render(row: EmployeeType) {
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
            name: "نوع الحساب",
            type: "string",
            icon: <MdManageAccounts size={17.5} />,
            render: (row: EmployeeType) => row.account_type,
        },
        {
            id: 2,
            key: "",
            name: "الاسم الأول",
            type: "string",
            icon: <MdOutlineShortText size={17.5} />,
            render: (row: EmployeeType) => row.first_name,
        },
        {
            id: 3,
            key: "",
            name: "الأسم الأخير",
            type: "string",
            icon: <MdOutlineShortText size={17.5} />,
            render: (row: EmployeeType) => row.last_name,
        },
        {
            id: 4,
            key: "",
            name: "رقم الهاتف",
            type: "string",
            icon: <FaPhoneFlip size={15} />,
            render: (row: EmployeeType) => row.phone,
        },
        {
            id: 5,
            key: "",
            name: "حالة الحساب",
            type: "boolean",
            className: "flex justify-center items-center",
            icon: <BsFillPatchQuestionFill size={17.5} />,
            render(row: EmployeeType) {
                const ToggleActivation = async () => {
                    const action = row.is_active ? "deactivate" : "activate"
                    const data = {
                        id: [row.id],
                        action: action
                    }

                    const promise = dataMutate(endpoints.employee.switch, METHODS.POST, data);

                    await promise.then(() => {
                        toast.success(`تم ${row.is_active ? "الغاء" : ""} التنشيط بنجاح`)
                        mutate()
                    }).catch((error => {
                        console.log(error);
                    }))

                }
                return (
                    <div
                        className='w-full flex justify-center items-center'
                    >
                        <Checkbox
                            checked={row.is_active}
                            crossOrigin={undefined}
                            color='green'
                            onChange={ToggleActivation}
                        />
                        {row.is_active
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
            id: 3,
            key: "",
            name: "",
            className: "",
            type: "string",
            // icon: <RiUserSettingsFill size={17.5} />,
            render(row) {
                return (
                    <div className='flex items-center justify-center gap-3'>
                        <Menu
                            placement='bottom-end'
                        >
                            <MenuHandler>
                                <IconButton
                                    variant='text'
                                    className='rounded-full shadow-none active:scale-105'
                                    size='sm'
                                    color='black'
                                >
                                    <TbDotsVertical
                                        size={15}
                                        className={TextPrimary}
                                    />
                                </IconButton>
                            </MenuHandler>
                            <MenuList
                                className={clsx(TextPrimary, 'p-5 border-none bg-background-default-light dark:bg-background-card-dark flex rounded-md shadow shadow-black gap-5 justify-center items-center')}
                                color='transparent'
                            >

                                <EditEmployee
                                    employee={row}
                                    mutate={mutate}
                                />
                                <DeleteEmployee
                                    employee={row}
                                    mutate={mutate}
                                />

                            </MenuList>
                        </Menu>

                    </div>
                )
            },
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
                        tableRows={employees}
                        height={10}
                        size={5}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default EmployeesTable