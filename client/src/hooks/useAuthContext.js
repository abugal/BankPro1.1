import { AuthContext } from "../context/AuthContext"; // the actual context
import { useContext } from "react"; // to consume the context

// create the hook function
export const useAuthContext = () => {
  const context = useContext(AuthContext); // return the value of the 'DepositContext'

  // Checking the context value
  if (!context) {
    throw Error("useAuthContext must be inside the AuthContextProvide");
  }

  return context;
};
