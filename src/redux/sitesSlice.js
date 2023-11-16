import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

// Example API call function
const fetchSitesFromAPI = async (email) => {
  try {
    const response = await api.post("/dashboard", { email });
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

const fetchSites = createAsyncThunk(
  "websites/fetchAllSites",
  async (email, thunkAPI) => {
    try {
      const response = await fetchSitesFromAPI(email);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const sitesSlice = createSlice({
  name: "websites",
  initialState: {
    websites: null,
    isLoading: false,
    isError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSites.fulfilled, (state, action) => {
        state.websites = action.payload;
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

export { fetchSites };
export default sitesSlice.reducer;
