import { createSlice } from '@reduxjs/toolkit'

export const visionSelectionSlice = createSlice({
    name: 'vision',
    initialState: {
      value: {
        obs:{
            isToggled: [true, true, true, true, true,true, true, true, true, true]
        },
        sentries:{
            isToggled: [true, true, true, true, true,true, true, true, true, true]
        }, 
        team:{
            radiant: true,
            dire: true
        }

      },
    },
    reducers: {
      togglePlayer: (state, action) => {
        if(action.payload.method === 'turn_off'){
            state.value['obs']['isToggled'][action.payload.player_index] = false
            state.value['sentries']['isToggled'][action.payload.player_index] = false
        }
        else if(action.payload.method === 'turn_on'){
            state.value['obs']['isToggled'][action.payload.player_index] = true
            state.value['sentries']['isToggled'][action.payload.player_index] = true
        }
        else if(action.payload.method === 'toggle'){
            if(action.payload.isObs){
                state.value['obs']['isToggled'][action.payload.player_index] = !state.value['obs']['isToggled'][action.payload.player_index]
            }
            else if(!action.payload.isObs){
                state.value['sentries']['isToggled'][action.payload.player_index] = !state.value['sentries']['isToggled'][action.payload.player_index]
            }
        }
      },

      toggleTeam: (state, action) => {
        if(action.payload.isRadiant){
            state.value['team']['radiant'] = !state.value['team']['radiant']
        }
        else if(action.payload.isRadiant===false){
            state.value['team']['dire'] = !state.value['team']['dire']
        }
      },
      
    },
  })


export const { togglePlayer, toggleTeam } = visionSelectionSlice.actions