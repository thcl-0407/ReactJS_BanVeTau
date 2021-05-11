import React, {useState, createContext} from 'react'

export const VeContext = createContext()

const VeContextProvider = ({children}) => {
    //State
    const [VeStateContext, SetVe] = useState([])

    //Set Schedule
    const AddNewVe = (new_ve) =>{
        SetVe(new_ve)
    }
    
    //Context Data
    const VeContextData = {
        VeStateContext,
        AddNewVe
    }
    
    //Return LichTrinhContextProvider
    return (
        <VeContext.Provider value={VeContextData}>
            {children}
        </VeContext.Provider>
    )
}

export default VeContextProvider