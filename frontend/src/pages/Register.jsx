import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/users/register", {
        method: "POST",
        body: JSON.stringify({ fullName, email, password, confirmPassword }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <div className="bg-white p-6 w-full md:w-1/3 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center mb-4">
          Create Your Account
        </h1>

        {errorMessage && (
          <div className="bg-red-200 p-2 text-red-700 rounded mb-3 text-center">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-200 p-2 text-green-700 rounded mb-3 text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1 mb-3">
            <label htmlFor="fullName" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              id="fullName"
              placeholder="Full Name"
              className="border border-gray-300 p-2 rounded-md focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1 mb-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Email"
              className="border border-gray-300 p-2 rounded-md focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1 mb-3">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="*******"
              className="border border-gray-300 p-2 rounded-md focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1 mb-3">
            <label htmlFor="confirmPassword" className="font-semibold">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              placeholder="*******"
              className="border border-gray-300 p-2 rounded-md focus:outline-none"
            />
          </div>

          <div className="flex space-x-2 items-center">
            <input
              type="checkbox"
              onChange={(e) => setShowPassword(e.target.checked)}
              id="show-password"
              className="h-4 border border-gray-300 p-2 rounded-md"
            />
            <label htmlFor="show-password" className="font-semibold">
              Show Password
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white w-full mt-4 py-2 rounded-md flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full">
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
