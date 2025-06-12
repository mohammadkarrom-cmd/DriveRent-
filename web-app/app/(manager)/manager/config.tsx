import { paths } from "@/app/components/layout/config-nav";
import { BsMicrosoftTeams } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { IoLogoModelS } from "react-icons/io";

export const managerLinks: MenuLinkType[] = [
    {
        label: "الرئيسية",
        icon: <FaChartLine />,
        path: paths.manager.home,
        Links: undefined
    },
    {
        label: "السيارات",
        icon: <IoLogoModelS />,
        path: paths.manager.cars.index,
        Links: undefined
    },
    {
        label: "الموظفين",
        icon: <BsMicrosoftTeams />,
        path: paths.manager.employees.index,
        Links: undefined
    },
]; 