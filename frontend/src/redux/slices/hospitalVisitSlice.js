import { createSlice } from "@reduxjs/toolkit";

const hospitalVisitSlice = createSlice({
  name: "hospitalVisit",
  initialState: {
    hospitalVisits: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    listHospitalVisitsRequest: (state) => {
      state.loading = true;
    },
    listHospitalVisitsSuccess: (state, action) => {
      state.loading = false;
      state.hospitalVisits = action.payload;
    },
    listHospitalVisitsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createHospitalVisitRequest: (state) => {
      state.loading = true;
    },
    createHospitalVisitSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    createHospitalVisitFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearHospitalVisitErrors: (state) => {
      state.error = null;
    },
    resetHospitalVisitSuccess: (state) => {
      state.success = false;
    },
  },
});

export const {
  listHospitalVisitsRequest,
  listHospitalVisitsSuccess,
  listHospitalVisitsFail,
  createHospitalVisitRequest,
  createHospitalVisitSuccess,
  createHospitalVisitFail,
  clearHospitalVisitErrors,
  resetHospitalVisitSuccess,
} = hospitalVisitSlice.actions;

export default hospitalVisitSlice.reducer;
