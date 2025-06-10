"use client";

import { endpoints } from '@/app/api/common';
import NormalLoading from '@/app/components/loaders/NormalLoading';
import fetchApi from '@/lib/api/data/dataFetcher';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import OfficesList from '../../customer/office/components/OfficesList';
import Error from '../../error';
import Loading from '../../loading';
import HowWeWorks from './HowWeWorks';
import Paradox from './Paradox';

const TopCars = dynamic(() => import("./TopCars"), { ssr: false, loading: () => <NormalLoading /> });
const RandomCars = dynamic(() => import("./RandomCars"), { ssr: false, loading: () => <NormalLoading /> });




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
            <HowWeWorks />
            <OfficesList
                offices={home.offices}
                view
            />
        </>
    )
}

export default HomeCars