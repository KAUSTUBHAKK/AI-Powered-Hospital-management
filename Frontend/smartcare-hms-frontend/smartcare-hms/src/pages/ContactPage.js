import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactPage() {
  return (
    <div>
      <Navbar />
      <section className="page-section">
        <h1>Contact Us</h1>
        <p>Email: support@healthcareai.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: 123 AI Street, Pune, India</p>
      </section>
      <Footer />
    </div>
  );
}

export default ContactPage;
