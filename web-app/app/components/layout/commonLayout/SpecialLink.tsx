"use client"
import { Spinner } from "@material-tailwind/react";
import NavLink from "../nav/NavLink";
import { useAuthContext } from "@/lib/context/auth/auth-context";
import { MdAdminPanelSettings } from "react-icons/md";
import { ROLES } from "@/app/constants";
import { paths, temporaryReservationsLink } from "../config-nav";
import { TbListDetails } from "react-icons/tb";


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
                                href="/admin"
                                className="flex gap-1 items-center"
                                includes
                            >
                                <MdAdminPanelSettings />
                                لوحة التحكم
                            </NavLink>

                            : user?.role === ROLES.EMPLOYEE ? <NavLink
                                href={paths.employee.reservations}
                                className="flex gap-1 items-center"
                                includes
                            >
                                <MdAdminPanelSettings />
                                لوحة التحكم
                            </NavLink>
                                : user?.role === ROLES.CUSTOMER && <NavLink href={temporaryReservationsLink.href}
                                    className="flex gap-1 items-center"
                                    includes
                                >
                                    <TbListDetails />
                                    {temporaryReservationsLink.label}
                                </NavLink>

                    )
            }
        </>
    )
}

export default SpecialLink