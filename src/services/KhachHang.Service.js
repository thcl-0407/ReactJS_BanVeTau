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

export default {
    TimKiemLichTrinh,
    GetDanhSachNhaGa,
    DangNhapKhachHang,
    GetDanhSachTau_FollowLichTrinh
}