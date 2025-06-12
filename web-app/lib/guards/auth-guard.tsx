"use client"

import { paths } from "@/app/components/layout/config-nav";
import NormalLoading from "@/app/components/loaders/NormalLoading";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import { StatusType, useAuthContext } from "../context/auth/auth-context";

type Props = {
  children: ReactNode
}
type GuardProps = {
  status: StatusType
  children: ReactNode
}
const AuthGuard = ({ children }: Props) => {
  const { status } = useAuthContext();

  return (
    <>
      {
        status === 'loading' ?
          (
            <NormalLoading />
          ) : (
            < AuthGuardContainer status={status}> {children}</ AuthGuardContainer>
          )
      }
    </>
  )
}

const AuthGuardContainer = ({ children, status }: GuardProps) => {
  useEffect(() => {
    if (status === 'unauthenticated') {
      // toast.error("login first please",{toastId: "auth-guard"})
      toast.warning("غير مصرح لك بدخول هذه الصفحة", { toastId: "roleGuard" })

      redirect(paths.home)
    }
  }, [status])

  return <>{children}</>

}
export default AuthGuard