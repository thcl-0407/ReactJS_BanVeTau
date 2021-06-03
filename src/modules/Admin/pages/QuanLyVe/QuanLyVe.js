import { useEffect, useState } from "react";
import AdminService from "../../../../services/Admin.Service";

function QuanLyVe(props) {
  const [chiTietVe, setChiTietVe] = useState([]);

  useEffect(() => {
    AdminService.GetAllChiTietVe().then((res) => {
      setChiTietVe(res.data.data);
    });
  });

  const btnHuyVeClick = () => {};

  const btnThanhToanClick = () => {};
  return (
    <div className="flex pt-8">
      <table className="border-collapse border border-green-800 shadow-lg bg-white ml-10">
        <thead className="table-header-group">
          <tr className="bg-blue-100 border text-left px-8 py-4">
            <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
              STT
            </th>
            <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
              Thông tin khách hàng
            </th>

            <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
              Chi tiết vé
            </th>
            <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
              Thời gian đi
            </th>

            <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
              Ngày đặt vé
            </th>
            <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
              Giá vé
            </th>
            <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
              Đã Thanh Toán
            </th>
            <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
              Đã Sử Dụng
            </th>
            <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
              Vé Trả Lại
            </th>
            <th className="w-1/8 bg-blue-100 border text-left px-8 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {chiTietVe.map(function (item, index) {
            return (
              <tr key={index} className="bg-white border px-8 py-4 text-center">
                <td className="px-2 py-2">{index + 1}</td>
                {/* <td>{item.HoTen}</td>
                        <td>{item.SoDienThoai}</td>
                        <td>{item.SoCMND}</td> */}
                <td className="text-left">
                  <div>
                    <b>Họ tên:</b> {item.HoTen}
                  </div>
                  <div className="mt-2">
                    <b>Số điện thoại:</b> {item.SoDienThoai}
                  </div>
                  <div className="mt-2">
                    <b>Số CMND:</b> {item.SoCMND}
                  </div>
                </td>
                <td className="text-left">
                  <div>
                    <b>Mã vé: </b>
                    {item.MaVe}
                  </div>
                  <div>
                    <b>Tàu: </b>
                    {item.TenTau}
                  </div>

                  <div className="mt-2">
                    Đi từ {item.TenGaDi}({item.MaGaDi}) đến {item.TenGaDen}(
                    {item.MaGaDen})
                  </div>
                  <div className="mt-2">
                    <b>Mã Ghế: </b>
                    {item.MaGhe}
                  </div>
                  <div>
                    <b>Mã Toa: </b>
                    {item.MaToaTau}
                  </div>
                  <div>
                    <b>Phân Loại: </b>
                    {item.TenPhanLoai}
                  </div>
                </td>
                <td>{item.ThoiGianDi}</td>
                <td>{item.NgayDatVe}</td>
                <td>{item.GiaVe}</td>

                <td>
                  {item.isPaid ? (
                    <div className="text-green-600">
                      <i className="fas fa-check"></i>
                    </div>
                  ) : (
                    <div className="text-red-600">
                      <i className="fas fa-times"></i>
                    </div>
                  )}
                </td>
                <td>
                  {item.isCheckIn ? (
                    <div className="text-green-600">
                      <i className="fas fa-check"></i>
                    </div>
                  ) : (
                    <div className="text-red-600">
                      <i className="fas fa-times"></i>
                    </div>
                  )}
                </td>
                <td>
                  {item.isCancel ? (
                    <div className="text-green-600">
                      <i className="fas fa-check"></i>
                    </div>
                  ) : (
                    <div className="text-red-600">
                      <i className="fas fa-times"></i>
                    </div>
                  )}
                </td>
                <td>
                  {item.isCancel ? (
                    <div>Vé Trả Lại</div>
                  ) : (
                    <div>
                      <button
                        onClick={btnHuyVeClick.bind(null, item)}
                        className="m-2 p-1 text-white bg-red-600"
                      >
                        Trả Vé
                      </button>

                      <button
                        onClick={btnThanhToanClick.bind(null, item)}
                        className="p-1 text-white bg-blue-600"
                      >
                        Thanh Toán
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default QuanLyVe;
