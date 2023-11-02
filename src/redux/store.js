import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true, //process.env.NODE_ENV !== 'production',
});

export default store;
