import {Route} from "react-router-dom"
import Sidebar from "./../modules/Admin/pages/Sidebar/Sidebar"
import AdminLogin from "./../modules/Admin/pages/Login/Admin.Login"
import QuanLyNhanVien from "../modules/Admin/pages/QuanLyNhanVien/QuanLyNhanVien"
import QuanLyKhachHang from "../modules/Admin/pages/QuanLyKhachHang/QuanLyKhachHang"
import QuanLyLichTrinh from "../modules/Admin/pages/QuanLyLichTrinh/QuanLyLichTrinh"


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
            <Route path="/Admin/QLKH" exact>
                <Sidebar></Sidebar>
                <QuanLyKhachHang/>
            </Route>
            <Route path="/Admin/QLLT" exact>
                <Sidebar></Sidebar>
                <QuanLyLichTrinh/>
            </Route>
        </>
    )
}

export default AdminRoute