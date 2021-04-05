import {Route} from "react-router-dom"
import AdminLogin from "./../modules/Admin/pages/Login/Admin.Login"

function AdminRoute(props){
    return (
        <>
            <Route path="/Admin/Login" component={AdminLogin}></Route>
        </>
    )
}

export default AdminRoute