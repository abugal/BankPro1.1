import { useAuthContext } from "./useAuthContext";
import { useDepositsContext } from "./useDepositsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: depositsDispatch} = useDepositsContext()
  

  const logout = () => {
    // remove user
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    depositsDispatch({type: 'SET_DEPOSITS', payload: null})  
  };

  return { logout };
};