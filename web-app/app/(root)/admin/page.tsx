import NormalLoading from "@/app/components/loaders/NormalLoading"
import dynamic from "next/dynamic"
import AdminStaticsHeader from "./components/AdminStaticsHeader"

const AdminStaticsWarper = dynamic(() => import("./components/AdminStaticsWarper"), { loading: () => <NormalLoading /> })


const AdminHomePage = () => {
  return (
    <div className="p-5">
      <AdminStaticsHeader />
      <AdminStaticsWarper />
    </div>
  )
}

export default AdminHomePage