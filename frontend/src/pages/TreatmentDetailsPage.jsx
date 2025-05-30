import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { getTreatmentRecordById } from "../redux/actions/treatmentAction";
import { toast } from "react-toastify";
import { createPatientQuery, createPatientQueryResponse } from "../redux/actions/userActions";

const TreatmentDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openedReply, setOpenedReply] = useState(null)

  const [responseMessage, setResponseMessage] = useState("");

  const { treatmentRecord } = useSelector((state) => state.treatment);

  const { createdQuery, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(getTreatmentRecordById(id));
    }
  }, [dispatch, id, createdQuery]);

  useEffect(() => {
    if (createdQuery) {
      toast.success("Query submitted successfully!");
      setTitle("");
      setDescription("");
      setResponseMessage("")
    }
  }, [createdQuery]);

  if (!treatmentRecord) {
    return (
      <div className='min-h-screen bg-gray-100'>
        <TopBar />
        <div className='p-4 max-w-4xl mx-auto'>
          <h1 className='text-2xl font-semibold text-gray-700 mb-4'>
            Treatment Details
          </h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const {
    id: treatmentId,
    hospitalVisitId,
    doctorId,
    treatmentPlan,
    symptoms,
    status,
    createdAt,
    updatedAt,
    doctor,
    hospitalVisit,
    treatmenQueries: treatmentQueries = [],
  } = treatmentRecord;

  console.log("Treatment Record:", treatmentRecord);

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    dispatch(
      createPatientQuery({
        title,
        description,
        treatmentRecordId: treatmentId,
      })
    );
  };

  const handleReplySubmit = (queryId) => {
    if (!responseMessage.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
   if (userInfo?.user?.doctorId) {
    dispatch(
      createPatientQueryResponse({
        response: responseMessage,
        treatmentQueryId: queryId,
        doctorId: userInfo?.user?.doctorId,
      })
    );
   }
  };

 

return (
  <div className='min-h-screen bg-gray-100'>
    <TopBar />
    <div className='p-4 max-w-4xl mx-auto'>
      <div className='bg-gray-50 p-6 rounded-lg shadow space-y-6'>
        <h2 className='text-lg font-semibold mb-2 text-blue-700'>
          Treatment Details
        </h2>
        <div>
          <span className='font-semibold text-gray-700'>Treatment ID:</span>{" "}
          <span className='text-gray-600'>{treatmentId}</span>
        </div>
        <div>
          <span className='font-semibold text-gray-700'>Status:</span>{" "}
          <span className='text-blue-600'>{status}</span>
        </div>
        <div className='bg-slate-100 w-full p-4 rounded mt-2'>
          <h6 className='text-lg mb-2 text-blue-500'>Symptoms:</h6>
          <p className='text-sm text-gray-600'>{symptoms || "N/A"}</p>
        </div>
        <div className='bg-blue-100 w-full p-4 rounded mt-2'>
          <h6 className='text-lg mb-2 text-blue-500'>Diagnosis Results:</h6>
          <p className='text-sm text-gray-600'>{treatmentPlan || "N/A"}</p>
        </div>
        <div>
          <span className='font-semibold text-gray-700'>Created At:</span>{" "}
          <span className='text-gray-600'>
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>
        <div>
          <span className='font-semibold text-gray-700'>Updated At:</span>{" "}
          <span className='text-gray-600'>
            {new Date(updatedAt).toLocaleString()}
          </span>
        </div>
        <div>
          <span className='font-semibold text-gray-700'>Doctor:</span>{" "}
          <span className='text-gray-800'>
            {doctor?.user?.fullName} ({doctor?.specialization})
          </span>
        </div>
        <div>
          <span className='font-semibold text-gray-700'>Doctor Email:</span>{" "}
          <span className='text-gray-600'>{doctor?.user?.email}</span>
        </div>
        <div>
          <span className='font-semibold text-gray-700'>
            Hospital Visit Reason:
          </span>{" "}
          <span className='text-gray-600'>{hospitalVisit?.reason}</span>
        </div>
      </div>

      {/* Queries Section */}
      <div className='bg-white mt-8 p-6 rounded-lg shadow space-y-6'>
        <h3 className='text-lg font-semibold text-blue-700 mb-4'>Queries</h3>
        <ul className='space-y-4'>
          {treatmentQueries.length > 0 ? (
            treatmentQueries.map((query) => (
              <li key={query.id} className='border-l-4 border-blue-300 pl-4'>
                <div className='font-semibold text-gray-800'>{query.title}</div>
                <div className='text-gray-600 text-sm mt-1'>
                  {query.description}
                </div>
                {query.treatmentQueryResponses &&
                  query.treatmentQueryResponses.length > 0 && (
                    <div className='my-2 ml-4'>
                      <div className='text-blue-600 font-medium mb-2'>
                        Responses:
                      </div>
                      <ul className='space-y-2'>
                        {query.treatmentQueryResponses.map((resp, idx) => (
                          <li
                            key={idx}
                            className='text-gray-700 text-sm bg-blue-50 rounded px-2 p-2'>
                            <div>{resp.responseMessage}</div>
                            <div className='text-gray-400 text-xs'>
                              {new Date(resp.createdAt).toLocaleString()}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                <div className="w-full flex justify-end my-2">
                  <button className='bg-blue-400 text-white rounded-md text-sm px-2' onClick={() => setOpenedReply(query.id)}>Show Reply</button>
                </div>
                {userInfo?.user?.doctorId && openedReply === query.id && (
                  <div className='bg-white mt-8 p-6 rounded-lg shadow'>
                    <h3 className='text-lg font-semibold text-blue-700 mb-4'>
                      Reply to Query
                    </h3>
                    <div>
                      <textarea
                        id='queryDescription'
                        className='w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:border-blue-300'
                        rows={4}
                        placeholder='Describe your query'
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={() => handleReplySubmit(query.id)}
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>
                      Submit Query
                    </button>
                  </div>
                )}

                <div className='text-gray-400 text-xs mt-1'>
                  {new Date(query.createdAt).toLocaleString()}
                </div>
              </li>
            ))
          ) : (
            <li className='text-gray-500'>No queries yet.</li>
          )}
        </ul>
      </div>
      {userInfo?.user?.patientId && (
        <div className='bg-white mt-8 p-6 rounded-lg shadow'>
          <h3 className='text-lg font-semibold text-blue-700 mb-4'>
            Ask a Query
          </h3>
          <form className='space-y-4' onSubmit={handleSubmitQuery}>
            <div>
              <label
                className='block text-gray-700 font-medium mb-1'
                htmlFor='queryTitle'>
                Title
              </label>
              <input
                id='queryTitle'
                type='text'
                className='w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:border-blue-300'
                placeholder='Enter query title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label
                className='block text-gray-700 font-medium mb-1'
                htmlFor='queryDescription'>
                Description
              </label>
              <textarea
                id='queryDescription'
                className='w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:border-blue-300'
                rows={4}
                placeholder='Describe your query'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>
              Submit Query
            </button>
          </form>
        </div>
      )}
    </div>
  </div>
);
};

export default TreatmentDetailsPage;
