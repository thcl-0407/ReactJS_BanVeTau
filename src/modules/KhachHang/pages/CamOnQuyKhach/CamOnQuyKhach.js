import { reactLocalStorage } from 'reactjs-localstorage';
import lodash from 'lodash';
import history from './../../../../history';
import React, { useContext, useState, useEffect } from 'react';
import { VeContext } from "./../../../../contexts/VeContext"


function CamOnQuyKhach(props) {
    const { VeStateContext, AddNewVe } = useContext(VeContext)

    if (VeStateContext.length == 0 || lodash.isEmpty(reactLocalStorage.getObject("CurrentUser"))) {
        history.push("/")
    }

    function ExecCamOnQuyKhach() {
        if (VeStateContext.length > 0) {
            AddNewVe([])
        }

        return (
            <div className="flex justify-center items-center h-screen">
                <div className="border border-main mb-24 shadow-xl">
                    <div className="p-8">
                        <span className="text-2xl">Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi</span>
                    </div>
                    <div className="text-center p-4">
                        <button className="text-main hover:underline cursor-pointer">Quay Về Trang Chủ</button>
                        <button className="text-main hover:underline cursor-pointer ml-24">Xem Danh Sách Vé Của Bạn</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {ExecCamOnQuyKhach()}
        </div>
    )
}

export default CamOnQuyKhach