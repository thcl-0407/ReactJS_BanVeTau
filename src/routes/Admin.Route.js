import {Route, Switch} from "react-router-dom"
import Sidebar from "../modules/Admin/pages/Sidebar/Sidebar"
import LichTrinh from "../components/LichTrinh/LichTrinh"
import AdminLogin from "./../modules/Admin/pages/Login/Admin.Login"
import GioVe from "../components/GioVe/GioVe";

function AdminRoute(props){
    return (
        <>
        <Route>

            <Route path="/Admin/Login" component={AdminLogin}></Route>
            <Switch>
                <Route path="/Admin/Dasboard" exact>
                    <Sidebar/>
                    <LichTrinh/>
                    
                </Route>
                <Route path="/timve" exact>
                    <GioVe/>
                    <LichTrinh/>
                                  
                </Route>
            </Switch>
            
        </Route>    
        </>
    )
}

export default AdminRoute