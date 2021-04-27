import AdminService from "./../../../../services/Admin.Service"
import lodash from "lodash"
import ToastifyMessage from "./../../../../utilities/ToastifyMessage"
import history from "./../../../../history"
import { useEffect, useState } from "react"
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


function ProfileChiTietNhanVien(props){

    const [profile, setProfile] = useState([]);
    //const [SoDienThoai, setSoDienThoai]= useState()
    

    // useEffect(()=>{
    //     console.log("sdt",profile.SoDienThoai)
    //     AdminService.GetNhanVienBySDT('0339310762').then(response=>{
    //         console.log(response.data.data)
    //         //setData(response.data.data)
    //         setProfile(response.data.status)
    //     })
    // },[])

    return(

        <form>
            <strong>Thông tin chi tiết nhân viên</strong>
            {profile.map(function(item,index){
                return (
                    <div>
                        <label>Mã nhân viên</label>
                        <p>{item.MaNhanVien}</p>
                        <p>{item.SoDienThoai}</p>
                    </div>
                )
            })}
            
        </form>
    )
}

export default ProfileChiTietNhanVien