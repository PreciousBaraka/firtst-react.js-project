import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getUserDetails,
  fetchPatientQueries,
} from "../redux/actions/userActions";
import CustomFormItem from "../components/CustomFormItem";
import TopBar from "../components/TopBar";

const PatientDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetails, loading } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails("patients", id));
      dispatch(fetchPatientQueries(id));
    }
  }, [dispatch, id]);

  const totalTreatments = useMemo(() => {
    if (!userDetails?.hospitalVisits) return 0;
    return userDetails.hospitalVisits.reduce(
      (sum, v) => sum + (v.treatmentRecords?.length || 0),
      0
    );
  }, [userDetails]);

  if (loading || !userDetails)
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex flex-col">
        <TopBar />
        <div className="flex-grow flex items-center justify-center text-indigo-700 text-xl font-semibold tracking-wide">
          Loading patient details...
        </div>
      </div>
    );

  const { user, nationalIdNo, hospitalVisits } = userDetails;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <TopBar />

      <main className="max-w-5xl mx-auto p-6 sm:p-10">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-8 border-b border-indigo-300 pb-3">
          Your Details
        </h1>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center border border-indigo-200 hover:shadow-indigo-400 transition-shadow">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              Total Visits
            </h3>
            <p className="text-4xl font-extrabold text-indigo-700">
              {hospitalVisits?.length || 0}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center border border-green-200 hover:shadow-green-400 transition-shadow">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Total Treatments
            </h3>
            <p className="text-4xl font-extrabold text-green-700">
              {totalTreatments}
            </p>
          </div>
        </section>

        {/* Tabs */}
        <nav className="flex border-b border-gray-300 mb-8 space-x-8">
          {[
            { key: "profile", label: "Personal Information" },
            { key: "visits", label: "Treatment History" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative pb-2 font-semibold text-lg transition-colors ${
                activeTab === key
                  ? "text-indigo-700 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-indigo-600 after:rounded"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <section className="bg-white shadow-md rounded-xl p-8 space-y-5">
            <CustomFormItem label="Full Name" value={user?.fullName} readOnly />
            <CustomFormItem label="Email" value={user?.email} readOnly />
            <CustomFormItem
              label="Phone Number"
              value={user?.phoneNumber}
              readOnly
            />
            <CustomFormItem label="National ID" value={nationalIdNo} readOnly />
          </section>
        )}

        {activeTab === "visits" && (
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 border-b border-indigo-300 pb-2">
              Treatment History
            </h2>
            {hospitalVisits?.length === 0 ? (
              <p className="text-gray-500 italic text-center">
                No hospital visits found.
              </p>
            ) : (
              <ul className="space-y-6">
                {hospitalVisits.map((visit) => (
                  <li
                    key={visit.id}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xl font-semibold text-gray-800">
                        Reason: {visit.reason}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(visit.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {visit.treatmentRecord ? (
                      <>
                        <div className="bg-indigo-50 p-4 rounded-md mb-4">
                          <h6 className="text-indigo-600 font-semibold mb-1">
                            Symptoms
                          </h6>
                          <p className="text-gray-700">
                            {visit.treatmentRecord?.symptoms || "N/A"}
                          </p>
                        </div>

                        <div className="bg-indigo-100 p-4 rounded-md mb-4">
                          <h6 className="text-indigo-600 font-semibold mb-1">
                            Diagnosis & Treatment Plan
                          </h6>
                          <p className="text-gray-700">
                            {visit.treatmentRecord?.treatmentPlan || "N/A"}
                          </p>
                        </div>

                        <Link
                          to={`/treatment-records/${visit.treatmentRecord.id}`}
                          className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
                        >
                          View Treatment Details
                        </Link>
                      </>
                    ) : (
                      <p className="italic text-gray-400">
                        No treatment record for this visit.
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default PatientDetails;
