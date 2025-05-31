import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomFormItem from "../components/CustomFormItem";
import CustomButton from "../components/CustomButton";
import { login } from "../redux/actions/userActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (userInfo) {
      const role = userInfo.user.role;

      if (role === "PATIENT" && userInfo.user.patientId) {
        navigate(`/patient-account/${userInfo.user.patientId}`);
      } else {
        navigate("/dashboard");
      }
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl
                   border border-blue-200
                   hover:shadow-blue-400 transition-shadow duration-300"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
          Welcome Back
        </h2>

        {loading && (
          <p className="text-center text-blue-500 mb-4 font-medium animate-pulse">
            Logging in...
          </p>
        )}
        {(validationError || error) && (
          <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md mb-6 text-center font-semibold">
            {validationError || error}
          </p>
        )}

        <CustomFormItem
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          inputClassName="border border-gray-300 rounded-lg px-4 py-3
                          focus:outline-none focus:ring-2 focus:ring-blue-400
                          transition"
        />

        <CustomFormItem
          label="Password"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          inputClassName="border border-gray-300 rounded-lg px-4 py-3
                          focus:outline-none focus:ring-2 focus:ring-blue-400
                          transition"
        />

        <div className="mt-8">
          <CustomButton
            type="submit"
            title={loading ? "Logging in..." : "Login"}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white
                       font-semibold py-3 rounded-lg shadow-lg
                       transition-colors duration-300"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
