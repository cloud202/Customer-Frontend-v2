// slice : helps to create big object which we export,it link the initial state and reducers. 
import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    dueDiligence:{
        "project_name": "",
        "project_industry": "",
        "project_CAP": "",
        "project_TS": [],
        "project_WT": []
    }
}

export const dueDiligenceResponseSlice = createSlice({
    name: 'response',
    initialState,
    reducers: {
        setResponseData : (state,action)=>{
            state.dueDiligence = action.payload
        },

        resetResponseData: (state,action)=>{
            state.dueDiligence = state.initialState;
        }
    }

})

export const {setResponseData,resetResponseData} = dueDiligenceResponseSlice.actions;

export default dueDiligenceResponseSlice.reducer