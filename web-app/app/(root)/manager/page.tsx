
import NormalLoading from "@/app/components/loaders/NormalLoading";
import dynamic from "next/dynamic";

const AdminPageContent2 = dynamic(() => import("./components/AdminPageContent2"), { loading: () => <NormalLoading /> });

function AdminDashboardPage() {


  return <>
    <AdminPageContent2 />
  </>

}

export default AdminDashboardPage