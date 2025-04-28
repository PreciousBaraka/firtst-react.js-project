import React from "react";
import { images } from "../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlices";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <div className="bg-white shadow-md flex justify-between items-center px-4 py-2 sticky top-0 left-0 right-0 z-10">
      <div>
        <h4 className="text-xl font-semibold text-cement-200 uppercase">
          Admin Dashboard
        </h4>
      </div>
      <div className="flex space-x-4 items-center">
        <div>
          <h6 className="text-cement-200 text-sm py-1 text-right">
            Hi, {userInfo?.user?.fullName}
          </h6>
          <button
            className="bg-cement-100 text-blue-700 px-2 text-sm rounded-md  cursor-pointer focus:ring-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <img
          src={images.avatar}
          alt="User Profile"
          className="h-10 w-10 rounded-full object-cover ring ring-2 ring-magenta"
        />
      </div>
    </div>
  );
};

export default TopBar;
