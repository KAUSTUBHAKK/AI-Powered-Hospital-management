import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ServicesPage() {
  return (
    <div>
      <Navbar />
      <section className="page-section">
        <h1>Our Services</h1>
        <ul>
          <li>AI-based Symptom Checker</li>
          <li>Doctor Appointment Booking</li>
          <li>24/7 Virtual Consultation</li>
          <li>Electronic Health Record Management</li>
        </ul>
      </section>
      <Footer />
    </div>
  );
}

export default ServicesPage;
