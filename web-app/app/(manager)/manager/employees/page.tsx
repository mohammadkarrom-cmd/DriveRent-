"use client"

import ManagementPageHeader from '@/app/components/layout/header/ManagementPageHeader'
import React from 'react'
import EmployeesTable from './components/EmployeesTable'
import AddEmployee from './components/AddEmployee'
import useSWR from 'swr';
import { endpoints } from '@/app/api/common'
import fetchApi from '@/lib/api/data/dataFetcher'
import Error from '../../error'
import Loading from '../../loading'


function EmployeesPage() {
    const { data: employees, error, mutate, isLoading } = useSWR(endpoints.employee.list, fetchApi);

    if (error) Error(error);
    if (isLoading) return <Loading />

    return (
        <section>
            <ManagementPageHeader
                title='الموظفين'
                body='أدارة و متابعة فريق العمل المتألق'
                actions={<AddEmployee
                    mutate={mutate}
                />}
            />
            <section className='my-5'>
                <EmployeesTable
                    employees={employees.data as EmployeeType[]}
                    mutate={mutate}
                />
            </section>
        </section>
    )
}

export default EmployeesPage