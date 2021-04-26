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

const GetNhanVien= ()=>{
    return axios.get(env.BASE_URL_API_NHANVIEN + "nhanviens")
}
const ThemMoiNhanVien = (NhanVien)=>{

}

export default {
    DangNhap, 
    ThemMoiNhanVien,
    GetNhanVien,
    GetNhanVienBySDT
}