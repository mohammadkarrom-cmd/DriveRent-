import { paths } from "@/app/components/layout/config-nav";
import { BsBuildingFill } from "react-icons/bs";
import { FaChartLine, FaUsers } from "react-icons/fa";

export const adminLinks: MenuLinkType[] = [
    {
        label: "الرئيسية",
        icon: <FaChartLine />,
        path: paths.admin.home,
        Links: undefined
    },
    {
        label: "المكاتب",
        icon: <BsBuildingFill />,
        path: paths.admin.office.list,
        Links: undefined
    },
    {
        label: "المستخدمين",
        icon: <FaUsers />,
        path: paths.admin.customers.list,
        Links: undefined
    },
]; 