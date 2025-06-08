import { uniqueId } from "lodash"
import CarNormalCard from "../car/CarNormalCard"

type Props = {
  cars: CarType[]
}

const CarsList = ({ cars }: Props) => {
  return (
    <ul
      className="flex gap-5 w-full overflow-scroll items-center py-5"
    >
      {
        cars.map((car) => (
          <CarNormalCard
            key={uniqueId()}
            car={car}
          />
        ))
      }
    </ul>
  )
}

export default CarsList