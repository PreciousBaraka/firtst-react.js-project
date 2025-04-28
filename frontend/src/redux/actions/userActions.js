import { api } from "../../services/api";
import {
  loginFail,
  loginStart,
  loginSuccess,
  createUserSuccess,
  fetchRolesSuccess,
  fetchUsersSuccess,
} from "../slices/userSlices";

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

export const listUsers =
  (type, search = "", page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch(loginStart());

      if (type === "patients") {
        const { data } = await api.get(
          `/patients?search=${search}&page=${page}&limit=${limit}`
        );
        dispatch(fetchUsersSuccess({ type, userData: data }));
      } else if (type === "doctors") {
        const { data } = await api.get(
          `/doctors?search=${search}&page=${page}&limit=${limit}`
        );
        dispatch(fetchUsersSuccess({ type, userData: data }));
      } else if (type === "receptionists") {
        const { data } = await api.get(
          `/receptionists?search=${search}&page=${page}&limit=${limit}`
        );
        dispatch(fetchUsersSuccess({ type, userData: data }));
      }
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
    console.log("Created user: ", data);
    dispatch(createUserSuccess({ type, data }));
  } catch (error) {
    console.log("creating user: ", error);
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch(loginFail(errorMessage));
  }
};

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
