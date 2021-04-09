import {Route} from "react-router-dom"
import LichTrinh from "./../components/LichTrinh/LichTrinh"
import GioVe from "../components/GioVe/GioVe";

function KhachHangRoute(props) {
    return (
        <>
            <Route path="/TimVe">
                <GioVe/>
                <LichTrinh/>
            </Route>
        </>
    )
}

export default KhachHangRoute