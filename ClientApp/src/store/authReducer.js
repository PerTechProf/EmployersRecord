import { createSlice } from "@reduxjs/toolkit";
import { getCookies } from "../logic";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getCookies().AuthToken,
    isEditor: true
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAsEditor: (state, action) => {
      state.isEditor = action.payload;
    }
  }
});

export const { setToken, setAsEditor } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectIsEditor = (state) => state.auth.isEditor;

export default authSlice.reducer;