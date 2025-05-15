import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 to-white text-gray-800">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-500 mb-4">
          Post Operative Assistance App
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          Streamlining patient recovery by connecting doctors and patients with real-time post-treatment care.
        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full text-lg"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-blue-500 hover:bg-blue-50 text-blue-600 px-6 py-3 rounded-full text-lg"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Features */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Patients</h3>
              <p className="text-gray-600">
                Track recovery, follow doctor's advice, and raise queries post-treatment.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Doctors</h3>
              <p className="text-gray-600">
                Monitor patient recovery and respond to follow-ups and queries efficiently.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Receptionists</h3>
              <p className="text-gray-600">
                Register patients, manage visits, and enhance follow-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-white text-gray-500">
        &copy; {new Date().getFullYear()} Post Operative Assistance App. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
