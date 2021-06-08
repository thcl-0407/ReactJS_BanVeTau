import React, {useContext, useEffect, useState} from 'react'
import DateFormat from "date-format"
import KhachHangService from "./../../../../services/KhachHang.Service"
import {LichTrinhContext} from "../../../../contexts/LichTrinhContext";

function Tau(props) {
    const [SoLuongDaDat, SetSoLuongDaDat] = useState()
    const [DSGaTrungGian, SetDSGaTrungGian] = useState([])
    const { Schedule } = useContext(LichTrinhContext)

    let ThoiGianDi = DateFormat("dd-MM-yyyy", new Date(props.value.ThoiGianDi))

    useEffect(() => {
        let param = {
            MaGaDi: Schedule.MaGaDi,
            MaGaDen: Schedule.MaGaDen,
            ThoiGianDi: DateFormat("yyyy-MM-dd", new Date(props.value.ThoiGianDi)),
            MaTau: props.value.MaTau
        }
        console.log("ParamGetSoLuong", param)
        
        KhachHangService.GetDSGheDaDat(param).then(response => {
            let soLuongDaDat = props.value.SoLuongChoNgoi - response.data.data.length
            
            SetSoLuongDaDat(soLuongDaDat)
            SetDSGaTrungGian(props.value.inforGaTrungGian)
        })
    },[])

    return (
        <div className="inline-block m-2" onClick={props.ClickSelectTau.bind(null, props.value)}>
            <div className="bg-white shadow-xl border border-gray-400 w-80 hover:bg-blue-100">
                <div className="text-center bg-mainFont">
                    <h2 className="text-white">{props.value.TenTau}</h2>
                </div>
                <div className="p-2 bg-gray-300 hover:bg-gray-100 hover:cursor-pointer">
                    <form className="bg-white shadow-xl border border-gray-400 p-2">
                        <span className="font-black">Thời Gian Đi:&ensp;</span>
                        <span>{ThoiGianDi}</span>
                        <div>
                            <span className="font-black">SL Chỗ Ngồi: &ensp;</span>
                            <span>{props.value.SoLuongChoNgoi}</span>
                        </div>
                        {/* <div>
                            <span className="font-black">SL Chỗ Trống: &ensp;</span>
                            <span>{SoLuongDaDat}</span>
                        </div> */}
                        <div>
                            <span className="font-black">Qua các ga: &ensp;</span>
                            {DSGaTrungGian.map((res, index)=>(
                                <span key={index}>{res.TenNhaGa + "(" + res.MaNhaGa + ") "}</span>
                            ))}
                        </div>
                    </form>
                </div>
                {/* <div className="grid grid-cols-2">
                <strong className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-300"></strong>
                <strong className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-300"></strong>
            </div> */}
            </div>
        </div>
    )
}

export default Tau