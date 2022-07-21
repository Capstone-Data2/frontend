import { createSlice } from '@reduxjs/toolkit'

export const matchRivalsSlice = createSlice({
    name: 'rivals',
    initialState: {
      value: {},
    },
    reducers: {
      set: (state, action) => {
        state.value = action.payload
      },
      clear: (state) => {
        state.value = {}
      },
    },
  })


export const { toggle, clear } = matchRivalsSlice.actions