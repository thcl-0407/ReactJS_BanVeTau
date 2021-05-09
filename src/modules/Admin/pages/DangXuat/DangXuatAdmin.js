import React from 'react'
import lodash from 'lodash';
import history from '../../../../history'
import {reactLocalStorage} from 'reactjs-localstorage';

function DangXuatAdmin(props){
    const DangXuatAdmin = ()=>{
        reactLocalStorage.remove('CurrentUser');
        reactLocalStorage.remove('CurrentToken');
        history.push('/Admin/Login')
    }

    return (
        <div>
            {DangXuatAdmin()}
        </div>
    )
}

export default DangXuatAdmin