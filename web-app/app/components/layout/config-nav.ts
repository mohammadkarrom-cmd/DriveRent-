import { FaFacebook } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { TbBrandGoogleBigQuery, TbListDetails } from "react-icons/tb";

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
            managers: (id: number, name: string) => `/admin/office/${id}/${name}`
        },
        customers: {
            list: "/admin/customers"
        },
        categories: "/admin/categories"
    },
    employee: {
        cars: {
            index: "/employee/cars",
            view: "/employee/cars/table"
        },
        reservations: "/employee/reservations"
    },
    cars: {
        cars: "/cars",
        car: (id: number) => "/cars/" + id,
        search: "/cars/search"
    },
    customer: {
        temporaryReservations: "/customer/temporary-reservations"
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

export const temporaryReservationsLink: AppNavLinkType = {
    label: "الحجوزات",
    href: paths.customer.temporaryReservations,
    icon: TbListDetails
}