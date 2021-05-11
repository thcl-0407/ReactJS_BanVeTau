import { useContext, useEffect, useState } from "react"
import Tau from "./../../components/Tau/Tau"
import ToaTau from "./../../components/ToaTau/ToaTau"
import GioVe from "./../../components/GioVe/GioVe"
import Ghe from "./../../components/Ghe/Ghe"
import "./ChonVe.scss"
import { LichTrinhContext } from "./../../../../contexts/LichTrinhContext"
import { VeContext } from "./../../../../contexts/VeContext"
import DateFormat from "date-format"
import KhachHangService from "./../../../../services/KhachHang.Service"
import ToastifyMessage from "./../../../../utilities/ToastifyMessage"

function ChonVe(props) {
    const { Schedule } = useContext(LichTrinhContext)
    const { AddNewVe } = useContext(VeContext)

    //State
    const [Taus, SetTaus] = useState([])
    const [DSToa, SetDSToa] = useState([])
    const [DSGhe, SetDSGhe] = useState([])

    const [TauSelect, SetTauSelect] = useState({})
    const [ToaSelect, SetToaSelect] = useState({})
    const [GheSelect, SetGheSelect] = useState([])

    useEffect(() => {
        let param = {
            MaGaDi: Schedule.MaGaDi,
            MaGaDen: Schedule.MaGaDen,
            ThoiGianDi: DateFormat("yyyy-MM-dd", Schedule.ThoiGianDi)
        }

        KhachHangService.GetDanhSachTau_FollowLichTrinh(param).then((response) => {
            SetTaus(response.data.data)
        })
    }, [])

    //Loading Danh Sach Toa Tau
    const SelectedTau = (Tau) => {
        SetTauSelect(Tau)
        SetDSGhe([])

        KhachHangService.GetDSToa_Of_Tau(Tau.MaTau).then((response) => {
            SetDSToa(response.data.data)
            console.log(response.data.data)
        })
    }

    //Loading Danh Sach Ghe Cua Toa Tau
    const SelectedToaTau = (ToaTau) => {
        SetToaSelect(ToaTau)

        KhachHangService.GetDSGhe_Of_ToaTau(ToaTau.MaToaTau).then(response => {
            SetDSGhe(response.data.data)
        })
    }

    //Select Ghe
    const SelectedGhe = (object) => {
        var temp = GheSelect
        let ElementGhe = document.getElementById("Ghe" + object.Ghe.MaGhe)
        console.log("ClickGhe", {object: object})

        //Fix Lỗi Mã Chỗ Ngồi
        object.Ghe.MaChoNgoi = object.STT

        if (ElementGhe.style.backgroundColor == "green") {
            ElementGhe.style.backgroundColor = "white"

            temp = temp.filter(value => value.Ghe.MaGhe != object.Ghe.MaGhe)
        } else {
            ElementGhe.style.backgroundColor = "green"
            temp.push({
                Tau: TauSelect,
                Toa: ToaSelect,
                Ghe: object.Ghe
            })
        }

        //console.log(temp)
        SetGheSelect(temp)

        //Add Global Storage
        AddNewVe(temp)
    }

    const btnXacNhanMuaVe_Click = ()=>{
        if(GheSelect.length == 0){
            ToastifyMessage.ToastError("Chưa Chọn Vé Cần Mua")
        }

        console.log(GheSelect)
    }

    return (
        <div className="p-12">
            <div className="pt-5 px-4">
                <p className="py-2 font-extrabold text-xl text-mainFont">Chiều Đi Ngày {DateFormat("dd-MM-yyyy", Schedule.ThoiGianDi)} từ {Schedule.TenGaDi} đến {Schedule.TenGaDen}</p>
            </div>
            <div className="grid grid-cols-4">
                <div className="col-span-4 p-4">
                    <div className="border border-gray-400">
                        <div className="text-left border-b-4 border-main">
                            <p className="text-xl font-semibold p-3 text-mainFont"><i className="fas fa-subway"></i>&ensp;Chọn Tàu</p>
                        </div>
                        <div className="flex justify-center cursor-pointer">
                            <div className="p-6">
                                {
                                    Taus.map((item, index) => (
                                        <Tau key={index} value={item} ClickSelectTau={SelectedTau}></Tau>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="border border-gray-400">
                            <div className="text-left border-b-4 border-main">
                                <p className="text-xl font-semibold p-3 text-mainFont"><i className="fas fa-train"></i>&ensp;Chọn Toa</p>
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
                        <div className="border border-gray-400">
                            <div className="text-left border-b-4 border-main">
                                <p className="text-xl font-semibold p-3 text-mainFont"><i className="fas fa-couch"></i>&ensp;Chọn Ghế</p>
                            </div>
                            <div className="flex justify-center items-center cursor-pointer">
                                <div className="p-6">
                                    {DSGhe.map((item, index) => (
                                        <Ghe key={index} index={index} value={item} ClickSelectGhe={SelectedGhe}></Ghe>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-center py-4 border border-gray-400">
                        <div className="p-4 text-left">
                            <span className="text-xl">
                            Để nâng cao chất lượng dịch vụ tốt hơn cũng như để đảm bảo quyền lợi tốt nhất của quý khách hàng, quý khách vui lòng hãy kiểm tra thông tin thật cẩn thận trước khi thực hiện mua vé.
                            <br/><br/>Rất mong được hợp tác và chân thành xin lỗi quý khách hàng vì sự bất tiện này.
                            </span>
                        </div>
                        <button className="px-6 py-4 mt-4 bg-main text-white hover:bg-mainHover" onClick={btnXacNhanMuaVe_Click}>XÁC NHẬN MUA VÉ</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChonVe