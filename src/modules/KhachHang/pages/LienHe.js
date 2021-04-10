function LienHe(props) {
    return (
        <div className="flex justify-center items-center">
            <div className="p-10">
                <div>
                    <h3 className="text-blue-500 text-3xl">
                        Thông tin liên hệ
                    </h3>
                </div>
                <br />
                <div className="grid grid-cols-2">
                    <div>
                        <strong className="text-red-600">Tổng công ty đường sắt Việt Nam</strong>

                        <h4 className="mt-2">
                            Số 118 Lê Duẩn, Hoàn Kiếm, Hà Nội.<br /><br />
                            Điện thoại: 19006469<br />
                            Email: dsvn@vr.com.vn.
                        </h4>
                    </div>
                    <div>
                        <strong className="text-red-600">Tổng đài hỗ trợ khách hàng</strong>
                        <h4 className="mt-2">
                            Hotline: 19006469
                            <br />
                            Khu vực miền Bắc: 1900 0109
                            <br />
                            Khu vực miền Nam: 1900 1520
                            <br />
                            Email: support1@dsvn.vn
                            <br />
                            &emsp;&emsp;&emsp;support2@dsvn.vn
                        </h4>
                    </div>
                </div>
                <div className="border mt-6">
                    <div className="text-2xl h-12 relative">
                        <p className="bg-red-500 py-1 text-white object-cover w-full text-center">Quy định đổi trả vé</p>
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
                        <p>Trân trọng cảm ơn!.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LienHe