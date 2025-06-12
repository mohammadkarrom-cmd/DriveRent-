"use client";

import PageHeader from "@/app/components/layout/header/PageHeader";
import { useAuthContext } from "@/lib/context/auth/auth-context";

const ManStatHeader = () => {
  const { user } = useAuthContext();

  return (
    <PageHeader
      title={`اهلا و سهلا أيها المدير ${user.first_name} ${user.last_name}`}
      body="تفقد اٍحصائياتنا لأتخاذ قراراتك بشكل أفضل"
    />
  )
}

export default ManStatHeader