import { DepositContext } from '../context/DepositContext'; // the actual context
import { useContext } from 'react' // to consume the context

// create the hook function
export const useDepositsContext = () => {
    const context = useContext(DepositContext); // return the value of the 'DepositContext'

    // Checking the context value
    if (!context) {
        throw Error('useDepositsContext must be inside the DepositsContextProvide')
    }

    return context
}
