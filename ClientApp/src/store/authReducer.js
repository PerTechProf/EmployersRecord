import { createSlice } from "@reduxjs/toolkit";
import { login } from "../logic";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: ''
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    }
  }
});

export const { setToken } = counterSlice.actions;

export const authorizeAsync = async (email, password) => (dispatch) => {
    dispatch(setToken(await login(email, password)));
}

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;