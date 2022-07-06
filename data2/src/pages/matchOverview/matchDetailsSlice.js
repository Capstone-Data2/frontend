import { createSlice } from '@reduxjs/toolkit'

export const matchDetailsSlice = createSlice({
  name: 'matchDetails',
  initialState: {
    value: [[], 0],
  },
  reducers: {
    fill: (state, action) => {
      state.value = action.payload
    },
  },
})


// Action creators are generated for each case reducer function
export const { fill } = matchDetailsSlice.actions