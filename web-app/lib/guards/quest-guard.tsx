"use client"

import { ReactNode, useEffect } from "react";
import { StatusType, useAuthContext } from "../context/auth/auth-context";
import { paths } from "@/app/components/layout/config-nav";
import { redirect } from "next/navigation";
import NormalLoading from "@/app/components/loaders/NormalLoading";

type Props = {
    children: ReactNode
}
type GuardProps = {
    status: StatusType
    children: ReactNode
}
const QuestGuard = ({ children }: Props) => {
    const { status } = useAuthContext();

    return (
        <>
            {
                status === 'loading' ?
                    (
                        <NormalLoading />
                    ) : (
                        < QuestGuardContainer status={status}> {children}</ QuestGuardContainer>
                    )
            }
        </>
    )
}

const QuestGuardContainer = ({ children, status }: GuardProps) => {
    useEffect(() => {
        if (status !== "loading") {
            if (status === 'authenticated') {
                // toast.error("you're already loged in and welcomed",{toastId: "quest-guard"})
                redirect(paths.home)
            }
        }
    }, [status])

    return <>{children}</>

}
export default QuestGuard