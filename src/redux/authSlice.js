import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, logout, login, loginGoogle } from "../api";

const loginAsync = createAsyncThunk("auth/login", login);
const loginGoogleAsync = createAsyncThunk("auth/login-google", loginGoogle);
const authAsync = createAsyncThunk("auth/auth", auth);
const logoutAsync = createAsyncThunk("auth/logout", logout);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    isError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginGoogleAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginGoogleAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(authAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addMatcher(
        // Handle rejected actions for all async thunks
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      );
  },
});

export { loginAsync, loginGoogleAsync, authAsync, logoutAsync };
export default authSlice.reducer;
