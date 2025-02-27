import { paths } from "@/app/components/layout/config-nav";
import { IoLogoModelS } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";
import { TbTransactionDollar } from "react-icons/tb";

export const employeeLinks: MenuLinkType[] = [
    {
        label: "الحجوزات",
        icon: <TbTransactionDollar />,
        path: paths.employee.reservations,
        Links: undefined
    },
    {
        label: "السيارات",
        icon: <IoLogoModelS />,
        path: paths.employee.cars.index,
        Links: [
            {
                label: "عرض السيارات",
                path: paths.employee.cars.view,
                icon: <IoCarSport />
            }
        ]
    },
]; 