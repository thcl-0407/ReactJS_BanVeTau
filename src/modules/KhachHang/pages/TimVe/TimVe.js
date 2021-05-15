import React, { useState, useEffect, useContext } from 'react';
import FormTimKiemLichTrinh from "./../../components/FormTimKiemLichTrinh/FormTimKiemLichTrinh"
import GioVe from "./../../components/GioVe/GioVe"
import lodash from "lodash";
import "./TimVe.scss"
import { VeContext } from "./../../../../contexts/VeContext"

function TimVe(props) {
    const { VeStateContext, AddNewVe } = useContext(VeContext)

    const onClickMuaVe = (res) => {
        if (res) {
            AddNewVe([])
        }
    }

    return (
        <div id="boxTimVe" className="min-h-screen flex justify-center items-center p-12">
            <div className="grid grid-rows-2">
                <div className="grid grid-cols-3">
                    <div className="flex justify-end pr-4">
                        <FormTimKiemLichTrinh></FormTimKiemLichTrinh>
                    </div>
                    <div>
                        <img className="object-cover min-w-screen" src="http://www.vr.com.vn/uploads/content/Nhaga-Doantau/IMG_5815%20(2).JPG" />
                    </div>
                    <div className="flex justify-start pl-4">
                        <GioVe DSVe={VeStateContext} onClickMuaVe={onClickMuaVe}></GioVe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimVe