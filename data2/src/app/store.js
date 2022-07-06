import { configureStore } from '@reduxjs/toolkit'
import { matchesSlice, rankSlice } from '../pages/matchesList/matchesSlice'

export default configureStore({
  reducer: {
    matches: matchesSlice.reducer,
    rank: rankSlice.reducer
  },
})