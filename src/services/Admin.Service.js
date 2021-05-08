import lodash from "lodash";
import axios from "axios";
import env from "react-dotenv"

const DangNhap = (UserName, MatKhau)=>{
    let param = {
        UserName: UserName,
        MatKhau: MatKhau
    }

    return axios.post(env.BASE_URL_API + "loginNV", param)
}

const GetNhanVienBySDT=(SoDienThoai)=>{
    return axios.get(env.BASE_URL_API + "nhanvien/sdt=" + SoDienThoai)
}

const GetKhachHangBySDT=(SoDienThoai)=>{
    return axios.get(env.BASE_URL_API + "khachhang/sdt=" + SoDienThoai)
}

const GetNhanVien= ()=>{
    return axios.get(env.API_ADMIN_LOCAL + "nhanviens")
}

const GetKhachHang=()=>{
    return axios.get(env.BASE_URL_API + "khachhangs")
}
const ThemMoiNhanVien = (NhanVien)=>{
    return axios.post(env.API_ADMIN_LOCAL + "themNhanVien", NhanVien)
}
const GetAllLichTrinh=()=>{
    return axios.get(env.API_ADMIN_LOCAL +"lichtrinhs")
}

const GetNhaGaByID=(ID)=>{
    return axios.get(env.API_ADMIN_LOCAL +"nhaGa/id=" + ID)
}

export default {
    DangNhap, 
    ThemMoiNhanVien,
    GetNhanVien,
    GetNhanVienBySDT,
    GetKhachHang,
    GetKhachHangBySDT,
    GetAllLichTrinh,
    GetNhaGaByID
}