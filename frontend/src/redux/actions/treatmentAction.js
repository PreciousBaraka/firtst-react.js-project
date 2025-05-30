import { api } from "../../services/api";

import{
    listTreatmentRecordSuccess,
    listTreatmentRecordRequest,
    listTreatmentRecordFail,
} from "../slices/treatmentSlice"


export const getTreatmentRecordById = (id) => async (dispatch) => {
  try {
    dispatch(listTreatmentRecordRequest());

    const { data } = await api.get(`/treatment-records/${id}`);

    dispatch(listTreatmentRecordSuccess(data));
  } catch (error) {
    dispatch(
      listTreatmentRecordFail(
        error.response?.data?.message || error.message || "Something went wrong"
      )
    );
  }
};

export const createTreatmentRecord = (treatmentData) => async (dispatch) => {
  try {
    dispatch(listTreatmentRecordRequest());

    const { data } = await api.post("/treatment-records/create", treatmentData);

    dispatch(listTreatmentRecordSuccess(data));
  } catch (error) {
    dispatch(
      listTreatmentRecordFail(
        error.response?.data?.message || error.message || "Something went wrong"
      )
    );
  }
};

