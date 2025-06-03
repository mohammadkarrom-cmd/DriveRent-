"use client"

import { endpoints } from '@/app/api/common';
import NormalLoading from '@/app/components/loaders/NormalLoading';
import SimplePagination from '@/app/components/Pagination/SimplePagination';
import fetchApi from '@/lib/api/data/dataFetcher';
import useBoolean from '@/lib/hooks/use-boolean';
import { BorderPrimary, CardBackgrounds, TextPrimary } from '@/lib/ui/class/classNames';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@/lib/ui/MTFix';
import { splitArrayIntoChunks } from '@/lib/utils/arrays';
import { AxiosError, AxiosResponse } from 'axios';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { TbBrandGoogleBigQuery } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { KeyedMutator } from 'swr';
import CarsMangerHeader from './CarsMangerHeader';

const CarsList = dynamic(() => import("@/app/(root)/components/car/mangers/CarsList"), { loading: () => <NormalLoading />, ssr: false })

type Props = {
    response: MangerCarsListResponseType,
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>
}

type searchResponseType = {
    cars: CarType[]
};

const CarsManger = ({ response, mutate }: Props) => {
    const cars = response.cars
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [brand, setBrand] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    const loading = useBoolean({ initialState: false });
    const firstInter = useBoolean({ initialState: true });

    const [result, setResult] = useState<Array<Array<CarType>>>([]);

    const chunkedCars = splitArrayIntoChunks(cars, 2);

    const handleSearch = async () => {
        loading.onTrue();
        const query = endpoints.cars.adminSearch(brand, model,category);

        if (!query) {
            toast.warning("ادخل قيم في خيارات البحث", { toastId: "customer-search-warning" })
            setResult([]);
        } else {
            firstInter.onFalse();
            const dataPromise = fetchApi(query);
            await dataPromise.then((data) => {
                setCurrentPage(0)
                toast.success("تم البحث بنجاح", { toastId: query })
                const response = data.data as searchResponseType;
                setResult(splitArrayIntoChunks(response.cars, 2));
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
        loading.onFalse();
    }

    return (
        <Card
            className={clsx(CardBackgrounds, TextPrimary, 'p-0')}
            shadow={false}
        >
            <CardHeader
                floated={false}
                shadow={false}
                color='transparent'
                className={clsx('text-inherit p-5 m-0 mb-5 border-b rounded-b-none ', BorderPrimary)}
            >
                <CarsMangerHeader
                    model={model}
                    setModel={setModel}
                    brand={brand}
                    setBrand={setBrand}
                    category={category}
                    setCategory={setCategory}
                    categories={response.category_list}
                />
                <Button
                    variant='gradient'
                    className='bg-opacity-40 from-primary-light via-primary-main to-primary-dark h-fit flex items-center justify-center gap-1.5 hover:bg-opacity-100 text-white active:scale-105 transition-all duration-300 md:max-w-96 mt-5'
                    loading={loading.value}
                    fullWidth
                    onClick={handleSearch}
                >
                    بحث <TbBrandGoogleBigQuery />
                </Button>
            </CardHeader>

            {
                firstInter.value
                    ? <>
                        <CardBody
                            className='flex items-center justify-center p-0'
                        >
                            <CarsList
                                cars={chunkedCars[currentPage]}
                                categories={response.category_list}
                                mutate={mutate}
                            />
                        </CardBody>
                        <CardFooter>
                            <SimplePagination
                                currentPage={currentPage}
                                maxPages={chunkedCars.length}
                                setCurrentPage={setCurrentPage}
                                maxView={5}
                            />
                        </CardFooter>
                    </>

                    : result.length > 0
                        ? <>
                            <CardBody
                                className='flex items-center justify-center p-0'
                            >
                                <CarsList
                                    cars={result[currentPage]}
                                    mutate={mutate}
                                    categories={response.category_list}
                                />
                            </CardBody>
                            <CardFooter>
                                <SimplePagination
                                    currentPage={currentPage}
                                    maxPages={result.length}
                                    setCurrentPage={setCurrentPage}
                                    maxView={5}
                                />
                            </CardFooter>
                        </>
                        : <div
                            className='p-5 flex flex-col justify-center items-center gap-5'
                        >
                            <Typography color='red' variant='small'>
                                لا يوجد نتائج
                            </Typography>
                            <Button
                                color='amber'
                                onClick={() => {
                                    setBrand("");
                                    setModel("");
                                    firstInter.onTrue();
                                }}
                            >
                                إعادة تعيين
                            </Button>
                        </div>
            }
        </Card>
    )
}

export default CarsManger