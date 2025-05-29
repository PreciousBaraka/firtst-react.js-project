import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlices";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { images } from "../lib/constants";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white shadow-md flex justify-between items-center px-4 py-2 sticky top-0 left-0 right-0 z-10">
      <div>
        <h4 className="text-xl font-semibold text-blue-700 uppercase">
          Post Operative Assistance App
        </h4>
      </div>

      <div className="relative flex items-center gap-4" ref={dropdownRef}>
        <div>
          <h6 className="text-gray-700 text-sm text-right">
            Hi, {userInfo?.user?.fullName}
          </h6>
        </div>

        <img
          src={images.avatar}
          alt="User"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-magenta cursor-pointer"
        />

        {dropdownOpen && (
          <div className="absolute right-0 top-12 w-40 bg-white rounded-md shadow-md border z-50">
            {/* Optional: Profile link */}
            {/* <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => navigate("/profile")}
            >
              <User className="w-4 h-4" /> Profile
            </button> */}
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
