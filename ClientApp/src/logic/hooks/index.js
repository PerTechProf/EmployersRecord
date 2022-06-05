import { useDispatch, useSelector } from "react-redux"
import { selectIsEditor, selectToken } from "../../store/authReducer";
import api from '../api';

export const useToken = () => useSelector(selectToken);
export const useIsEditor = () => useSelector(selectIsEditor);

export const useApi = () => api;