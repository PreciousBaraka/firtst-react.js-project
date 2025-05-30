import React, { useEffect } from "react"; 
import { useParams, useNavigate, Link } from "react-router-dom";
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

  // useEffect(() => {
  //   if (!loading && !patientDetails && !error) {
  //     toast.error("Patient not found.");
  //     navigate("/patients");
  //   }
  // }, [patientDetails, loading, error, navigate]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-gray-600">{error}</p>;
  if (!patientDetails)
    return <p className="text-center text-gray-500">No patient data found.</p>;

  const {
    user = {},
    address,
    dateOfBirth,
    createdAt,
    hospitalVisits,
  } = patientDetails || {};

  const { fullName, email, phoneNumber } = user;

  const totalHospitalVisits = hospitalVisits.length;
  const totalTreatmentRecords = hospitalVisits.length;  // fixed typo from 'lengt'

  return (
    <section className='p-4 bg-white rounded shadow'>
      <h2 className='text-xl font-bold mb-4'>Patient Details</h2>

      {/* Patient Info */}
      <div className='items-center justify-center border border-gray-300 p-4 rounded-md mb-4'>
        <div className='flex flex-col space-x-2 items-center'>
          <div className='w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mb-2'>
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
              {createdAt
                ? moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")
                : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Calculated fields */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='p-4 bg-blue-100 rounded-md'>
          <h4 className='font-semibold text-sm text-blue-600'>
            Total Hospital Visits
          </h4>
          <p className='text-2xl font-bold text-blue-800'>
            {totalHospitalVisits}
          </p>
        </div>
        <div className='p-4 bg-green-100 rounded-md'>
          <h4 className='font-semibold text-sm text-green-600'>
            Total Treatment Records
          </h4>
          <p className='text-2xl font-bold text-green-800'>
            {totalTreatmentRecords}
          </p>
        </div>
      </div>

      {/* Hospital Visits Section */}
      <div className='mt-8'>
        <h3 className='text-lg font-semibold mb-3'>Patient Treatments</h3>

        {hospitalVisits?.length === 0 ? (
          <p className='text-gray-600'>No hospital visits found.</p>
        ) : (
          <ul className='space-y-4'>
            {hospitalVisits.map((visit) => (
              <li
                key={visit.id}
                className='bg-gray-50 p-4 rounded-lg shadow-sm'>
                <p className='font-medium text-gray-800'>
                  Reason: {visit.reason}
                </p>
                <p className='text-sm text-gray-600 mb-2'>
                  Date Admitted: {new Date(visit.createdAt).toLocaleDateString()}
                </p>
                {visit.treatmentRecord && (
                  <>
                    <div className='bg-slate-100 w-full p-2 rounded mt-2'>
                      <h6 className='text-lg mb-2 text-blue-500'>Symptoms:</h6>{" "}
                      <p className='text-sm text-gray-600'>
                        {visit.treatmentRecord?.symptoms || "N/A"}
                      </p>
                    </div>
                    <div className='bg-blue-100 w-full p-2 rounded mt-2'>
                      <h6 className='text-lg mb-2 text-blue-500'>
                        Diagnosis Results:
                      </h6>{" "}
                      <p className='text-sm text-gray-600'>
                        {visit.treatmentRecord?.treatmentPlan || "N/A"}
                      </p>
                    </div>
                    <div className='mt-3'>
                      <Link
                        to={`/treatment-records/${visit.treatmentRecord.id}`}
                        className='inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
                        View Treatment
                      </Link>
                    </div>
                  </>
                )}
                {/* {visit.treatmentRecords?.length ? (
                      <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
                        {visit.treatmentRecords.map((tr) => (
                          <li key={tr.id}>
                            Plan: {tr.treatmentPlan} — Status:{" "}
                            <span className="font-medium">{tr.status}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-400">No treatments recorded for this visit.</p>
                    )} */}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Treatment Records Section */}
      {hospitalVisits.filter((v) => v.treatmentRecord).length > 0 && (
        <div className='mt-8'>
          <h3 className='text-lg font-semibold mb-3'>Treatment Records</h3>
          <ul className='space-y-3'>
            {hospitalVisits
              .filter((v) => v.treatmentRecord)
              .map((visit) => (
                <li
                  key={visit.treatmentRecord.id}
                  className='bg-white p-3 shadow rounded flex flex-col md:flex-row md:items-center justify-between'>
                  <div>
                    {/* Removed Treatment ID display */}
                    <p className='text-sm text-gray-600'>
                      <strong>Visit Date:</strong>{" "}
                      {moment(visit.visitDate).format("MMM Do YYYY")}
                    </p>
                  </div>

                  <div className='flex gap-2 mt-2 md:mt-0'>
                    <button
                      onClick={() =>
                        navigate(
                          `/treatment-records/${visit.treatmentRecord.id}`
                        )
                      }
                      className='bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700'>
                      View Treatment
                    </button>
                    <button
                      onClick={() =>
                        navigate(
                          `/treatment-records/${visit.treatmentRecord.id}/follow-up`
                        )
                      }
                      className='bg-purple-600 text-white px-3 py-1 text-sm rounded hover:bg-purple-700'>
                      Follow Up Logs
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default PatientDetails;
