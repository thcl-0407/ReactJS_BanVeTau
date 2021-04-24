import axios from "axios"
import env from "react-dotenv"

const TimKiemLichTrinh = (param)=>{
    console.log(param) 
    return axios.post(env.BASE_URL_API_KHACHHANG + "lichtrinh/date", param)
}

const GetDanhSachNhaGa = ()=>{
    return axios.get(env.BASE_URL_API_KHACHHANG + "nhaGa")
}

export default {
    TimKiemLichTrinh,
    GetDanhSachNhaGa
}