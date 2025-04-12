import React from "react";
import heroImage from "../assets/hero.jpeg"; //  import path

const Hero = ({ setShowLogin, setShowSignup }) => {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <h1 className="text-4xl font-bold text-blue-700">Post-Operative Assistance at Your Fingertips</h1>
      <p className="mt-4 text-black" >Get expert post-surgery care, track symptoms, and consult doctors anytime.</p>
      <div className="mt-6">
        <button
          onClick={() => setShowLogin(true)}
          className="bg-white text-blue-600 px-6 py-2 rounded mr-2 hover:bg-gray-200 transition"
        >
          Login
        </button>
        <button
          onClick={() => setShowSignup(true)}
          className="bg-white text-blue-600 px-6 py-2 rounded hover:bg-gray-200 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Hero;
