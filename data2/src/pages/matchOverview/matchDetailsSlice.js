import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMatchDetails } from "../../functions/api";

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

export const hoverSlice = createSlice({
  name: "hover",
  initialState: {
    isHovering: false,
    type: "",
    hovered: 0,
    location: {x: 0, y: 0}
  },
  reducers: {
    setHover: (state, action) => {
      state.isHovering = true
      state.type = action.payload.type
      state.hovered = action.payload.hovered
      state.location = action.payload.location
    },
    removeHover: (state) => {
      state.isHovering = false
      state.type = ""
      state.hovered = 0
      state.location = {x: 0, y: 0}
    }
  },
});

// Action creators are generated for each case reducer function
export const { fill } = matchDetailsSlice.actions;
export const { setHover, removeHover } = hoverSlice.actions;
