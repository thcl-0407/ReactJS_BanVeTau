import { Route } from "react-router-dom"
import LichTrinh from "./../components/LichTrinh/LichTrinh"
import GioVe from "./../components/GioVe/GioVe";
import LienHe from "./../modules/KhachHang/pages/LienHe";
import Header from "./../parts/Header/Header"
import Footer from "./../parts/Footer/Footer"

function KhachHangRoute(props) {
    return (
        <>
            <Route path="/TimVe" exact>
                <Header></Header>
                <GioVe></GioVe>
                <LichTrinh></LichTrinh>
                <Footer></Footer>
            </Route>
            <Route path="/LienHe" exact>
                <Header></Header>
                <LienHe></LienHe>
                <Footer></Footer>
            </Route>
        </>
    )
}

export default KhachHangRoute