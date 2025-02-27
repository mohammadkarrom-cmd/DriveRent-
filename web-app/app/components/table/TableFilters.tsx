"use client"

import clsx from 'clsx';
import { Input, Option, Select } from '@/lib/ui/MTFix'


const TableFilters = () => {

    return (
        <div
            className={clsx("m-0 flex justify-between")}
        >
            <Input
                crossOrigin={undefined}
                label='search'
                type='search'
            />
            <div className="w-72">
                <Select label="Select Version"   >
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                </Select>
            </div>
        </div>
    )
}

export default TableFilters