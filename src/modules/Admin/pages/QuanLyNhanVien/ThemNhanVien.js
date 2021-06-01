import { useState } from "react";
import AdminService from "../../../../services/Admin.Service";
import history from "./../../../../history";
import lodash from "lodash";
import ToastifyMessage from "./../../../../utilities/ToastifyMessage";
function ThemNhanVien(props) {
  const ThemNhanVien = () => {
    let MaNhanVien = document.getElementById("txtMaNhanVien").value
    let HoTen = document.getElementById("txtHoTenNhanVien").value;
    let Username = document.getElementById("txtTenTaiKhoan").value;
    let CaLamViec = document.getElementById("txtCaLamViec").value;
    let SoDienThoai = document.getElementById("txtSoDienThoai").value;
    let SoCMND = document.getElementById("txtSoCMND").value;
    let MatKhau = document.getElementById("txtMatKhau").value;
    //let isAdmin = document.getElementById("txtAdmin").value;

    if (
      lodash.isEmpty(MaNhanVien) ||
      lodash.isEmpty(HoTen) ||
      lodash.isEmpty(Username) ||
      lodash.isEmpty(CaLamViec) ||
      lodash.isEmpty(SoDienThoai) ||
      lodash.isEmpty(SoCMND) ||
      lodash.isEmpty(MatKhau) 
    ) {
      ToastifyMessage.ToastError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    let SoDienThoaiRegex = /0[1-9][0-9]{8}/

        if (!SoDienThoaiRegex.test(SoDienThoai)) {
            ToastifyMessage.ToastError("Số điện thoại không đúng định dạng")
            return
        }

    let CMNDRegex=/[0-9]{12}|[0-9]{9}/
    if (!CMNDRegex.test(SoCMND)){
      ToastifyMessage.ToastError("Số CMND/Căn cước không đúng định dạng")
      return
    }

    if (MatKhau.trim().length <6){
      ToastifyMessage.ToastError("Mật khẩu phải lớn hơn 6 kí tự")
      return
    }
    let NhanVien = {
      MaNhanVien: MaNhanVien,
      HoTenNhanVien: HoTen,
      UserName: Username,
      CaLamViec: CaLamViec,
      SoDienThoai: SoDienThoai,
      SoCMND: SoCMND,
      MatKhau: MatKhau
    };

    

    AdminService.ThemMoiNhanVien(NhanVien).then((res) => {
      console.log("them", res);
      history.push("/Admin/QLNV");
      props.isSuccess()
    });
  };
  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Thêm nhân viên</h1>
      <form>
        <div className="grid grid-cols-2 m-4">
          <label>Mã Nhân Viên</label>
          <input type="text" placeholder="Mã nhân viên" id="txtMaNhanVien" />
        </div>
        <div className="grid grid-cols-2 m-4">
          <label>Họ tên nhân viên</label>
          <input
            type="text"
            placeholder="Họ tên nhân viên"
            id="txtHoTenNhanVien"
          />
        </div>
        <div className="grid grid-cols-2 m-4">
          <label>Tên tài khoản</label>
          <input placeholder="Tên tài khoản" id="txtTenTaiKhoan" />
        </div>
        <div className="grid grid-cols-2 m-4">
          <label>Ca Làm Việc</label>
          <input placeholder="Ca làm việc" id="txtCaLamViec" />
        </div>
        <div className="grid grid-cols-2 m-4">
          <label>Số điện thoại</label>
          <input placeholder="Số điện thoại" id="txtSoDienThoai" />
        </div>
        <div className="grid grid-cols-2 m-4">
          <label>Số chứng minh nhân dân</label>
          <input placeholder="Số chứng minh nhân dân" id="txtSoCMND" />
        </div>
        <div className="grid grid-cols-2 m-4">
          <label>Mật khẩu</label>
          <input type="password" placeholder="Mật khẩu" id="txtMatKhau" />
        </div>
        {/* <div className="grid grid-cols-2">
          <label>Admin</label>
          <input type="text" placeholder="Admin" id="txtAdmin" />
        </div> */}
        <div className="pt-3 text-center">
          <input
            // onClick={ThemNhanVien}
            type="button"
            onClick={ThemNhanVien}
            defaultValue="Thêm"
            className="cursor-pointer px-6 py-1.5 border-2 border-main bg-main text-white hover:bg-white hover:text-main hover:pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default ThemNhanVien;
