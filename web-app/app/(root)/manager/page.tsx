
import NormalLoading from "@/app/components/loaders/NormalLoading";
import dynamic from "next/dynamic";
import ManagerStatics from "./components/ManagerStatics";

const AdminPageContent2 = dynamic(() => import("./components/AdminPageContent2"), { loading: () => <NormalLoading /> });
const AdminPageContent = dynamic(() => import("./components/AdminPageContent"), { loading: () => <NormalLoading /> });
const ManStatHeader = dynamic(() => import("./components/ManStatHeader"), { loading: () => <NormalLoading /> });

function AdminDashboardPage() {


  return <>
    <ManStatHeader />
    {/* <AdminPageContent /> */}
    <ManagerStatics />
    <div className="mt-5">
      <AdminPageContent2 />
    </div>
  </>

}

export default AdminDashboardPage