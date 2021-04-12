import DataPicker from "react-datepicker"
import { useState } from "react";
import {registerLocale} from "react-datepicker";
import vi from 'date-fns/locale/vi';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import "./FormTimKiemLichTrinh.scss"

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

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
    const [EndDate, setEndDate] = useState(new Date());
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
                        <Select options={options}></Select>
                    </div>
                    <div className="py-3">
                        <label>Ga Đến</label>
                        <br/>
                        <Select options={options}></Select>
                    </div>
                    <div className="py-3 flex justify-center">
                        <input type="radio" onClick={SelectLoaiVe} value="MotChieu" name="LoaiVe" id="rbtnVeMotChieu" defaultChecked={true}/><span>&nbsp;Một Chiều&emsp;</span>
                        <input type="radio" onClick={SelectLoaiVe} value="KhuHoi" name="LoaiVe" id="rbtnVeKhuHoi"/><span>&nbsp;Khứ Hồi</span>
                    </div>
                    <div className="py-3">
                        <label>Ngày Đi</label>
                        <br/>
                        <DataPicker className="border p-1.5" locale="vi" selected={startDate} onChange={date => setStartDate(date)}></DataPicker>
                    </div>
                    <div id="boxSelectNgayVe" className="py-3 hidden">
                        <label>Ngày Về</label>
                        <br/>
                        <DataPicker className="border p-1.5" locale="vi" selected={EndDate} onChange={date => setEndDate(date)}></DataPicker>
                    </div>
                    <div className="pt-3 text-center">
                        <input type="button" className="cursor-pointer px-6 py-1.5 border-2 border-main bg-main text-white hover:bg-white hover:text-main hover:pointer" value="Xác Nhận"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormTimKiemLichTrinh

