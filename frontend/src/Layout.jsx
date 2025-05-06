import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/SideBar.jsx";
import { useState } from "react";
import TopBar from "./components/TopBar.jsx";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
  const {userInfo} = useSelector((state) => state.user)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const deviceWidth = window.innerWidth;

    if (deviceWidth < 768) {
      return true;
    }

    return false;
  });
  
  if (userInfo?.token) {
    return (
      <div className='flex h-screen overflow-hidden'>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
          <TopBar />
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  return <Navigate to="/login" />;
}
