import { createSlice } from "@reduxjs/toolkit";
import { getCookies } from "../logic";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getCookies().AuthToken,
    isEditor: getCookies().IsEditor == "True" ?? false
  },
  reducers: {
    setUser: (state, action) => {
      console.log(state, action)
      state.token = action.payload?.token;
      state.isEditor = action.payload?.isEditor;
    }
  }
});

export const { setUser } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectIsEditor = (state) => state.auth.isEditor;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;