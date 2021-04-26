import axios from "axios"
import env from "react-dotenv"

const TimKiemLichTrinh = (param)=>{
    console.log(param) 
    return axios.post(env.BASE_URL_API_KHACHHANG + "lichtrinh/date", param)
}

const GetDanhSachNhaGa = ()=>{
    return axios.get(env.BASE_URL_API_KHACHHANG + "nhaGa")
}

const DangNhapKhachHang=(SoDienThoai, MatKhau)=>{
    let param={
        SoDienThoai: SoDienThoai,
        MatKhau: MatKhau
    }

    return axios.post(env.BASE_URL_API_KHACHHANG +"loginKH", param)
}

export default {
    TimKiemLichTrinh,
    GetDanhSachNhaGa,
    DangNhapKhachHang
}