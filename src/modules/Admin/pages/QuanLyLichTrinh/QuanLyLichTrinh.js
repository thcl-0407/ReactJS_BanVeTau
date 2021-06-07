import {useEffect, useState} from "react"
import AdminService from "../../../../services/Admin.Service"
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ThemMoiLichTrinh from "./ThemMoiLichTrinh";
import ToastifyMessage from "../../../../utilities/ToastifyMessage";

function QuanLyLichTrinh(props) {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    //const [dsGaTrungGian, setDsGaTrungGian]= useState([])
    //let gaDen= document.getElementById("txtGaDen").value;

    useEffect(() => {
        AdminService.GetAllLichTrinh().then((res) => {
            console.log("res", res)
            res.data.data.forEach(item => {
                item.dsGaTrungGian = []

                AdminService.GetProfileGaTrungGian(item.GaTrungGian).then(response => {
                    console.log("TG", response.data)
                    item.dsGaTrungGian.push(response.data)
                })
            })

            setData(res.data.data)
        })
    }, [])

    const CapNhatLichTrinh = () => {
        ToastifyMessage.ToastSuccess("Chức năng đang phát triển")
    }

    const HuyLichTrinh = () => {
        ToastifyMessage.ToastSuccess("Chức năng đang phát triển")
    }
    return (
        <div className="flex justify-center p-12">
            <div>
                <div>
                    <button className="bg-blue-300 text-white py-1 px-3 rounded-sm text-xl mb-2"
                            onClick={onOpenModal}>Thêm mới lịch trình
                    </button>
                    <Modal open={open} onClose={onCloseModal} center>
                        <ThemMoiLichTrinh/>
                    </Modal>
                </div>
                <table className="border-collapse border border-green-800 shadow-lg bg-white">
                    <thead className="table-header-group">
                    <tr className="bg-blue-100 border text-left px-8 py-4">
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                            STT
                        </th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                            Tên Tàu
                        </th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                            Tên Ga đầu
                        </th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                            Các ga trung gian
                        </th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4" id="txtGaDen">
                            Tên Ga cuối
                        </th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                            Thời gian đi
                        </th>
                        <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                            Thời gian đến
                        </th>
                        <th className="w-1/8 bg-blue-100 border px-8 py-4 text-center">
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
                                <td>{item.TenTau}</td>
                                <td>{item.TenGaDi}</td>
                                <td>
                                    {/* {console.log("ds", item.dsGaTrungGian)} */}
                                    {item.dsGaTrungGian.map(function(item, index){ return(
                                        <span key={index}>
                                            {console.log("item", item.TenNhaGa)}
                                            {item.TenNhaGa}
                                        </span>
                                    )})}
                                    
                                </td>
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
                                    <button className="bg-green-500 rounded m-2 p-1" onClick={CapNhatLichTrinh}>
                                        Cập nhật lịch trình
                                    </button>

                                    <button className="bg-red-500 rounded p-1" onClick={HuyLichTrinh}>
                                        Huỷ lịch trình
                                    </button>
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