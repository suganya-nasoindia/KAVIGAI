// src/redux/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userProfileReducer from './slices/userProfileSlice';
import  authReducer  from './slices/authslice';
import serviceReducer from './slices/serviceSlice';

// ----------------------------------------
// ROOT REDUCER
// ----------------------------------------
const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  service: serviceReducer, // 👈 REQUIRED

});

// ----------------------------------------
// STORE
// ----------------------------------------
export const store = configureStore({
  reducer: rootReducer,

});

// ----------------------------------------
// TYPES FOR GLOBAL USE
// ----------------------------------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
