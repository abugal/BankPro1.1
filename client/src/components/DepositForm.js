import  { useState } from "react";
import { useDepositsContext } from "../hooks/useDepositsContext";
import { useAuthContext } from '../hooks/useAuthContext'

const DepositForm = () => {
    const { dispatch } = useDepositsContext()
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // checking for the user
        if (!user) {
          setError('You must be logged in')
          return
        }

        const deposit = {name, amount}

        const response = await fetch('/api/deposit', {
            method: 'POST',
            body: JSON.stringify(deposit), // stringfying the deposit
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        // checking if the response is ok
        if(!response.ok) {            
            setError(json.error)
            setEmptyFields(json.emptyFields)

        }
        if(response.ok) {
            setName('')
            setAmount(0)
            setError(null)
            setEmptyFields([])
            console.log('Money deposited successfully', json)
            dispatch({ type: "CREATE_DEPOSITS", payload: json });
        }
    }

    return (
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add New Deposit </h3>
        <label>Customer Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("name") ? "error" : ""}
        />

        <label>Amount (in $):</label>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          className={emptyFields.includes("amount") ? "error" : ""}
        />
        <button>Add Deposit</button>
        {error && <div className="error">{error}</div>}
      </form>
    );
}

export default DepositForm