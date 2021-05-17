import { reactLocalStorage } from "reactjs-localstorage"
import history from "../../../../history"
import KhachHangService from "../../../../services/KhachHang.Service"
function CapNhatThongTinTaiKhoan(props){

    const data= reactLocalStorage.getObject('CurrentUser')

    const CapNhatThongTin=()=>{
        // let SoCMND= document.getElementById("txtSoCMND").value
        // let MaKH= document.getElementById("maKH").value       
        // let HoTen= document.getElementById("txtHoTen").value

        let HoTen = document.getElementById("txtHoTen").value;
        let MaKH = document.getElementById("maKH").value;
        let SoCMND = document.getElementById("txtCMND").value;

        //console.log("SOCNMD", SoCMND)
        let param={
            MaKhachHang: MaKH,
            HoTen: HoTen,           
            SoCMND: SoCMND            
        }

        console.log("param",param)

        KhachHangService.CapNhatThongTin(param).then((res)=>{
            console.log(res)
            history.push("/TaiKhoan")
        })
    }
    return(
        <div>
            <h1 className="text-center text-2xl">Quản lý thông tin</h1>
            <div>
                <label>Mã khách hàng: </label>
                <input id="maKH" defaultValue={data.MaKhachHang} disabled/>
            </div>

            <div>
                <label>Họ tên: </label>
                <input type="text" defaultValue={data.HoTen} id="txtHoTen"/>
            </div>

            <div>
                <label>Số điện thoại: </label>
                <input defaultValue={data.SoDienThoai} id="txtSoDienThoai" disabled/>
            </div>

            <div>
                <label>Số CMND: </label>
                <input type="text" defaultValue={data.SoCMND} id="txtCMND"/>
            </div>

            <div>
                <label>Email: </label>
                <input defaultValue={data.email} id="txtEmail" disabled/>
            </div>

            <button type="button" onClick={CapNhatThongTin}
            className="cursor-pointer px-6 py-1.5 border-2 border-main bg-main text-white hover:bg-white hover:text-main hover:pointer">
                Cập nhật thông tin
            </button>
        </div>
    )
}

export default CapNhatThongTinTaiKhoan