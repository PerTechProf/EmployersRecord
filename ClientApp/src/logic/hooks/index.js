import { useDispatch, useSelector } from "react-redux"
import { authorizeAsync, selectToken } from "../../store/authReducer";

export const useAuth = () => {
  const dispatch = useDispatch();
  
  return (email, password) => dispatch(authorizeAsync(email, password))
}

export const useToken = () => useSelector(selectToken);