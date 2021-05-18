import { useEffect, useState } from "react"
import AdminService from "../../../../services/Admin.Service"

function QuanLyVe(props){
    const [chiTietVe, setChiTietVe]= useState([])

    useEffect(()=>{
        AdminService.GetAllChiTietVe().then((res)=>{
            setChiTietVe(res.data.data)
        })
    })
    return (
        <div className="flex pt-8">
            <table className="border-collapse border border-green-800 shadow-lg bg-white ml-10">
          <thead className="table-header-group">
            <tr className="bg-blue-100 border text-left px-8 py-4">
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                STT
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Họ Tên Khách Hàng
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Số điện thoại khách hàng
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Số CMND
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Thời gian đi
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Tên ga đi
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Tên ga đến
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Giá vé
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Ngày đặt vé
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Mã chỗ ngồi
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Tên toa
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Tên tàu
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4"></th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Hoạt động
              </th>
            </tr>
          </thead>
          <tbody>
            {chiTietVe.map(function(item, index){
                return(
                    <tr key={index} className="bg-white border px-8 py-4 text-center">
                        <td className="px-2 py-2">{index+1}</td>
                        <td>{item.HoTen}</td>
                        <td>{item.SoDienThoai}</td>
                        <td>{item.SoCMND}</td>
                        <td>{item.ThoiGianDi}</td>
                        <td>{item.TenGaDi}</td>
                        <td>{item.TenGaDen}</td>
                        <td>{item.GiaVe}</td>
                        <td>{item.NgayDatVe}</td>
                        <td>{item.MaChoNgoi}</td>
                        <td>{item.TenPhanLoai}</td>
                        <td>{item.TenTau}</td>

                    </tr>
                )
            })}
          </tbody>
        </table>
        </div>
    )
}

export default QuanLyVe