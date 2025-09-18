import React from "react";
import Header from "../Reusable.jsx/Header.jsx";
import Footer from "../Reusable.jsx/Footer.jsx";
import MidSection from "../Employer/MidSection.jsx";

const EmployeDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
     
      <main className="flex-grow">
        <MidSection />
      </main>
      <Footer />
    </div>
    
  );
};

export default EmployeDashboard;
