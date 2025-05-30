import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorPatients } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";

const DoctorAccount = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { patients, loading } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("treatments");

  useEffect(() => {
    if (userInfo?.user?.doctorId) {
      dispatch(getDoctorPatients(userInfo.user.doctorId));
    }
  }, [dispatch, userInfo]);

  // Flatten all treatments from all patients' visits
  const allTreatments = useMemo(() => {
    if (!patients) return [];
    return patients.flatMap((patient) =>
      (patient.hospitalVisits || []).flatMap((visit) =>
        (visit.treatmentRecords || []).map((record) => ({
          ...record,
          patientName: patient.fullName,
          visitDate: visit.visitDate,
          reasonForTreatment: visit.reason,
          symptoms: visit.symptoms,
        }))
      )
    );
  }, [patients]);

  // Flatten all queries from all patients
  const allQueries = useMemo(() => {
    if (!patients) return [];
    return patients.flatMap((p) => p.queries || []);
  }, [patients]);

  const totalTreatments = allTreatments.length;
  const totalQueries = allQueries.length;

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Doctor Dashboard</h1>

        {/* Doctor Info Section */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center gap-6 border border-gray-100">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">Dr. {userInfo?.user?.fullName}</h2>
            <p className="text-sm text-gray-600">Email: {userInfo?.user?.email}</p>
            <p className="text-sm text-gray-600">Doctor ID: {userInfo?.user?.doctorId}</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-gray-500 text-sm">Treatments</div>
              <div className="text-xl font-bold text-blue-600">{totalTreatments}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-sm">Queries Raised</div>
              <div className="text-xl font-bold text-blue-600">{totalQueries}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 my-6">
          {['treatments', 'queries'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize ${
                activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
              }`}
            >
              {tab === 'treatments' ? 'Treatments' : 'Patient Queries'}
            </button>
          ))}
        </div>

        {/* Treatments List */}
        {activeTab === "treatments" && (
          <div className="space-y-4">
            {allTreatments.length === 0 && (
              <div className="text-gray-500 text-center">No treatments found.</div>
            )}
            {allTreatments.map((treatment) => (
              <div
                key={treatment.id}
                className="bg-white flex flex-col sm:flex-row items-center justify-between shadow rounded-lg p-4 border border-gray-100"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap gap-4 items-center mb-2">
                    <span className="font-semibold text-gray-800">{treatment.patientName}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(treatment.visitDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    <strong>Reason:</strong> {treatment.reasonForTreatment}
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    <strong>Symptoms:</strong> {treatment.symptoms || "N/A"}
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    <strong>Treatment Plan:</strong> {treatment.treatmentPlan}
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-6">
                  <Link
                    to={`/treatments/${treatment.id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Queries List */}
        {activeTab === "queries" && (
          <div className="space-y-6">
            {allQueries.length === 0 && (
              <div className="text-gray-500 text-center">No queries found.</div>
            )}
            {allQueries.map((query) => (
              <div key={query.id} className="bg-white border p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800">{query.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{query.description}</p>
                {query.doctorResponse ? (
                  <div className="bg-green-50 border border-green-200 p-2 rounded">
                    <p className="text-sm text-green-700 font-medium">Response:</p>
                    <p className="text-sm text-gray-700">{query.doctorResponse.response}</p>
                  </div>
                ) : (
                  <textarea
                    className="w-full border mt-2 p-2 rounded text-sm"
                    placeholder="Write your response..."
                    // onBlur={(e) => handleRespondToQuery(query.id, e.target.value)}
                    disabled
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAccount;
