import { reactLocalStorage } from 'reactjs-localstorage';
import lodash from 'lodash';
import history from './../../../../history';
import React, { useContext, useState, useEffect } from 'react';
import { VeContext } from "./../../../../contexts/VeContext"
import "./XacNhanThongTinDatVe.scss"
import DateFormat from "date-format"
import numeral from 'numeral';
import { Modal } from 'react-responsive-modal';
import ToastifyMessage from './../../../../utilities/ToastifyMessage';
import KhachHangService from './../../../../services/KhachHang.Service';

function XacNhanThongTinDatVe(props) {
    const { VeStateContext, AddNewVe } = useContext(VeContext)
    const [TongCong, SetTongCong] = useState(0)
    const [User, SetUser] = useState(0)

    const [StateModalInformDatVe, SetStateModalInformDatVe] = useState(false)
    const [StateModalSuccessDatVe, SetStateModalSuccessDatVe] = useState(false)

    const onCloseModalInformDatVe = () => {
        SetStateModalInformDatVe(false)
    }

    const onCloseModalSuccessDatVe = () => {
        SetStateModalSuccessDatVe(false)
    }

    useEffect(() => {
        if (lodash.isEmpty(reactLocalStorage.getObject("CurrentUser")) && VeStateContext.length == 0) {
            history.push("/")
        } else {
            SetUser(reactLocalStorage.getObject("CurrentUser"))
        }
    }, [])

    if (VeStateContext.length == 0 && !lodash.isEmpty(reactLocalStorage.getObject("CurrentUser"))) {
        history.push("/TimVe")
    }

    const TinhTongTien = (DSDatCho) => {
        var TongTien = 0

        DSDatCho.forEach((item, index) => {
            TongTien += parseFloat(item.Toa.ToaTau.GiaVe)
        })

        TongTien = TongTien + (TongTien * 10 / 100)

        return TongTien
    }

    const btnThanhToan_Click = () => {
        let AgreeRegulation = document.getElementById("cbxAcceptRegulation")
        let token = reactLocalStorage.getObject('CurrentToken')

        if(!AgreeRegulation.checked){
            ToastifyMessage.ToastError("Bạn cần đồng ý với các quy định của trang web")
            return
        }
        
        SetStateModalInformDatVe(true)
        DatVe()
    }

    const DatVe = () => {
        const token = reactLocalStorage.getObject('CurrentToken')

        VeStateContext.forEach(async (item, index)=>{
            console.log(item);

            let param = {
                ThoiGianDi: item.Tau.ThoiGianDi,
                GiaVe: item.Toa.ToaTau.GiaVe,
                MaGaDi: item.Tau.MaGaDi,
                MaGaDen: item.Tau.MaGaDen,
                isPaid: false,
                MaGhe: item.Ghe.MaGhe,
                PhuongThucThanhToan: 0
            }

            await KhachHangService.DatVe(param, token).then(response => {
                if(!response.data.status){
                    SetStateModalInformDatVe(false)
                    ToastifyMessage.ToastError("Có Lỗi Xảy Ra")
                    return
                }

                if(response.data.status && index == VeStateContext.length - 1){
                    setTimeout(()=>{
                        SetStateModalInformDatVe(false)
                        SetStateModalSuccessDatVe(true)
    
                        setTimeout(()=>{
                            KhachHangService.SendEmailDatVe(VeStateContext, token)
                            history.push('/CamOnQuyKhach')
                        }, 3000)
                    },1000)
                }
            })
        })
    }

    return (
        <div className="p-8">
            <div className="border border-gray-300 shadow-lg">
                <div className="border-b-4 border-main p-4">
                    <span className="text-xl font-bold text-mainFont"><i className="fas fa-ticket-alt"></i>&ensp;Danh Sách Vé Bạn Muốn Đặt</span>
                </div>
                <div className="p-8">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tàu</th>
                                <th>Toa Tàu</th>
                                <th>Chi Tiết Vé</th>
                                <th>Thời Gian Đi</th>
                                <th>Giá Vé</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VeStateContext.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.Tau.TenTau}</td>
                                    <td>Toa Số {item.Toa.STT} - {item.Toa.ToaTau.TenPhanLoai}</td>
                                    <td>
                                        <div>
                                            <span>Đi từ {item.Tau.TenGaDi} đến {item.Tau.TenGaDen}</span>
                                        </div>
                                    </td>
                                    <td>{DateFormat("dd/MM/yyyy 8:00 AM", new Date(item.Tau.ThoiGianDi))}</td>
                                    <td>{numeral(item.Toa.ToaTau.GiaVe).format('0,0')} VNĐ</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="5" className="text-right font-bold p-2">
                                    <div>
                                        <p className="text-lg">Tổng Cộng</p>
                                        <p className="text-sm">Đã Bao Gồm 10% Thuế VAT</p>
                                    </div>
                                </td>
                                <td>{numeral(TinhTongTien(VeStateContext)).format('0,0')} VNĐ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="border mt-6 border-gray-300 shadow-lg">
                <div className="border-b-4 border-main p-4">
                    <span className="text-xl font-bold text-mainFont"><i className="fas fa-user"></i>&ensp;Thông Tin Khách Hàng</span>
                </div>
                <div className="p-8 pt- pb-14 inline-flex">
                    <div className="">
                        <div className="mt-4">
                            <span className="text-lg font-bold">Ông/Bà: &emsp;</span>
                            <br></br>
                            <input type="text" readOnly defaultValue={User.HoTen} className="border p-2 mt-1 w-80"></input>
                        </div>
                        <div className="mt-4">
                            <span className="text-lg font-bold">Căn Cước hoặc CMND Số: &emsp;</span>
                            <br></br>
                            <input type="text" readOnly defaultValue={User.SoCMND} className="border p-2 mt-1 w-80"></input>
                        </div>
                    </div>
                    <div className="ml-12">
                        <div className="mt-4">
                            <span className="text-lg font-bold">Số Điện Thoại: &emsp;</span>
                            <br></br>
                            <input type="text" readOnly defaultValue={User.SoDienThoai} className="border p-2 mt-1 w-80"></input>
                        </div>
                        <div className="mt-4">
                            <span className="text-lg font-bold">Email: &emsp;</span>
                            <br></br>
                            <input type="text" readOnly defaultValue={User.email} className="border p-2 mt-1 w-80"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border mt-6 border-gray-300 shadow-lg">
                <div className="border-b-4 border-main p-4">
                    <span className="text-xl font-bold text-mainFont"><i class="fas fa-money-check-alt"></i>&ensp;Chọn Phương Thức Thanh Toán</span>
                </div>
                <div className="p-8">
                    <div>
                        <input type="radio" checked id="rbtnThanhToanTaiGa"></input>
                        <span>&ensp;Thanh toán trả sau tại nhà ga hoặc các điểm bưu cục VNPost</span>
                    </div>
                </div>
            </div>
            <div>
                <div className="py-6">
                    <input type="checkbox" id="cbxAcceptRegulation"></input>
                    <span>&ensp;</span>
                    <span>Tôi đã đọc kỹ và đồng ý tuân thủ tất cả các quy định mua vé trực tuyến, các chính sách của Tổng công ty đường sắt Việt Nam và chịu trách nhiệm về tính xác thực của các thông tin trên.</span>
                </div>
                <div className="text-right py-4">
                    <button onClick={btnThanhToan_Click} className="cursor-pointer px-8 py-4 bg-main text-white font-bold text-lg"><i class="fas fa-shopping-cart"></i>&ensp;Thanh Toán</button>
                </div>
            </div>
            <React.Fragment>
                <Modal classNames="text-center" open={StateModalInformDatVe} onClose={onCloseModalInformDatVe} center closeOnOverlayClick={false} showCloseIcon={false}>
                    <div className="flex justify-center py-6">
                        <img style={{ width: "12%" }} src="https://i.gifer.com/ZKZg.gif"></img>
                    </div>
                    <div className="flex justify-center">
                        <span className="font-bold">ĐANG XỬ LÝ...</span>
                    </div>
                </Modal>
            </React.Fragment>
            <React.Fragment>
                <Modal classNames="text-center" open={StateModalSuccessDatVe} onClose={onCloseModalSuccessDatVe} center closeOnOverlayClick={false} showCloseIcon={false}>
                    <div className="flex justify-center py-4 w-80">
                        <span className="text-5xl" style={{ color: "green" }}><i className="far fa-check-circle"></i></span>
                    </div>
                    <div className="flex justify-center">
                        <span className="font-bold" style={{ color: "green" }}>ĐẶT VÉ THÀNH CÔNG</span>
                    </div>
                </Modal>
            </React.Fragment>
        </div>
    )
}

export default XacNhanThongTinDatVe