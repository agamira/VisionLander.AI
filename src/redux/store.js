import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalsSlice from "./modalsSlice";
import sitesSlice from "./sitesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalsSlice,
    websites: sitesSlice,
  },
  devTools: true, //process.env.NODE_ENV !== 'production',
});

export default store;
