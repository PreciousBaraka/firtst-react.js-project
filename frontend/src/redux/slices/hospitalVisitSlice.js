import { createSlice } from "@reduxjs/toolkit";

const hospitalVisitSlice = createSlice({
  name: "hospitalVisit",
  initialState: {
    hospitalVisits: [],
    hospitalVisitDetails: null,
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
    getHospitalVisitDetailsSuccess: (state, action) => {
      state.loading = false;
      state.hospitalVisitDetails = action.payload;
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
    createTreatmentRecordSuccess: (state) => {
      state.loading = false;
      state.success = true;
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
  getHospitalVisitDetailsSuccess,
  createTreatmentRecordSuccess
} = hospitalVisitSlice.actions;

export default hospitalVisitSlice.reducer;
