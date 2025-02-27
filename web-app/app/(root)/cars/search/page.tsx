import PageHeader from '@/app/components/layout/header/PageHeader'
import React from 'react'
import dynamic from 'next/dynamic'
import NormalLoading from '@/app/components/loaders/NormalLoading'
import { paths } from '@/app/components/layout/config-nav'
import Link from 'next/link'
const SearchSection = dynamic(() => import('./components/SearchSection'), { loading: () => <NormalLoading /> })
import { Button } from '@/lib/ui/MTFix' 
import { IoChevronBack } from 'react-icons/io5'


const page = () => {


    return (
        <section
            className='p-5 flex flex-col gap-5'
        >
            <PageHeader
                title='البحث في السيارات'
                body='هل ترغب في العثور علي شيء محدد لا تردد في البحث الأن'
                actions={
                    <Link
                        href={paths.cars.cars}
                    >
                        <Button
                            color='amber'
                            variant='filled'
                            size='sm'
                            className='text-lg bg-opacity-40 text-amber-700 h-fit flex items-center gap-1.5 hover:bg-opacity-100 hover:text-white active:scale-105 transition-all duration-300'
                        >
                            العودة <IoChevronBack />
                        </Button>
                    </Link>
                }
            />
            <SearchSection />
        </section>
    )
}

export default page