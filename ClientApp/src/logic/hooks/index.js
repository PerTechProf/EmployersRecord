import { useDispatch, useSelector } from "react-redux"
import { authorizeAsync, selectIsEditor, selectToken } from "../../store/authReducer";
import api from '../api';

export const useAuth = () => {
  const dispatch = useDispatch();
  
  return (email, password) => dispatch(authorizeAsync(email, password))
}

export const useToken = () => useSelector(selectToken);
export const useIsEditor = () => useSelector(selectIsEditor);

export const useApi = () => api;