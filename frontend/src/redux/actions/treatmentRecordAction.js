import { api } from "../../services/api";

import {
  listTreatmentRecordsRequest,
  listTreatmentRecordsSuccess,
  listTreatmentRecordsFail,
  createTreatmentRecordFail,
  createTreatmentRecordRequest,
  createTreatmentRecordSuccess,
} from "../slices/treatmentRecordSlice";

// List all treatment Records
export const listTreatmentRecords = () => async (dispatch) => {
  try {
    dispatch(listTreatmentRecordsRequest());

    const { data } = await api.get("/treatment-records");

    dispatch(listTreatmentRecordsSuccess(data));
  } catch (error) {
    dispatch(
      listTreatmentRecordsFail(error.response?.data?.message || error.message)
    );
  }
};

// Create a new treatment Record
export const createTreatmentRecord = (treatmentData) => async (dispatch) => {
  try {
    dispatch(createTreatmentRecordRequest());

    await api.post("api/treatment-records/create", {
      symptoms: treatmentData.symptoms,
      temperature: treatmentData.temperature,
      mobility: treatmentData.mobility,
      treatmentPlan: treatmentData.treatmentPlan,
      painLevel: treatmentData.painLevel,
      status: treatmentData.status,
      vitals:treatmentData.vitals
    });

    dispatch(createTreatmentRecordSuccess());
  } catch (error) {
    dispatch(
      createTreatmentRecordFail(error.response?.data?.message || error.message)
    );
  }
};
