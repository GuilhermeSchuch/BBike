import { configureStore } from "@reduxjs/toolkit";
import pedalReducer from '../features/pedalSlice';

export const store = configureStore({
  reducer: {
    pedal: pedalReducer,
  }
})