import { api } from "../../services/api";

import {
  listHospitalVisitsRequest,
  listHospitalVisitsSuccess,
  listHospitalVisitsFail,
  createHospitalVisitRequest,
  createHospitalVisitSuccess,
  createHospitalVisitFail,
  getHospitalVisitDetailsSuccess,
  createTreatmentRecordSuccess,
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

export const getHospitalVisitDetails = (hospitalVisitId) => async (dispatch) => {
  try {
    dispatch(listHospitalVisitsRequest());

    const { data } = await api.get(`/hospital-visits/${hospitalVisitId}`);

    console.log(data);

    dispatch(getHospitalVisitDetailsSuccess(data));
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
      }
    );

    dispatch(createHospitalVisitSuccess());
  } catch (error) {
    dispatch(
      createHospitalVisitFail(error.response?.data?.message || error.message)
    );
  }
};


// Create a new treatment record
export const createTreatmentRecord =
  (hospitalVisitId, doctorId, treatmentData) => async (dispatch) => {
    try {
      dispatch(listHospitalVisitsRequest());

      await api.post(`/treatment-records/create?hospitalVisitId=${hospitalVisitId}&doctorId=${doctorId}`, treatmentData);

      dispatch(createTreatmentRecordSuccess());

      const {data} = await api.get(`/hospital-visits/${hospitalVisitId}`)
      dispatch(getHospitalVisitDetailsSuccess(data))
    } catch (error) {
      console.log("error creating treatment record: ", error)
      dispatch(
        listHospitalVisitsFail(error.response?.data?.message || error.message)
      );
    }
  };

  export const updateTreatmentRecord =
    (recordId, treatmentData) => async (dispatch) => {
      try {
        dispatch(listHospitalVisitsRequest());

        await api.put(
          `/treatment-records/${recordId}/update`,
          treatmentData
        );

        dispatch(createTreatmentRecordSuccess());
      } catch (error) {
        dispatch(
          listHospitalVisitsFail(error.response?.data?.message || error.message)
        );
      }
    };