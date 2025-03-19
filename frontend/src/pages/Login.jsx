import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ email, password });

    try {
      const response = await fetch("http://localhost:8081/users/login", {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      console.log(data)

      // setSuccessMessage("Registration successful! Redirecting to login...");
      // setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (error) {
      console.log(error)
      // setErrorMessage(error.message);
    } finally {
      // setLoading(false);
    }
  };
  const handleShowPassword = (e) => {
    setShowPassword(e.target.checked)
  };
  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <div className="bg-white p-4 w-full md:w-1/3">
        <h1> Login to your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className=" flex flex-col space-y-1 mb-3">
            <label htmlFor="email" className="text-gray-800 font-semibold">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Email"
              className="border border-gray-300 p-2 rounded-md focus:outline-none"
            />
          </div>
          <div className=" flex flex-col space-y-1 mb-3">
            <label htmlFor="password" className="text-gray-800 font-semibold">
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
          <div className=" flex space-x-2 items-center">
            <input
              type="checkbox"
              onChange={ handleShowPassword}
              id="show-password"
              className=" h-4 border border-gray-300 p-2 rounded-md focus:outline-none"
            />
            <label
              htmlFor="show-password"
              className="text-gray-800 font-semibold"
            >
              Show Password
            </label>
          </div>
          <button className="bg-red-500 text-white w-full mt-3 border rounded-md py-2 ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
