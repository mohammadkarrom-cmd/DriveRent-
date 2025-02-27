
import NormalLoading from "@/app/components/loaders/NormalLoading"
import dynamic from "next/dynamic"
import { AnimatePresence, motion } from "framer-motion"
import { Typography } from "@material-tailwind/react"
import AddCar from "../add/AddCar"
import { KeyedMutator } from "swr"
import { AxiosResponse } from "axios"
const CarCard = dynamic(() => import("@/app/(root)/components/car/mangers/CarCard"), { loading: () => <NormalLoading />, ssr: false })

type Props = {
    cars: CarType[]
    mutate: KeyedMutator<AxiosResponse<unknown, unknown>>
}

const CarsList = ({ cars, mutate }: Props) => {
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
                                        mutate={mutate}
                                    />
                                </motion.div>
                            ))
                            }
                        </AnimatePresence>
                    </ol>
                    : <div className="flex justify-center items-center gap-5 p-5 flex-col">
                        <Typography>
                            no cars available
                        </Typography>
                        <AddCar
                            mutate={mutate}
                        />
                    </div>
            }
        </>
    )
}

export default CarsList