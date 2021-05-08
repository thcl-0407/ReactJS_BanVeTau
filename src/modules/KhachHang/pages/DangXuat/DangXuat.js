import React from 'react'
import { useCookies } from 'react-cookie';
import lodash from 'lodash';
import history from './../../../../history'

function DangXuat(props){
    const [cookies, removeCookie] = useCookies(['CurrentUser']);

    const ExecDangXuat = ()=>{
        removeCookie('CurrentUser')
        history.push('/')
    }

    return (
        <div>
            {ExecDangXuat()}
        </div>
    )
}

export default DangXuat