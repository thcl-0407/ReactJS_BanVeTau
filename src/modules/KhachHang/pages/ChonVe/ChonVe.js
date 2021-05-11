import { useContext, useEffect, useState } from "react"
import Tau from "./../../components/Tau/Tau"
import ToaTau from "./../../components/ToaTau/ToaTau"
import GioVe from "./../../components/GioVe/GioVe"
import Ghe from "./../../components/Ghe/Ghe"
import "./ChonVe.scss"
import { LichTrinhContext } from "./../../../../contexts/LichTrinhContext"
import DateFormat from "date-format"
import KhachHangService from "./../../../../services/KhachHang.Service"

var DSGheSelected = []

function ChonVe(props) {
    const { Schedule } = useContext(LichTrinhContext)

    //State
    const [Taus, SetTaus] = useState([])
    const [DSToa, SetDSToa] = useState([])
    const [DSGhe, SetDSGhe] = useState([])

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
    const SelectedTau = (MaTau) => {
        SetDSGhe([])

        KhachHangService.GetDSToa_Of_Tau(MaTau).then((response) => {
            SetDSToa(response.data.data)
            console.log(response.data.data)
        })
    }

    //Loading Danh Sach Ghe Cua Toa Tau
    const SelectedToaTau = (MaToaTau) => {
        KhachHangService.GetDSGhe_Of_ToaTau(MaToaTau).then(response => {
            SetDSGhe(response.data.data)
        })
    }

    //Select Ghe
    const SelectedGhe = (MaGhe)=>{
        let ElementGhe = document.getElementById("Ghe" + MaGhe)

        if(ElementGhe.style.backgroundColor == "green"){
            ElementGhe.style.backgroundColor = "white"

            DSGheSelected.forEach((item, index) => {
                if(item == MaGhe){
                    DSGheSelected.splice(index, 1)
                }
            });
        }else{
            ElementGhe.style.backgroundColor = "green"
            DSGheSelected.push(MaGhe)
        }

        console.log(DSGheSelected)
    }

    return (
        <div className="">
            <div className="pt-5 px-4">
                <p className="py-2 font-extrabold text-xl text-mainFont">Chiều Đi Ngày {DateFormat("dd-MM-yyyy", Schedule.ThoiGianDi)} từ {Schedule.TenGaDi} đến {Schedule.TenGaDen}</p>
            </div>
            <div className="grid grid-cols-4">
                <div className="col-span-3 p-4">
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
                </div>

                {/* Render Giỏ Vé */}

                <div className="flex justify-center">
                    <div className="pt-4">
                        <GioVe ></GioVe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChonVe