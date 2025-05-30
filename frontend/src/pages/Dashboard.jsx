import React from "react";
import DashboardCard from "../components/dashboard/DashboardCard";
import {
  Bandage,
  BriefcaseMedical,
  Contact,
  Hospital,
  MessageSquare,
  Reply,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../redux/actions/userActions";

function Dashboard() {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.user);

  // Use actual stats data or fallback to defaults
  const cards = [
    {
      id: 1,
      url: "/patients",
      title: "Total Patients",
      description: stats?.totalPatients?.toString() || "0",
      iconClass: () => <Contact />,
    },
    {
      id: 2,
      url: "/doctors",
      title: "Total Doctors",
      description: stats?.totalDoctors?.toString() || "0",
      iconClass: () => <BriefcaseMedical />,
    },
    {
      id: 3,
      url: "/receptionists",
      title: "Total Receptionists",
      description: stats?.totalReceptionists?.toString() || "0",
      iconClass: () => <Hospital />,
    },
    {
      id: 4,
      url: "/treatment-queries",
      title: "Treatment Queries",
      description: stats?.totalTreatmentQueries?.toString() || "0",
      iconClass: () => <MessageSquare />,
    },
  ];

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  console.log(stats);

  return (
    <div>
      <h4 className='font-semibold uppercase text-sm text-cement-200'>
        Dashboard
      </h4>
      <div className='mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {cards.map((card) => (
          <DashboardCard
            key={card.id}
            title={card.title}
            iconClass={card.iconClass}
            description={card.description}
            url={card.url}
          />
        ))}
      </div>

      <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 my-4'>
        <div className='flex-1'>
          <div className='w-full border border-gray-300 shadow-sm rounded-md p-4'>
            <p className='text-cement-200 text-md'>Treatment Statistics</p>
            <div className='grid grid-cols-2 gap-4 mt-2'>
              <div>
                <h2 className='text-xl text-magenta font-semibold'>
                  {stats?.totalTreatmentQueries || 0}
                </h2>
                <p className='text-sm text-gray-600'>Total Queries</p>
              </div>
              <div>
                <h2 className='text-xl text-magenta font-semibold'>
                  {stats?.totalTreatmentReplies || 0}
                </h2>
                <p className='text-sm text-gray-600'>Total Replies</p>
              </div>
            </div>
          </div>

          <div className='mt-4 flex flex-col space-y-2'>
            <h6 className='text-cement-200 uppercase text-xs'>
              Recent Treatment Records
            </h6>
            {stats?.recentTreatments && stats.recentTreatments.length > 0 ? (
              stats.recentTreatments.map((treatment, index) => (
                <div
                  key={treatment.id || index}
                  className='shadow rounded-md p-4 relative'>
                  <h6 className='text-md text-gray-600 font-semibold mb-2'>
                    Treatment Record #{treatment.id?.slice(-8) || "Unknown"}
                  </h6>

                  <div className='flex flex-col space-y-2'>
                    <h6 className='text-gray-600 my-1 uppercase text-sm'>
                      Symptoms
                    </h6>
                    <p className='text-gray-500 text-sm'>
                      {treatment.symptoms || "No symptoms recorded"}
                    </p>

                    <h6 className='text-gray-600 my-1 uppercase text-sm'>
                      Treatment Plan
                    </h6>
                    <p className='text-gray-500 text-sm'>
                      {treatment.treatmentPlan || "No treatment plan recorded"}
                    </p>
                  </div>

                  <div className='mt-3 flex justify-between items-center'>
                    <div>
                      <p className='text-xs text-gray-500'>
                        Doctor: {treatment.doctor?.specialization || "Unknown"}
                      </p>
                      <p className='text-xs text-gray-500'>
                        Visit Reason:{" "}
                        {treatment.hospitalVisit?.reason || "Not specified"}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-sm text-xs text-white ${
                        treatment.status === "ACTIVE"
                          ? "bg-green-400"
                          : treatment.status === "COMPLETED"
                          ? "bg-blue-400"
                          : "bg-gray-400"
                      }`}>
                      {treatment.status || "Unknown"}
                    </span>
                  </div>

                  <div className='absolute top-2 right-2'>
                    <p className='text-xs text-gray-400'>
                      {new Date(treatment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className='shadow rounded-md p-4 text-center text-gray-500'>
                <p>No recent treatment records available</p>
              </div>
            )}
          </div>
        </div>

        <div className='flex-1 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4'>
          <div className='flex-1'>
            <TodayCard />

            <div className='shadow p-4 mt-8 h-[270px] rounded-sm flex flex-col space-y-2 rounded-md'>
              <div className='border border-gray-300 p-2 flex flex-col justify-center items-center'>
                <h6 className='text-cement-200 uppercase'>Total Patients</h6>
                <h2 className='text-lg text-magenta font-semibold text-center'>
                  {stats?.totalPatients || 0}
                </h2>
              </div>

              <div className='border border-gray-300 p-2 flex flex-col justify-center items-center'>
                <h6 className='text-cement-200 uppercase'>Total Doctors</h6>
                <h2 className='text-lg text-magenta font-semibold text-center'>
                  {stats?.totalDoctors || 0}
                </h2>
              </div>

              <div className='border border-gray-300 p-2 flex flex-col justify-center items-center'>
                <h6 className='text-cement-200 uppercase'>Patient Queries</h6>
                <h2 className='text-lg text-magenta font-semibold text-center'>
                  {stats?.totalPatientQueries || 0}
                </h2>
              </div>
            </div>
          </div>

          <div className='flex-1'>
            <div className='mt-4 flex flex-col space-y-2'>
              <h6 className='text-cement-200 uppercase text-xs'>
                System Overview
              </h6>

              <div className='shadow rounded-md p-3'>
                <h6 className='text-md text-gray-600 font-semibold'>
                  Treatment System
                </h6>
                <div className='mt-2 space-y-1'>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-500'>Queries:</span>
                    <span className='text-sm font-medium'>
                      {stats?.totalTreatmentQueries || 0}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-500'>Replies:</span>
                    <span className='text-sm font-medium'>
                      {stats?.totalTreatmentReplies || 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className='shadow rounded-md p-3'>
                <h6 className='text-md text-gray-600 font-semibold'>
                  Staff Overview
                </h6>
                <div className='mt-2 space-y-1'>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-500'>Doctors:</span>
                    <span className='text-sm font-medium'>
                      {stats?.totalDoctors || 0}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-500'>
                      Receptionists:
                    </span>
                    <span className='text-sm font-medium'>
                      {stats?.totalReceptionists || 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className='shadow rounded-md p-3'>
                <h6 className='text-md text-gray-600 font-semibold'>
                  Patient Information
                </h6>
                <div className='mt-2 space-y-1'>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-500'>
                      Total Patients:
                    </span>
                    <span className='text-sm font-medium'>
                      {stats?.totalPatients || 0}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-500'>
                      Patient Queries:
                    </span>
                    <span className='text-sm font-medium'>
                      {stats?.totalPatientQueries || 0}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-500'>
                      Doctor Replies:
                    </span>
                    <span className='text-sm font-medium'>
                      {stats?.totalDoctorReplies || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TodayCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div className='w-full border border-gray-300 bg-blue-300 text-white shadow-sm rounded-md p-4 text-center'>
      <h6 className='uppercase text-xs font-semibold text-gray-600'>
        Current Date & Time
      </h6>
      <h2 className='text-lg font-semibold'>{formattedDate}</h2>
      <p className='text-sm text-gray-600 font-semibold'>{formattedTime}</p>
    </div>
  );
};

export default Dashboard;
