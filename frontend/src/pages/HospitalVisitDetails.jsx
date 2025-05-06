import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { toCapitalize } from "../lib/utils";

const HospitalVisitDetails = () => {
  const { hospitalVisitDetails, loading, error, statusSuccess } = useSelector(
    (state) => state.hospitalVisit
  );

  if (!hospitalVisitDetails) {
    return <p className="text-red-500">No hospital Visit Details Found</p>;
  }
  return (
    <section className="bg-white rounded-md shadow-sm p-4">
      <h3 className="font-semibold uppercase text-sm text-blue-300 mb-4">
        Hospital Visit Details
      </h3>

      {/* Patient Details */}
      <div className="items-center justify-center">
        <div className="flex space-x-2 items-center">
          <h5 className="font-semibold text-gray-600">
            {toCapitalize(
              hospitalVisitDetails?.patient?.user?.fullName || "No Name"
            )}
          </h5>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <p className="text-gray-600 text-sm">
            {hospitalVisitDetails?.patient?.user?.phoneNumber}
          </p>
          <p className="text-gray-600 text-sm">
            {hospitalVisitDetails?.patient?.address}
          </p>
        </div>
        <span>
          Joined{" "}
          {moment(hospitalVisitDetails?.patient?.user?.createdAt).calendar()}
        </span>
      </div>

      {/* Hospital Visit Summary */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"></div>
      </div>
    </section>
  );
};

export default HospitalVisitDetails;
