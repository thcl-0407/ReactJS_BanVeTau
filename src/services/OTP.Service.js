import axios from "axios";

const Base_URL = "http://localhost:5002/api/"

const SendSMSCode = (phone)=>{
    let param = {
        country_code:"+84",
        phone:phone
    }

    return axios.post(Base_URL + "send/sms", param)
}

const VerifyCode = (phone, code)=>{
    let param = {
        country_code:"+84",
        phone:phone,
        code: code
    }

    return axios.post(Base_URL + "verify/sms", param)
}

export default {
    SendSMSCode,
    VerifyCode
}