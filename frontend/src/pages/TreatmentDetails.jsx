import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { getTreatmentRecordById } from "../redux/actions/treatmentAction";

const TreatmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { treatmentRecord, loading, error } = useSelector(
    (state) => state.treatment
  );

  useEffect(() => {
    if (id) {
      dispatch(getTreatmentRecordById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!treatmentRecord)
    return (
      <p className="text-center text-gray-400">No treatment data found.</p>
    );

  const {
    id: treatmentId,
    treatmentPlan,
    vitals,
    status,
    createdAt,
    updatedAt,
    doctor,
    patient,
  } = treatmentRecord;

  return (
    <section className="p-6 bg-white rounded-md shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Treatment Record Details</h2>

      <div className="space-y-2">
        <p>
          <strong>Treatment ID:</strong> {treatmentId}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {moment(createdAt).format("MMMM Do YYYY, h:mm a")}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {moment(updatedAt).format("MMMM Do YYYY, h:mm a")}
        </p>

        {doctor && (
          <p>
            <strong>Doctor:</strong> {doctor.user?.fullName || "N/A"}
          </p>
        )}

        {patient && (
          <p>
            <strong>Patient:</strong> {patient.user?.fullName || "N/A"}
          </p>
        )}

        <div>
          <h4 className="font-semibold mt-4">Vitals</h4>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
            {vitals ? JSON.stringify(vitals, null, 2) : "No vitals recorded"}
          </pre>
        </div>

        <div>
          <h4 className="font-semibold mt-4">Treatment Plan</h4>
          <p className="bg-gray-50 p-3 rounded text-sm">
            {treatmentPlan || "No treatment plan available"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Back
        </button>
      </div>
    </section>
  );
};

export default TreatmentDetails;
