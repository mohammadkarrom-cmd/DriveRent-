import { BsBuildingFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { TbBrandGoogleBigQuery } from "react-icons/tb";

export const paths = {
    home: "/",
    login: "/auth/login",
    register: "/auth/register",
    manager: {
        home: "/manager",
        cars: {
            index: "/manager/cars",
            view: "/manager/cars/table"
        },
        employees: {
            index: "/manager/employees"
        }
    },
    admin: {
        home: "/admin",
        office: {
            list: "/admin/office",
            managers: (id: number, name: string) => {
                const safeName = encodeURIComponent(name);
                const url = `/admin/office/${id}/${safeName}`;

                return url;
            }
        },
        customers: {
            list: "/admin/customers"
        },
        categories: "/admin/categories"
    },
    employee: {
        reservations: {
            index: "/employee/reservations",
            temporary: "/employee/reservations/temporary",
            all: "/employee/reservations/all",
            fake: "/employee/reservations/fake",
        }
    },
    cars: {
        cars: "/cars",
        car: (id: number) => "/cars/" + id,
        search: "/cars/search"
    },
    customer: {
        temporaryReservations: "/customer/temporary-reservations",
        cars: "/customer/cars",
        office: {
            evaluate: "/customer/office/evaluate"
        }
    },
    offices: {
        index: "/offices",
        office: (id: number) => `/offices/${id}`
    }
};

export const socialLinks: SocialLinkType[] = [
    {
        label: "telegram",
        color: "blue",
        icon: FaTelegram,
        href: "telegram"
    },
    {
        label: "facebook",
        color: "blue",
        icon: FaFacebook,
        href: "facebook"
    },
    {
        label: "instagram",
        color: "orange",
        icon: RiInstagramFill,
        href: "instagram"
    },
];

export const appNavLinks: AppNavLinkType[] = [
    {
        label: "الرئيسية",
        href: paths.home,
        icon: IoIosHome
    },
    {
        label: "السيارات",
        href: paths.cars.cars,
        icon: IoCarSport
    },
    {
        label: "البحث",
        href: paths.cars.search,
        icon: TbBrandGoogleBigQuery
    },
    {
        label: "المكاتب",
        href: paths.offices.index,
        icon: BsBuildingFill
    },
]

export const footerLinks: FooterLinkType[] = [
    {
        group: "الصفحات",
        links: [
            {
                label: "الرئيسية",
                href: paths.home
            },
            {
                label: "السيارات",
                href: paths.cars.cars
            },
            {
                label: "البحث",
                href: paths.cars.search
            }
        ]
    }
];
