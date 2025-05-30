import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomFormItem from "../components/CustomFormItem";
import CustomButton from "../components/CustomButton";
import { login } from "../redux/actions/userActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userState = useSelector((state) => state.user);
  // console.log("userState from Redux:", userState);

  const { loading, error, userInfo } = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(null);

    if (!userData.email || !userData.password) {
      setValidationError("Please fill in all fields.");
      return;
    }

    dispatch(login(userData));
  };
console.log(userInfo);
  useEffect(() => { 
  if (userInfo) {
    const role = userInfo.user.role;
    
    if (role === "PATIENT" && userInfo.user.patientId) {
      navigate(`/patient-account/${userInfo.user.patientId}`);
    } else {
      navigate("/dashboard"); // Fallback for other roles (e.g., Manager, Receptionist)
    }
    // else if (role === "DOCTOR" && userInfo.user.doctorId) {
    //   navigate(`/doctor-account/${userInfo.user.doctorId}`);
    // } 
  }
}, [userInfo, navigate]);


  return (
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-md p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Login to Post Operative Assistance App
        </h2>

        {loading && (
          <p className="text-center text-blue-500 mb-3">Logging in...</p>
        )}
        {(validationError || error) && (
          <p className="text-red-500 text-sm bg-red-100 p-2 rounded-md mb-4 text-center">
            {validationError || error}
          </p>
        )}

        <CustomFormItem
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Type your email"
        />

        <CustomFormItem
          label="Password"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="********"
        />

        <div className="mt-4">
          <CustomButton type="submit" title="Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
