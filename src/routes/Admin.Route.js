import {Route} from "react-router-dom"
import Sidebar from "./../modules/Admin/pages/Sidebar/Sidebar"
import AdminLogin from "./../modules/Admin/pages/Login/Admin.Login"


function AdminRoute(props) {
    return (
        <>
            <Route path="/Admin/Login" component={AdminLogin} />
            <Route path="/Admin/Dashboard" exact comp={Sidebar}>
                <Sidebar/>
            </Route>
        </>
    )
}

export default AdminRoute