import {reactLocalStorage} from 'reactjs-localstorage';
import lodash from 'lodash';
import history from './../../../../history';
import React, {useContext} from 'react';
import {VeContext} from "./../../../../contexts/VeContext"

function XacNhanThongTinDatVe(props){
    const {VeStateContext} = useContext(VeContext)

    if(lodash.isEmpty(reactLocalStorage.getObject("CurrentUser")) && VeStateContext.length == 0){
        history.push("/")
    }

    if(VeStateContext.length == 0 && !lodash.isEmpty(reactLocalStorage.getObject("CurrentUser"))){
        history.push("/TimVe")
    }

    return(
        <></>
    )
}

export default XacNhanThongTinDatVe