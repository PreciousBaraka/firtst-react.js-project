import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import hospitalVisitReducer from "./slices/hospitalVisitSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    hospitalVisit:hospitalVisitReducer,

  },
});
