import CarPageContent from "./components/CarPageContent";


type Props = {
    params: Promise<{
        id: string;
    }>;
};

// export async function generateMetadata({ params }: Props) {
//     const { id } = await params;
//     const carPromise = await fetchApi(endpoints.cars.car(parseInt(id)));
//     const carData = carPromise.data as {
//         car: CarType
//     }

//     if (!carData) return {
//         title: 'car Not Found'
//     }
//     const car = carData.car
//     return {
//         title: car.brand + " - " + car.model,
//         description: `this is ${car.model} page`
//     }
// }

const CarPage = async ({ params }: Props) => {
    const { id } = await params;

    return (
        <>
            <CarPageContent
                id={id}
            />
        </>
    )
}

// export async function generateStaticParams() {
//     const carsPromise = await fetchApi(endpoints.cars.cars);
//     const cars = carsPromise.data as CarType[];
//     return cars.map((car) => ({
//         id: car.id_car.toString()
//     }))
// }

export default CarPage