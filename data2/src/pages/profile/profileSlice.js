import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileData } from "../../functions/api";

export const fetchProfileData = createAsyncThunk(
  "matches/fetchProfileDataStatus",
  async (account_id, thunkAPI) => {
    const response = await getProfileData(account_id);
    return response;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {profile: {account_id: 0}},
    wl: {},
    recent_matches: {},
    heroes: {},
    peers: {}, 
    loading: false,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      state.profile = action.payload.profile
      state.wl = action.payload.wl
      state.recent_matches = action.payload.recentMatches
      state.heroes = action.payload.heroes
      state.peers = action.payload.peers
      state.loading = false
    });
    builder.addCase(fetchProfileData.pending, (state, action) => {
      state.loading = true
    });

  },
});


// Action creators are generated for each case reducer function
export const { setProfile } = profileSlice.actions;
