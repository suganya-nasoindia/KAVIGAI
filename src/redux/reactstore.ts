// src/redux/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userProfileReducer from './slices/userProfileSlice';
import { authReducer } from './reducer';

// ----------------------------------------
// ROOT REDUCER
// ----------------------------------------
const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
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
