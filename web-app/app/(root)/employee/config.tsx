import { paths } from "@/app/components/layout/config-nav";
import { TbTransactionDollar } from "react-icons/tb";

export const employeeLinks: MenuLinkType[] = [
    {
        label: "الحجوزات",
        icon: <TbTransactionDollar />,
        path: paths.employee.reservations.index,
        Links: [
            {
                label: "جميع الحجوزات",
                path: paths.employee.reservations.all,
                icon: <TbTransactionDollar />
            },
            {
                label: "الحجوزات المؤقتة",
                icon: <TbTransactionDollar />,
                path: paths.employee.reservations.temporary,
            },
            {
                label: "الحجوزات الوهمية",
                icon: <TbTransactionDollar />,
                path: paths.employee.reservations.fake,
            }
        ]
    }
]; 