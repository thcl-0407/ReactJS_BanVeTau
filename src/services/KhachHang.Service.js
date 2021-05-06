import axios from "axios"
import env from "react-dotenv"

const TimKiemLichTrinh = (param)=>{
    console.log(param) 
    return axios.post(env.BASE_URL_API + "lichtrinh/date", param)
}

const GetDanhSachNhaGa = ()=>{
    return axios.get(env.BASE_URL_API + "nhaGa")
}

const DangNhapKhachHang=(SoDienThoai, MatKhau)=>{
    let param={
        SoDienThoai: SoDienThoai,
        MatKhau: MatKhau
    }

    return axios.post(env.BASE_URL_API +"loginKH", param)
}

export default {
    TimKiemLichTrinh,
    GetDanhSachNhaGa,
    DangNhapKhachHang
}