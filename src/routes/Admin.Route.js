import {Route} from "react-router-dom"
import Sidebar from "./../modules/Admin/pages/Sidebar/Sidebar"
import LichTrinh from "./../components/LichTrinh/LichTrinh"
import AdminLogin from "./../modules/Admin/pages/Login/Admin.Login"
import GioVe from "../components/GioVe/GioVe";

function AdminRoute(props) {
    return (
        <>
            <Route path="/Admin/Login" component={AdminLogin} />
            <Route path="/Admin/Dashboard" exact comp={Sidebar}>
                <Sidebar/>
            </Route>
            <Route path="/TimVe">
                <GioVe/>
                <LichTrinh/>
            </Route>
        </>
    )
}

export default AdminRoute