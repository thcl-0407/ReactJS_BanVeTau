import React, { useContext, useState } from 'react';
import lodash from "lodash";
import ToastifyMessage from "./../../../../utilities/ToastifyMessage"
import { reactLocalStorage } from 'reactjs-localstorage';
import history from "./../../../../history"
import KhachHangService from "./../../../../services/KhachHang.Service"

function GioVe(props) {
    function btnMuaVe_Click() {
        //Check Đăng Nhập
        if (lodash.isEmpty(reactLocalStorage.getObject('CurrentUser'))) {
            ToastifyMessage.ToastError("Bạn Cần Đăng Nhập Để Thực Hiện Hành Động Này")
            return;
        }

        //Check Chưa Thêm Vé Vào Giỏ Vé
        if (lodash.isEmpty(props.DSVe)) {
            ToastifyMessage.ToastError("Không Có Vé Trong Giỏ")
            return;
        }

        DatVe(reports => {
            let status = true

            reports.forEach(item => {
                if(!item.status){
                    status = false
                    return
                }
            })

            if(status){
                ToastifyMessage.ToastSuccess("Đặt Vé Thành Công")
                props.onClickMuaVe(status)
            }else{
                ToastifyMessage.ToastError("Có Lỗi Xảy Ra")
                props.onClickMuaVe(status)
            }
        })
    }

    const DatVe = (callback) => {
        let reports = []
        const token = reactLocalStorage.getObject('CurrentToken')

        props.DSVe.forEach((item, index)=>{
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

            KhachHangService.DatVe(param, token).then(response => {
                reports.push(response.data);
            })
        })

        callback(reports)
    }

    return (
        <div className="" style={{ width: "60%" }}>
            <div className="border border-gray-400 shadow-lg bg-white">
                <div className="py-2 text-mainFont border-b-4 border-main pl-2">
                    <span className="font-semibold"><i className="fas fa-list-ul"></i>&ensp;Giỏ Vé</span>
                </div>
                <div className="p-4">
                    {props.DSVe.length > 0 ? props.DSVe.map((item, index) => (
                        <div key={index} className="text-left border p-4 mb-2 bg-gray-100">
                            <div>Tàu {item.Tau.TenTau} </div>
                            <div className="mt-2">Từ {item.Tau.TenGaDi} đến {item.Tau.TenGaDen}</div>
                            <div>Toa {item.Toa.STT}: {item.Toa.ToaTau.TenPhanLoai}</div>
                            <div>Ghế Số: {item.Ghe.MaChoNgoi}</div>
                        </div>
                    )) : (
                        <div className="text-center text-red-600">Bạn Chưa Chọn Vé Cần Mua</div>
                    )}
                </div>
                <div className="text-center mb-6">
                    <input type="button" onClick={btnMuaVe_Click} className="cursor-pointer px-2 py-1 border-2 border-main bg-main text-white hover:bg-white hover:text-main hover:pointer" value="Mua Vé" />
                </div>
            </div>
        </div>
    )
}

export default GioVe