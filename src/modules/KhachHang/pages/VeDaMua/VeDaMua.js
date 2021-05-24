import React, { useState, useEffect } from "react";
import KhachHangService from "./../../../../services/KhachHang.Service";
import OTPService from "./../../../../services/OTP.Service";
import { reactLocalStorage } from 'reactjs-localstorage';
import DateFormat from 'date-format'
import addSubtractDate from 'add-subtract-date'
import numeral from "numeral"
import ToastifyMessage from "./../../../../utilities/ToastifyMessage";
import Modal from "react-responsive-modal";

var token = ""

function VeDaMua(props) {
    const [DSVeDaMua, SetDSVeDaMua] = useState([])
    const [StatusModalThongBaoHuyVe, SetStatusModalThongBaoHuyVe] = useState(false)
    const [StateModalHandling, SetStateModalHandling] = useState(false)
    const [StateModalXacNhanSoDienThoai, SetStateModalXacNhanSoDienThoai] = useState(false)
    const [StateModalXacNhanHuyVe, SetStateModalXacNhanHuyVe] = useState(false)
    const [VeSelectToHuy, SetVeSelectToHuy] = useState({})

    useEffect(() => {
        SetStateModalHandling(true)
        token = reactLocalStorage.getObject("CurrentToken")

        if (token != undefined) {
            KhachHangService.GetDSVeDaMua(token).then(response => {
                console.log(response.data.data);
                SetDSVeDaMua(response.data.data)
                SetStateModalHandling(false)
            })
        }
    }, [])

    const btnHuyVeClick = (Ve) => {
        let DateNeedCheck = addSubtractDate.add(new Date(Date.now()), 2, "day")
        DateNeedCheck = DateFormat("yyyy-MM-dd", new Date(DateNeedCheck))
        let ThoiGianDi = DateFormat("yyyy-MM-dd", new Date(Ve.ThoiGianDi))

        SetVeSelectToHuy(Ve)

        if (ThoiGianDi == DateNeedCheck) {
            SetStatusModalThongBaoHuyVe(true)
            return
        } else {
            SetStateModalXacNhanHuyVe(true)
        }
    }

    const onCloseModalThongBaoHuyVe = () => {
        SetStatusModalThongBaoHuyVe(false)
    }

    const onCloseModalHandling = () => {
        SetStateModalHandling(false)
    }

    const onCloseModalXacNhanSoDienThoai = () => {
        SetStateModalXacNhanSoDienThoai(false)
    }

    const onCloseModalXacNhanHuyVe = () => {
        SetStateModalXacNhanHuyVe(false)
    }

    const btnXacNhanMaXacThuc_Click = () => {
        SetStateModalXacNhanHuyVe(false)
        SetStateModalHandling(true)

        let SoDienThoai = reactLocalStorage.getObject('CurrentUser').SoDienThoai.trim()
        let Code = document.getElementById('txtMaXacNhan').value

        KhachHangService.TraVe(VeSelectToHuy.MaVe, token).then(response => {
            console.log(response);
        })

        if (Code.trim() == "") {
            SetStateModalHandling(false)
            ToastifyMessage.ToastError("Chưa Nhập Mã Xác Nhận")
            return
        }

        OTPService.VerifyCode(SoDienThoai, Code).then(response => {
            if (response.data.status == 404) {
                SetStateModalHandling(false)
                ToastifyMessage.ToastError("Mã Xác Nhận Đã Hết Hạn")
                return
            }
            if (response.data.valid == false) {
                SetStateModalHandling(false)
                ToastifyMessage.ToastError("Mã Xác Nhận Chưa Chính Xác")
                return
            }
            if (response.data.valid == true) {
                //Xử Lý Huỷ Vé
                KhachHangService.TraVe(VeSelectToHuy.MaVe, token).then(response => {
                    if(response.data.status){
                        SetStateModalHandling(false)
                        SetStateModalXacNhanSoDienThoai(false)

                        KhachHangService.GetDSVeDaMua(token).then(response => {
                            console.log("Update Data DSVeDaMua",response.data.data);
                            SetDSVeDaMua(response.data.data)
                        })

                        ToastifyMessage.ToastSuccess("Chấp Nhận Trả Vé")
                    }else{
                        SetStateModalHandling(false)
                        SetStateModalXacNhanSoDienThoai(false)
                        
                        ToastifyMessage.ToastError("Có Lỗi Xảy Ra, Bạn Không Thể Trả Vé Vào Lúc Này")
                    }
                })    
            }
        })
    }

    const btnCancleHuyVe_Click = () => {
        SetStateModalXacNhanHuyVe(false)
    }

    const btnDongYHuyVe_Click = () => {
        SetStateModalHandling(true)
        let SoDienThoai = reactLocalStorage.getObject('CurrentUser').SoDienThoai
        
        OTPService.SendSMSCode(SoDienThoai).then(response => {
            console.log(response);
            if(response.data.isSended){
                SetStateModalHandling(false)
                SetStateModalXacNhanSoDienThoai(true)
            }
        }).catch(error=>{
            if(error){
                SetStateModalHandling(false)
                SetStateModalXacNhanHuyVe(false)
                ToastifyMessage.ToastError("Không Thể Gửi Mã Xác Nhận Lúc Này")
            }
        })
    }

    return (
        <div className="p-12 flex justify-center">
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Chi Tiết Vé</th>
                                <th>Thời Gian Đi</th>
                                <th>Ngày Đặt Vé</th>
                                <th>PT Thanh Toán</th>
                                <th>Đã Thanh Toán</th>
                                <th>Đã Sử Dụng</th>
                                <th>Vé Trả Lại</th>
                                <th>Giá Vé</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {DSVeDaMua.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-left">
                                        <div>
                                            <b>Tàu: </b>{item.TenTau}
                                        </div>
                                        <div className="mt-2">
                                            Đi từ {item.TenGaDi}({item.MaGaDi}) đến {item.TenGaDen}({item.MaGaDen})
                                        </div>
                                        <div className="mt-2">
                                            <b>Mã Ghế: </b>{item.MaGhe}
                                        </div>
                                        <div>
                                            <b>Mã Toa: </b>{item.MaToaTau}
                                        </div>
                                        <div>
                                            <b>Phân Loại: </b>{item.TenPhanLoai}
                                        </div>
                                    </td>
                                    <td>
                                        {DateFormat('dd/MM/yyyy', new Date(item.ThoiGianDi))}
                                    </td>
                                    <td>
                                        {item.isCheckIn ? (
                                            DateFormat('dd/MM/yyyy', new Date(item.ThoiGianDi))
                                        ) : (
                                            DateFormat('dd/MM/yyyy', new Date(item.NgayDatVe))
                                        )}
                                    </td>
                                    <td>
                                        {item.PhuongThucThanhToan == 0 ? (
                                            <span>Trả Sau</span>
                                        ) : (
                                            <span>Unknow</span>
                                        )}
                                    </td>
                                    <td>
                                        {item.isPaid ? (
                                            <div className="text-green-600"><i className="fas fa-check"></i></div>
                                        ) : (
                                            <div className="text-red-600"><i className="fas fa-times"></i></div>
                                        )}
                                    </td>
                                    <td>
                                        {item.isCheckIn ? (
                                            <div className="text-green-600"><i className="fas fa-check"></i></div>
                                        ) : (
                                            <div className="text-red-600"><i className="fas fa-times"></i></div>
                                        )}
                                    </td>
                                    <td>
                                        {item.isCancel ? (
                                            <div className="text-green-600"><i className="fas fa-check"></i></div>
                                        ) : (
                                            <div className="text-red-600"><i className="fas fa-times"></i></div>
                                        )}
                                    </td>
                                    <td>
                                        {numeral(item.GiaVe).format('0,0')} VNĐ
                                    </td>
                                    <td>
                                        {item.isCancel ? (
                                            <div>Vé Trả Lại</div>
                                        ) : (
                                            item.isCheckIn ? (
                                                <div>Vé Đã Sử Dụng</div>
                                            ) : (
                                                <button onClick={btnHuyVeClick.bind(null, item)} className="py-1 px-2 text-white bg-red-600">Trả Vé</button>
                                            )
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <React.Fragment>
                <Modal open={StateModalXacNhanHuyVe} onClose={onCloseModalXacNhanHuyVe} center closeOnOverlayClick={false} showCloseIcon={false}>
                    <div className="mt-4 py-3 px-6">
                        <div className="text-lg">Bạn có chắc chắn muốn huỷ vé này không ?</div>
                        <br />
                        <div className="text-center mt-2">
                            <button onClick={btnDongYHuyVe_Click} className="bg-main text-white px-2 py-1">Đồng Ý</button>
                            <button onClick={btnCancleHuyVe_Click} className="bg-red-500 text-white px-2 py-1 ml-6">Không</button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
            <React.Fragment>
                <Modal open={StateModalXacNhanSoDienThoai} onClose={onCloseModalXacNhanSoDienThoai} center closeOnOverlayClick={false} showCloseIcon={false}>
                    <div className="mt-4 py-3 px-6">
                        <div className="text-lg">Để tiếp tục thực hiện huỷ vé bạn cần xác nhận số điện thoại</div>
                        <br />
                        <span>Đã gửi mã xác nhận đến số điện thoại: </span>
                        <span>{reactLocalStorage.getObject('CurrentUser').SoDienThoai}</span>
                        <div>
                            <span>Nhập mã xác nhận bạn nhận được: &ensp;</span>
                            <div className="text-center p-2">
                                <input className="border border-main" type="text" id="txtMaXacNhan"></input>
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <button onClick={btnXacNhanMaXacThuc_Click} className="bg-main text-white px-2 py-1">Xác Nhận</button>
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
                <Modal open={StatusModalThongBaoHuyVe} onClose={onCloseModalThongBaoHuyVe} center closeOnOverlayClick={false} showCloseIcon={true}>
                    <div className="py-6 px-6">
                        <div className="text-left p-2 text-red-500">
                            <h2 className="font-bold text-lg">Đã quá thời hạn trả vé theo quy định. Bạn không thể huỷ vé vào lúc này.</h2>
                            <h2 className="font-bold text-lg">Nếu bạn vẫn muốn trả vé này vui lòng liên hệ với bộ phận hỗ trợ tại nhà ga.</h2>
                            <br />
                            <h2 className="font-bold text-lg">Trân trọng</h2>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        </div>
    )
}

export default VeDaMua