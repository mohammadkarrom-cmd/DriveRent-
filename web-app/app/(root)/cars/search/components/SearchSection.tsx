"use client"

import TopCarCard from '@/app/(root)/components/car/TopCarCard'
import Error from '@/app/(root)/error'
import { endpoints } from '@/app/api/common'
import NormalLoading from '@/app/components/loaders/NormalLoading'
import SimplePagination from '@/app/components/Pagination/SimplePagination'
import Empty from '@/app/components/views/Empty'
import fetchApi from '@/lib/api/data/dataFetcher'
import useBoolean from '@/lib/hooks/use-boolean'
import { Backgrounds, shadowPrimary, TextPrimary } from '@/lib/ui/class/classNames'
import { Button, Option, Select } from '@/lib/ui/MTFix'
import { splitArrayIntoChunks } from '@/lib/utils/arrays'
import { AxiosError } from 'axios'
import clsx from 'clsx'
import { uniqueId } from 'lodash'
import { useState } from 'react'
import { TbBrandGoogleBigQuery } from 'react-icons/tb'
import { toast } from 'react-toastify'
import useSWR from 'swr'


const SearchSection = () => {
    const [category, setCategory] = useState<string>("");
    const [rentType, setRentType] = useState<string>("");
    const loading = useBoolean({ initialState: false });
    const firstInter = useBoolean({ initialState: true });

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [result, setResult] = useState<Array<CarType[]>>([]);


    const handleSearch = async () => {
        firstInter.onFalse();
        loading.onTrue();

        const categoryId = category.length > 0 ? category : null;
        const rentTypeId = rentType.length > 0 ? rentType : null;

        const query = endpoints.cars.customerSearch(categoryId, rentTypeId);
        if (!query) {
            toast.warning("ادخل قيم في خيارات البحث", { toastId: "customer-search-warning" })
            setResult([]);
        } else {
            const dataPromise = fetchApi(query);
            dataPromise.then((data) => {
                toast.success("تم البحث بنجاح", { toastId: query })
                setResult(splitArrayIntoChunks(data.data as CarType[], 1));
            }).catch((error) => {
                if (error instanceof AxiosError) {
                    if (error.status === 404) {
                        toast.error("لا توجد سيارات متطابقة مع البحث", { toastId: query });
                        setResult([]);
                    } else {
                        toast.error("حدث خطأ في البحث");
                    }
                }
            })
        }
        setCurrentPage(0)
        loading.onFalse();
    }

    const { data: data, error, isLoading } = useSWR(endpoints.cars.categories, fetchApi);

    
    if (isLoading) {
        return <NormalLoading />
    }
    if (error) {
        return Error(error)
    }
    
    const categories = data.data as CategoryType[];
    
    return (
        <section>
            <section
                className='flex  gap-5 flex-wrap'
            >
                <div
                    className='md:max-w-[40%] w-full'
                >
                    <Select
                        label='التصنيف'
                        color='green'
                        name='category'
                        menuProps={{
                            className: clsx(Backgrounds, shadowPrimary, TextPrimary, "shadow border-none")
                        }}
                        labelProps={{
                            dir: "ltr"
                        }}
                        value={category}
                        onChange={(value) => setCategory(value)}

                    >
                        <Option
                            value=''
                            className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                        >
                            غير محدد
                        </Option>
                        {
                            categories.map((category) => (
                                <Option
                                    value={category.id_car_type.toString()}
                                    key={category.id_car_type}
                                    className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                                >
                                    {category.name}
                                </Option>
                            ))
                        }
                    </Select>
                </div>
                <div
                    className='md:max-w-[40%] w-full'
                >
                    <Select
                        label='نوع الإيجار'
                        color='green'
                        name='category'
                        menuProps={{
                            className: clsx(Backgrounds, shadowPrimary, TextPrimary, "shadow border-none")
                        }}
                        labelProps={{
                            dir: "ltr"
                        }}
                        value={rentType}
                        onChange={(value) => setRentType(value)}
                    >
                        <Option
                            value=''
                            className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                        >
                            غير محدد
                        </Option>
                        <Option
                            value='1'
                            className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                        >
                            متاح للإيجار اليومي
                        </Option>
                        <Option
                            value='2'
                            className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                        >
                            متاح للإيجار الشهري
                        </Option>
                        <Option
                            value='3'
                            className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                        >
                            متاح للإيجار السنوي
                        </Option>
                    </Select>
                </div>
                <Button
                    variant='gradient'
                    className='text-lg bg-opacity-40 from-primary-light via-primary-main to-primary-dark h-fit flex items-center justify-center gap-1.5 hover:bg-opacity-100 text-white active:scale-105 transition-all duration-300 md:max-w-96'
                    loading={loading.value}
                    fullWidth
                    onClick={handleSearch}
                >
                    بحث <TbBrandGoogleBigQuery />
                </Button>
            </section>
            {
                loading.value ?
                    <NormalLoading />
                    : result.length > 0
                        ? <>
                            <ol
                                className='flex flex-col gap-5 my-5 max-h-[55vh] overflow-scroll'
                            >
                                {
                                    result[currentPage].map(car => (
                                        <TopCarCard
                                            car={car}
                                            key={uniqueId()}
                                        />
                                    ))
                                }
                            </ol>
                            <SimplePagination
                                currentPage={currentPage}
                                maxPages={result.length}
                                setCurrentPage={setCurrentPage}
                                maxView={5}
                            />
                        </>
                        : !firstInter.value &&
                        <Empty
                            title='لا توجد سيارات متطابقة مع البحث'
                            body='غير القيم و أعد المحوالة'
                        />
            }
        </section>
    )
}

export default SearchSection