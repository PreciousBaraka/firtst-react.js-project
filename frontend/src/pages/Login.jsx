import React, { useEffect, useState } from "react";
import CustomFormItem from "../components/CustomFormItem";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";

const Login = () => {
  const dispatch = useDispatch();
  const {loading, error, userInfo} = useSelector((state) => state.user) 
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState(null);

  const handleChange = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(null);
    if (!userData.email || !userData.password) {
      setValidationError("Please all the Fields");
      return;
    }
    dispatch(login(userData));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard")
    }
  }, [userInfo, navigate])

  return (
    <div className="h-screen w-full bg-cement-100 flex items-center justify-center">
      <form
        action=""
        className="lg:w-1/3 bg-white rounded-md p-4 "
        onSubmit={handleSubmit}
      >
        <h2 className="text-blue-700 text-xl font-semibold text-center my-3">
          Login to Post Operative Assistance App
        </h2>
        {loading && <p>Loading...</p>}
        {(validationError || error) && (
          <p className="text-red-500 text-sm bg-red-300 p-2 rounded-md">
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
        <CustomButton type="submit" title="Login" />
      </form>
    </div>
  );
};

export default Login;
