import { configureStore } from '@reduxjs/toolkit'
import { matchesSlice, rankSlice } from '../pages/matchesList/matchesSlice'
import { matchDetailsSlice } from '../pages/matchOverview/matchDetailsSlice'
import { logFilterSlice } from '../pages/matchLog/matchLogSlice'
export default configureStore({
  reducer: {
    matches: matchesSlice.reducer,
    rank: rankSlice.reducer,
    match_details: matchDetailsSlice.reducer,
    filter: logFilterSlice.reducer
  },
})