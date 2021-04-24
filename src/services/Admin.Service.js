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

const ThemMoiNhanVien = (NhanVien)=>{

}

export default {
    DangNhap, 
    ThemMoiNhanVien
}