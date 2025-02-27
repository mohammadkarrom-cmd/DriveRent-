"use client";

import dynamic from 'next/dynamic';
import Error from '../../error';
import Loading from '../../loading';
import useSWR from 'swr';
import { endpoints } from '@/app/api/common';
import fetchApi from '@/lib/api/data/dataFetcher';
import Paradox from './Paradox';
import NormalLoading from '@/app/components/loaders/NormalLoading';

const TopCars  = dynamic(() => import("./TopCars"),{ssr: false,loading: () => <NormalLoading />});
const RandomCars  = dynamic(() => import("./RandomCars"),{ssr: false,loading: () => <NormalLoading />});




const HomeCars = () => {
    const { data: homeData, error, isLoading } = useSWR(endpoints.home, fetchApi);

    if (isLoading) return <Loading />
    if (error) return <Error error={error} />;

  const home = homeData.data as customerHomeType;

    return (
        <>
            <TopCars
                cars={home.cars_new}
            />
            <Paradox />
            <RandomCars
                cars={home.cars_random}
            />
        </>
    )
}

export default HomeCars