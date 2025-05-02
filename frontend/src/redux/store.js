import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import hospitalVisitReducer from "./slices/hospitalVisitSlice"
import treatmentRecordReducer from "./slices/treatmentRecordSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    hospitalVisit:hospitalVisitReducer,
    treatmentRecord:treatmentRecordReducer,

  },
});
