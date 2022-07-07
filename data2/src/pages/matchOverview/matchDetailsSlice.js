import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMatchDetails } from "../../common/api";

export const fetchMatchDetails = createAsyncThunk(
  "matches/fetchMatchDetailsStatus",
  async (match_id, thunkAPI) => {
    const response = await getMatchDetails(match_id);
    return response;
  }
);

export const matchDetailsSlice = createSlice({
  name: "matchDetails",
  initialState: {
    match_details: {match_id: 0},
    loading: false,
  },
  reducers: {
    fill: (state, action) => {
      state.match_details = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMatchDetails.fulfilled, (state, action) => {
      state.match_details = action.payload
      state.loading = false
    });
    builder.addCase(fetchMatchDetails.pending, (state, action) => {
      state.loading = true
    });

  },
});

// Action creators are generated for each case reducer function
export const { fill } = matchDetailsSlice.actions;
