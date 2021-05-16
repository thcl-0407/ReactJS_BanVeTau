import { useEffect, useState } from "react"
import AdminService from "../../../../services/Admin.Service"
import { reactLocalStorage } from "reactjs-localstorage"

function QuanLyTaiKhoan(props){

    const [khachhang, setKhachHang]=useState([])

    const data= reactLocalStorage.getObject('CurrentUser')
    console.log("token",data)
    useEffect(()=>{
        AdminService.GetKhachHangBySDT(data.SoDienThoai).then((res)=>{
            console.log(res)
            setKhachHang(res.data.data)
        })
    },[])
    
    const CapNhatTaiKhoan=()=>{
        
    }
    return (
        <div>
            <h1 className="text-center font-bold text-2xl">Quản lý tài khoản</h1>
      <form>
        <div className="grid grid-cols-2 m-4">
          <label>Mã</label>
          <strong>{khachhang.MaKhachHang}</strong>
        </div>
        <div className="grid grid-cols-2 m-4">
          <label>Họ tên</label>
          <strong>{khachhang.HoTen}</strong>
        </div>
        <div className="grid grid-cols-2 m-4">
          <label>Số điện thoại</label>
          <strong>{khachhang.SoDienThoai}</strong>
        </div>
        <div className="grid grid-cols-2 m-4">
          <label>Số CMND</label>
          <strong>{khachhang.SoCMND}</strong>
        </div>
        
        <div className="grid grid-cols-2 m-4">
          <label>email</label>
          <strong>{khachhang.email}</strong>
        </div>
        
        <div className="pt-3 text-center">
          <input
            // onClick={ThemNhanVien}
            type="button"
            onClick={CapNhatTaiKhoan}
            defaultValue="Cập nhật"
            className="cursor-pointer px-6 py-1.5 border-2 border-main bg-main text-white hover:bg-white hover:text-main hover:pointer"
          />
        </div>
      </form>
      {/* {khachhang.map(function (item, index){
          return (
              <p>{item.MaKhachHang}</p>
          )
      })} */}
        </div>
    )
}

export default QuanLyTaiKhoan