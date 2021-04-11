import { Route } from "react-router-dom"
import LienHe from "../modules/KhachHang/pages/LienHe/LienHe";
import Header from "./../parts/Header/Header"
import Footer from "./../parts/Footer/Footer"
import HuongDan from "./../modules/KhachHang/pages/HuongDan/HuongDan";

function KhachHangRoute(props) {
    return (
        <>
            <Route path="/LienHe" exact>
                <Header></Header>
                <LienHe></LienHe>
                <Footer></Footer>
            </Route>
            <Route path="/About" exact>
                <Header></Header>
                <HuongDan></HuongDan>
                <Footer></Footer>
            </Route>
        </>
    )
}

export default KhachHangRoute