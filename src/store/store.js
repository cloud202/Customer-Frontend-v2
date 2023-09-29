import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";

import dueDiligenceReducer from '../features/formData/dueDiligenceForm'
import selectDueDiligenceReducer from '../features/formData/selectDueDiligence'
import profileForm from '../features/formData/profileForm'
import phasesReducer from '../features/tabs/phases'
import tokenReducer from '../features/userData/token'

const rootReducers = combineReducers({
    dueDiligence: dueDiligenceReducer,
    selectDueDiligence: selectDueDiligenceReducer,
    profileForm: profileForm,
    phases: phasesReducer,
    token: tokenReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['token'],
  };

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
})