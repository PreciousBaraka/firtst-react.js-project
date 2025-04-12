import React from "react";

const LoginModal = ({ setShowLogin }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2" />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-2" />
        <button className="bg-blue-600 text-white px-6 py-2 rounded">Login</button>
        <button onClick={() => setShowLogin(false)} className="mt-2 block text-red-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
