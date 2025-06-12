import NormalLoading from "@/app/components/loaders/NormalLoading"
import dynamic from "next/dynamic"
import AdminStaticsHeader from "./components/AdminStaticsHeader"

const AdminStaticsWarper = dynamic(() => import("./components/AdminStaticsWarper"), { loading: () => <NormalLoading /> })


const AdminHomePage = () => {
  return (
    <>
      <AdminStaticsHeader />
      <AdminStaticsWarper />
    </>
  )
}

export default AdminHomePage