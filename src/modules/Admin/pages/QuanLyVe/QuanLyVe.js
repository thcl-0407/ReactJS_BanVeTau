import React, {useEffect, useState} from "react";
import AdminService from "../../../../services/Admin.Service";
import OTPService from "./../../../../services/OTP.Service"
import ToastifyMessage from "../../../../utilities/ToastifyMessage";
import Modal from "react-responsive-modal";
import numeral from "numeral"
import KhachHangService from "../../../../services/KhachHang.Service";
import {reactLocalStorage} from "reactjs-localstorage";

function QuanLyVe(props) {
    const [chiTietVe, setChiTietVe] = useState([]);
    const [StatusModalXacNhanThanhToan, SetStatusModalXacNhanThanhToan] = useState(false)
    const [StatusModalXacNhanHuyVe, SetStatusModalXacNhanHuyVe] = useState(false)
    const [StateModalHandling, SetStateModalHandling] = useState(false)
    const [VeSelected, SetVeSelected] = useState({})

    const onCloseModalXacNhanThanhToan = () => {
        SetStatusModalXacNhanThanhToan(false)
    }

    const onCloseModalHandling = () => {
        SetStateModalHandling(false)
    }


    const  onCloseModalXacNhanHuyVe = ()=>{
        SetStatusModalXacNhanHuyVe(false)
    }

    useEffect(() => {
        RefreshData()
    }, []);

    const RefreshData = () => {
        AdminService.GetAllChiTietVe().then((res) => {
            setChiTietVe(res.data.data);
        });
    }

    const btnHuyVeClick = (VeSelected) => {
        VeSelected.MaVe = VeSelected.MaVe[0]
        SetVeSelected(VeSelected)

        SetStateModalHandling(true)

        OTPService.SendSMSCode(VeSelected.SoDienThoai).then(response => {
            console.log(response);
            if(response.data.isSended){
                SetStatusModalXacNhanHuyVe(true)
                SetStateModalHandling(false)
            }
        }).catch(error=>{
            if(error){
                SetStatusModalXacNhanHuyVe(true)
                SetStateModalHandling(false)
                ToastifyMessage.ToastError("Không Thể Gửi Mã Xác Nhận Lúc Này")
            }
        })
    };

    const btnThanhToanClick = (VeSelected) => {
        VeSelected.MaVe = VeSelected.MaVe[0]
        SetVeSelected(VeSelected)

        SetStatusModalXacNhanThanhToan(true)
    };

    const btnXacNhanSoDienThoai_Click = ()=>{
        let txtMaXacNhan = document.getElementById('txtMaXacNhan').value

        if(txtMaXacNhan.trim() == ""){
            ToastifyMessage.ToastError("Chưa Nhập Mã Xác Thực")
            return
        }

        SetStateModalHandling(true)

        OTPService.VerifyCode(VeSelected.SoDienThoai, txtMaXacNhan).then(response => {
            if (response.data.status == 404) {
                ToastifyMessage.ToastError("Mã Xác Nhận Đã Hết Hạn")
                return
            }
            if (response.data.valid == false) {
                ToastifyMessage.ToastError("Mã Xác Nhận Chưa Chính Xác")
                return
            }
            if (response.data.valid == true) {
                //Xử Lý Huỷ Vé
                AdminService.TraVe(VeSelected.MaVe).then(response => {
                    if(response.data.status){
                        AdminService.SendEmailHuyVe(VeSelected.Email, VeSelected)

                        RefreshData()
                        ToastifyMessage.ToastSuccess("Huỷ vé thành công")
                        SetStatusModalXacNhanHuyVe(false)
                        SetStateModalHandling(false)
                    }else {
                        ToastifyMessage.ToastError("Không thể huỷ vé này")
                        SetStatusModalXacNhanHuyVe(false)
                        SetStateModalHandling(false)
                    }
                })
            }
        })
    }

    const btnAccepPayment_Click = (MaVe)=>{
        SetStateModalHandling(true)

        AdminService.ThanhToan(MaVe).then(response => {
            SetStateModalHandling(false)
            SetStatusModalXacNhanThanhToan(false)
            if (response.data.status) {
                AdminService.SendEmailThanhToan(VeSelected.email, VeSelected)

                RefreshData()
                ToastifyMessage.ToastSuccess("Thanh Toán Thành Công")
            }else {
                ToastifyMessage.ToastError("Thanh Toán Thật Bại")
            }
        })
    }
    return (
        <div className="flex p-12">
            <table className="border-collapse border border-green-800 shadow-lg bg-white">
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
                                    {item.MaVe[0]}
                                </div>
                                <div>
                                    <b>Tàu: </b>
                                    {item.TenTau}
                                </div>

                                <div className="mt-2">
                                    Đi từ {item.TenGaDi} đến {item.TenGaDen}
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
                            <td>{numeral(parseFloat(item.GiaVe) + (parseFloat(item.GiaVe) * 10/100)).format(0,0)} VNĐ</td>

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
                                    <div>Vé đã trả</div>
                                ) : (
                                    <div>
                                        {
                                            item.isPaid ? (
                                                <div>
                                                    <button onClick={btnHuyVeClick.bind(null, item)}
                                                            className="m-2 p-1 text-white bg-red-600">Trả Vé
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <button onClick={btnHuyVeClick.bind(null, item)}
                                                            className="m-2 p-1 text-white bg-red-600">Trả Vé
                                                    </button>
                                                    <button onClick={btnThanhToanClick.bind(null, item)}
                                                            className="m-2 p-1 text-white bg-blue-600">Thanh toán
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                                }
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <React.Fragment>
                <Modal open={StatusModalXacNhanHuyVe} onClose={onCloseModalXacNhanHuyVe} center
                       closeOnOverlayClick={false} showCloseIcon={true}>
                    <div className="py-8 px-4">
                        <div className="text-2xl text-center font-bold">Xác thực huỷ vé</div>
                        <div className="border p-4 mt-4">
                            <p>Nhập mã xác nhận được gửi đến số điện thoại của khách hàng: </p>
                            <br/>
                            <div className="text-center">
                                <input className="border px-4 py-2" type="text" id="txtMaXacNhan"/>
                            </div>
                        </div>
                        <div className="text-center mt-8">
                            <button className="px-6 py-2 bg-main text-white" onClick={btnXacNhanSoDienThoai_Click}>Chấp Nhận</button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
            <React.Fragment>
                <Modal classNames="text-center" open={StateModalHandling} onClose={onCloseModalHandling} center closeOnOverlayClick={false} showCloseIcon={false}>
                    <div className="flex justify-center py-6">
                        <img style={{ width: "12%" }} src="https://i.gifer.com/ZKZg.gif"></img>
                    </div>
                    <div className="flex justify-center">
                        <span className="font-bold">ĐANG XỬ LÝ...</span>
                    </div>
                </Modal>
            </React.Fragment>
            <React.Fragment>
                <Modal open={StatusModalXacNhanThanhToan} onClose={onCloseModalXacNhanThanhToan} center
                       closeOnOverlayClick={false} showCloseIcon={true}>
                    <div className="py-8 px-4">
                        <div className="text-2xl text-center font-bold">Xác nhận thanh toán của bạn</div>
                        <div className="border p-4 mt-4">
                            {
                                VeSelected ? (
                                    <div>
                                        <p>Tàu: {VeSelected.TenTau}</p>
                                        <p>Thời gian đi: {VeSelected.ThoiGianDi}</p>
                                        <br/>
                                        <p>Đi từ {VeSelected.TenGaDi} đến {VeSelected.TenGaDen}</p>
                                        <p>Mã vé: {VeSelected.MaVe}</p>
                                        <p>Mã ghế: {VeSelected.MaGhe}</p>
                                        <p>Mã toa: {VeSelected.MaToaTau}</p>
                                        <div className="text-xl text-center py-4">
                                            <p>{numeral(parseFloat(VeSelected.GiaVe) + (parseFloat(VeSelected.GiaVe) * 10/100)).format('0,0')} VNĐ</p>
                                        </div>
                                    </div>) : (
                                    <div></div>
                                )
                            }
                        </div>
                        <div className="text-center mt-8">
                            <button className="px-6 py-2 bg-main text-white" onClick={btnAccepPayment_Click.bind(null, VeSelected.MaVe)}>Chấp Nhận</button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        </div>
    );
}

export default QuanLyVe;
