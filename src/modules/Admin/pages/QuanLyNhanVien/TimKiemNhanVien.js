import AdminService from "./../../../../services/Admin.Service"
import lodash, { set } from "lodash"
import ToastifyMessage from "./../../../../utilities/ToastifyMessage"
import history from "./../../../../history"
import { useEffect, useState } from "react"
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

function TimKiemNhanVien(props){
    return(
        <div>
            <input
                placeholder="Tìm kiếm bằng số điện thoại"
            />
        </div>
    )
}

export default TimKiemNhanVien