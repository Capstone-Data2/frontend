import { createSlice } from '@reduxjs/toolkit'

export const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    value: ["nothing", "hiii"],
  },
  reducers: {
    fill: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { fill } = matchesSlice.actions

export default matchesSlice.reducer