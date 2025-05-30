import { api } from "../../services/api";
import {
  loginFail,
  loginStart,
  loginSuccess,
  createUserSuccess,
  fetchRolesSuccess,
  fetchUsersSuccess,
  fetchUserDetailsSuccess,
  createPatientQueryStart,
  createPatientQuerySuccess,
  createPatientQueryFail,
  fetchPatientQueriesSuccess,
  fetchDoctorPatientsSuccess,
  resetCreateQueryStatusAction,
  fetchStatsSuccess, // << Used to reset query status
} from "../slices/userSlices";

//AUTH 

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { data } = await api.post("/users/login", userData);

    localStorage.setItem(
      "Post Operative Assistance-user",
      JSON.stringify(data)
    );

    dispatch(loginSuccess(data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(loginFail(errorMessage));
  }
};

// -------------------- USERS --------------------

export const listUsers =
  (type, search = "", page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch(loginStart());

      const url = `/${type}?search=${search}&page=${page}&limit=${limit}`;
      const { data } = await api.get(url);

      console.log("Fetched users:", data);

      dispatch(fetchUsersSuccess({ type, userData: data }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch(loginFail(errorMessage));
    }
  };

export const getUserDetails =
  (type, patientId, doctorId, receptionistId) => async (dispatch) => {
    try {
      dispatch(loginStart());

      let url = "";
      if (type === "patients") url = `/patients/${patientId}`;
      else if (type === "doctors") url = `/doctors/${doctorId}`;
      else if (type === "receptionists")
        url = `/receptionists/${receptionistId}`;

      const { data } = await api.get(url);
      dispatch(fetchUserDetailsSuccess({ type, userData: data }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch(loginFail(errorMessage));
    }
  };

export const createUser = (type, userData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { data } = await api.post(
      `/users/register?userType=${type}`,
      userData
    );
    dispatch(createUserSuccess({ type, data }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(loginFail(errorMessage));
  }
};

//ROLES 

export const listRoles = () => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { data } = await api.get("/roles");
    dispatch(fetchRolesSuccess(data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(loginFail(errorMessage));
  }
};

//  PATIENT QUERIES 

export const createPatientQuery = (queryData) => async (dispatch) => {
  try {
    dispatch(createPatientQueryStart());
    const { data } = await api.post("/treatment-records/create-query", queryData);
    dispatch(createPatientQuerySuccess(data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(createPatientQueryFail(errorMessage));
  }
};

export const createPatientQueryResponse = (queryData) => async (dispatch) => {
  try {
    dispatch(createPatientQueryStart());
    const { data } = await api.post(
      "/treatment-records/reply-query",
      queryData
    );
    dispatch(createPatientQuerySuccess(data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(createPatientQueryFail(errorMessage));
  }
};

export const fetchPatientQueries = (patientId) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { data } = await api.get(`/patient-queries/patient/${patientId}`);
    dispatch(fetchPatientQueriesSuccess(data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(loginFail(errorMessage));
  }
};

export const resetCreateQueryStatus = () => (dispatch) => {
  dispatch(resetCreateQueryStatusAction());
};

//DOCTOR

export const getDoctorPatients = (doctorId) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { data } = await api.get(`/doctors/${doctorId}/patients`);
    dispatch(fetchDoctorPatientsSuccess(data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(loginFail(errorMessage));
  }
};

export const getStats = () => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { data } = await api.get(`/users/stats`);
    dispatch(fetchStatsSuccess(data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(loginFail(errorMessage));
  }
};
