import React from "react";
import { Link } from "react-router-dom";
import recoveryImage from "../assets/images/homepage.jpg"; // Make sure the image exists and path is correct

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800">
      {/* Hero Section with Background Image */}
      <header
        className="relative min-h-[500px] flex flex-col items-center justify-center text-center px-6 py-24 bg-cover bg-center"
        style={{ backgroundImage: `url(${recoveryImage})` }}
      >
        {/* Semi-transparent black overlay to dim image */}
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Post Operative Assistance App
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-md">
            Helping you stay on track with your recovery by providing secure
            access to treatment updates, follow-up plans, and doctor
            communication.
          </p>

          <Link
            to="/login"
            className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-full text-lg font-semibold"
          >
            Login
          </Link>
        </div>
      </header>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                Track Your Recovery
              </h3>
              <p className="text-gray-600">
                View your treatment plans, monitor progress, and keep up with
                follow-up care.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Ask Questions</h3>
              <p className="text-gray-600">
                Submit post-treatment queries to your doctor directly through
                the app.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Get Updates</h3>
              <p className="text-gray-600">
                Stay informed about your hospital visits, treatment records, and
                communication with your doctor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-white text-gray-500">
        &copy; {new Date().getFullYear()} Post Operative Assistance App. All
        rights reserved.
      </footer>
    </div>
  );
};

export default Home;
