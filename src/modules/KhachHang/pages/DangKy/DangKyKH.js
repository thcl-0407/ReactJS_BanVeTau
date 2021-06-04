import {reactLocalStorage} from 'reactjs-localstorage';
import lodash from "lodash";
import history from "./../../../../history"
import ToastifyMessage from "./../../../../utilities/ToastifyMessage"
import KhachHangService from "./../../../../services/KhachHang.Service"
import OTPService from "./../../../../services/OTP.Service"
import Modal from "react-responsive-modal";
import React, {useState} from "react";

function DangKyKH() {
    const [StateModalXacNhanSoDienThoai, SetStateModalXacNhanSoDienThoai] = useState(false)
    const [StateModalHandling, SetStateModalHandling] = useState(false)
    const [UserSignUp, SetUserSignUp] = useState({})

    if (!lodash.isEmpty(reactLocalStorage.getObject("CurrentUser"))) {
        history.push("/")
    }

    const onCloseModalXacNhanSoDienThoai = () => {
        SetStateModalXacNhanSoDienThoai(false)
    }

    const onCloseModalHandling =  () => {
        SetStateModalHandling(false)
    }

    const Validation = () => {
        let txtHoTen = document.getElementById('txtHoTen').value;
        let txtEmail = document.getElementById('txtEmail').value;
        let txtSoDienThoai = document.getElementById('txtSoDienThoai').value;
        let txtCMND = document.getElementById('txtCMND').value;
        let txtMatKhau = document.getElementById('txtMatKhau').value;
        let txtXacNhanMatKhau = document.getElementById('txtXacNhanMatKhau').value;
        let cbxAcceptRegulation = document.getElementById('cbxAcceptRegulation').checked;

        if (txtHoTen.trim().length == 0) {
            return {
                status: false,
                msg: 'Chưa Nhập Họ Tên'
            }
        }

        if (txtEmail.trim().length == 0) {
            return {
                status: false,
                msg: 'Chưa Nhập Email'
            }
        }

        if (txtSoDienThoai.trim().length == 0) {
            return {
                status: false,
                msg: 'Chưa Nhập Số Điện Thoại'
            }
        }

        let SoDienThoaiRegex = /0[1-9][0-9]{8}/

        if (!SoDienThoaiRegex.test(txtSoDienThoai)) {
            return {
                status: false,
                msg: 'Số điện thoại không đúng định dạng'
            }
        }

        if (txtSoDienThoai.trim().length == 0) {
            return {
                status: false,
                msg: 'Chưa Nhập Số Điện Thoại'
            }
        }

        if (txtMatKhau.trim().length == 0) {
            return {
                status: false,
                msg: 'Chưa nhập mật khẩu'
            }
        }

        if (txtMatKhau.trim().length < 6) {
            return {
                status: false,
                msg: 'Mật khẩu phải dài hơn 6 kí tự'
            }
        }

        if (txtMatKhau != txtXacNhanMatKhau) {
            return {
                status: false,
                msg: 'Mật khẩu không trùng khớp'
            }
        }

        let CMNDRegex = /[0-9]{12}|[0-9]{10}/

        if (!CMNDRegex.test(txtCMND)) {
            return {
                status: false,
                msg: 'CMND/Căn Cước không đúng định dạng'
            }
        }

        if (!cbxAcceptRegulation) {
            return {
                status: false,
                msg: 'Bạn cần đồng ý với điều khoản của trang web'
            }
        }

        return {
            status: true,
            msg: 'Dữ liệu hợp lệ'
        }
    }

    const btnDangKyClick = () => {
        if (Validation().status) {
            SetStateModalHandling(true)

            let txtHoTen = document.getElementById('txtHoTen').value;
            let txtEmail = document.getElementById('txtEmail').value;
            let txtSoDienThoai = document.getElementById('txtSoDienThoai').value;
            let txtCMND = document.getElementById('txtCMND').value;
            let txtMatKhau = document.getElementById('txtMatKhau').value;

            let param = {
                MaKhachHang: '',
                HoTen: txtHoTen,
                Email: txtEmail,
                SoDienThoai: txtSoDienThoai,
                CMND: txtCMND,
                MatKhau: txtMatKhau
            }

            SetUserSignUp(param)
            //document.getElementById('lblSoDienThoai').innerHTML = UserSignUp.SoDienThoai

            OTPService.SendSMSCode(param.SoDienThoai).then(response => {
                console.log(response);

                if (response.data.isSended) {
                    SetStateModalXacNhanSoDienThoai(true)
                }
            }).catch(error => {
                if (error) {
                    SetStateModalHandling(false)
                    ToastifyMessage.ToastError("Không Thể Gửi Mã Xác Nhận Lúc Này")
                }
            })
        } else {
            ToastifyMessage.ToastError(Validation().msg)
        }
    }

    const btnXacNhanMaXacThuc_Click = () => {
        let txtMaXacNhan = document.getElementById('txtMaXacNhan').value;

        if (txtMaXacNhan.trim().length == 0) {
            ToastifyMessage.ToastError('Chưa nhập mã xác nhận')
            return
        }

        SetStateModalHandling(true)

        OTPService.VerifyCode(UserSignUp.SoDienThoai, txtMaXacNhan).then(response => {
            if (response.data.status == 404) {
                SetStateModalHandling(false)
                ToastifyMessage.ToastError("Mã Xác Nhận Đã Hết Hạn")
                return
            }
            if (response.data.valid == false) {
                SetStateModalHandling(false)
                ToastifyMessage.ToastError("Mã Xác Nhận Chưa Chính Xác")
                return
            }
            if (response.data.valid == true) {
                SetStateModalHandling(true)
                KhachHangService.DangKyKhachHang(UserSignUp).then((response) => {
                    SetStateModalHandling(false)

                    if(response.data.status){
                        SetStateModalXacNhanSoDienThoai(false)
                        ToastifyMessage.ToastSuccess('Đăng Kí Tài Khoản Thành Công')
                        history.push('/DangNhap')
                    }else {
                        SetStateModalXacNhanSoDienThoai(false)
                        ToastifyMessage.ToastSuccess('Số Điện Thoại hoặc Email đã sử dụng')
                    }
                })
            }
        })
    }

    return (
        <div className="flex justify-center items-center min-h-screen p-16">
            <div className="bg-white p-8 shadow-xl w-1/3 border border-gray-400 bg-gray-100">

                <h2 className="text-3xl font-bold mb-12 text-center text-mainFont">TẠO TÀI KHOẢN</h2>

                <form className="space-y-5">
                    <div>
                        <label className="block mb-1 font-bold">Họ Tên <span style={{color: 'red'}}>*</span></label>
                        <input type="text"
                               id="txtHoTen"
                               className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
                    </div>
                    <div>
                        <label className="block mb-1 font-bold">Email <span style={{color: 'red'}}>*</span></label>
                        <input type="email"
                               id="txtEmail"
                               className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
                    </div>
                    <div>
                        <label className="block mb-1 font-bold">Số điện thoại <span
                            style={{color: 'red'}}>*</span></label>
                        <input id="txtSoDienThoai" type="text"
                               class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
                    </div>
                    <div>
                        <label className="block mb-1 font-bold">Số CMND/Căn Cước<span
                            style={{color: 'red'}}>*</span></label>
                        <input id="txtCMND" type="text"
                               className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
                    </div>
                    <div>
                        <label className="block mb-1 font-bold ">Mật khẩu <span style={{color: 'red'}}>*</span></label>
                        <input type="password" id="txtMatKhau"
                               className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
                    </div>

                    <div>
                        <label className="block mb-1 font-bold ">Xác nhận lại mật khẩu <span
                            style={{color: 'red'}}>*</span></label>
                        <input type="password" id="txtXacNhanMatKhau"
                               className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
                    </div>

                    <div>
                        <input type="checkbox" id="cbxAcceptRegulation"></input><span>&ensp;Tôi đã đọc và đồng ý những quy định và chính sách của trang web.</span>
                    </div>
                    <div className="pt-6 text-center px-0">
                        <button onClick={btnDangKyClick} type="button"
                                className="focus:outline-none border-2 border-mainFont hover:bg-white hover:text-mainFont object-fill w-full bg-mainFont py-2 text-white font-medium">Đăng
                            Ký
                        </button>
                    </div>
                </form>
                <React.Fragment>
                    <Modal classNames="text-center" open={StateModalHandling} onClose={onCloseModalHandling} center
                           closeOnOverlayClick={false} showCloseIcon={false}>
                        <div className="flex justify-center py-6">
                            <img style={{width: "12%"}} src="https://i.gifer.com/ZKZg.gif"></img>
                        </div>
                        <div className="flex justify-center">
                            <span className="font-bold">ĐANG XỬ LÝ...</span>
                        </div>
                    </Modal>
                </React.Fragment>
                <React.Fragment>
                    <Modal open={StateModalXacNhanSoDienThoai} onClose={onCloseModalXacNhanSoDienThoai} center
                           closeOnOverlayClick={false} showCloseIcon={false}>
                        <div className="mt-4 py-3 px-6">
                            <div className="text-lg">Để hoàn tất đăng ký bạn cần xác thực số điện thoại</div>
                            <br/>
                            <span>Đã gửi mã xác nhận đến số điện thoại: </span>
                            <span id="lblSoDienThoai"></span>
                            <div>
                                <span>Nhập mã xác nhận bạn nhận được: &ensp;</span>
                                <div className="text-center p-2">
                                    <input className="border border-main" type="text" id="txtMaXacNhan"></input>
                                </div>
                            </div>
                            <div className="text-center mt-2">
                                <button onClick={btnXacNhanMaXacThuc_Click} className="bg-main text-white px-2 py-1">Xác
                                    Nhận
                                </button>
                            </div>
                        </div>
                    </Modal>
                </React.Fragment>
            </div>
        </div>
    )
}

export default DangKyKH