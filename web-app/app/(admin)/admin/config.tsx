import { paths } from "@/app/components/layout/config-nav";
import { BiSolidCategory } from "react-icons/bi";
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
    {
        label: "تصنيفات السيارات",
        icon: <BiSolidCategory />,
        path: paths.admin.categories,
        Links: undefined
    },
]; 