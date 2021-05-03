import AdminService from "./../../../../services/Admin.Service";
import lodash from "lodash";
import ToastifyMessage from "./../../../../utilities/ToastifyMessage";
import history from "./../../../../history";
import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ProfileChiTietNhanVien from "./ProfileChiTietNhanVien";
import React from "react";
import ThemNhanVien from "./ThemNhanVien";
//import TimKiemNhanVien from "./TimKiemNhanVien";

function QuanLyNhanVien(props) {
  const [data, setData] = useState([]);
  //const [showCreateModal,hideCreateModal]= useModal()
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [openChiTiet, setOpenChiTiet] = useState(false);
  const [selectSoDienThoai, setSelectSoDienThoai] = useState("");
  const [filtered, setFilterd] = useState([]);
  const [result, setResult] = useState("");

  const onOpenModalChiTiet = (SoDienThoai) => {
    console.log(SoDienThoai);
    setOpenChiTiet(true);
    setSelectSoDienThoai(SoDienThoai);
  };

  const onCloseModalChiTiet = () => setOpenChiTiet(false);

  useEffect(() => {
    AdminService.GetNhanVien().then((response) => {
      console.log("getAll",response);
      setData(response.data.data);
      setFilterd(response.data.data);
    });
  }, []);

  // useEffect(() => {
  //   const results = filtered.filter((res) =>{
  //     console.log("searchSDT",res.SoDienThoai)
  //     res.SoDienThoai.toLowerCase().includes(result)
  // });
  //   setData(results);
  // }, [result]);
  // console.log(data)

  const onChange = (e) => {
    setResult(e.target.value);
  };

  return (
    <div className="flex justify-center pt-8">
      <div>
        <div className="flex">
          <button
            className="bg-blue-300 text-white py-1 px-3 rounded-sm text-xl mb-2 ml-10"
            onClick={onOpenModal}
          >
            Thêm mới nhân viên
          </button>
          {/* Quản lý modal thêm */}
          <Modal open={open} onClose={onCloseModal} center>
            {/* <h2 className="text-center text-lg">
              Chi tiết thông tin nhân viên
            </h2>
            <form className="grid grid-cols-2">
              <label>Mã Nhân Viên</label>
              <br />
              <input placeholder="Mã nhân viên" />
            </form> */}
            <ThemNhanVien/>
          </Modal>
          <input
            placeholder="Tim bang so dien thoai"
            value={result}
            onChange={onChange}
          />
          {/* {data.map((item, index) => (
            
            <tr
                  key={index}
                  className="bg-white border px-8 py-4 text-center"
                >
                  <td className="px-2 py-2">{index + 1}</td>
                  <td>{item.MaNhanVien}</td>
                  <td>{item.HoTenNhanVien}</td>
                  <td>{item.SoDienThoai}</td>
                  <td>{item.CaLamViec}</td>
            </tr>
          ))} */}
        </div>

        <table className="border-collapse border border-green-800 shadow-lg bg-white ml-10">
          <thead className="table-header-group">
            <tr className="bg-blue-100 border text-left px-8 py-4">
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                STT
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Mã nhân viên
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Họ tên nhân viên
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Số điện thoại
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Ca làm việc
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4"></th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Hoạt động
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(function (item, index) {
              return (
                <tr
                  key={index}
                  className="bg-white border px-8 py-4 text-center"
                >
                  <td className="px-2 py-2">{index + 1}</td>
                  <td>{item.MaNhanVien}</td>
                  <td>{item.HoTenNhanVien}</td>
                  <td>{item.SoDienThoai}</td>
                  <td>{item.CaLamViec}</td>
                  <td>
                    <button
                      className="underline text-blue-400"
                      onClick={onOpenModalChiTiet.bind(null, item.SoDienThoai)}
                    >
                      Chi tiết
                    </button>
                  </td>
                  {/* <td className="bg-blue-200 text-purple-600 py-1 px-2 rounded-2xl text-xs my-1"></td> */}
                  <td>
                    <button className="bg-red-600 text-white py-1 px-3 rounded-full text-xs">
                      Khoá
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div></div>
        <React.Fragment>
          <Modal open={openChiTiet} onClose={onCloseModalChiTiet} center>
            <ProfileChiTietNhanVien
              SoDienThoai={selectSoDienThoai}
            ></ProfileChiTietNhanVien>
          </Modal>
        </React.Fragment>
      </div>
    </div>
  );
}

export default QuanLyNhanVien;
