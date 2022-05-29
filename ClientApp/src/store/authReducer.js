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

export const { setToken } = authSlice.actions;

// async dispatch thunk
export const authorizeAsync = (email, password) => async (dispatch) => {
    dispatch(setToken(await login(email, password)));
}

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;