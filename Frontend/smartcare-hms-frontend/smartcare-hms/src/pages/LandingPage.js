import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import bg from "../bg.jpg";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <section className="hero">
        <h1>Welcome to HealthCare AI</h1>
        <p>Your AI assistant for early symptom checking and instant appointments.</p>
        <button className="chat-btn">Chat with AI</button>
      </section>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default LandingPage;
