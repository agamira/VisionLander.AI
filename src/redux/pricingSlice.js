import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

// Example API call function
const fetchPricingFromAPI = async (yearly) => {
  try {
    const response = await api.get(
      `/get-price/${yearly ? "yearly" : "monthly"}`
    );
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

const fetchPricing = createAsyncThunk(
  "pricing/fetchPlan",
  async (plan, period, thunkAPI) => {
    try {
      const response = await fetchPricingFromAPI(plan, period);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const pricingSlice = createSlice({
  name: "pricing",
  initialState: {
    plan: null,
    isLoading: false,
    isError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPricing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPricing.fulfilled, (state, action) => {
        state.plan = action.payload;
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

export { fetchPricing };
export default pricingSlice.reducer;
