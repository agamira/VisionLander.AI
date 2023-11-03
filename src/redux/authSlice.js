import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, logout, login, loginGoogle, register } from "../api";

const loginAsync = createAsyncThunk("auth/login", login);
const loginGoogleAsync = createAsyncThunk("auth/login-google", loginGoogle);
const signupAsync = createAsyncThunk("auth/signup", register);
const authAsync = createAsyncThunk("auth/auth", auth);
const logoutAsync = createAsyncThunk("auth/logout", logout);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    isLoading: false,
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
      .addCase(signupAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginGoogleAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(authAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
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

export { loginAsync, loginGoogleAsync, signupAsync, authAsync, logoutAsync };
export default authSlice.reducer;
