"use client"

import { endpoints } from "@/app/api/common";
import Empty from "@/app/components/views/Empty";
import fetchApi from "@/lib/api/data/dataFetcher";
import { AxiosError } from "axios";
import useSWR from "swr";
import Error from "../../error";
import Loading from "../../loading";
import OfficeRatings from "./OfficeRatings";

const AdminPageContent2 = () => {
    const { data: response, error, isLoading } = useSWR(endpoints.cars.rating, fetchApi);

    if (isLoading) return <Loading />
    else if (error) {
        if (error instanceof AxiosError) {
            if (error.status !== 404) {
                return Empty({
                    title: "لا يوجد اي حجوزات مؤقتة حاليا",
                    body: "الرجاء التحلي بالصبر و المحاولة لاحقا"
                })
            }
        } else {
            return <Error error={error} />;
        }
    }

    const data = response.data as OfficeRatingType;

    return (
        <div>
            <OfficeRatings
                officeRating={data}
            />
        </div>
    )
}

export default AdminPageContent2