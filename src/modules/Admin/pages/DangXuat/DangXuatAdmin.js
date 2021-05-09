import React from 'react'
import lodash from 'lodash';
import history from '../../../../history'
import {reactLocalStorage} from 'reactjs-localstorage';

function DangXuatAdmin(props){
    const DangXuatAdmin = ()=>{
        reactLocalStorage.remove('CurrentUserAdmin');
        reactLocalStorage.remove('CurrentTokenAdmin');
        history.push('/Admin/Login')
    }

    return (
        <div>
            {DangXuatAdmin()}
        </div>
    )
}

export default DangXuatAdmin