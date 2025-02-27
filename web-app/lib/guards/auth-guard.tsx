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
      redirect(paths.home)
    }
  }, [status])

  return <>{children}</>

}
export default AuthGuard