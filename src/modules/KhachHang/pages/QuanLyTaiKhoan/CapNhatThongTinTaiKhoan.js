import { reactLocalStorage } from "reactjs-localstorage"
import history from "../../../../history"
import KhachHangService from "../../../../services/KhachHang.Service"
import lodash from "lodash";
import ToastifyMessage from "./../../../../utilities/ToastifyMessage";
function CapNhatThongTinTaiKhoan(props){

    const data= reactLocalStorage.getObject('CurrentUser')

    const CapNhatThongTin=()=>{
        // let SoCMND= document.getElementById("txtSoCMND").value
        // let MaKH= document.getElementById("maKH").value       
        // let HoTen= document.getElementById("txtHoTen").value

        let HoTen = document.getElementById("txtHoTen").value;
        let MaKH = document.getElementById("maKH").value;
        let SoCMND = document.getElementById("txtCMND").value;

        if (lodash.isEmpty(HoTen) || lodash.isEmpty(SoCMND)){
            ToastifyMessage.ToastError("Phải nhập đầy đủ thông tin cần chỉnh sửa")
        }

        //console.log("SOCNMD", SoCMND)
        let param={
            MaKhachHang: MaKH,
            HoTen: HoTen,           
            SoCMND: SoCMND            
        }

        console.log("param",param)

        KhachHangService.CapNhatThongTin(param).then((res)=>{
            console.log(res)
            ToastifyMessage.ToastSuccess("Cập nhật thành công")
            history.push("/TaiKhoan")
            props.isSuccess()
        })
    }
    return(
        <div>
            <h1 className="text-center text-2xl">Quản lý thông tin</h1>
            <div className="p-2">
                <label>Mã khách hàng: </label>
                <input className="bg-gray-200 border border-blue-500 w-full" id="maKH" defaultValue={data.MaKhachHang} disabled/>
            </div>

            <div className="p-2">
                <label>Họ tên: </label>
                <input className="border border-blue-500 w-full" type="text" defaultValue={data.HoTen} id="txtHoTen"/>
            </div>

            <div className="p-2">
                <label>Số điện thoại: </label>
                <input className="bg-gray-200 border border-blue-500 w-full" defaultValue={data.SoDienThoai} id="txtSoDienThoai" disabled/>
            </div>

            <div className="p-2">
                <label>Số CMND: </label>
                <input className="border border-blue-500 w-full" type="text" defaultValue={data.SoCMND} id="txtCMND"/>
            </div>

            <div className="p-2">
                <label>Email: </label>
                <input  className="bg-gray-200 border border-blue-500 w-full" defaultValue={data.email} id="txtEmail" disabled/>
            </div>

            <button type="button" onClick={CapNhatThongTin}
            className="cursor-pointer px-36 py-1.5 border-2 border-main bg-main text-white hover:bg-white hover:text-main hover:pointer">
                Cập nhật thông tin
            </button>
        </div>
    )
}

export default CapNhatThongTinTaiKhoan