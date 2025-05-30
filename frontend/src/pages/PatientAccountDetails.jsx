import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getUserDetails,
  createPatientQuery,
  fetchPatientQueries,
} from "../redux/actions/userActions";
import CustomFormItem from "../components/CustomFormItem";
import CustomButton from "../components/CustomButton";
import TopBar from "../components/TopBar";

const PatientDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetails, loading, patientQueries } = useSelector(
    (state) => state.user
  );

  const [activeTab, setActiveTab] = useState("profile");
  const [queryTitle, setQueryTitle] = useState("");
  const [queryBody, setQueryBody] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails("patients", id));
      dispatch(fetchPatientQueries(id));
    }
  }, [dispatch, id]);

  console.log(userDetails?.hospitalVisits);

  const totalTreatments = useMemo(() => {
    if (!userDetails?.hospitalVisits) return 0;
    return userDetails.hospitalVisits.reduce(
      (sum, v) => sum + (v.treatmentRecords?.length || 0),
      0
    );
  }, [userDetails]);

  const handleSubmitQuery = async (e) => {
    e.preventDefault();
    if (!queryTitle.trim() || !queryBody.trim()) return;

    dispatch(
      createPatientQuery({
        title: queryTitle,
        description: queryBody,
        patientId: id,
      })
    );

    dispatch(fetchPatientQueries(id));

    setQueryTitle("");
    setQueryBody("");
  };

  if (loading || !userDetails)
    return (
      <div className="min-h-screen bg-gray-100">
        <TopBar />
        <div className="p-8 text-center">Loading...</div>
      </div>
    );

  const { user, nationalIdNo, hospitalVisits } = userDetails;

  return (
    <div className='min-h-screen bg-gray-100'>
      <TopBar />

      <div className='p-4 max-w-4xl mx-auto'>
        <h1 className='text-2xl font-semibold text-gray-700 mb-4'>
          My Details
        </h1>

        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6'>
          <div className='bg-white shadow-md rounded-lg p-4 text-center border border-gray-100'>
            <h3 className='text-lg font-semibold text-gray-600'>
              Total Visits
            </h3>
            <p className='text-2xl font-bold text-blue-600'>
              {hospitalVisits?.length || 0}
            </p>
          </div>

          <div className='bg-white shadow-md rounded-lg p-4 text-center border border-gray-100'>
            <h3 className='text-lg font-semibold text-gray-600'>
              Total Treatments
            </h3>
            <p className='text-2xl font-bold text-green-600'>
              {totalTreatments}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className='flex border-b border-gray-200 my-6'>
          {["profile", "visits", "newQuery", "queries"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}>
              {tab === "profile"
                ? "Personal Information"
                : tab === "visits"
                ? "Treatment History"
                : tab === "newQuery"
                ? "New Query"
                : "My Queries"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className='bg-white shadow-md rounded-lg p-4'>
            <CustomFormItem label='Full Name' value={user?.fullName} readOnly />
            <CustomFormItem label='Email' value={user?.email} readOnly />
            <CustomFormItem
              label='Phone Number'
              value={user?.phoneNumber}
              readOnly
            />
            <CustomFormItem label='National ID' value={nationalIdNo} readOnly />
          </div>
        )}

        {activeTab === "visits" && (
          <div>
            <h2 className='text-lg font-semibold mb-2'>
              Treatments
            </h2>
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
                      Date: {new Date(visit.createdAt).toLocaleDateString()}
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
                          <h6 className='text-lg mb-2 text-blue-500'>Diagnosis Results:</h6>{" "}
                          <p className='text-sm text-gray-600'>
                            {visit.treatmentRecord?.treatmentPlan || "N/A"}
                          </p>
                        </div>
                        <div className='mt-3'>
                          <Link
                            to={`/treatment-records/${visit.treatmentRecord.id}`}
                            className='inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
                          >
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
        )}

        {activeTab === "newQuery" && (
          <div className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-lg font-semibold mb-4'>Submit a New Query</h2>
            <form onSubmit={handleSubmitQuery} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Title
                </label>
                <input
                  type='text'
                  value={queryTitle}
                  onChange={(e) => setQueryTitle(e.target.value)}
                  className='w-full border rounded px-3 py-2'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Describe your issue
                </label>
                <textarea
                  value={queryBody}
                  onChange={(e) => setQueryBody(e.target.value)}
                  rows={4}
                  className='w-full border rounded px-3 py-2'
                  required
                />
              </div>

              <CustomButton type='submit' title='Submit Query' />
            </form>
          </div>
        )}

        {activeTab === "queries" && (
          <div className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-lg font-semibold mb-4'>
              My Queries & Doctor Responses
            </h2>
            {!patientQueries || patientQueries.length === 0 ? (
              <p className='text-gray-600'>No queries submitted.</p>
            ) : (
              <ul className='space-y-4'>
                {patientQueries.map((query) => (
                  <li
                    key={query.id}
                    className='border border-gray-200 p-4 rounded'>
                    <h3 className='font-semibold text-gray-700'>
                      {query.title}
                    </h3>
                    <p className='text-sm text-gray-600 mb-2'>
                      {query.description}
                    </p>

                    {query.doctorResponse ? (
                      <div className='bg-green-50 p-2 rounded border border-green-200'>
                        <p className='text-sm text-green-700 font-medium'>
                          Doctor's Response:
                        </p>
                        <p className='text-sm text-gray-700'>
                          {query.doctorResponse.response}
                        </p>
                      </div>
                    ) : (
                      <p className='text-sm text-yellow-600 italic'>
                        Awaiting doctor's response...
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
