import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMatchesList } from '../../common/api';

export const fetchMatchesList = createAsyncThunk(
  "matches/fetchMatchesListStatus",
  async (selected_rank, thunkAPI) => {
    const response = await getMatchesList(selected_rank);
    return response;
  }
);

export const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    match_list: [],
    rank: 0,
    loading: true
  },
  reducers: {
    fill: (state, action) => {
      state.match_list = action.payload.match_list
      state.rank = action.payload.rank
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMatchesList.fulfilled, (state, action) => {
      state.match_list = action.payload.match_list
      state.rank = action.payload.rank
      state.loading = false
    });
    builder.addCase(fetchMatchesList.pending, (state) => {
      state.loading = true
    });

  },
})

export const rankSlice = createSlice({
  name: 'rank',
  initialState: {
    value: "8"
  },
  reducers: {
    select: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { fill } = matchesSlice.actions
export const { select } = rankSlice.actions