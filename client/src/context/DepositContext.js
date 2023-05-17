import { createContext, useReducer } from "react";
//import Deposit from "../pages/Deposit";

// let's create customer Hook
export const DepositContext = createContext()

export const depositsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DEPOSITS':
            return{
                deposits: action.payload
            }
        case 'CREATE_DEPOSITS':
            return {
                deposits: [action.payload, ...state.deposits]
            }
        case 'DELETE_DEPOSIT':
            return {
                deposits: state.deposits.filter((d) => d._id !== action.payload._id)
            }    
        default:
            return state 

    }

}

export const DepositContextProvider = ({ children }) => {
    const [state, dispatch ] = useReducer(depositsReducer, {
        deposits: null
    })

    

    return(
        <DepositContext.Provider value = {{...state, dispatch }}>
            { children }
        </DepositContext.Provider>
    )
}

