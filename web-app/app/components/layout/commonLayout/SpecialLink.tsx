"use client"
import { ROLES } from "@/app/constants";
import { useAuthContext } from "@/lib/context/auth/auth-context";
import { Spinner } from "@material-tailwind/react";
import { BsBuildingFill } from "react-icons/bs";
import { IoCarSport } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { paths } from "../config-nav";
import NavLink from "../nav/NavLink";


const SpecialLink = () => {
    const { user, status } = useAuthContext();

    return (
        <>
            {
                status === 'loading' ?
                    (
                        <Spinner />
                    ) : (
                        status === "authenticated" &&
                            user?.role === ROLES.MANGER
                            ? <NavLink
                                href={paths.manager.cars.index}
                                className="flex gap-1 items-center"
                                includes
                            >
                                <MdAdminPanelSettings />
                                لوحة التحكم
                            </NavLink>

                            : user?.role === ROLES.EMPLOYEE
                                ? <NavLink
                                    href={paths.employee.reservations.all}
                                    className="flex gap-1 items-center"
                                    includes
                                >
                                    <MdAdminPanelSettings />
                                    لوحة التحكم
                                </NavLink>
                                : user?.role === ROLES.ADMIN
                                    ?
                                    <NavLink
                                        href={paths.admin.home}
                                        className="flex gap-1 items-center"
                                        includes
                                    >
                                        <MdAdminPanelSettings />
                                        لوحة التحكم
                                    </NavLink>
                                    : user?.role === ROLES.CUSTOMER &&
                                    <>
                                        <NavLink href={paths.customer.temporaryReservations}
                                            className="flex gap-1 items-center"
                                            includes
                                        >
                                            <TbListDetails />
                                            الحجوزات
                                        </NavLink>
                                        <NavLink href={paths.customer.cars}
                                            className="flex gap-1 items-center"
                                            includes
                                        >
                                            <IoCarSport />
                                            سيارتي
                                        </NavLink>
                                        <NavLink href={paths.customer.office.evaluate}
                                            className="flex gap-1 items-center"
                                            includes
                                        >
                                            <BsBuildingFill />
                                            تقييم المكاتب
                                        </NavLink>
                                    </>

                    )
            }
        </>
    )
}

export default SpecialLink