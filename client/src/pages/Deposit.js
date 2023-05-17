import { useEffect } from "react";
import { useDepositsContext } from '../hooks/useDepositsContext'

// components
import DepositDetails from '../components/DepositDetails';
import DepositForm from "../components/DepositForm";

const Deposit = () => {
    //const [deposits, setDeposits] = useState(null);
    const{deposits, dispatch} = useDepositsContext()

    useEffect(() => {
        const fetchDeposits = async () => {
            const response = await fetch("/api/deposit");
            const json = await response.json()

            if (response.ok) {
                //setDeposits(json)
              dispatch({type: 'SET_DEPOSITS', payload: json})

            }
            
        }

        fetchDeposits()

    }, [dispatch])

    return (
      <div className="deposit">
        <div className="deposits">
          {deposits &&
            deposits.map((deposit) => (
              <DepositDetails key={deposit._id} deposit={deposit} />
            ))}
        </div>
        <DepositForm />
      </div>
    );
}

export default Deposit