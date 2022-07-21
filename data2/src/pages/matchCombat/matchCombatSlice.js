import { createSlice } from '@reduxjs/toolkit'

export const combatFilterSlice = createSlice({
    name: 'teamfight',
    initialState: {
      value: '',
    },
    reducers: {
      fill: (state, action) => {
        state.value = action.payload
      },
      
    },
  })


export const { fill } = combatFilterSlice.actions