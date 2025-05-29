import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import hospitalVisitReducer from "./slices/hospitalVisitSlice";
import treatmentReducer from './slices/treatmentSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    hospitalVisit: hospitalVisitReducer,
    treatment: treatmentReducer
  },
});
