import {toast} from "react-toastify";
import "./ToastifyCustomStyle.scss"

toast.configure();

export default class ToastifyMessage {
    static ToastError(msg) {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
            bodyStyle: { width: "100%", textAlign: "center" },
            autoClose: 2000,
            closeButton: true,
            hideProgressBar: true
        })
    }

    static ToastSuccess(msg) {
        toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT,
            bodyStyle: { width: "100%", textAlign: "center" },
            autoClose: 2000,
            closeButton: true,
            hideProgressBar: true
        })
    }
}