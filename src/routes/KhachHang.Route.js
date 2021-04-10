import {Route} from "react-router-dom"
import LichTrinh from "./../components/LichTrinh/LichTrinh"
import GioVe from "./../components/GioVe/GioVe";
import LienHe from "./../modules/KhachHang/pages/LienHe";

function KhachHangRoute(props) {
    return (
        <>
            <Route path="/TimVe" exact>            
                <GioVe></GioVe>
                <LichTrinh></LichTrinh>
            </Route>
            <Route path="/Contact" exact comp={LienHe}>
                <LienHe></LienHe>
            </Route>
        </>
    )
}

export default KhachHangRoute