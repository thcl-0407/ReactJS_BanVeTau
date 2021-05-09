import React, {useState, createContext} from 'react'

export const LichTrinhContext = createContext()

const LichTrinhContextProvider = ({children}) => {
    //State
    const [Schedule, SetSchedule] = useState({
        MaGaDi: 1,
        MaGaDen: 2,
        ThoiGianDi: new Date()
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