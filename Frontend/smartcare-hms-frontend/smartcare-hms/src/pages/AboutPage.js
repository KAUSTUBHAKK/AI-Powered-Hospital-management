import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AboutPage() {
  return (
    <div>
      <Navbar />
      <section className="page-section">
        <h1>About HealthCare AI</h1>
        <p>
          We are a modern hospital using AI to assist patients with early diagnosis,
          symptom checking, and automated appointment booking.
        </p>
      </section>
      <Footer />
    </div>
  );
}

export default AboutPage;
