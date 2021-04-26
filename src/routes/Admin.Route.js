import {Route} from "react-router-dom"
import Sidebar from "./../modules/Admin/pages/Sidebar/Sidebar"
import AdminLogin from "./../modules/Admin/pages/Login/Admin.Login"
import QuanLyNhanVien from "../modules/Admin/pages/QuanLyNhanVien/QuanLyNhanVien"


function AdminRoute(props) {
    return (
        <>
            <Route path="/Admin/Login" component={AdminLogin} />
            <Route path="/Admin/Dashboard" exact comp={Sidebar}>
                <Sidebar/>
            </Route>
            <Route path="/Admin/QLNV" exact>
                <Sidebar></Sidebar>
                <QuanLyNhanVien/>
            </Route>
        </>
    )
}

export default AdminRoute