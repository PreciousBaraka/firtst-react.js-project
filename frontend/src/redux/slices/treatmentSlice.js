import { createSlice } from "@reduxjs/toolkit";

const treatmentSlice = createSlice({
  name: "treatment",
  initialState: {
    treatmentRecord: null,
    loading: false,
    error: null,
  },
  reducers: {
    listTreatmentRecordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    listTreatmentRecordSuccess: (state, action) => {
      state.loading = false;
      state.treatmentRecord = action.payload;
    },
    listTreatmentRecordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  listTreatmentRecordRequest,
  listTreatmentRecordSuccess,
  listTreatmentRecordFail,
} = treatmentSlice.actions;

export default treatmentSlice.reducer;
