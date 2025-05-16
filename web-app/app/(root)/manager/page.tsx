
import dynamic from "next/dynamic";
import NormalLoading from "@/app/components/loaders/NormalLoading";

const AdminPageContent = dynamic(() => import("./components/AdminPageContent"), { loading: () => <NormalLoading /> });

function AdminDashboardPage() {


  return <AdminPageContent />
  
}

export default AdminDashboardPage