import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  CalendarCheck,
  CircleX,
  Contact,
  Home,
  WalletMinimal,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const ref = useRef(null);

  const { userInfo } = useSelector((state) => state.user);
  const role = userInfo?.user?.role || "NORMAL";

  const links = [
    {
      id: 1,
      url: "/dashboard",
      title: "Dashboard",
      iconClass: () => <Home size={20} />,
      show: true,
    },
    {
      id: 2,
      url: "/hospital-visits",
      title: "Hospital Visits",
      iconClass: () => <CalendarCheck size={20} />,
      show: ["MANAGER", "RECEPTIONIST", "DOCTOR"].includes(role),
    },
    {
      id: 5,
      url: "/receptionists",
      title: "Receptionist",
      iconClass: () => <WalletMinimal size={20} />,
      show: ["MANAGER", "RECEPTIONIST"].includes(role),
    },
    {
      id: 6,
      url: "/patients",
      title: "Patient",
      iconClass: () => <Contact size={20} />,
      show: true,
    },
    {
      id: 7,
      url: "/doctors",
      title: "Doctor",
      iconClass: () => <Users size={20} />,
      show: ["MANAGER", "RECEPTIONIST"].includes(role),
    },
  ];

  return (
    <>
      {!isCollapsed && (
        <aside
          className={`bg-white shadow-lg ${
            isCollapsed ? "w-20" : "w-72"
          } fixed md:relative md:z-auto z-40 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 transition-width duration-300 ease-in-out`}
          ref={ref}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 flex items-center justify-between shadow-md">
            {!isCollapsed && (
              <h1 className="text-white text-lg tracking-wide select-none">
                Post Operative Assistance
              </h1>
            )}
            <button
              onClick={() => setIsCollapsed(true)}
              className="text-white md:hidden focus:outline-none hover:text-gray-200 transition"
              aria-label="Close Sidebar"
            >
              <CircleX size={24} />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-6 px-2">
            <ul className="space-y-1">
              {links.map(({ id, url, iconClass, title, show }) =>
                show ? (
                  <li key={id}>
                    <NavLink
                      to={url}
                      className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-lg font-semibold text-gray-700 transition-colors duration-200
                        ${
                          isActive
                            ? "bg-blue-500 text-white shadow-md"
                            : "hover:bg-blue-100 hover:text-blue-600"
                        }`
                      }
                    >
                      <span className="flex items-center justify-center text-xl">
                        {iconClass()}
                      </span>
                      {!isCollapsed && <span>{title}</span>}
                    </NavLink>
                  </li>
                ) : null
              )}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
