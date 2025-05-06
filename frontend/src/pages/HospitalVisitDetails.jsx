import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toCapitalize } from "../lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTreatmentRecord,
  getHospitalVisitDetails,
  updateTreatmentRecord,
} from "../redux/actions/hospitalVisitActions";
import { User } from "lucide-react";
import { toast } from "react-toastify";

const HospitalVisitDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { hospitalVisitDetails, loading, error, success } = useSelector(
    (state) => state.hospitalVisit
  );

  const { userInfo } = useSelector((state) => state.user);

  const [symptoms, setSymptoms] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [showTreatmentForm, setShowTreatmentForm] = useState(false);

  console.log(hospitalVisitDetails);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symptoms) {
      toast.error("Please describe the symptoms");
      return;
    }

    if (!treatmentPlan) {
      toast.error("Please describe the diagnosis results");
      return;
    }

    if (id && userInfo?.user?.doctorId) {
      if (hospitalVisitDetails?.treatmentRecord) {
        // Update existing treatment record
        dispatch(
          updateTreatmentRecord(hospitalVisitDetails.treatmentRecord.id, {
            symptoms,
            treatmentPlan,
          })
        );
      } else {
        dispatch(
          createTreatmentRecord(id, userInfo.user.doctorId, {
            symptoms,
            treatmentPlan,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getHospitalVisitDetails(id));
    }
  }, [dispatch, id, success ]);

  useEffect(() => {
    if (success) {
      toast.success("Treatment Record Created Successfully");
      setSymptoms("");
      setTreatmentPlan("");
      setShowTreatmentForm(false);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  useEffect(() => {
    if (hospitalVisitDetails?.treatmentRecord) {
      setSymptoms(hospitalVisitDetails.treatmentRecord.symptoms);
      setTreatmentPlan(hospitalVisitDetails.treatmentRecord.treatmentPlan);
    }
  }, [hospitalVisitDetails]);

  useEffect(() => {
    if (userInfo && userInfo.user.role !== "DOCTOR") {
      toast.error("You are not authorized to view this page");
      navigate("/hospital-visits");
    }
  }, [navigate, userInfo]);

  if (!hospitalVisitDetails) {
    return <p className='text-red-500'>No hospital Visit Details Found</p>;
  }

  return (
    <section className='bg-white rounded-md shadow-sm p-4'>
      <h3 className='font-semibold uppercase text-sm text-blue-300 mb-4'>
        Hospital Visit Details
      </h3>

      {/* Patient Details */}
      <div className='items-center justify-center border border-gray-300 rounded-md p-4'>
        <div className='flex flex-col space-x-2 items-center'>
          <div className='w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2 '>
            <User size={24} />
          </div>
          <h5 className='font-semibold text-gray-600'>
            {toCapitalize(
              hospitalVisitDetails?.patient?.user?.fullName || "No Name"
            )}
          </h5>
          <div className='flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 my-1'>
            <p className='text-gray-600 text-sm'>
              {hospitalVisitDetails?.patient?.user?.email}
            </p>
            <p className='text-gray-600 text-sm'>
              {hospitalVisitDetails?.patient?.user?.phoneNumber}
            </p>
            <p className='text-gray-600 text-sm'>
              {hospitalVisitDetails?.patient?.address}
            </p>
          </div>
          <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2'>
            <p className='text-gray-600 text-sm'>
              Age:{" "}
              {hospitalVisitDetails?.patient?.dateOfBirth
                ? `${moment().diff(
                    moment(hospitalVisitDetails?.patient?.dateOfBirth),
                    "years"
                  )} years`
                : "N/A"}
            </p>
            <span className='bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-full'>
              Joined{" "}
              {moment(hospitalVisitDetails?.patient?.createdAt).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Hospital Visit Summary */}
      <div className='my-3'>
        <div className='flex justify-between items-center mb-4'>
          <h6 className='text-sm uppercase text-gray-600 my-auto font-semibold'>
            Treatment Details
          </h6>
          {hospitalVisitDetails?.treatmentRecord && !showTreatmentForm && (
            <button
              className='bg-blue-500 text-white px-2 py-1 rounded-md'
              onClick={() => setShowTreatmentForm(true)}>
              Edit Treatment Record
            </button>
          )}
        </div>
        {hospitalVisitDetails?.treatmentRecord ? (
          <div className='flex flex-col space-y-2'>
            <h6 className='text-gray-600 my-1 uppercase text-sm'>Symptoms</h6>
            <p className='text-gray-500 text-sm'>
              {hospitalVisitDetails?.treatmentRecord?.symptoms}
            </p>
            <h6 className='text-gray-600 my-1 uppercase text-sm'>
              Diagnosis Results
            </h6>
            <p className='text-gray-500 text-sm'>
              {hospitalVisitDetails?.treatmentRecord?.treatmentPlan}
            </p>
          </div>
        ) : (
          <div className='flex flex-col py-10 items-center'>
            <h5 className='text-gray-500 text-sm font-semibold'>
              No Treatment Record Found
            </h5>
            <p className='text-gray-400 text-xs'>
              Add a treatment record to this hospital visit.
            </p>
            <p className='text-gray-400 text-xs'>
              This will help in tracking the patient's treatment history.
            </p>
            <button className='bg-blue-500 text-white px-2 py-1 rounded-full mt-4'>
              Add New Treatment Record
            </button>
          </div>
        )}
        {showTreatmentForm && (
          <form className='w-full mt-4' onSubmit={handleSubmit}>
            <h6 className='text-gray-600 my-1 uppercase text-sm'>
              New Treatment Record
            </h6>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='symptoms' className='text-gray-600'>
                Symptoms
              </label>
              <textarea
                id='symptoms'
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows='5'
                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Describe the symptoms here...'></textarea>
            </div>
            <div className='flex flex-col space-y-2 mt-4'>
              <label htmlFor='treatmentPlan' className='text-gray-600'>
                Diagnosis Results
              </label>
              <textarea
                id='treatmentPlan'
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
                rows='5'
                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Describe diagnosis results'></textarea>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4'>
              Submit
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default HospitalVisitDetails;
