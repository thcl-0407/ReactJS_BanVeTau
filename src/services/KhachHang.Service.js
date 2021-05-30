import axios from "axios"
import env from "react-dotenv"

const TimKiemLichTrinh = (param)=>{
    console.log(param) 
    return axios.post(env.API_ADMIN_LOCAL + "lichtrinh/date", param)
}

const GetDanhSachNhaGa = ()=>{
    return axios.get(env.API_ADMIN_LOCAL + "nhaGa")
}

const DangNhapKhachHang=(SoDienThoai, MatKhau)=>{
    let param={
        SoDienThoai: SoDienThoai,
        MatKhau: MatKhau
    }

    return axios.post(env.API_ADMIN_LOCAL +"loginKH", param)
}

const GetDanhSachTau_FollowLichTrinh = (param) => {
    return axios.post(env.API_ADMIN_LOCAL + "tau/lichtrinh", param)
}

const GetDSGheDaDat = (param) => {
    return axios.post(env.API_ADMIN_LOCAL + "tau/gheDaDat", param)
}

const GetDSToa_Of_Tau = (MaTau) => {
    return axios.post(env.API_ADMIN_LOCAL + "tau/dsToa", {MaTau:MaTau})
}

const GetChiTietToa_Of_Tau = (MaTau) => {
    return axios.post(env.API_ADMIN_LOCAL + "tau/chitiettoa", {MaTau:MaTau})
}

const GetDSGhe_Of_ToaTau = (MaToaTau) => {
    return axios.get(env.API_ADMIN_LOCAL + "Ghe/MaToa=" + MaToaTau)
}

//Dat Ve
const DatVe = (param, token) => {
    return axios.post(env.API_ADMIN_LOCAL + "datve", param, {
        headers: {Authorization: "Bearer " + token}
    })
}

const CapNhatThongTin= (param)=>{
    return axios.post(env.API_ADMIN_LOCAL + "CapNhatKH", param)
}

const GetDSVeDaMua = (token)=>{
    return axios.post(env.API_ADMIN_LOCAL + "dsVeDaMua", null,{
        headers: {Authorization: "Bearer " + token}
    })
}

const TraVe = (MaVe, token)=>{
    return axios.patch(env.API_ADMIN_LOCAL + "chiTietVe/huyVe", {MaVe: MaVe},{
        headers: {Authorization: "Bearer " + token}
    })
}

const SendEmailTraVe = (ChiTietVeTra, token)=>{
    return axios.post(env.API_ADMIN_LOCAL + "email/thongbaohuyve", ChiTietVeTra, {
        headers: {Authorization: "Bearer " + token}
    })
}

export default {
    TimKiemLichTrinh,
    GetDanhSachNhaGa,
    DangNhapKhachHang,
    GetDanhSachTau_FollowLichTrinh,
    GetDSGheDaDat,
    GetDSToa_Of_Tau,
    GetChiTietToa_Of_Tau,
    GetChiTietToa_Of_Tau,
    GetDSGhe_Of_ToaTau,
    DatVe,
    CapNhatThongTin,
    GetDSVeDaMua,
    TraVe,
    SendEmailTraVe
}