import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorPatients } from "../redux/actions/userActions";
import CustomFormItem from "../components/CustomFormItem";
import CustomButton from "../components/CustomButton";
import TopBar from "../components/TopBar";

const DoctorAccount = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { patients, loading } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("patients");

  useEffect(() => {
    if (userInfo?.user?.doctorId) {
      dispatch(getDoctorPatients(userInfo.user.doctorId));
    }
  }, [dispatch, userInfo]);

  const totalPatients = useMemo(() => patients?.length || 0, [patients]);

  const handleUpdateTreatment = (treatmentId, updatedPlan) => {
    // dispatch(updateTreatmentPlan(treatmentId, updatedPlan));
    console.log("Update Treatment", { treatmentId, updatedPlan });
  };

  const handleRespondToQuery = (queryId, response) => {
    // dispatch(respondToQuery(queryId, response));
    console.log("Respond to Query", { queryId, response });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Doctor Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white shadow-md rounded-lg p-4 text-center border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-600">Total Patients</h3>
            <p className="text-2xl font-bold text-blue-600">{totalPatients}</p>
          </div>
        </div>

        <div className="flex border-b border-gray-200 my-6">
          {['patients', 'queries'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize ${
                activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
              }`}
            >
              {tab === 'patients' ? 'Patient Records' : 'Patient Queries'}
            </button>
          ))}
        </div>

        {activeTab === "patients" && (
          <div className="space-y-6">
            {patients?.map((patient) => (
              <div key={patient.id} className="bg-white shadow rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-800">{patient.fullName}</h2>
                <p className="text-sm text-gray-600">ID: {patient.nationalIdNo}</p>

                {patient.hospitalVisits?.map((visit) => (
                  <div key={visit.id} className="mt-4 border p-3 rounded">
                    <p className="font-medium text-gray-700">Visit Reason: {visit.reason}</p>
                    <p className="text-sm text-gray-500 mb-2">Date: {new Date(visit.visitDate).toLocaleDateString()}</p>

                    {visit.treatmentRecords?.map((record) => (
                      <div key={record.id} className="bg-gray-50 border p-3 rounded mb-2">
                        <p><strong>Status:</strong> {record.status}</p>
                        <label className="block text-sm font-medium text-gray-600">Treatment Plan</label>
                        <textarea
                          defaultValue={record.treatmentPlan}
                          onBlur={(e) => handleUpdateTreatment(record.id, e.target.value)}
                          className="w-full border rounded mt-1 px-2 py-1 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === "queries" && (
          <div className="space-y-6">
            {patients?.flatMap((p) => p.queries || []).map((query) => (
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
                    onBlur={(e) => handleRespondToQuery(query.id, e.target.value)}
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
