import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {},
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalName } = action.payload;
      state.modals = {
        ...state.modals,
        [modalName]: true,
      };
      // Close all other modals
      Object.keys(state.modals).forEach((key) => {
        if (key !== modalName) {
          state.modals[key] = false;
        }
      });
    },
    closeModal: (state, action) => {
      const { modalName } = action.payload;
      state.modals = {
        ...state.modals,
        [modalName]: false,
      };
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
