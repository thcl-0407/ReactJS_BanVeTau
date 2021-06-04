import React, {useContext, useEffect} from 'react'
import lodash from 'lodash';
import history from './../../../../history'
import {reactLocalStorage} from 'reactjs-localstorage';
import {VeContext} from "./../../../../contexts/VeContext"

function DangXuat(props){
    const { AddNewVe, VeStateContext } = useContext(VeContext)

    const ExecDangXuat = ()=>{
        reactLocalStorage.remove('CurrentUser');
        reactLocalStorage.remove('CurrentToken');
        AddNewVe([])
        history.push('/')
    }

    useEffect(()=>{
        ExecDangXuat()
    }, [])

    return (
        <></>
    )
}

export default DangXuat