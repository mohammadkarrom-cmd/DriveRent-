"use client";

import { ReactNode, useEffect } from 'react';
import { useAuthContext } from '../context/auth/auth-context';
import Loading from '@/app/(root)/loading';
import { redirect } from 'next/navigation';
import { paths } from '@/app/components/layout/config-nav';

type Props = {
  roles: string[];
  children: ReactNode;
};

const RoleGuard = ({ roles, children }: Props) => {
  const { user, status } = useAuthContext();

  useEffect(() => {
    if (status === "authenticated" && user && !roles.includes(user.role)) {
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
