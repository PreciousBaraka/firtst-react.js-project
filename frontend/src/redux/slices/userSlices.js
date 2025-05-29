import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("Post Operative Assistance-user")
  ? JSON.parse(localStorage.getItem("Post Operative Assistance-user"))
  : null;

const initialState = {
  userInfo: savedUser,
  userDetails: null,
  loading: false,
  error: null,
  success: false,
  patients: [],
  receptionists: [],
  doctors: [],
  roles: [],
  totalDoctors: 0,
  totalPatients: 0,
  totalReceptionists: 0,
  patientQueries: [],
  loadingPatientQuery: false,
  patientQueryError: null,
  doctorPatients: [],
  currentPage: 1,
  totalPages: 0,
  limit: 10,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("Post Operative Assistance-user");
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      const { type, userData } = action.payload;

      const users = userData?.data || [];
      const total = userData?.total || 0;
      const totalPages = userData?.totalPages || 0;
      const currentPage = userData?.currentPage || 1;
      const limit = userData?.limit || 10;

      if (type === "patients") {
        state.patients = users;
        state.totalPatients = total;
      } else if (type === "doctors") {
        state.doctors = users;
        state.totalDoctors = total;
      } else if (type === "receptionists") {
        state.receptionists = users;
        state.totalReceptionists = total;
      }

      state.totalPages = totalPages;
      state.currentPage = currentPage;
      state.limit = limit;
    },
    fetchUserDetailsSuccess: (state, action) => {
      state.loading = false;
      const { type, userData } = action.payload;
      state.userDetails = userData;

      // Update relevant list with only the current user if needed
      if (type === "patients") {
        const existing = state.patients.find((u) => u.id === userData.id);
        if (!existing) state.patients.push(userData);
      } else if (type === "doctors") {
        const existing = state.doctors.find((u) => u.id === userData.id);
        if (!existing) state.doctors.push(userData);
      } else if (type === "receptionists") {
        const existing = state.receptionists.find((u) => u.id === userData.id);
        if (!existing) state.receptionists.push(userData);
      }
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      const { type, data } = action.payload;

      if (type === "doctor") {
        state.doctors.push(data);
        state.totalDoctors += 1;
      } else if (type === "patient") {
        state.patients.push(data);
        state.totalPatients += 1;
      } else if (type === "receptionist") {
        state.receptionists.push(data);
        state.totalReceptionists += 1;
      }

      state.totalPages = Math.ceil(
        (type === "doctor"
          ? state.totalDoctors
          : type === "patient"
          ? state.totalPatients
          : state.totalReceptionists) / state.limit
      );
      state.success = true;
    },
    fetchRolesSuccess: (state, action) => {
      state.loading = false;
      state.roles = action.payload;
    },
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    createPatientQueryStart(state) {
      state.loadingPatientQuery = true;
      state.patientQueryError = null;
    },
    createPatientQuerySuccess(state, action) {
      state.loadingPatientQuery = false;
      state.patientQueries.push(action.payload);
    },
    createPatientQueryFail(state, action) {
      state.loadingPatientQuery = false;
      state.patientQueryError = action.payload;
    },
    resetCreateQueryStatusAction(state) {
      state.loadingPatientQuery = false;
      state.patientQueryError = null;
    },
    fetchPatientQueriesSuccess(state, action) {
      state.patientQueries = action.payload;
      state.patientQueryError = null;
    },
    fetchDoctorPatientsSuccess: (state, action) => {
      state.loading = false;
      state.doctorPatients = action.payload;
    },
  },
});

export const {
  loginStart,
  loginFail,
  loginSuccess,
  logoutUser,
  fetchUsersSuccess,
  fetchRolesSuccess,
  createUserSuccess,
  createPatientQueryStart,
  createPatientQuerySuccess,
  createPatientQueryFail,
  resetCreateQueryStatusAction,
  fetchPatientQueriesSuccess,
  resetUserState,
  fetchUserDetailsSuccess,
  fetchDoctorPatientsSuccess,
} = userSlice.actions;

export default userSlice.reducer;
