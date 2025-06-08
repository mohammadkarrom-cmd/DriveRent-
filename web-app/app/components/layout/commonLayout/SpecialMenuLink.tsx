"use client"

import { ROLES } from "@/app/constants";
import { useAuthContext } from "@/lib/context/auth/auth-context";
import { Backgrounds, TextPrimary } from "@/lib/ui/class/classNames";
import { MenuItem, Spinner } from "@/lib/ui/MTFix";
import clsx from "clsx";
import { uniqueId } from "lodash";
import Link from "next/link";
import { BsBuildingFill } from "react-icons/bs";
import { IoCarSport } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { paths } from "../config-nav";


const SpecialMenuLink = () => {
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
                            ? <Link
                                href={paths.manager.cars.index}
                                key={uniqueId()}
                            >
                                <MenuItem
                                    className={clsx(TextPrimary, "hover:bg-background-default-light hover:dark:bg-background-default-dark flex gap-1.5 items-center flex-row-reverse justify-end group transition-all duration-300")}
                                >
                                    لوحة التحكم
                                    <div
                                        className={clsx(Backgrounds, "group-hover:bg-background-card-light group-hover:dark:bg-background-card-dark p-2 rounded-md transition-all duration-300")}
                                    >
                                        <MdAdminPanelSettings />
                                    </div>
                                </MenuItem>
                            </Link>

                            : user?.role === ROLES.EMPLOYEE
                                ? <Link
                                    href={paths.employee.reservations.all}
                                    key={uniqueId()}
                                >
                                    <MenuItem
                                        className={clsx(TextPrimary, "hover:bg-background-default-light hover:dark:bg-background-default-dark flex gap-1.5 items-center flex-row-reverse justify-end group transition-all duration-300")}
                                    >
                                        لوحة التحكم
                                        <div
                                            className={clsx(Backgrounds, "group-hover:bg-background-card-light group-hover:dark:bg-background-card-dark p-2 rounded-md transition-all duration-300")}
                                        >
                                            <MdAdminPanelSettings />
                                        </div>
                                    </MenuItem>
                                </Link>
                                : user?.role === ROLES.ADMIN
                                    ? <Link
                                        href={paths.admin.home}
                                        key={uniqueId()}
                                    >
                                        <MenuItem
                                            className={clsx(TextPrimary, "hover:bg-background-default-light hover:dark:bg-background-default-dark flex gap-1.5 items-center flex-row-reverse justify-end group transition-all duration-300")}
                                        >
                                            لوحة التحكم
                                            <div
                                                className={clsx(Backgrounds, "group-hover:bg-background-card-light group-hover:dark:bg-background-card-dark p-2 rounded-md transition-all duration-300")}
                                            >
                                                <MdAdminPanelSettings />
                                            </div>
                                        </MenuItem>
                                    </Link>
                                    : user?.role === ROLES.CUSTOMER &&
                                    <>
                                        <Link
                                            href={paths.customer.temporaryReservations}
                                            key={uniqueId()}
                                        >
                                            <MenuItem
                                                className={clsx(TextPrimary, "hover:bg-background-default-light hover:dark:bg-background-default-dark flex gap-1.5 items-center flex-row-reverse justify-end group transition-all duration-300")}
                                            >
                                                الحجوزات
                                                <div
                                                    className={clsx(Backgrounds, "group-hover:bg-background-card-light group-hover:dark:bg-background-card-dark p-2 rounded-md transition-all duration-300")}
                                                >
                                                    <TbListDetails />
                                                </div>
                                            </MenuItem>
                                        </Link>
                                        <Link
                                            href={paths.customer.cars}
                                            key={uniqueId()}
                                        >
                                            <MenuItem
                                                className={clsx(TextPrimary, "hover:bg-background-default-light hover:dark:bg-background-default-dark flex gap-1.5 items-center flex-row-reverse justify-end group transition-all duration-300")}
                                            >
                                                سيارتي
                                                <div
                                                    className={clsx(Backgrounds, "group-hover:bg-background-card-light group-hover:dark:bg-background-card-dark p-2 rounded-md transition-all duration-300")}
                                                >
                                                    <IoCarSport />
                                                </div>
                                            </MenuItem>
                                        </Link>
                                        <Link
                                            href={paths.customer.office.evaluate}
                                            key={uniqueId()}
                                        >
                                            <MenuItem
                                                className={clsx(TextPrimary, "hover:bg-background-default-light hover:dark:bg-background-default-dark flex gap-1.5 items-center flex-row-reverse justify-end group transition-all duration-300")}
                                            >
                                                تقييم المكاتب
                                                <div
                                                    className={clsx(Backgrounds, "group-hover:bg-background-card-light group-hover:dark:bg-background-card-dark p-2 rounded-md transition-all duration-300")}
                                                >
                                                    <BsBuildingFill />
                                                </div>
                                            </MenuItem>
                                        </Link>
                                    </>

                    )
            }
        </>
    )
}

export default SpecialMenuLink