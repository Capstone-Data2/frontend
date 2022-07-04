import { configureStore } from '@reduxjs/toolkit'
import matchesReducer from '../pages/matchesList/matchesSlice'

export default configureStore({
  reducer: {
    matches: matchesReducer,
  },
})