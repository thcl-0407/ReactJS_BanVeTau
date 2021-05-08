import { useEffect, useState } from "react"
import AdminService from "../../../../services/Admin.Service"

function QuanLyLichTrinh(){
    const [data, setData]= useState([])
    //let gaDen= document.getElementById("txtGaDen").value;
    useEffect(()=>{
        AdminService.GetAllLichTrinh().then((res)=>{
            setData(res.data.data)
        })
    },[])

    return(
        <div className="flex justify-center pt-8">
            <div>
            <table className="border-collapse border border-green-800 shadow-lg bg-white ml-10">
          <thead className="table-header-group">
            <tr className="bg-blue-100 border text-left px-8 py-4">
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                STT
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Mã lịch trình
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Ga đi
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4" id="txtGaDen">
                Ga đến
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                  Thời gian đi
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
                  <td>{item.MaLichTrinh}</td>
                  <td>{item.TenNhaGa}</td>
                  <td>{item.TenNhaGa}</td>
                  <td>{item.ThoiGianDi}</td>
                  
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