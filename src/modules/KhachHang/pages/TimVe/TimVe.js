import React, { useState, useEffect } from 'react';
import FormTimKiemLichTrinh from "./../../components/FormTimKiemLichTrinh/FormTimKiemLichTrinh"
import GioVe from "./../../components/GioVe/GioVe"
import lodash from "lodash";
import "./TimVe.scss"
import { useCookies } from 'react-cookie';

function TimVe(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['KhachHangLogin']);
    const [count, setCount] = useState();

    useEffect(() => {
        console.log(cookies.KhachHangLogin)
    });

    return (
        <div id="boxTimVe" className="min-h-screen flex justify-center items-center p-12">
            <div className="grid grid-rows-2">
                <div className="grid grid-cols-3">
                    <div className="flex justify-end pr-4">
                        <FormTimKiemLichTrinh></FormTimKiemLichTrinh>
                    </div>
                    <div>
                        <img className="object-cover min-w-screen" src="http://www.vr.com.vn/uploads/content/Nhaga-Doantau/IMG_5815%20(2).JPG"/>
                    </div>
                    <div className="flex justify-start pl-4">
                        <GioVe></GioVe>
                    </div>
                </div>
                <div className="px-20">
                    <div className="border mt-6 bg-white shadow-lg">
                        <div className="text-xl h-12 relative">
                            <p className="py-2 bg-red-500 text-white object-cover w-full text-center">Quy định đổi trả vé</p>
                        </div>
                        <div className="m-4">
                            <p>1. Thời gian và mức phí trả vé:</p>
                            <p>- Đổi vé: Vé cá nhân đổi trước giờ tàu chạy 24 giờ trở lên, lệ phí là 20.000 đồng/vé; không áp dụng đổi vé đối với vé tập thể.</p>
                            <p>- Trả vé: </p>
                            <p>&emsp;&emsp;+ Vé cá nhân: Trả vé trước giờ tàu chạy từ 4 giờ đến dưới 24 giờ, lệ phí là 20% giá vé; từ 24 giờ trở lên lệ phí là 10% giá vé.</p>
                            <p>&emsp;&emsp;+ Vé tập thể: Trả vé trước giờ tàu chạy từ 24 giờ đến dưới 72 giờ, lệ phí là 20% giá vé; từ 72 giờ trở lên lệ phí là 10% giá vé.</p>
                            <p>2. Hình thức trả vé: </p>
                            <p>- Khi hành khách mua vé và thanh toán online qua website bán vé của Ngành Đường sắt, app bán vé hoặc các ứng dụng mua vé tàu hỏa của các đối tác thứ ba thì có thể trả vé online qua các website bán vé của Ngành Đường sắt hoặc đến trực tiếp nhà ga.</p>
                            <p>- Khi hành khách mua vé bằng các hình thức khác, muốn đổi vé, trả vé hành khách đến trực tiếp nhà ga kèm theo giấy tờ tùy thân bản chính của người đi tàu (hoặc người mua vé) cho nhân viên đường sắt. Đồng thời, thông tin trên thẻ đi tàu phải trùng khớp với giấy tờ tùy thân của hành khách.</p>
                            <br/>
                            <p>Trân trọng cảm ơn.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimVe