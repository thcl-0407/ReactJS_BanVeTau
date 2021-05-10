import React, {useState, createContext} from 'react'

export const LichTrinhContext = createContext()

const LichTrinhContextProvider = ({children}) => {
    //State
    const [Schedule, SetSchedule] = useState({
        MaGaDi: 47,
        TenGaDi: 'Phúc Trạch',
        MaGaDen: 80,
        TenGaDen: 'Truồi',
        ThoiGianDi: new Date('2021-05-10')
    })

    //Set Schedule
    const SetStateSchedule = (new_schedule) =>{
        SetSchedule(new_schedule)
    }
    
    //Context Data
    const LichTrinhContextData = {
        Schedule,
        SetStateSchedule
    }
    
    //Return LichTrinhContextProvider
    return (
        <LichTrinhContext.Provider value={LichTrinhContextData}>
            {children}
        </LichTrinhContext.Provider>
    )
}

export default LichTrinhContextProvider