import AdminService from "./../../../../services/Admin.Service"
import lodash from "lodash"
import ToastifyMessage from "./../../../../utilities/ToastifyMessage"

//Gọi Function Này Khi Button Submit Đăng Nhập Được Click
const btnAdminLoginSubmit_Click = ()=>{
    let UserName = document.getElementById("txtUserName").value
    let MatKhau = document.getElementById("txtMatKhau").value

    if(lodash.isEmpty(UserName) || lodash.isEmpty(MatKhau)){
        ToastifyMessage.ToastError("Chưa Nhập Đủ Thông Tin")
        return
    }

    AdminService.DangNhap(UserName, MatKhau).then(response => {
        console.log(response)
    })
}

function Login(props){
    return (
        <div className="flex justify-center items-center min-h-screen" style={{backgroundColor: "#EDEDED"}}>
            <div className="bg-white shadow-xl border border-gray-400">
                <div className="py-3.5 text-center text-mainFont">
                    <p className="font-semibold text-lg">Chào, Admin !</p>
                </div>
                <form className="w-80">
                    <div className="mx-5 mt-6 mb-3 flex justify-start p-2.5 border border-gray-400">
                        <strong className="mr-2.5"><i className="fas fa-user"></i></strong>
                        <input type="text" id="txtUserName" className="object-fill w-full focus:outline-none" placeholder="User Name"></input>
                    </div>
                    <div className="mx-5 mb-6 flex justify-start p-2.5 border border-gray-400">
                        <strong className="mr-2.5"><i className="fas fa-key"></i></strong>
                        <input type="password" id="txtMatKhau" className="object-fill w-full focus:outline-none" placeholder="Mật Khẩu"></input>
                    </div>
                    <div className="mb-6 text-center px-6">
                        <button onClick={btnAdminLoginSubmit_Click} id="btnAdminLoginSubmit" type="button" className="focus:outline-none border-2 border-mainFont hover:bg-white hover:text-mainFont object-fill w-full bg-mainFont py-2 text-white font-medium">Đăng Nhập</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login