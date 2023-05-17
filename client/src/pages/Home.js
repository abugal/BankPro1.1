import { useEffect } from "react";
import { useDepositsContext } from "../hooks/useDepositsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import DepositDetails from "../components/DepositDetails";
import DepositForm from "../components/DepositForm";

const Home = () => {
  //const [deposits, setDeposits] = useState(null);
  const { deposits, dispatch } = useDepositsContext();
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchDeposits = async () => {
      const response = await fetch("/api/deposit", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        //setDeposits(json)
        dispatch({ type: "SET_DEPOSITS", payload: json });
      }
    };

    if (user) {
      fetchDeposits();

    }

    
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="deposits">
        {deposits &&
          deposits.map((deposit) => (
            <DepositDetails key={deposit._id} deposit={deposit} />
          ))}
      </div>
      <DepositForm />
    </div>
  );
};

export default Home;
