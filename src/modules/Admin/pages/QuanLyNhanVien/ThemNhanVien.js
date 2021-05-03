function ThemNhanVien(props) {
  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Thêm nhân viên</h1>
      <form>
        <label>Mã Nhân Viên</label>
        <input type="text" placeholder="Mã nhân viên" />
        <br />
        <label>Họ tên nhân viên</label>
        <input placeholder="Họ tên nhân viên" />
        <br />
        <label>Tên tài khoản</label>
        <input placeholder="Tên tài khoản" />
        <br />
        <label>Ca Làm Việc</label>
        <input placeholder="Ca làm việc" />
        <br/>
        <label>Số điện thoại</label>
        <input placeholder="Số điện thoại" />
        <br/>
        <label>Số chứng minh nhân dân</label>
        <input placeholder="Số chứng minh nhân dân" />
        <br/>
        <label>Mật khẩu</label>
        <input type="password" placeholder="Mật khẩu" />
        <br/>
        <div className="pt-3 text-center">
            <input type="button" className="cursor-pointer px-6 py-1.5 border-2 border-main bg-main text-white hover:bg-white hover:text-main hover:pointer" value="Lưu"/>
        </div>
      </form>
      
      
    </div>
  );
}

export default ThemNhanVien;
