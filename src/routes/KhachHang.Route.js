import { Route } from "react-router-dom"
import LienHe from "../modules/KhachHang/pages/LienHe/LienHe";
import Header from "./../parts/Header/Header"
import Footer from "./../parts/Footer/Footer"
import HuongDan from "./../modules/KhachHang/pages/HuongDan/HuongDan";

import DangKyKH from "../modules/KhachHang/pages/DangKy/DangKyKH";
import DangNhapKH from "../modules/KhachHang/pages/DangNhap/DangNhapKH";
import ChonVe from "../modules/KhachHang/pages/ChonVe/ChonVe";
import DangXuat from "../modules/KhachHang/pages/DangXuat/DangXuat";

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
            <Route path="/DangKy" exact>
                <DangKyKH></DangKyKH>
            </Route>
            <Route path="/DangNhap" exact>
                <DangNhapKH></DangNhapKH>
            </Route>
            <Route path="/TimVe" exact>
                <Header></Header>
               <ChonVe></ChonVe>
                <Footer></Footer>
            </Route>
            <Route path="/DangXuat" exact>
                <DangXuat></DangXuat>
            </Route>
        </>
    )
}

export default KhachHangRoute