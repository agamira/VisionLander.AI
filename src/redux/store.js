import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalsSlice from "./modalsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalsSlice,
  },
  devTools: true, //process.env.NODE_ENV !== 'production',
});

export default store;
