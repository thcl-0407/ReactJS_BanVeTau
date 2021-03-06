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
            ToastifyMessage.ToastError("Ch??a Nh???p M?? X??c Nh???n")
            return
        }

        OTPService.VerifyCode(SoDienThoai, Code).then(response => {
            if (response.data.status == 404) {
                SetStateModalHandling(false)
                ToastifyMessage.ToastError("M?? X??c Nh???n ???? H???t H???n")
                return
            }
            if (response.data.valid == false) {
                SetStateModalHandling(false)
                ToastifyMessage.ToastError("M?? X??c Nh???n Ch??a Ch??nh X??c")
                return
            }
            if (response.data.valid == true) {
                //X??? L?? Hu??? V??
                KhachHangService.TraVe(VeSelectToHuy.MaVe, token).then(response => {
                    if(response.data.status){
                        SetStateModalHandling(false)
                        SetStateModalXacNhanSoDienThoai(false)

                        KhachHangService.GetDSVeDaMua(token).then(response => {
                            console.log("Update Data DSVeDaMua",response.data.data);
                            SetDSVeDaMua(response.data.data)

                            let token = reactLocalStorage.getObject('CurrentToken')
                            KhachHangService.SendEmailTraVe(VeSelectToHuy, token).then(response =>{
                                console.log(response.data.data);
                            })
                        })

                        ToastifyMessage.ToastSuccess("Ch???p Nh???n Tr??? V??")
                    }else{
                        SetStateModalHandling(false)
                        SetStateModalXacNhanSoDienThoai(false)
                        
                        ToastifyMessage.ToastError("C?? L???i X???y Ra, B???n Kh??ng Th??? Tr??? V?? V??o L??c N??y")
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
                ToastifyMessage.ToastError("Kh??ng Th??? G???i M?? X??c Nh???n L??c N??y")
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
                                <th>Chi Ti???t V??</th>
                                <th>Th???i Gian ??i</th>
                                <th>Ng??y ?????t V??</th>
                                <th>PT Thanh To??n</th>
                                <th>???? Thanh To??n</th>
                                <th>???? S??? D???ng</th>
                                <th>V?? Tr??? L???i</th>
                                <th>Gi?? V??</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {DSVeDaMua.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-left">
                                        <div>
                                            <b>M?? v??: </b>{item.MaVe}
                                        </div>
                                        <div>
                                            <b>T??u: </b>{item.TenTau}
                                        </div>
                                        <div className="mt-2">
                                            ??i t??? {item.TenGaDi}({item.MaGaDi}) ?????n {item.TenGaDen}({item.MaGaDen})
                                        </div>
                                        <div className="mt-2">
                                            <b>M?? Gh???: </b>{item.MaGhe}
                                        </div>
                                        <div>
                                            <b>M?? Toa: </b>{item.MaToaTau}
                                        </div>
                                        <div>
                                            <b>Ph??n Lo???i: </b>{item.TenPhanLoai}
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
                                            <span>Tr??? Sau</span>
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
                                        {numeral(item.GiaVe).format('0,0')} VN??
                                    </td>
                                    <td>
                                        {item.isCancel ? (
                                            <div>V?? Tr??? L???i</div>
                                        ) : (
                                            item.isCheckIn ? (
                                                <div>V?? ???? S??? D???ng</div>
                                            ) : (
                                                <button onClick={btnHuyVeClick.bind(null, item)} className="py-1 px-2 text-white bg-red-600">Tr??? V??</button>
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
                        <div className="text-lg">B???n c?? ch???c ch???n mu???n hu??? v?? n??y kh??ng ?</div>
                        <br />
                        <div className="text-center mt-2">
                            <button onClick={btnDongYHuyVe_Click} className="bg-main text-white px-2 py-1">?????ng ??</button>
                            <button onClick={btnCancleHuyVe_Click} className="bg-red-500 text-white px-2 py-1 ml-6">Kh??ng</button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
            <React.Fragment>
                <Modal open={StateModalXacNhanSoDienThoai} onClose={onCloseModalXacNhanSoDienThoai} center closeOnOverlayClick={false} showCloseIcon={false}>
                    <div className="mt-4 py-3 px-6">
                        <div className="text-lg">????? ti???p t???c th???c hi???n hu??? v?? b???n c???n x??c nh???n s??? ??i???n tho???i</div>
                        <br />
                        <span>???? g???i m?? x??c nh???n ?????n s??? ??i???n tho???i: </span>
                        <span>{reactLocalStorage.getObject('CurrentUser').SoDienThoai}</span>
                        <div>
                            <span>Nh???p m?? x??c nh???n b???n nh???n ???????c: &ensp;</span>
                            <div className="text-center p-2">
                                <input className="border border-main" type="text" id="txtMaXacNhan"></input>
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <button onClick={btnXacNhanMaXacThuc_Click} className="bg-main text-white px-2 py-1">X??c Nh???n</button>
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
                        <span className="font-bold">??ANG X??? L??...</span>
                    </div>
                </Modal>
            </React.Fragment>
            <React.Fragment>
                <Modal open={StatusModalThongBaoHuyVe} onClose={onCloseModalThongBaoHuyVe} center closeOnOverlayClick={false} showCloseIcon={true}>
                    <div className="py-6 px-6">
                        <div className="text-left p-2 text-red-500">
                            <h2 className="font-bold text-lg">???? qu?? th???i h???n tr??? v?? theo quy ?????nh. B???n kh??ng th??? hu??? v?? v??o l??c n??y.</h2>
                            <h2 className="font-bold text-lg">N???u b???n v???n mu???n tr??? v?? n??y vui l??ng li??n h??? v???i b??? ph???n h??? tr??? t???i nh?? ga.</h2>
                            <br />
                            <h2 className="font-bold text-lg">Tr??n tr???ng</h2>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        </div>
    )
}

export default VeDaMua