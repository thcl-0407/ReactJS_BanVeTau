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

    if(lodash.isEmpty(reactLocalStorage.getObject("CurrentUser"))){
        history.push("/DangNhap")
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
            ToastifyMessage.ToastError("B???n c???n ?????ng ?? v???i c??c quy ?????nh c???a trang web")
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
                    ToastifyMessage.ToastError("C?? L???i X???y Ra")
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
                    <span className="text-xl font-bold text-mainFont"><i className="fas fa-ticket-alt"></i>&ensp;Danh S??ch V?? B???n Mu???n ?????t</span>
                </div>
                <div className="p-8">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>T??u</th>
                                <th>Toa T??u</th>
                                <th>Chi Ti???t V??</th>
                                <th>Th???i Gian ??i</th>
                                <th>Gi?? V??</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VeStateContext.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.Tau.TenTau}</td>
                                    <td>Toa S??? {item.Toa.STT} - {item.Toa.ToaTau.TenPhanLoai}</td>
                                    <td>
                                        <div>
                                            <span>??i t??? {item.Tau.TenGaDi} ?????n {item.Tau.TenGaDen}</span>
                                        </div>
                                    </td>
                                    <td>{DateFormat("dd/MM/yyyy 8:00 AM", new Date(item.Tau.ThoiGianDi))}</td>
                                    <td>{numeral(item.Toa.ToaTau.GiaVe).format('0,0')} VN??</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="5" className="text-right font-bold p-2">
                                    <div>
                                        <p className="text-lg">T???ng C???ng</p>
                                        <p className="text-sm">???? Bao G???m 10% Thu??? VAT</p>
                                    </div>
                                </td>
                                <td>{numeral(TinhTongTien(VeStateContext)).format('0,0')} VN??</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="border mt-6 border-gray-300 shadow-lg">
                <div className="border-b-4 border-main p-4">
                    <span className="text-xl font-bold text-mainFont"><i className="fas fa-user"></i>&ensp;Th??ng Tin Kh??ch H??ng</span>
                </div>
                <div className="p-8 pt- pb-14 inline-flex">
                    <div className="">
                        <div className="mt-4">
                            <span className="text-lg font-bold">??ng/B??: &emsp;</span>
                            <br></br>
                            <input type="text" readOnly defaultValue={User.HoTen} className="border p-2 mt-1 w-80"></input>
                        </div>
                        <div className="mt-4">
                            <span className="text-lg font-bold">C??n C?????c ho???c CMND S???: &emsp;</span>
                            <br></br>
                            <input type="text" readOnly defaultValue={User.SoCMND} className="border p-2 mt-1 w-80"></input>
                        </div>
                    </div>
                    <div className="ml-12">
                        <div className="mt-4">
                            <span className="text-lg font-bold">S??? ??i???n Tho???i: &emsp;</span>
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
                    <span className="text-xl font-bold text-mainFont"><i class="fas fa-money-check-alt"></i>&ensp;Ch???n Ph????ng Th???c Thanh To??n</span>
                </div>
                <div className="p-8">
                    <div>
                        <input type="radio" checked id="rbtnThanhToanTaiGa"></input>
                        <span>&ensp;Thanh to??n tr??? sau t???i nh?? ga ho???c c??c ??i???m b??u c???c VNPost</span>
                    </div>
                </div>
            </div>
            <div>
                <div className="py-6">
                    <input type="checkbox" id="cbxAcceptRegulation"></input>
                    <span>&ensp;</span>
                    <span>T??i ???? ?????c k??? v?? ?????ng ?? tu??n th??? t???t c??? c??c quy ?????nh mua v?? tr???c tuy???n, c??c ch??nh s??ch c???a T???ng c??ng ty ???????ng s???t Vi???t Nam v?? ch???u tr??ch nhi???m v??? t??nh x??c th???c c???a c??c th??ng tin tr??n.</span>
                </div>
                <div className="text-right py-4">
                    <button onClick={btnThanhToan_Click} className="cursor-pointer px-8 py-4 bg-main text-white font-bold text-lg"><i class="fas fa-shopping-cart"></i>&ensp;Thanh To??n</button>
                </div>
            </div>
            <React.Fragment>
                <Modal classNames="text-center" open={StateModalInformDatVe} onClose={onCloseModalInformDatVe} center closeOnOverlayClick={false} showCloseIcon={false}>
                    <div className="flex justify-center py-6">
                        <img style={{ width: "12%" }} src="https://i.gifer.com/ZKZg.gif"></img>
                    </div>
                    <div className="flex justify-center">
                        <span className="font-bold">??ANG X??? L??...</span>
                    </div>
                </Modal>
            </React.Fragment>
            <React.Fragment>
                <Modal classNames="text-center" open={StateModalSuccessDatVe} onClose={onCloseModalSuccessDatVe} center closeOnOverlayClick={false} showCloseIcon={false}>
                    <div className="flex justify-center py-4 w-80">
                        <span className="text-5xl" style={{ color: "green" }}><i className="far fa-check-circle"></i></span>
                    </div>
                    <div className="flex justify-center">
                        <span className="font-bold" style={{ color: "green" }}>?????T V?? TH??NH C??NG</span>
                    </div>
                </Modal>
            </React.Fragment>
        </div>
    )
}

export default XacNhanThongTinDatVe