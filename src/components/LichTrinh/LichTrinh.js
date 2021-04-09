import React from 'react';
import Calendar from "../Calendar/Calendar";
import "./LichTrinh.scss"

class LichTrinh extends React.Component {
    render() {
        return (
            <div id="boxLichTrinh" className="">
                <div className="col-sm-3" style={{textAlign: 'center'}} id="pnlTitleBoxLichTrinh">
                    <h4>Lịch Trình Của Bạn</h4>
                </div>
                <div style={{padding: '2vh'}}>
                    <div>
                        <input type="radio" value="MotChieu"/><span>&nbsp;Một Chiều&emsp;</span>
                        <input type="radio" value="MotChieu"/><span>&nbsp;Khứ Hồi</span>
                    </div>
                    <Calendar></Calendar>
                    <input type="text" placeholder="&#xf041;&emsp;Điểm Đi Của Bạn" id="txtNoiDi"/>
                    <br/>
                    <input type="text" placeholder="&#xf041;&emsp;Điểm Đến Của Bạn" id="txtNoiDen"/>
                    <br/> <br/>
                    <div className="col-sm-12 text-center" >
                        <input type="button" value="Xác Nhận" className="bg-blue-600 text-white rounded-t-sm"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default LichTrinh