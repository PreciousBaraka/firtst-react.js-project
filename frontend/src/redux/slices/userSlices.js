import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("Post Operative Assistance-user")
  ? JSON.parse(localStorage.getItem("Post Operative Assistance-user"))
  : null;
const initialState = {
  userInfo: savedUser,
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
      const { type, userData } = action.payload; // Expecting type and users in payload
      if (type === "patients") {
        state.patients = userData || [];
        state.totalPatients = userData.total || 0;
        state.totalPages = userData.totalPages || 0;
        state.currentPage = userData.currentPage || 1;
        state.limit = userData.limit || 10;
      } else if (type === "doctors") {
        state.doctors = userData || [];
        state.totalDoctors = userData.total || 0;
        state.totalPages = userData.totalPages || 0;
        state.currentPage = userData.currentPage || 1;
        state.limit = userData.limit || 10;
      } else if (type === "receptionists") {
        state.receptionists = userData || [];
        state.totalReceptionists = userData.total || 0;
        state.totalPages = userData.totalPages || 0;
        state.currentPage = userData.currentPage || 1;
        state.limit = userData.limit || 10;
      }
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      const { type, data } = action.payload;
      if (type === "doctor") {
        state.doctors = [...state.doctors, data];
        state.totalDoctors += 1;
        state.totalPages = Math.ceil(state.totalDoctors / state.limit);
        state.success = true;
      } else if (type === "patient") {
        state.loading = false;
        state.patients = [...state.patients, data];
        state.totalPatients += 1;
        state.totalPages = Math.ceil(state.totalPatients / state.limit);
        state.success = true;
      } else if (type === "receptionist") {
        state.loading = false;
        state.receptionists = [...state.receptionists, data];
        state.totalReceptionists += 1;
        state.totalPages = Math.ceil(state.totalReceptionists / state.limit);
        state.success = true;
      }
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
  },
});

export const {
  loginStart,
  loginFail,
  loginSuccess,
  logoutUser,
  fetchUsersSuccess,
  fetchRolesSuccess,
  createReceptionistSuccess,
  createUserSuccess,
  createPatientSuccess,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
