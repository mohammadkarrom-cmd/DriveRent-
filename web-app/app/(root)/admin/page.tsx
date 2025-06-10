import AdminStatics from "./components/AdminStatics"
import AdminStaticsHeader from "./components/AdminStaticsHeader"

const AdminHomePage = () => {
  return (
    <div className="p-5">
      <AdminStaticsHeader />
      <AdminStatics />
    </div>
  )
}

export default AdminHomePage