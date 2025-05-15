import { paths } from "@/app/components/layout/config-nav";
import { BsMicrosoftTeams } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { IoLogoModelS } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";

export const adminLinks: MenuLinkType[] = [
    {
        label: "الرئيسية",
        icon: <FaChartLine />,
        path: paths.admin.home,
        Links: undefined
    },
    {
        label: "السيارات",
        icon: <IoLogoModelS />,
        path: paths.admin.cars.index,
        Links: [
            {
                label: "عرض السيارات",
                path: paths.admin.cars.view,
                icon: <IoCarSport />
            }
        ]
    },
    {
        label: "الموظفين",
        icon: <BsMicrosoftTeams />,
        path: paths.admin.employees.index,
        Links: undefined
    },
]; 