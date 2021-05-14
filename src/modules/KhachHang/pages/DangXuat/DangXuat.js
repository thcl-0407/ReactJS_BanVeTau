import React, {useContext} from 'react'
import lodash from 'lodash';
import history from './../../../../history'
import {reactLocalStorage} from 'reactjs-localstorage';

function DangXuat(props){
    

    const ExecDangXuat = ()=>{
        reactLocalStorage.remove('CurrentUser');
        reactLocalStorage.remove('CurrentToken');
        history.push('/')
    }

    return (
        <div>
            {ExecDangXuat()}
        </div>
    )
}

export default DangXuat