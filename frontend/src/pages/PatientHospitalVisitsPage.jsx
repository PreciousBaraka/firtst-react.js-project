import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { getUserDetails } from "../redux/actions/userActions";

const PatientHospitalVisitsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { userDetails: patientDetails, loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails("patients", id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const hospitalVisits = patientDetails?.hospitalVisits || [];
  const fullName = patientDetails?.user?.fullName || "Patient";

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">{fullName}  </h2>
          <h2>Visit History</h2>
        </div>
        {/* Back button */}
        <button
          onClick={() => navigate(`/patients/${id}`)}
          className="text-sm px-4 py-2 bg-blue-200 text-gray-700 rounded hover:bg-blue-300"
        >
          Back to Patient Details
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading visits...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : hospitalVisits.length === 0 ? (
        <p className="text-center text-gray-500">No hospital visits found.</p>
      ) : (
        <div className="grid gap-4">
          {hospitalVisits.map((visit) => (
            <div
              key={visit.id}
              className="p-4 bg-white shadow border rounded-md"
            >
              <p className="text-sm text-gray-600">
                <strong>Visit Date:</strong>{" "}
                {moment(visit.visitDate).format("MMM Do YYYY")}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Reason:</strong> {visit.reason}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Doctor:</strong>{" "}
                {visit.doctor?.user?.fullName || "Not Assigned"}
              </p>
              {visit.treatmentRecord && (
                <p className="text-sm text-green-700 mt-1">
                  Available treatment Records
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PatientHospitalVisitsPage;
