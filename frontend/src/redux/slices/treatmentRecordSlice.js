import { createSlice } from "@reduxjs/toolkit";

const treatmentRecordSlice = createSlice({
  name: "treatmentRecord",
  initialState: {
    treatmentRecords: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    listTreatmentRecordsRequest: (state) => {
      state.loading = true;
    },
    listTreatmentRecordsSuccess: (state, action) => {
      state.loading = false;
      state.treatmentRecords = action.payload;
    },
    listTreatmentRecordsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTreatmentRecordRequest: (state) => {
      state.loading = true;
    },
    createTreatmentRecordSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    createTreatmentRecordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearTreatmentRecordErrors: (state) => {
      state.error = null;
    },
    resetTreatmentRecordSuccess: (state) => {
      state.success = false;
    },
  },
});

export const {
  listTreatmentRecordsRequest,
  listTreatmentRecordsSuccess,
  listTreatmentRecordsFail,
  createTreatmentRecordRequest,
  createTreatmentRecordSuccess,
  createTreatmentRecordFail,
  clearTreatmentRecordErrors,
  resetTreatmentRecordSuccess,
} = treatmentRecordSlice.actions;

export default treatmentRecordSlice.reducer;
