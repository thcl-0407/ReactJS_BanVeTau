import lodash from "lodash";
import axios from "axios";
import env from "react-dotenv"

const DangNhap = (UserName, MatKhau)=>{
    let param = {
        UserName: UserName,
        MatKhau: MatKhau
    }

    return axios.post(env.API_ADMIN_LOCAL + "loginNV", param)
}

const GetProfileGaTrungGian = (GaTrungGian)=>{
    let param = {
        GaTrungGian: GaTrungGian
    }

    return axios.post(env.API_ADMIN_LOCAL + "gatrunggian", param)
}

const GetNhanVienBySDT=(SoDienThoai)=>{
    return axios.get(env.API_ADMIN_LOCAL + "nhanvien/sdt=" + SoDienThoai)
}

const GetKhachHangBySDT=(SoDienThoai)=>{
    return axios.get(env.API_ADMIN_LOCAL + "khachhang/sdt=" + SoDienThoai)
}

const GetNhanVien= ()=>{
    return axios.get(env.API_ADMIN_LOCAL + "nhanviens")
}

const GetKhachHang=()=>{
    return axios.get(env.API_ADMIN_LOCAL + "khachhangs")
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

const ThemLichTrinh=(param)=>{
    return axios.post(env.API_ADMIN_LOCAL + "themLichTrinh", param)
}

const KhoaTaiKhoan=(MaNhanVien)=>{
    return axios.post(env.API_ADMIN_LOCAL + "khoaTaiKhoan", MaNhanVien)
}

const GetAllChiTietVe= ()=>{
    return axios.get(env.API_ADMIN_LOCAL + "chiTietVe")
}

const MoKhoaTaiKhoan= (MaNhanVien)=>{
    return axios.post(env.API_ADMIN_LOCAL + "moKhoaTaiKhoan", MaNhanVien)
}

const GetDanhSachTau= ()=>{
    return axios.get(env.API_ADMIN_LOCAL + "tau")
}

const  ThanhToan = (MaVe)=>{
    let param = {
        MaVe: MaVe
    }

    return axios.patch(env.API_ADMIN_LOCAL + "chiTietVe/thanhToan", param)
}

const SendEmailThanhToan = (VeThanhToan)=>{
   return axios.post(env.API_ADMIN_LOCAL + "sendEmail/thanhToan", VeThanhToan)
}

export default {
    DangNhap, 
    ThemMoiNhanVien,
    GetNhanVien,
    GetNhanVienBySDT,
    GetKhachHang,
    GetKhachHangBySDT,
    GetAllLichTrinh,
    GetNhaGaByID,
    ThemLichTrinh,
    KhoaTaiKhoan,
    GetAllChiTietVe,
    MoKhoaTaiKhoan,
    GetDanhSachTau,
    ThanhToan,
    SendEmailThanhToan,
    GetProfileGaTrungGian
}