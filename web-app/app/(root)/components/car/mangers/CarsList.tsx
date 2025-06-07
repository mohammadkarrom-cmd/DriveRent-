
import NormalLoading from "@/app/components/loaders/NormalLoading"
import { Typography } from "@material-tailwind/react"
import { AxiosResponse } from "axios"
import { AnimatePresence, motion } from "framer-motion"
import dynamic from "next/dynamic"
import { KeyedMutator } from "swr"
import AddCar from "../add/AddCar"
const CarCard = dynamic(() => import("@/app/(root)/components/car/mangers/CarCard"), { loading: () => <NormalLoading />, ssr: false })

type Props = {
    cars: CarType[]
    categories: CategoryType[]
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>
    isCustomer?: boolean
}

const CarsList = ({ cars, mutate, categories,isCustomer }: Props) => {
    return (
        <>
            {
                !!cars && cars.length > 0 ?
                    <ol className="flex flex-col w-full">
                        <AnimatePresence>
                            {cars.map(car => (
                                <motion.div
                                    key={`${car.brand}-${car.model}-${car.id_car}`}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <CarCard
                                        car={car}
                                        categories={categories}
                                        mutate={mutate}
                                    />
                                </motion.div>
                            ))
                            }
                        </AnimatePresence>
                    </ol>
                    : <div className="flex justify-center items-center gap-5 p-5 flex-col">
                        <Typography>
                            لا يوجد اي سيارات حاليا
                            قم باضافة سيارة جديدة الأن
                        </Typography>
                        <AddCar
                            mutate={mutate}
                            categories={categories}
                            isCustomer={isCustomer}
                        />
                    </div>
            }
        </>
    )
}

export default CarsList