import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectId: "",
    projectData: [],
}

export const selectDueDiligenceSlice = createSlice({
    name: 'selectDueDiligence',
    initialState,
    reducers: {
        setProjectId : (state,action)=>{
            state.projectId = action.payload
        },

        setProjectData: (state,action)=>{
            state.projectData = action.payload
        },

        resetProjectId: (state,action)=>{
            state.projectId = state.initialState;
        }
    }
}) 

export const {setProjectId,setProjectData,resetProjectId} = selectDueDiligenceSlice.actions;

export default selectDueDiligenceSlice.reducer