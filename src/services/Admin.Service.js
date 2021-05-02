import lodash from "lodash";
import axios from "axios";
import env from "react-dotenv"

const DangNhap = (UserName, MatKhau)=>{
    let param = {
        UserName: UserName,
        MatKhau: MatKhau
    }

    return axios.post(env.BASE_URL_API_NHANVIEN + "loginNV", param)
}

const GetNhanVienBySDT=(SoDienThoai)=>{
    return axios.get(env.BASE_URL_API_NHANVIEN + "nhanvien/sdt=" + SoDienThoai)
}

const GetKhachHangBySDT=(SoDienThoai)=>{
    return axios.get(env.BASE_URL_API_NHANVIEN + "khachhang/sdt=" + SoDienThoai)
}

const GetNhanVien= ()=>{
    return axios.get(env.BASE_URL_API_NHANVIEN + "nhanviens")
}

const GetKhachHang=()=>{
    return axios.get(env.BASE_URL_API_NHANVIEN + "khachhangs")
}
const ThemMoiNhanVien = (NhanVien)=>{

}

export default {
    DangNhap, 
    ThemMoiNhanVien,
    GetNhanVien,
    GetNhanVienBySDT,
    GetKhachHang,
    GetKhachHangBySDT
}