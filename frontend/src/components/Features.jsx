import React from "react";

const Features = () => {
  return (
    <div className="py-10 px-5 text-center">
      <h2 className="text-3xl font-semibold mb-5">Why Choose PoA?</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-6 rounded shadow">
          <h3 className="font-bold">24/7 Doctor Access</h3>
          <p>Instant consultations with post-op specialists.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded shadow">
          <h3 className="font-bold">Personalized Recovery</h3>
          <p>AI-based recovery plans tailored to your needs.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded shadow">
          <h3 className="font-bold">Symptom Tracking</h3>
          <p>Monitor pain levels, fever, and wound healing.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
