import React, { useState } from "react";

const SignupModal = ({ setShowSignup, setShowLogin }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Simulating API call 
    setTimeout(() => {
      alert("Sign Up Successful! Redirecting to Sign In...");
      setShowSignup(false); // Close Sign-Up Modal
      setShowLogin(true); // Open Sign-In Modal
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border p-2 w-full mb-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 w-full mb-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 w-full mb-2"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded w-full">
            Sign Up
          </button>
        </form>

        {/* Redirect to Sign In */}
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => {
              setShowSignup(false); // Close Sign-Up Modal
              setShowLogin(true); // Open Sign-In Modal
            }}
            className="text-blue-600 underline"
          >
            Sign In
          </button>
        </p>

        {/* Close Modal Button */}
        <button onClick={() => setShowSignup(false)} className="mt-2 block text-red-500 w-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
