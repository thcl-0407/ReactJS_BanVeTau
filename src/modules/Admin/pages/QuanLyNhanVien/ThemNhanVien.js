import { useState } from "react";
import AdminService from "../../../../services/Admin.Service";
import history from "./../../../../history"
function ThemNhanVien(props) {
    const [nhanvien, setNhanVien]= useState({
        MaNhanVien:'',
        HoTenNhanVien:'',
        UserName:'',
        CaLamViec:'',
        SoDienThoai:'',
        SoCMND:'',
        MatKhau:'',
        isAdmin:''
    })
  const ThemNhanVien = () => {
       

       const NhanVien={
           MaNhanVien: nhanvien.MaNhanVien,
           HoTenNhanVien: nhanvien.HoTenNhanVien,
           UserName: nhanvien.UserName,
           CaLamViec: nhanvien.CaLamViec,
           SoDienThoai: nhanvien.SoDienThoai,
           SoCMND: nhanvien.SoCMND,
           MatKhau: nhanvien.MatKhau,
           isAdmin: nhanvien.isAdmin
       }

       AdminService.ThemMoiNhanVien(NhanVien).then((res)=>{
           console.log("add", res)
           //props.history.push('Admin/QLNV')
           history.push("Admin/QLNV")
       })
  };
  // const onChange=(e)=>{
  //   e.persist();
  //   setNhanVien({...nhanvien, [e.target.SoDienThoai]:e.target.defaultValue})
  // }
  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Thêm nhân viên</h1>
      <form onSubmit={ThemNhanVien}>
        <div className="grid grid-cols-2">
          <label>Mã Nhân Viên</label>
          <input type="text" placeholder="Mã nhân viên" id="txtMaNhanVien" defaultValue={nhanvien.MaNhanVien}/>
        </div>
        <div className="grid grid-cols-2">
          <label>Họ tên nhân viên</label>
          <input
            type="text"
            placeholder="Họ tên nhân viên"
            id="txtHoTenNhanVien"
            defaultValue={nhanvien.HoTenNhanVien}
            
          />
        </div>
        <div className="grid grid-cols-2">
          <label>Tên tài khoản</label>
          <input placeholder="Tên tài khoản" id="txtTenTaiKhoan" defaultValue={nhanvien.UserName}/>
        </div>
        <div className="grid grid-cols-2">
          <label>Ca Làm Việc</label>
          <input placeholder="Ca làm việc" id="txtCaLamViec" defaultValue={nhanvien.CaLamViec}/>
        </div>
        <div className="grid grid-cols-2">
          <label>Số điện thoại</label>
          <input placeholder="Số điện thoại" id="txtSoDienThoai" defaultValue={nhanvien.SoDienThoai}/>
        </div>
        <div className="grid grid-cols-2">
          <label>Số chứng minh nhân dân</label>
          <input placeholder="Số chứng minh nhân dân" id="txtSoCMND" defaultValue={nhanvien.SoCMND} />
        </div>
        <div className="grid grid-cols-2">
          <label>Mật khẩu</label>
          <input type="password" placeholder="Mật khẩu" id="txtMatKhau" defaultValue={nhanvien.MatKhau}/>
        </div>
        <div className="grid grid-cols-2">
          <label>Admin</label>
          <input type="text" placeholder="Admin" id="txtMatKhau" defaultValue={nhanvien.isAdmin}/>
        </div>
        <div className="pt-3 text-center">
          <button
            // onClick={ThemNhanVien}
            type="submit"
            className="cursor-pointer px-6 py-1.5 border-2 border-main bg-main text-white hover:bg-white hover:text-main hover:pointer"
          >Luu</button>
        </div>
      </form>
    </div>
  );
}

export default ThemNhanVien;