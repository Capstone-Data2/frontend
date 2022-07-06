import { createSlice } from '@reduxjs/toolkit'

export const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    value: [[], 0],
  },
  reducers: {
    fill: (state, action) => {
      state.value = action.payload
    },
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