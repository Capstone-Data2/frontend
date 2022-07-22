import { configureStore } from '@reduxjs/toolkit'
import { matchesSlice, rankSlice } from '../pages/matchesList/matchesSlice'
import { logFilterSlice } from '../pages/matchLog/matchLogSlice'
import { combatFilterSlice } from '../pages/matchCombat/matchCombatSlice'
import { hoverSlice, matchDetailsSlice } from '../pages/matchOverview/matchDetailsSlice'
import { visionSelectionSlice } from "../pages/matchVision/matchVisionSlice"
import { matchRivalsSlice } from '../pages/matchRivals/matchRivalsSlice'


export default configureStore({
  reducer: {
    matches: matchesSlice.reducer,
    rank: rankSlice.reducer,
    match_details: matchDetailsSlice.reducer,
    filter: logFilterSlice.reducer,
    teamfight: combatFilterSlice.reducer,
    hover: hoverSlice.reducer,
    vision: visionSelectionSlice.reducer,
    rivals: matchRivalsSlice.reducer,
  },
})