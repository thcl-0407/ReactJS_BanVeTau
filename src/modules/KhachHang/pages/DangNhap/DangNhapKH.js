import { Link } from "react-router-dom";
import lodash from "lodash"
import env from "react-dotenv"
import KhachHangService from "./../../../../services/KhachHang.Service"
import history from "./../../../../history"
import ToastifyMessage from "../../../../utilities/ToastifyMessage";
import { useCookies } from 'react-cookie';

function DangNhapKH(props) {
    const [cookies, setCookie] = useCookies(['CurrentUser']);

    //Người Dùng Đã Đăng Nhập
    if(!cookies.CurrentUser == "undefined"){
        history.push("/")
    }

    const btnKhachHangLoginSubmit_Click=()=>{
        let SoDienThoai = document.getElementById("txtSoDienThoai").value
        let MatKhau = document.getElementById("txtMatKhau").value
    
        if(lodash.isEmpty(SoDienThoai) || lodash.isEmpty(MatKhau)){
            ToastifyMessage.ToastError("Chưa Nhập Đủ Thông Tin")
            return
        }
    
        KhachHangService.DangNhapKhachHang(SoDienThoai, MatKhau).then(response => {
            console.log("Call Login", response)
    
            if(response.data.status){
<<<<<<< HEAD
                console.log(response.data.user)
                setCookie('CurrentUser',response.data.user)

                ToastifyMessage.ToastSuccess("Đăng Nhập Thành Công")
=======
                setCookie(response.data.user)
>>>>>>> 82c270371b9967588649c9961626e1bbd53fe58f
                history.push("/")
                
            }else{
                ToastifyMessage.ToastError(response.data.data)
            }
        })
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-xl border border-gray-400">
                <div className="py-3.5 text-center text-mainFont">
                    <p className="font-semibold text-lg">Đăng Nhập</p>
                </div>
                <form className="w-80">
                    <div className="mx-5 mt-6 mb-3 flex justify-start p-2.5 border border-gray-400">
                        <strong className="mr-2.5"><i className="fas fa-user"></i></strong>
                        <input type="text" id="txtSoDienThoai" className="object-fill w-full focus:outline-none" placeholder="Số điện thoại"></input>
                    </div>
                    <div className="mx-5 mb-1 flex justify-start p-2.5 border border-gray-400">
                        <strong className="mr-2.5"><i className="fas fa-key"></i></strong>
                        <input type="password" id="txtMatKhau" className="object-fill w-full focus:outline-none" placeholder="Mật Khẩu"></input>
                    </div>

                    <div className="mb-4 mr-6 mt-0">
                        <Link to="/" className="mb-6 float-right hover:text-mainFont">Quên mật khẩu</Link>
                    </div>

                    <div className="mb-6 text-center px-6">
                        <button id="btnKhachHangLoginSubmit" onClick={btnKhachHangLoginSubmit_Click} type="button" className="focus:outline-none border-2 border-mainFont hover:bg-white hover:text-mainFont object-fill w-full bg-mainFont py-2 text-white font-medium">Đăng Nhập</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DangNhapKH