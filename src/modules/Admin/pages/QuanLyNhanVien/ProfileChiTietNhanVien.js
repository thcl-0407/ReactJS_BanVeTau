import AdminService from "./../../../../services/Admin.Service"
import lodash, { set } from "lodash"
import { useEffect, useState } from "react"
import 'react-responsive-modal/styles.css';


function ProfileChiTietNhanVien(props){
    const [profile, setProfile] = useState([]);
    
    useEffect(()=>{
        console.log(props.SoDienThoai)

        if(!lodash.isNil(props.SoDienThoai)){
            AdminService.GetNhanVienBySDT(props.SoDienThoai).then(response => {
                console.log(response.data.data)
                setProfile(response.data.data)
            })
        }
    },[])

    return(

        <form>
            <h1 className="text-center font-extrabold text-2xl">Thông tin chi tiết nhân viên</h1>
            {/* <h2>Thông tin cá nhân</h2> */}
            <div className="grid grid-cols-2 border border-separate my-1 mx-3">                
                <div className="grid grid-cols-2 m-2">
                    <h2 className="font-bold">Mã nhân viên</h2>
                    <p>{profile.MaNhanVien}</p>
                </div>
                    
                <div className="grid grid-cols-2 m-2">
                    <h2 className="font-bold">Họ tên nhân viên</h2>
                    <p className="ml-7">{profile.HoTenNhanVien}</p>
                </div>
               
                <div className="grid grid-cols-2 m-2">
                    <h2 className="font-bold">Số điện thoại</h2>
                    <p>{profile.SoDienThoai}</p>
                </div>

                <div className="grid grid-cols-2 m-2">
                    <h2 className="font-bold">Chứng minh nhân dân</h2>
                    <p className="ml-7">{profile.SoCMND}</p>
                </div>

                <div className="grid grid-cols-2 m-2">
                    <h2 className="font-bold">Ca làm việc</h2>
                    <p>{profile.CaLamViec}</p>
                </div>

                <div className="grid grid-cols-2 m-2">
                    <h2 className="font-bold">Tên tài khoản</h2>
                    <p className="ml-7">{profile.UserName}</p>
                </div>
            </div>
            

                
                {/* <div className="grid grid-cols-2">
                    <h2 className="font-bold">Mật khẩu</h2>
                    <p className="ml-2" >{profile.MatKhau}</p>
                </div> */}
                

        </form>
    )
}

export default ProfileChiTietNhanVien