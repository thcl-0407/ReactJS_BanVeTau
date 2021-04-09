import React, {useState} from 'react';
import { vi } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import "./Calendar.scss"

function Calendar() {
    const [date, setDate] = useState()

        return (
            <div>
                <DatePicker date={date} onDateChange={setDate} locale={vi}>
                    {({ inputProps, focused }) => (
                        <input id="txtDate" className={'input' + (focused ? ' -focused' : '')} {...inputProps} 
                        placeholder="&#xf073;&emsp;Thời Gian Đi Của Bạn"></input>
                    )}
                </DatePicker>
            </div>
        )
}

export default Calendar