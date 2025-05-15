import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserDetails } from "../redux/actions/userActions";
import { User } from "lucide-react";

const PatientDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userDetails: patientDetails,
    loading,
    error,
  } = useSelector((state) => state.user);

  console.log(patientDetails);
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

  useEffect(() => {
    if (!loading && !patientDetails && !error) {
      toast.error("Patient not found.");
      navigate("/patients");
    }
  }, [patientDetails, loading, error, navigate]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-gray-600">{error}</p>;
  if (!patientDetails)
    return <p className="text-center text-gray-500">No patient data found.</p>;

  const {
    user = {},
    address,
    dateOfBirth,
    createdAt,
    hospitalVisits = [],
  } = patientDetails || {};

  const { fullName, email, phoneNumber } = user;

  // Computing totals
  const totalHospitalVisits = hospitalVisits.length;
  const totalTreatmentRecords = hospitalVisits.filter(
    (visit) => visit.treatmentRecord
  ).length;

  return (
    <section className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Patient Details</h2>

      {/* User Info */}
      <div className="items-center justify-center border border-gray-300 p-4 rounded-md mb-4">
        <div className="flex flex-col space-x-2 items-center">
          <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mb-2 ">
            <User size={24} />
          </div>
          <div className='flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 my-1'>
            <p className='text-gray-600 text-sm'>
              <strong>Name:</strong> {fullName}
            </p>
            <p className='text-gray-600 text-sm'>
              <strong>Email:</strong> {email}
            </p>
            <p className='text-gray-600 text-sm'>
              <strong>Phone:</strong> {phoneNumber}
            </p>
            <p className='text-gray-600 text-sm'>
              <strong>Address:</strong> {address || "N/A"}
            </p>
          </div>
          <div>
            <p>
            <strong>Age:</strong>{" "}
            {dateOfBirth
              ? moment().diff(moment(dateOfBirth), "years") + " years"
              : "N/A"}
          </p>
          <span className='bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-full'>
            <strong>Joined:</strong>{" "}
            {createdAt ? moment(createdAt).format("MMMM Do YYYY, h:mm:ss a") : "N/A"}
          </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 rounded-md">
          <h4 className="font-semibold text-sm text-blue-600">
            Total Hospital Visits
          </h4>
          <p className="text-2xl font-bold text-blue-800">
            {totalHospitalVisits}
          </p>
        </div>
        <div className="p-4 bg-green-100 rounded-md">
          <h4 className="font-semibold text-sm text-green-600">
            Total Treatment Records
          </h4>
          <p className="text-2xl font-bold text-green-800">
            {totalTreatmentRecords}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PatientDetails;
