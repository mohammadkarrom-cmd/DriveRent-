"use client"

import TableHeader from './TableHeader'
import React, { useState } from 'react'
import TableBody from './TableBody'
import clsx from 'clsx'
import { splitArrayIntoChunks } from '@/lib/utils/arrays'
import SimplePagination from '../Pagination/SimplePagination'

type Props = {
    tableHead: TableHead[],
    tableRows: TableBody[],
    height: number,
    size: number;
}

const Table = ({ tableHead, tableRows, height, size }: Props) => {
    const [currentPage, setCurrentPage] = useState<number>(0);

    const chunkedRows = splitArrayIntoChunks(tableRows, size);

    return (
        <>
            <table
                className={clsx('min-w-fit bg-transparent rounded-md p-0 w-full overflow-scroll')}
            >
                <TableHeader
                    tableHead={tableHead}
                />
                {
                    chunkedRows.length > 0
                        ? < TableBody
                            tableHead={tableHead}
                            tableRows={chunkedRows[currentPage]}
                            height={height}
                        />
                        : <></>
                }
            </table>
            <div
                className='p-5 w-full flex justify-start items-center'
            >
                <SimplePagination
                    currentPage={currentPage}
                    maxPages={chunkedRows.length}
                    maxView={5}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    )
}

export default Table