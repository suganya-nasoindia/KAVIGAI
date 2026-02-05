import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  apiKey: string | null;
  accessToken: string | null;
  loginName: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  apiKey: null,
  accessToken: null,
  loginName: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        apiKey: string;
        accessToken: string;
        loginName: string;
      }>
    ) => {
      state.apiKey = action.payload.apiKey;
      state.accessToken = action.payload.accessToken;
      state.loginName = action.payload.loginName;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
