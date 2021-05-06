import axios from "axios"
import env from "react-dotenv"

const TimKiemLichTrinh = (param)=>{
    console.log(param) 
    return axios.post(env.BASE_URL_API_NHANVIEN + "lichtrinh/date", param)
}

const GetDanhSachNhaGa = ()=>{
    return axios.get(env.BASE_URL_API_NHANVIEN + "nhaGa")
}

const DangNhapKhachHang=(SoDienThoai, MatKhau)=>{
    let param={
        SoDienThoai: SoDienThoai,
        MatKhau: MatKhau
    }

    return axios.post(env.BASE_URL_API_NHANVIEN +"loginKH", param)
}

export default {
    TimKiemLichTrinh,
    GetDanhSachNhaGa,
    DangNhapKhachHang
}