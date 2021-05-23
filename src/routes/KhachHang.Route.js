import { Route } from "react-router-dom"
import LienHe from "../modules/KhachHang/pages/LienHe/LienHe";
import Header from "./../parts/Header/Header"
import Footer from "./../parts/Footer/Footer"
import HuongDan from "./../modules/KhachHang/pages/HuongDan/HuongDan";
import VeDaMua from "./../modules/KhachHang/pages/VeDaMua/VeDaMua"
import DangKyKH from "../modules/KhachHang/pages/DangKy/DangKyKH";
import DangNhapKH from "../modules/KhachHang/pages/DangNhap/DangNhapKH";
import ChonVe from "../modules/KhachHang/pages/ChonVe/ChonVe";
import DangXuat from "../modules/KhachHang/pages/DangXuat/DangXuat";
import XacNhanThongTinDatVe from "./../modules/KhachHang/pages/XacNhanThongTinDatVe/XacNhanThongTinDatVe"
import QuanLyTaiKhoan from "../modules/KhachHang/pages/QuanLyTaiKhoan/QuanLyTaiKhoan";
import CamOnQuyKhach from "../modules/KhachHang/pages/CamOnQuyKhach/CamOnQuyKhach";

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
            <Route path="/ThanhToan" exact>
                <Header></Header>
                <XacNhanThongTinDatVe></XacNhanThongTinDatVe>
                <Footer></Footer>
            </Route>
            <Route path="/DangXuat" exact>
                <DangXuat></DangXuat>
            </Route>
            <Route path="/VeDaMua" exact>
                <Header></Header>
                <VeDaMua></VeDaMua>
            </Route>
            <Route path="/TaiKhoan" exact>
                <Header></Header>
               <QuanLyTaiKhoan/>
               <Footer></Footer>
            </Route>
            <Route path="/CamOnQuyKhach" exact>
                <Header></Header>
                <CamOnQuyKhach></CamOnQuyKhach>
            </Route>
        </>
    )
}

export default KhachHangRoute