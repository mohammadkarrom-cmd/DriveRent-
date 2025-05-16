"use client"

import { splitArrayIntoChunks } from '@/lib/utils/arrays'
import { Typography } from '@material-tailwind/react'
import clsx from 'clsx'
import { useState } from 'react'
import SimplePagination from '../Pagination/SimplePagination'
import TableBody from './TableBody'
import TableHeader from './TableHeader'

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
                        : <div 
                        className='w-full h-full p-5 flex justify-center items-center'
                        >
                            <Typography
                            variant='h2'
                            role='p'
                            color='green'
                            className='w-fit'
                            >
                                لا يوجد صفوف
                            </Typography>
                        </div>
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