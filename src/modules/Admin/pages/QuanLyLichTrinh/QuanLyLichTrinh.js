import { useEffect, useState } from "react"
import AdminService from "../../../../services/Admin.Service"
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ThemMoiLichTrinh from "./ThemMoiLichTrinh";
function QuanLyLichTrinh(props){
    const [data, setData]= useState([])
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    //let gaDen= document.getElementById("txtGaDen").value;
    useEffect(()=>{
        AdminService.GetAllLichTrinh().then((res)=>{
            setData(res.data.data)
        })
    })

    return(
        <div className="flex justify-center pt-8">
            <div>
            <div>
              <button className="bg-blue-300 text-white py-1 px-3 rounded-sm text-xl mb-2 ml-10"
              onClick={onOpenModal}>Thêm mới lịch trình</button>
                    <Modal open={open} onClose={onCloseModal} center>
                      <ThemMoiLichTrinh/>
                    </Modal>
            </div>
            <table className="border-collapse border border-green-800 shadow-lg bg-white ml-10">
          <thead className="table-header-group">
            <tr className="bg-blue-100 border text-left px-8 py-4">
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                STT
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Tên Tàu
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Tên Ga đi
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4" id="txtGaDen">
                Tên Ga đến
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                  Thời gian đi
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                  Thời gian đến
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Hoạt động
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(function(item, index){
                return (
                    <tr
                  key={index}
                  className="bg-white border px-8 py-4 text-center"
                    >
                  <td className="px-2 py-2">{index + 1}</td>
                  <td>{item.TenTau}</td>
                  <td>{item.TenGaDi}</td>
                  <td>{item.TenGaDen}</td>
                  <td>{item.ThoiGianDi} 08:00</td>
                  <td>{item.ThoiGianDen}</td>
                  <td>
                    {/* <button
                      className="underline text-blue-400"
                      onClick={onOpenModalChiTiet.bind(null, item.SoDienThoai)}
                    >
                      Chi tiết
                    </button> */}
                  </td>
                  </tr>
                )
            })}
          </tbody>
        </table>
            </div>
        </div>
    )
}

export default QuanLyLichTrinh