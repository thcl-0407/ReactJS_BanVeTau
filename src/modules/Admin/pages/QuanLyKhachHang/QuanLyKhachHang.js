import AdminService from "./../../../../services/Admin.Service"
import lodash from "lodash"
import ToastifyMessage from "./../../../../utilities/ToastifyMessage"
import history from "./../../../../history"
import { useEffect, useState } from "react"
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


function QuanLyKhachHang(props){
    const [khachHang, setKhachHang]= useState([])

    useEffect(()=>{
        AdminService.GetKhachHang().then(response =>{
                console.log(response)
                setKhachHang(response.data.data)
        })
        },[])
    return(
        <div>
            <table className="border-collapse border border-green-800 shadow-lg bg-white ml-10">
                <thead className="table-header-group">
                    <tr className="bg-blue-100 border text-left px-8 py-4">
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">STT</th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">Họ tên</th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">Số điện thoại</th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4"></th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">Hoạt động</th>
                    </tr>
                </thead>
                <tbody>
                    {khachHang.map(function (item, index){
                        return <tr key={index} className="bg-white border px-8 py-4 text-center"> 
                            <td>{index+1}</td>
                            <td>{item.HoTen}</td>
                            <td>{item.SoDienThoai}</td>
                            <td></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default QuanLyKhachHang