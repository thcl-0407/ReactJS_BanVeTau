import AdminService from "./../../../../services/Admin.Service"
import lodash from "lodash"
import ToastifyMessage from "./../../../../utilities/ToastifyMessage"
import history from "./../../../../history"
import { useEffect, useState } from "react"
import { useModal } from "react-modal-hook"

function QuanLyNhanVien(props){
    const [data, setData] = useState([]);
    //const [showCreateModal,hideCreateModal]= useModal()
    
 
    useEffect(()=>{
    AdminService.GetNhanVien().then(response =>{
            console.log(response)
            setData(response.data.data)
    })
    },[])
   
    return(
        <div className="">
            
                <div>
                    <button className="bg-blue-300 text-white py-1 px-3 rounded-sm text-xl mb-2 ml-10" >Thêm mới nhân viên</button>
                
                    <input className="mr-60 border-2 float-right" placeholder="Tìm kiếm bằng số điện thoại" />
                    
                </div>

            <table className="border-collapse border border-green-800 shadow-lg bg-white ml-10">
                <thead className="table-header-group">
                    <tr className="bg-blue-100 border text-left px-8 py-4">
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">STT</th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">Mã nhân viên</th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">Họ tên nhân viên</th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">Số điện thoại</th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">Ca làm việc</th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">Trạng thái</th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">Hoạt động</th>
                    </tr>
                </thead>
                <tbody>
                {data.map(function (item, index) {  
                        return <tr key={index} className="bg-white border px-8 py-4 text-center">  
                            <td>{index+1}</td>
                            <td>{item.MaNhanVien}</td>
                            <td>{item.HoTenNhanVien}</td>  
                            <td>{item.SoDienThoai}</td>
                            <td>{item.CaLamViec}</td>
                            <td></td>
                            {/* <td className="bg-blue-200 text-purple-600 py-1 px-2 rounded-2xl text-xs my-1"></td> */}
                            <td>
                                    <button className="bg-red-600 text-white py-1 px-3 rounded-full text-xs" >Khoá</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

    )

}

export default QuanLyNhanVien