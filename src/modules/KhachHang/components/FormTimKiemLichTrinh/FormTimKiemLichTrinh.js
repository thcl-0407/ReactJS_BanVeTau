import DataPicker from "react-datepicker"
import { useState, useEffect, useContext } from "react";
import {registerLocale} from "react-datepicker";
import vi from 'date-fns/locale/vi';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import "./FormTimKiemLichTrinh.scss"
import { subDays } from "date-fns";
import KhachHangService from "./../../../../services/KhachHang.Service"
import ToastifyMessage from "../../../../utilities/ToastifyMessage";
import lodash from "lodash"
import history from "./../../../../history"
import { LichTrinhContext } from "./../../../../contexts/LichTrinhContext";

var options = []

//Config Date
registerLocale('vi', vi)

const SelectLoaiVe = ()=>{
    let rbtnVeMotChieu = document.getElementById("rbtnVeMotChieu").checked
    let rbtnVeKhuHoi = document.getElementById("rbtnVeKhuHoi").checked

    if(rbtnVeKhuHoi){
        document.getElementById("boxSelectNgayVe").style.display = "block";
    }else{
        document.getElementById("boxSelectNgayVe").style.display = "none";
    }
}

function FormTimKiemLichTrinh(props){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [MaGaDi, setMaGaDi] = useState();
    const [MaGaDen, setMaGaDen] = useState();

    //Context
    const {SetStateSchedule} = useContext(LichTrinhContext)

    useEffect(()=>{
        KhachHangService.GetDanhSachNhaGa().then(response =>{
            response.data.data.forEach(item => {
                //console.log(item)
                let temp_object = {
                    "value": item.MaNhaGa, 
                    "label": item.TenNhaGa
                }

                options.push(temp_object)
            })
        })
    }, [options]);


    const TimKiemLichTrinh = ()=>{

        /*Kiểm tra ga đi trống */
        if(lodash.isEmpty(MaGaDi)){
            ToastifyMessage.ToastError("Ga Đi Trống")
            return
        }

        /*Kiểm tra ga đến trống */
        if (lodash.isEmpty(MaGaDen)){
            ToastifyMessage.ToastError("Ga Đến Trống")
            return
        }

        /*Kiểm tra ngày đi trống */
        if (lodash.isNil(startDate)){
            ToastifyMessage.ToastError("Ngày đi không được trống")
            return
        }
        let param = {
            MaGaDi: MaGaDi.value,
            MaGaDen: MaGaDen.value,
            NgayDi: startDate,
        }
  
        //Chọn Trùng Mã
        if(param.MaGaDi == param.MaGaDen){
            ToastifyMessage.ToastError("Ga Đi Không Trùng Ga Đến")
            return
        }

        options=[]

        //Lưu Vào Global Storage
        SetStateSchedule({
            MaGaDi: param.MaGaDi,
            TenGaDi: MaGaDi.label,
            MaGaDen: param.MaGaDen,
            TenGaDen: MaGaDen.label,
            ThoiGianDi: param.NgayDi
        })

        history.push("/TimVe")
    }

    const ChonMaGaDi = (selected)=>{
        console.log("Chon Ma Ga Di", selected.value)
        setMaGaDi(selected)
    }

    const ChonMaGaDen = (selected)=>{
        console.log("Chon Ma Ga Den",selected.value)
        setMaGaDen(selected)
    }

    return(
        <div className="flex bg-white">
            <div className="border border-gray-400 shadow-lg">
                <div className="border-b-4 border-main p-2">
                    <p className="text-mainFont font-semibold"><i className="fas fa-list-ul"></i>&ensp;Tìm Kiếm Lịch Trình</p>
                </div>
                <div className="p-4">
                    <div>
                        <label>Ga Đi</label>
                        <br/>
                        <Select options={options} onChange={ChonMaGaDi} id="txtMaGaDi"></Select>
                    </div>
                    <div className="py-3">
                        <label>Ga Đến</label>
                        <br/>
                        <Select options={options} onChange={ChonMaGaDen} id="txtMaGaDen"></Select>
                    </div>
                    <div className="py-3 flex justify-center">
                        <input type="radio" onClick={SelectLoaiVe} value="MotChieu" name="LoaiVe" id="rbtnVeMotChieu" defaultChecked={true}/><span>&nbsp;Một Chiều&emsp;</span>
                        <input type="radio" onClick={SelectLoaiVe} value="KhuHoi" name="LoaiVe" id="rbtnVeKhuHoi"/><span>&nbsp;Khứ Hồi</span>
                    </div>
                    <div className="py-3">
                        <label>Ngày Đi</label>
                        <br/>
                        <DataPicker className="border p-1.5" locale="vi" selected={startDate} onChange={date => setStartDate(date)} minDate={subDays(new Date(),0)}></DataPicker>
                    </div>
                    <div id="boxSelectNgayVe" className="py-3 hidden">
                        <label>Ngày Về</label>
                        <br/>
                        <DataPicker className="border p-1.5" locale="vi" selected={endDate} onChange={date => setEndDate(date)} minDate={subDays(new Date(),0)}></DataPicker>
                    </div>
                    <div className="pt-3 text-center">
                        <input onClick={TimKiemLichTrinh} type="button" className="cursor-pointer px-6 py-1.5 border-2 border-main bg-main text-white hover:bg-white hover:text-main hover:pointer" value="Xác Nhận"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormTimKiemLichTrinh

