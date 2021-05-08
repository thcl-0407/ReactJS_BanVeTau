import React from 'react';
import lodash from "lodash";
import ToastifyMessage from "./../../../../utilities/ToastifyMessage"

function GioVe(props) {
    function btnMuaVe_Click(){
        
    }

    return (
        <div>
            <div className="border border-gray-400 shadow-lg bg-white">
                <div className="py-2 text-mainFont border-b-4 border-main pl-2">
                    <span className="font-semibold"><i className="fas fa-list-ul"></i>&ensp;Giỏ Vé</span>
                </div>
                <div className="px-20 py-2">
                    <strong className="text-red-500">Chưa Có Vé</strong>
                </div>
                <div className="text-center mb-2">
                    <input type="button" onClick={btnMuaVe_Click} className="cursor-pointer px-2 py-1 border-2 border-main bg-main text-white hover:bg-white hover:text-main hover:pointer" value="Mua Vé"/>
                </div>
            </div>
        </div>
    )
}

export default GioVe