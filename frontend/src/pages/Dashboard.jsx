import React from "react";
import DashboardCard from "../components/dashboard/DashboardCard";
import { Bandage, BriefcaseMedical, Contact, Hospital,} from "lucide-react";
import { useEffect, useState } from "react";

function Dashboard() {
  const cards = [
    {
      id: 1,
      url: "/hospital-visits",
      title: "Total Hospital Visits",
      description: "230",
      iconClass: () => <Hospital />,
    },
    {
      id: 2,
      url: "/patients",
      title: "Total Patients",
      description: "100",
      iconClass: () => <Contact />,
    },
    {
      id: 3,
      url: "/treatment-records",
      title: "Total Treatment Records",
      description: "50",
      iconClass: () => <Bandage />,
    },
    {
      id: 4,
      url: "/doctors",
      title: "Total Doctors",
      description: "10",
      iconClass: () => <BriefcaseMedical />,
    },
  ];

  return (
    <div>
      <h4 className="font-semibold uppercase text-sm text-cement-200">
        Dashboard
      </h4>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      <div className="flex flex-col lg:flex-row space-y-4  lg:space-y-0 lg:space-x-4 my-4">
        <div className="flex-1">
          <div className="w-full border border-gray-300 shadow-sm rounded-md p-4">
            <p className="text-cement-200 text-md">Week to Date</p>
            <h2 className="text-xl text-magenta font-semibold">20 Visits</h2>
          </div>

          <div className="mt-4 flex flex-col space-y-2">
            <h6 className="text-cement-200 uppercase text-xs">
              New Hospital Visits
            </h6>
            <div className="shadow rounded-md p-2 relative">
              <h6 className="text-md text-gray-600">Precious</h6>
              <span className="flex justify-between items-center">
                <p className="text-cement-200 text-sm">
                  Fractured Knee
                </p>
                <h6 className="text-magenta">Car Accident</h6>
              </span>
              <h6 className="text-gray-600 text-md absolute top-1 right-2">
                06:30 - 8:15
              </h6>
              <span className="bg-green-400 text-white px-1 py-0.5 rounded-sm text-sm">
                Completed
              </span>
            </div>
            <div className="shadow rounded-md p-2 relative">
              <h6 className="text-md text-gray-600">Njoki</h6>
              <span className="flex justify-between items-center">
                <p className="text-cement-200 text-sm">Eye problem</p>
                <h6 className="text-magenta">Allergy Infection</h6>
              </span>
              <h6 className="text-gray-600 text-md absolute top-1 right-2">
                07:00 - 10: 00
              </h6>
              <span className="bg-magenta-400 text-white px-1 py-0.5 rounded-sm text-sm">
                In Progress
              </span>
            </div>
            <div className="shadow rounded-md p-2 relative">
              <h6 className="text-md text-gray-600">Judy</h6>
              <span className="flex justify-between items-center">
                <p className="text-cement-200 text-sm">Broken arm</p>
                <h6 className="text-magenta">Fell in the bathroom</h6>
              </span>
              <h6 className="text-gray-600 text-md absolute top-1 right-2">
                06:30 - 8:15
              </h6>
              <span className="bg-green-400 text-white px-1 py-0.5 rounded-sm text-sm">
                Completed
              </span>
            </div>
            <div className="shadow rounded-md p-2 relative">
              <h6 className="text-md text-gray-600">Magenta Kasarani</h6>
              <span className="flex justify-between items-center">
                <p className="text-cement-200 text-sm">C-section</p>
                <h6 className="text-magenta">Baby Delivery</h6>
              </span>
              <h6 className="text-gray-600 text-md absolute top-1 right-2">
                10:30 - 23:30
              </h6>
              <span className="bg-red-400 text-white px-1 py-0.5 rounded-sm text-sm">
                In Progress
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <TodayCard />
            <div className="shadow p-4 mt-8 h-[270px] rounded-sm flex flex-col space-y-2 rounded-md">
              <div className="border border-gray-300 p-2 flex flex-col justify-center items-center">
                <h6 className="text-cement-200 upercase">
                  Today's Treatment Records
                </h6>
                <h2 className="text-lg text-magenta font-semibold text-center ">5</h2>
              </div>

              <div className="border border-gray-300 p-2 flex flex-col justify-center items-center">
                <h6 className="text-cement-200 upercase">
                  On Session
                </h6>
                <h2 className="text-lg text-magenta font-semibold text-center  ">3</h2>
              </div>
              <div className="border border-gray-300 p-2 flex flex-col justify-center items-center">
                <h6 className="text-cement-200 upercase">
                  Completed
                </h6>
                <h2 className="text-lg text-magenta font-semibold text-center  ">2</h2>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="mt-4 flex flex-col space-y-2">
              <h6 className="text-cement-200 uppercase text-xs">New Patients</h6>
              <div className="shadow rounded-md p-2 relative">
                <h6 className="text-md text-gray-600">Judy Njoki</h6>
                <p className="text-cement-200">Visited 4th April 2025</p>
                <span className="bg-amber-400 text-white px-1 py-0.5 rounded-sm text-sm absolute top-1 right-1">
                  New
                </span>
              </div>
              <div className="shadow rounded-md p-2 relative">
                <h6 className="text-md text-gray-600">Claire Shiro</h6>
                <p className="text-cement-200">Visited 5th April 2025</p>
                <span className="bg-amber-400 text-white px-1 py-0.5 rounded-sm text-sm absolute top-1 right-1">
                  New
                </span>
              </div>
              <div className="shadow rounded-md p-2 relative">
                <h6 className="text-md text-gray-600">Joy</h6>
                <p className="text-cement-200">Visited 6th April 2025</p>
                <span className="bg-amber-400 text-white px-1 py-0.5 rounded-sm text-sm absolute top-1 right-1">
                  New
                </span>
              </div>
              <div className="shadow rounded-md p-2 relative">
                <h6 className="text-md text-gray-600">Precious Umoja</h6>
                <p className="text-cement-200">Visited 7th April 2025</p>
                <span className="bg-amber-400 text-white px-1 py-0.5 rounded-sm text-sm absolute top-1 right-1">
                  New
                </span>
              </div>
              <div className="shadow rounded-md p-2 relative">
                <h6 className="text-md text-gray-600">Beth Brenda</h6>
                <p className="text-cement-200">Visited 7th April 2025</p>
                <span className="bg-amber-400 text-white px-1 py-0.5 rounded-sm text-sm absolute top-1 right-1">
                  New
                </span>
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
    <div className="w-full border border-gray-300 bg-blue-300 text-white shadow-sm rounded-md p-4 text-center">
      <h6 className="uppercase text-xs font-semibold text-gray-600">
        Current Date & Time
      </h6>
      <h2 className="text-lg font-semibold">{formattedDate}</h2>
      <p className="text-sm text-gray-600 font-semibold">{formattedTime}</p>
    </div>
  );
};

export default Dashboard;
