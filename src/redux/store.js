import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalsSlice from "./modalsSlice";
import sitesSlice from "./sitesSlice";
import pricingSlice from "./pricingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalsSlice,
    websites: sitesSlice,
    pricing: pricingSlice,
  },
  devTools: true, //process.env.NODE_ENV !== 'production',
});

export default store;
