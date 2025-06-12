import { paths } from "@/app/components/layout/config-nav";
import { TbTransactionDollar } from "react-icons/tb";

export const employeeLinks: MenuLinkType[] = [
    {
        label: "جميع الحجوزات",
        icon: <TbTransactionDollar />,
        path: paths.employee.reservations.all,
        Links: undefined
    },
    {
        label: "الحجوزات المؤقتة",
        icon: <TbTransactionDollar />,
        path: paths.employee.reservations.temporary,
        Links: undefined
    },
    {
        label: "الحجوزات الوهمية",
        icon: <TbTransactionDollar />,
        path: paths.employee.reservations.fake,
        Links: undefined
    }

]; 