import { createSlice } from '@reduxjs/toolkit'

export const logFilterSlice = createSlice({
    name: 'filter',
    initialState: {
      value: '',
    },
    reducers: {
      toggle: (state, action) => {
        
        let array_selections = state.value.split(',')
        if (array_selections.includes(action.payload)){
            let val = ''
            while( array_selections.length){
                let states = array_selections.pop()
                if(states !== action.payload && states !== ""){
                    val = val + states + ','
                }
                
            }
            state.value = val
        }
        else{
            state.value = state.value + action.payload + ','
        }
        
      },
      clear: (state) => {
        state.value = ''
      },
    },
  })


export const { toggle, clear } = logFilterSlice.actions