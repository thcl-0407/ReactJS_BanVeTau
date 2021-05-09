import {useContext} from "react"
import Tau from "./../../components/Tau/Tau"
import GioVe from "./../../components/GioVe/GioVe"
import "./ChonVe.scss"
import { LichTrinhContext } from "./../../../../contexts/LichTrinhContext"

function ChonVe(props) {
    const {Schedule} = useContext(LichTrinhContext)

    console.log(Schedule)

    return (
        <div className="">
            <div className="grid grid-cols-4">
                <div className="col-span-3 p-4">
                    <div className="border border-gray-400">
                        <div className="text-left border-b-4 border-main">
                            <p className="text-xl font-semibold p-3 text-mainFont"><i className="fas fa-subway"></i>&ensp;Chọn Tàu</p>
                        </div>
                        <div className="flex justify-center">
                            <div className="p-6">
                                <Tau></Tau>
                                <Tau></Tau>
                                <Tau></Tau>
                                <Tau></Tau>
                                <Tau></Tau>
                                <Tau></Tau>
                                <Tau></Tau>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="border border-gray-400">
                            <div className="text-left border-b-4 border-main">
                                <p className="text-xl font-semibold p-3 text-mainFont"><i className="fas fa-train"></i>&ensp;Chọn Toa</p>
                            </div>
                            <div className="flex justify-center">
                                <div className="p-6">
                                    <Tau></Tau>
                                    <Tau></Tau>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="border border-gray-400">
                            <div className="text-left border-b-4 border-main">
                                <p className="text-xl font-semibold p-3 text-mainFont"><i className="fas fa-couch"></i>&ensp;Chọn Ghế</p>
                            </div>
                            <div className="flex justify-center">
                                <div className="p-6">
                                    <Tau></Tau>
                                    <Tau></Tau>
                                    <Tau></Tau>
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