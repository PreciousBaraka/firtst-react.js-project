import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { CalendarCheck, CircleX, Contact, Home, PanelsTopLeft, Users, WalletMinimal } from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const ref = useRef(null);

  const {userInfo} = useSelector((state) => state.user);

  const role = userInfo?.user?.role || "NORMAL"

  const links = [
    {
      id: 1,
      url: "/dashboard",
      title: "Dashboard",
      iconClass: () => <Home />,
      show: true,
    },
    {
      id: 2,
      url: "/hospital-visits",
      title: "Hospital Visits",
      iconClass: () => <CalendarCheck />,
      show: ["MANAGER", "RECEIPTIONIST"].includes(role),
    },
    {
      id: 5,
      url: "/receptionists",
      title: "Receptionist",
      iconClass: () => <WalletMinimal />,
      show: ["MANAGER", "RECEIPTIONIST"].includes(role),
    },
    {
      id: 6,
      url: "/patients",
      title: "Patient",
      iconClass: () => <Contact />,
      show: true,
    },
    {
      id: 7,
      url: "/doctors",
      title: "Doctor",
      iconClass: () => <Users />,
      show: ["MANAGER", "RECEIPTIONIST"].includes(role),
    },
  ];

  return (
    <>
      {!isCollapsed && (
        <aside
          className={`bg-white shadow-md ${
            isCollapsed ? "w-collapse" : "w-not-collapse"
          } ${
            isCollapsed ? "z-0" : "absolute z-40"
          } w-[300px] md:relative md:z-0 h-screen overflow-y-scroll scrollbar-hide left-0 top-0 transition-all duration-300 ease-in-out`}
          ref={ref}
        >
          <div className="sticky top-0 bg-slate-50 px-2 flex gap-4">
            <div className="h-16 flex items-center justify-center text-xl px-4">
              {!isCollapsed && (
                <h6 className="my-auto uppercase text-blue-500 font-semibold text-xl">
                  Post Operative Assistance
                </h6>
              )}
              <div
                className={`lg:hidden h-8 w-12 flex justify-center items-center cursor-pointer text-blue-400 `}
              >
                {!isCollapsed && <CircleX />}
              </div>
            </div>
          </div>
          {/* Sidebar Content */}
          <div className="px-1 pb-4 mb-8 overflow-y-auto">
            <ul className="mt-4">
              {links.map((link) => {
                const { id, url, iconClass, title } = link;
                if (link?.show) {
                  return (
                    <li key={id}>
                      <NavLink
                        to={`${url}`}
                        className={({ isActive }) =>
                          isActive
                            ? `w-full px-3 py-2 my-1 capitalize flex flex-col gap-1 ${
                                isCollapsed ? "text-xl" : ""
                              } ${
                                link?.subLinks
                                  ? "text-white"
                                  : "bg-blue-500 text-white rounded"
                              }`
                            : `text-gray-700 w-full px-3 py-2 my-1 capitalize ${
                                !isCollapsed &&
                                "hover:bg-slate-100 hover:text-gray-700 hover:rounded"
                              } flex gap-1 items-center ${
                                isCollapsed ? "text-xl" : ""
                              }`
                        }>
                        <div className='flex gap-2 relative font-semibold'>
                          {iconClass()}
                          {!isCollapsed && <h6 className='my-auto'>{title}</h6>}
                        </div>
                      </NavLink>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
