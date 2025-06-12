"use client";

import Loading from '@/app/(root)/loading';
import { paths } from '@/app/components/layout/config-nav';
import { redirect } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/auth/auth-context';

type Props = {
  roles: string[];
  children: ReactNode;
};

const RoleGuard = ({ roles, children }: Props) => {
  const { user, status } = useAuthContext();



  useEffect(() => {
    if (status === "authenticated" && user && !roles.includes(user.role)) {
      toast.warning("غير مصرح لك بدخول هذه الصفحة", { toastId: "roleGuard" })

      redirect(paths.home);
    }
  }, [status, user, roles]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "authenticated" && user && roles.includes(user.role)) {
    return <>{children}</>;
  }

  return null;
};

export default RoleGuard;
