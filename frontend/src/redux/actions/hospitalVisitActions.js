import { api } from "../../services/api";

import {
  listHospitalVisitsRequest,
  listHospitalVisitsSuccess,
  listHospitalVisitsFail,
  createHospitalVisitRequest,
  createHospitalVisitSuccess,
  createHospitalVisitFail,
} from "../slices/hospitalVisitSlice";

// List all hospital visits
export const listHospitalVisits = () => async (dispatch) => {
  try {
    dispatch(listHospitalVisitsRequest());

    const { data } = await api.get("/hospital-visits");
    
    dispatch(listHospitalVisitsSuccess(data));
  } catch (error) {
    dispatch(
      listHospitalVisitsFail(error.response?.data?.message || error.message)
    );
  }
};

// Create a new hospital visit
export const createHospitalVisit = (visitData) => async (dispatch) => {
  try {
    dispatch(createHospitalVisitRequest());

    await api.post(
      `/hospital-visits/create?patientId=${visitData.patientId}&receptionistId=${visitData.receptionistId}`,
      {
        reason:visitData.reason,
        visitDate:visitData.visitDate
      }
    );

    dispatch(createHospitalVisitSuccess());
  } catch (error) {
    dispatch(
      createHospitalVisitFail(error.response?.data?.message || error.message)
    );
  }
};

