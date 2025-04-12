import React from "react";
import userImage from '../assets/user.jpg'

const PatientDashboard = () => {
  const patient = {
    username: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0712345678",
    records: [
      {
        id: 1,
        date: "12-02-2025 1200 Hrs",
        diagnosis: "Flu",
        prescription: "Paracetamol",
      },
      {
        id: 2,
        date: "13-02-2025 1300 Hrs",
        diagnosis: "Headache",
        prescription: "Ibuprofen",
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Patient Dashboard</h1>

      {/* Profile Section */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Profile</h2>
        <div className="space-y-1">
          <span className="text-gray-600">style={{ userImage: `url(${userImage})` }}
          </span>
          <p className="text-gray-600">
            <span className="font-medium">Username: </span> {patient.username}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Email: </span> {patient.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Phone: </span> {patient.phone}
          </p>
        </div>
      </div>

      {/* Records Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Patient Records
        </h2>
        <ul className="space-y-4">
          {patient.records.map((record) => (
            <li key={record.id} className="p-4 bg-gray-100 rounded-md">
              <p className="text-gray-600">
                <span className="font-medium">Date: </span> {record.date}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Diagnosis: </span> {record.diagnosis}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Prescription: </span> {record.prescription}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientDashboard;
