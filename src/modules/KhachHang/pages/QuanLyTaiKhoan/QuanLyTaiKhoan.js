import { useEffect, useState } from "react";
import AdminService from "../../../../services/Admin.Service";
import { reactLocalStorage } from "reactjs-localstorage";
import Modal from "react-responsive-modal";
import CapNhatThongTin from "./../QuanLyTaiKhoan/CapNhatThongTinTaiKhoan";
function QuanLyTaiKhoan(props) {
  const [khachhang, setKhachHang] = useState([]);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const data = reactLocalStorage.getObject("CurrentUser");
  console.log("token", data);
  useEffect(() => {
    AdminService.GetKhachHangBySDT(data.SoDienThoai).then((res) => {
      console.log(res);
      setKhachHang(res.data.data);
    });
  }, []);

  // const CapNhatTaiKhoan=()=>{

  // }
  return (
    <div>
      <div className="py-60 min-h-full bg-gray-200">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
          <div className="md:flex">
            <div className="w-full p-2 py-10">
              <div className="flex justify-center">
                <div className="relative">
                  {" "}
                  <span className="absolute border-white border-4 h-5 w-5 top-12 left-16 bg-green-700 rounded-full"></span>{" "}
                </div>
              </div>
              <div className="flex flex-col text-center mt-3 mb-4">
                {" "}
                <span className="text-2xl font-medium">{khachhang.HoTen}</span>{" "}
                <span className="text-md text-gray-400">online</span>{" "}
              </div>
              <p className="px-16 text-center text-md text-gray-800">
                Số điện thoại: <strong>{khachhang.SoDienThoai}</strong>
              </p>
              <p className="p-3.5 text-center text-md text-gray-800">
                Số CMND: <strong>{khachhang.SoCMND}</strong>
              </p>
              <p className="px-16 text-center text-md text-gray-800">
                Email: <strong>{khachhang.email}</strong>
              </p>

              <div class="px-28 mt-5 flex justify-between items-center">
                <button
                  className="cursor-pointer px-6 py-1.5 border-2 border-main bg-main text-white hover:bg-white hover:text-main hover:pointer"
                  onClick={onOpenModal}
                >
                  Cập nhật thông tin
                </button>
                <Modal open={open} onClose={onCloseModal} center>
                  <CapNhatThongTin />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuanLyTaiKhoan;
