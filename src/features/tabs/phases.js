// slice : helps to create big object which we export,it link the initial state and reducers. 
import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    phases: [],
}

export const phasesSlice = createSlice({
    name: 'phases',
    initialState,
    reducers: {
        setPhasesData: (state, action) => {
            return {
              ...state,
              phases: [action.payload]
            };
          },
          

          updatePhasesData: (state, action) => {
            const { id, updatedData } = action.payload;
          
            const phaseIndex = state.phases.findIndex(phase => phase.id === id);
          
            if (phaseIndex !== -1) {
              const updatedPhases = [...state.phases];
              updatedPhases[phaseIndex] = {
                ...updatedPhases[phaseIndex],
                ...updatedData
              };
          
              return {
                ...state,
                phases: updatedPhases
              };
            }
            return state;
          }
          
    }
})

export const {setPhasesData,updatePhasesData} = phasesSlice.actions

export default phasesSlice.reducer 