import { useDepositsContext } from "../hooks/useDepositsContext"
import { useAuthContext } from '../hooks/useAuthContext'
// importing date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const DepositDetails = ({ deposit }) => {
    const { dispatch } = useDepositsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {

      // checking for the user
      if (!user) {
        return
      }
      const response = await fetch ('/api/deposit/' + deposit._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      // checking the responnse
      if (response.ok) {
        dispatch({type: 'DELETE_DEPOSIT', payload: json} )

      }

    }

    return (
      <div className="deposit-details">
        <h4>{deposit.name}</h4>
        <p>
          <strong>Amount($):</strong>
          {deposit.amount}
        </p>
        <p>
          <strong>Balance($):</strong>
          {deposit.amount}
        </p>
        <p>{formatDistanceToNow(new Date(deposit.createdAt), { addSuffix: true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
    );

}

export default DepositDetails