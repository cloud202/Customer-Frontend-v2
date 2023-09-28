import {combineReducers, configureStore} from "@reduxjs/toolkit"
import dueDiligenceReducer from '../features/formData/dueDiligenceForm'
import selectDueDiligenceReducer from '../features/formData/selectDueDiligence'
import profileForm from '../features/formData/profileForm'
import phasesReducer from '../features/tabs/phases'

const rootReducers = combineReducers({
    dueDiligence: dueDiligenceReducer,
    selectDueDiligence: selectDueDiligenceReducer,
    profileForm: profileForm,
    phases: phasesReducer
})

export const store = configureStore({
    reducer: rootReducers,
})