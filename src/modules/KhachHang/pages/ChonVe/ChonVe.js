import React, { useContext, useEffect, useState } from "react"
import Tau from "./../../components/Tau/Tau"
import ToaTau from "./../../components/ToaTau/ToaTau"
import Ghe from "./../../components/Ghe/Ghe"
import "./ChonVe.scss"
import history from "./../../../../history"
import lodash from "lodash"
import { Modal } from 'react-responsive-modal';
import { LichTrinhContext } from "./../../../../contexts/LichTrinhContext"
import { VeContext } from "./../../../../contexts/VeContext"
import DateFormat from "date-format"
import KhachHangService from "./../../../../services/KhachHang.Service"
import ToastifyMessage from "./../../../../utilities/ToastifyMessage"
import numeral from "numeral"

function ChonVe(props) {
    const { Schedule } = useContext(LichTrinhContext)
    const { AddNewVe, VeStateContext } = useContext(VeContext)

    //State
    const [Taus, SetTaus] = useState([])
    const [DSToa, SetDSToa] = useState([])
    const [DSGhe, SetDSGhe] = useState([])

    const [TauSelect, SetTauSelect] = useState({})
    const [ToaSelect, SetToaSelect] = useState({})
    const [GheSelect, SetGheSelect] = useState([])
    const [TongTien, SetTongTien] = useState(0)

    const [DSGheDaMua, SetDSGheDaMua] = useState([])

    const [StatusModalXacNhanMuaVe, SetStatusModalXacNhanMuaVe] = useState(false);
    const [StatusModalThongBaoTimKiem, SetStatusModalThongBaoTimKiem] = useState(false);

    useEffect(() => {
        let param = {
            MaGaDi: Schedule.MaGaDi,
            MaGaDen: Schedule.MaGaDen,
            ThoiGianDi: DateFormat("yyyy-MM-dd", Schedule.ThoiGianDi)
        }

        KhachHangService.GetDanhSachTau_FollowLichTrinh(param).then((response) => {
            if(response.data.data.length == 0){
                SetStatusModalThongBaoTimKiem(true)
                return
            }

            response.data.data.forEach(item => {
                let GaTrungGian = item.GaTrungGian.split(',')
                item.inforGaTrungGian = []

                GaTrungGian.forEach(id => {
                    KhachHangService.GetNhaGa(id).then(result => {
                        item.inforGaTrungGian.push(result.data.data)
                    })
                })
            })

            console.log(response.data.data)
            SetTaus(response.data.data)
        })

        SetGheSelect(VeStateContext)
    }, [])

    const onCloseModalXacNhanMuaVe = () => {
        SetStatusModalXacNhanMuaVe(false)
    }

    const onCloseModalThongBaoTimKiem = ()=>{
        SetStatusModalThongBaoTimKiem(false)
    }

    //Quay Về Trang Chủ
    const btnQuayVeTrangChu_Click = ()=>{
        history.push('/')
    }

    //Loading Danh Sach Toa Tau
    const SelectedTau = (Tau) => {
        //Fix MaGaDen Khi Tach Chuyen
        Tau.MaGaDi = Schedule.MaGaDi
        Tau.TenGaDi = Schedule.TenGaDi
        Tau.MaGaDen = Schedule.MaGaDen
        Tau.TenGaDen = Schedule.TenGaDen

        SetTauSelect(Tau)
        SetDSToa([])
        SetDSGhe([])

        KhachHangService.GetDSToa_Of_Tau(Tau.MaTau).then((response) => {
            SetDSToa(response.data.data)
            console.log(response.data.data)
        })

        SetToaSelect({})

        let param = {
            MaGaDi: Tau.MaGaDi,
            MaGaDen: Tau.MaGaDen,
            ThoiGianDi: DateFormat("yyyy-MM-dd", new Date(Tau.ThoiGianDi)),
            MaTau: Tau.MaTau
        }

        //Get Danh Sach Ghe Da Mua
        KhachHangService.GetDSGheDaDat(param).then(response => {
            console.log("DSGheDaDat", response.data.data)
            SetDSGheDaMua(response.data.data)
        })
    }

    //Loading Danh Sach Ghe Cua Toa Tau
    const SelectedToaTau = (object) => {
        SetDSGhe([])
        SetToaSelect(object)

        console.log(DSGheDaMua)
       
        KhachHangService.GetDSGhe_Of_ToaTau(object.ToaTau.MaToaTau).then(response => {
            if(!lodash.isEmpty(GheSelect)){
                var DSGhe = []

                response.data.data.forEach((item, index) => {
                    var Ghe = {
                        data: item,
                        isSelected: false,
                        isAvailable: true
                    }

                    DSGheDaMua.forEach(dsg => {
                        if(dsg.MaGhe == item.MaGhe){
                            Ghe.isAvailable = false
                        }
                    })

                    //Check DS Ghế Đã Chọn
                    GheSelect.forEach(g => {
                        if(item.MaGhe == g.Ghe.MaGhe && g.Ghe.MaToaTau == object.ToaTau.MaToaTau){
                            Ghe.isSelected = true
                        }
                    })

                    DSGhe.push(Ghe)
                })

                SetDSGhe(DSGhe)
            }else{
                let DSGhe = []

                response.data.data.forEach(item => {
                    let Ghe = {
                        data: item,
                        isSelected: false,
                        isAvailable: true
                    }
  
                    //Check Ghe Da Mua
                    DSGheDaMua.forEach(dsg => {
                        if(dsg.MaGhe == item.MaGhe){
                            Ghe.isAvailable = false
                        }
                    })

                    DSGhe.push(Ghe)
                })

                SetDSGhe(DSGhe)
            }
        })
    }

    //Select Ghe
    const SelectedGhe = (object) => {
        var temp = GheSelect
        let ElementGhe = document.getElementById("Ghe" + object.Ghe.MaGhe)
        console.log("ClickGhe", { object: object })

        //Fix Lỗi Mã Chỗ Ngồi
        object.Ghe.MaChoNgoi = object.STT

        if(ElementGhe.style.backgroundColor == "red"){
            ToastifyMessage.ToastError("Ghế Đã Được Mua")
            return
        }

        //Fix Lỗi Tracking Giỏ Vé
        object.Ghe.isSelected = true

        if (ElementGhe.style.backgroundColor == "green") {
            ElementGhe.style.backgroundColor = "white"

            //Fix Lỗi Tracking Giỏ Vé
            object.Ghe.isSelected = false

            ToastifyMessage.ToastSuccess("Đã Bỏ Chọn Ghế " + object.Ghe.MaChoNgoi)
            temp = temp.filter(value => value.Ghe.MaGhe != object.Ghe.MaGhe)
        } else {
            ElementGhe.style.backgroundColor = "green"
            temp.push({
                Tau: TauSelect,
                Toa: ToaSelect,
                Ghe: object.Ghe
            })

            ToastifyMessage.ToastSuccess("Đã Thêm Ghế " + object.Ghe.MaChoNgoi + " Vào Giỏ")
        }

        //console.log(temp)
        SetGheSelect(temp)

        //Add Global Storage
        AddNewVe(temp)

        //Tinh Tong Tien
        let TongTien = TinhTongTien(temp)
        SetTongTien(TongTien)
    }

    const TinhTongTien = (DSDatCho) => {
        var TongTien = 0
        
        DSDatCho.forEach((item, index) =>{
            TongTien += parseFloat(item.Toa.ToaTau.GiaVe)
        })

        return TongTien
    }

    const btnXacNhanMuaVe_Click = () => {
        if (GheSelect.length == 0) {
            ToastifyMessage.ToastError("Chưa Chọn Vé Cần Mua")
            return;
        }

        SetStatusModalXacNhanMuaVe(true)
        SetDSGhe([])
    }

    //Click Xoá Vé Khỏi Giở
    const btnXoaVeKhoiGio_Click = (Ve) => {
        let temp = GheSelect
        temp = temp.filter(value => value.Ghe.MaGhe != Ve.Ghe.MaGhe)

        SetGheSelect(temp)
        AddNewVe(temp)
        
        //Tinh Tong Tien
        let TongTien = TinhTongTien(temp)
        SetTongTien(TongTien)
    }

    //Click Mua vé
    const btnMuaVe_Click = () => {
        history.push('/ThanhToan')
    }

    //Get Danh Sach Ve Da Dat
    const onListenToRecieveDSVe = (DSGheDaMua) => {
        SetDSGheDaMua(DSGheDaMua)
    }

    return (
        <div className="p-12">
            <div className="pt-5 px-4">
                <p className="py-2 font-extrabold text-xl text-mainFont">Chiều Đi Ngày {DateFormat("dd-MM-yyyy", Schedule.ThoiGianDi)} từ ga {Schedule.TenGaDi} đến ga {Schedule.TenGaDen}</p>
            </div>

            <div className="grid grid-cols-4">
                <div className="col-span-4 p-4">
                    <div className="border border-gray-400">
                        <div className="text-left border-b-4 border-main">
                            <p className="text-xl font-semibold p-3 text-mainFont"><i className="fas fa-subway"></i>&ensp;Chọn Tàu</p>
                            <p className="font-semibold">&ensp;Bạn Đang Chọn Tàu: {TauSelect.TenTau}</p>
                        </div>
                        <div className="flex justify-center cursor-pointer">
                            <div className="p-6">
                                {
                                    Taus.map((item, index) => (
                                        <Tau key={index} value={item} onListenToRecieveDSVe={onListenToRecieveDSVe} ClickSelectTau={SelectedTau}></Tau>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="border border-gray-400">
                            <div className="text-left border-b-4 border-main">
                                <p className="text-xl font-semibold p-3 text-mainFont"><i className="fas fa-train"></i>&ensp;Chọn Toa</p>
                                <p className="font-semibold">&ensp;Bạn Đang Chọn Toa: {ToaSelect.STT}</p>
                            </div>
                            <div className="flex justify-center cursor-pointer">
                                <div className="p-6">
                                    {DSToa.map((item, index) => (
                                        <ToaTau key={index} index={index} value={item} ClickSelectToaTau={SelectedToaTau}></ToaTau>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="border border-gray-400 flex p-6">
                            <div>
                                <span className="px-4 py-2 bg-red-600"></span>
                                <span className="font-bold">&ensp;Ghế Đã Được Mua</span>
                            </div>
                            <div className="ml-6">
                                <span className="px-4 py-2 bg-green-700"></span>
                                <span className="font-bold">&ensp;Ghế Đang Chọn</span>
                            </div>
                            <div className="ml-6">
                                <span className="px-4 py-2 bg-white border border-main"></span>
                                <span className="font-bold">&ensp;Ghế Trống</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="border border-gray-400">
                            <div className="text-left border-b-4 border-main">
                                <p className="text-xl font-semibold p-3 text-mainFont"><i className="fas fa-couch"></i>&ensp;Chọn Ghế</p>
                            </div>
                            <div className="flex justify-center items-center cursor-pointer">
                                <div className="p-6" id="box-dsGhe">
                                    {DSGhe.map((item, index) => (
                                        <Ghe key={index} index={index} value={item} ClickSelectGhe={SelectedGhe}></Ghe>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="border border-gray-400">
                            <div className="text-right py-4 pr-4 text-xl font-bold bg-gray-200">
                                <span>Tổng Tiền: </span>
                                <span>{numeral(TongTien).format('0,0')} VNĐ</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-center py-4 border border-gray-400">
                        <div className="p-4 text-left">
                            <span className="text-xl">
                                Để nâng cao chất lượng dịch vụ tốt hơn cũng như để đảm bảo quyền lợi tốt nhất của quý khách hàng, quý khách vui lòng hãy kiểm tra thông tin thật cẩn thận trước khi thực hiện mua vé.
                                <br /><br />Rất mong được hợp tác và chân thành xin lỗi quý khách hàng vì sự bất tiện này.
                            </span>
                        </div>
                        <button className="px-6 py-4 mt-4 bg-main text-white hover:bg-mainHover" onClick={btnXacNhanMuaVe_Click}>XÁC NHẬN MUA VÉ</button>
                    </div>
                </div>
            </div>
            <React.Fragment>
                <Modal open={StatusModalXacNhanMuaVe} onClose={onCloseModalXacNhanMuaVe} center closeOnOverlayClick={false}>
                    <div className="py-6 px-4">
                        <div className="text-center mb-4">
                            <h2 className="font-bold text-lg text-mainFont">Danh Sách Chi Tiết Vé Đặt Mua</h2>
                        </div>
                        <div>
                            <div>Tổng Tiền: {numeral(TongTien).format('0,0')} VNĐ</div>
                        </div>
                        {GheSelect.map((item, index) => (
                            <div key={index} className="py-4 mt-4 w-80 flex justify-center items-center border border-gray-400 bg-gray-100">
                                <div>
                                    <div>
                                        <span className="float-left">Tàu: {item.Tau.TenTau}</span>
                                        <div className="text-right">
                                            <button className="text-red-500" onClick={btnXoaVeKhoiGio_Click.bind(null, item)}><i className="fas fa-trash"></i></button>
                                        </div>
                                    </div>
                                    <br></br>
                                    <p>Đi từ ga {item.Tau.TenGaDi} đến ga {item.Tau.TenGaDen}</p>
                                    <p>Toa Số {item.Toa.STT}: {item.Toa.ToaTau.TenPhanLoai}</p>
                                    <p>Ghế Số: {item.Ghe.MaChoNgoi}</p>
                                    <p className="mt-2"><b>Thời gian khởi hành:</b> {DateFormat("dd-MM-yyyy", new Date(item.Tau.ThoiGianDi))}</p>
                                    <p className="mt-2">Giá Vé: {numeral(item.Toa.ToaTau.GiaVe).format('0,0')} VNĐ</p>
                                </div>
                            </div>
                        ))}
                        <div className="text-center mt-8">
                            <button className="px-6 py-2 bg-main text-white" onClick={btnMuaVe_Click}>Mua Vé</button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
            <React.Fragment>
                <Modal open={StatusModalThongBaoTimKiem} onClose={onCloseModalThongBaoTimKiem} center closeOnOverlayClick={false} showCloseIcon={false}>
                    <div className="py-6 px-4">
                        <div className="text-center mb-4">
                            <h2 className="font-bold text-lg text-mainFont">Opps! Không tìm thấy lịch trình này</h2>
                        </div>
                        <div className="text-center mt-8">
                            <button className="px-6 py-2 bg-main text-white" onClick={btnQuayVeTrangChu_Click}>Quay Lại Trang Chủ</button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        </div>
    )
}

export default ChonVe