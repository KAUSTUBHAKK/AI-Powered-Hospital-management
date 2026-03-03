import React, { useState, useEffect } from "react";
import Chatbot from "./Chatbot";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [chatOpen, setChatOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [vitals, setVitals] = useState({
    bp_sys: "",
    bp_dia: "",
    temp_f: "",
    fasting_glucose: "",
    pulse: "",
    height_cm: "",
    weight_kg: "",
  });
  const [patients, setPatients] = useState([]);

  // ✅ Generate patient list
  const generatePatients = () => {
    const names = [
      "John Doe", "Priya Sharma", "Alex Carter", "Sanjay Patil", "Emily Davis",
      "Rajesh Nair", "Sophia Wilson", "Aarav Mehta", "Olivia Brown", "Liam Johnson"
    ];
    return names.map((name, i) => ({
      id: i,
      name,
      room: `Room ${101 + i}`,
      bpm: Math.floor(60 + Math.random() * 40),
      spo2: Math.floor(94 + Math.random() * 6),
      bp: `${Math.floor(110 + Math.random() * 20)}/${Math.floor(70 + Math.random() * 10)}`,
      alert: false,
    }));
  };

  // ✅ Auto-refresh every 10 seconds
  useEffect(() => {
    setPatients(generatePatients());
    const interval = setInterval(() => {
      setPatients((prev) =>
        prev.map((p) => {
          const bpm = Math.floor(60 + Math.random() * 40);
          const spo2 = Math.floor(94 + Math.random() * 6);
          const bp = `${Math.floor(110 + Math.random() * 20)}/${Math.floor(
            70 + Math.random() * 10
          )}`;
          const alert = bpm > 100 || bpm < 60 || spo2 < 95;
          return { ...p, bpm, spo2, bp, alert };
        })
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle vitals input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVitals((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetVitals = () => {
    setVitals({
      bp_sys: "",
      bp_dia: "",
      temp_f: "",
      fasting_glucose: "",
      pulse: "",
      height_cm: "",
      weight_kg: "",
    });
  };

  // ================= HOME PAGE =====================
  const HomePage = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        paddingTop: 80,
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3.5rem",
          color: "#0d47a1",
          marginBottom: 10,
          textShadow: "0 3px 6px rgba(0,0,0,0.2)",
          animation: "fadeInDown 1.5s ease-out",
        }}
      >
        Smart Healthcare Assistant
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#333",
          maxWidth: 700,
          lineHeight: 1.6,
          animation: "fadeInUp 1.5s ease-out",
        }}
      >
        Empowering hospitals and patients with real-time vitals monitoring,
        AI-powered health insights, and a human-like chatbot — all in one place.
      </p>

      <button
        style={{
          marginTop: 30,
          padding: "14px 30px",
          background: "linear-gradient(135deg, #0d47a1, #1565c0, #42a5f5)",
          color: "white",
          fontSize: "1.1rem",
          border: "none",
          borderRadius: 50,
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(13,71,161,0.4)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      >
        Explore Features
      </button>
    </div>
  );

  // ================= LIVE STATUS PAGE =====================
  const LiveStatusPage = ({ patients }) => (
    <div style={{ background: "#f4f8ff", minHeight: "100vh", paddingTop: 80 }}>
      <div
        style={{
          background: "black",
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: 2,
            background: "repeating-linear-gradient(90deg, lime 0 4px, transparent 4px 8px)",
            animation: "pulseLine 2s linear infinite",
          }}
        ></div>
        <span style={{ color: "white", fontWeight: "600", zIndex: 2 }}>
          LIVE MONITORING ACTIVE
        </span>
      </div>

      <h2
        style={{
          color: "#0d47a1",
          textAlign: "center",
          fontSize: "2.2rem",
          marginBottom: 10,
        }}
      >
        🏥 Live Patient Monitoring
      </h2>
      <p style={{ textAlign: "center", color: "#555", marginBottom: 30 }}>
        Real-time vitals auto-refresh every 10 seconds
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
          padding: "0 40px 60px",
        }}
      >
        {patients.map((p) => (
          <div
            key={p.id}
            style={{
              background: "white",
              borderRadius: 16,
              padding: 20,
              boxShadow: p.alert
                ? "0 0 20px rgba(255,0,0,0.4)"
                : "0 6px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              animation: p.alert ? "flashRed 1s infinite" : "fadeInUp 1s ease",
            }}
          >
            <h3 style={{ margin: "0 0 6px", color: "#0d47a1" }}>{p.name}</h3>
            <p style={{ margin: "0 0 8px", color: "#555" }}>{p.room}</p>
            <p><b>BPM:</b> {p.bpm} ❤️</p>
            <p><b>Oxygen:</b> {p.spo2}% 🫁</p>
            <p><b>Blood Pressure:</b> {p.bp} 💉</p>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes flashRed {
            0%, 100% { box-shadow: 0 0 20px rgba(255,0,0,0.4); }
            50% { box-shadow: 0 0 30px rgba(255,0,0,0.8); }
          }
          @keyframes pulseLine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );

  // ================== APPOINTMENT PAGE ==================
  const AppointmentPage = () => {
    const timeSlots = [
      "9:00 - 10:00 AM",
      "10:00 - 11:00 AM",
      "11:00 - 12:00 PM",
      "12:00 - 1:00 PM",
      "2:00 - 3:00 PM",
      "3:00 - 4:00 PM",
      "4:00 - 5:00 PM",
      "5:00 - 6:00 PM",
    ];

    const handleBook = () => {
      if (!selectedDate || !selectedTime) {
        alert("Please select both date and time slot.");
        return;
      }
      const newAppointment = { date: selectedDate, time: selectedTime };
      setAppointments([...appointments, newAppointment]);
      alert(`Appointment booked on ${selectedDate} at ${selectedTime}`);
      setSelectedDate("");
      setSelectedTime("");
    };

    return (
      <div
        style={{
          padding: "100px 40px",
          minHeight: "100vh",
          background: "linear-gradient(135deg,#e3f2fd,#ffffff)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#0d47a1", fontSize: "2.2rem" }}>
          📅 Book an Appointment
        </h2>
        <p style={{ color: "#555", marginBottom: 30 }}>
          Select a date and a one-hour time slot
        </p>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            padding: "10px 14px",
            fontSize: "1rem",
            borderRadius: 8,
            border: "1px solid #ccc",
            marginBottom: 20,
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginBottom: 30,
          }}
        >
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedTime(slot)}
              style={{
                padding: "12px",
                borderRadius: 10,
                border:
                  selectedTime === slot
                    ? "2px solid #0d47a1"
                    : "1px solid #ccc",
                background:
                  selectedTime === slot
                    ? "linear-gradient(135deg,#0d47a1,#42a5f5)"
                    : "white",
                color: selectedTime === slot ? "white" : "#333",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              {slot}
            </button>
          ))}
        </div>

        <button
          onClick={handleBook}
          style={{
            padding: "12px 26px",
            background: "linear-gradient(135deg,#0d47a1,#42a5f5)",
            color: "white",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: 50,
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
          }}
        >
          Confirm Appointment
        </button>
      </div>
    );
  };

  // ================= ABOUT & CONTACT =====================
  const AboutPage = () => (
    <div
      style={{
        padding: "100px 40px",
        textAlign: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
      }}
    >
      <h2 style={{ color: "#0d47a1", fontSize: "2.2rem" }}>About MediSense.AI</h2>
      <p style={{ maxWidth: 800, margin: "20px auto", fontSize: "1.1rem", color: "#333" }}>
        MediSense.AI is an intelligent health assistant for hospitals and clinics,
        offering live patient monitoring, analytics, and an AI-powered chatbot.
      </p>
    </div>
  );

  const ContactPage = () => (
    <div
      style={{
        padding: "80px 20px",
        textAlign: "center",
        minHeight: "100vh",
        background: "#f4f8ff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2 style={{ color: "#0d47a1", fontSize: "2.2rem", marginBottom: 20 }}>
        📞 Contact Us
      </h2>
      <p style={{ fontSize: "1.1rem", color: "#444" }}>
        For collaborations or queries:<br />
        <b>support@medisense.ai</b>
      </p>
      <p style={{ color: "#777", marginTop: 10, fontSize: 14 }}>
        © {new Date().getFullYear()} MediSense.AI — All Rights Reserved.
      </p>
    </div>
  );

  // ================= MAIN RETURN =====================
  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #ffffff, #bbdefb)",
        overflowX: "hidden",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          width: "100%",
          padding: "16px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(13, 71, 161, 0.95)",
          color: "white",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ margin: 0 }}>🏥 MediSense.AI</h2>
        <div style={{ display: "flex", gap: 30 }}>
          {[
            ["home", "Home"],
            ["live", "Live Status"],
            ["appointment", "Add Appointment"],
            ["about", "About"],
            ["contact", "Contact"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              style={{
                background: "transparent",
                border: "none",
                color: page === key ? "#90caf9" : "white",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {page === "home" && <HomePage />}
      {page === "live" && <LiveStatusPage patients={patients} />}
      {page === "appointment" && <AppointmentPage />}
      {page === "about" && <AboutPage />}
      {page === "contact" && <ContactPage />}

      {/* Floating Chatbot */}
      <div
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 999,
        }}
      >
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0d47a1, #42a5f6)",
              color: "white",
              border: "none",
              boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
              cursor: "pointer",
              fontSize: 28,
              animation: "pulse 2s infinite",
            }}
          >
            💬
          </button>
        ) : (
          <div
            style={{
              width: 380,
              height: 550,
              background: "white",
              borderRadius: 20,
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
              overflow: "hidden",
              animation: "slideUp 0.4s ease-out",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                background: "#0d47a1",
                color: "white",
                padding: "12px 16px",
                fontWeight: "600",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>🩺 MediSense Chat</span>
              <button
                onClick={() => setChatOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: 18,
                  cursor: "pointer",
                }}
              >
                ✖
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto" }}>
              <Chatbot vitals={vitals} />
            </div>

            <div style={{ padding: 12, background: "#f5f5f5" }}>
              <h4 style={{ margin: "6px 0", color: "#0d47a1" }}>Enter Vitals</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  ["bp_sys", "Sys BP"],
                  ["bp_dia", "Dia BP"],
                  ["temp_f", "Temp °F"],
                  ["fasting_glucose", "Glucose"],
                  ["pulse", "Pulse"],
                  ["height_cm", "Height"],
                  ["weight_kg", "Weight"],
                ].map(([key, label]) => (
                  <input
                    key={key}
                    name={key}
                    placeholder={label}
                    value={vitals[key]}
                    onChange={handleChange}
                    style={{
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      fontSize: 13,
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button onClick={handleResetVitals} style={miniBtnSecondary}>
                  Reset
                </button>
                <button
                  onClick={() =>
                    alert("Vitals saved locally for this session.")
                  }
                  style={miniBtnPrimary}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(66,165,245,0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(66,165,245,0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(66,165,245,0); }
        }
        `}
      </style>
    </div>
  );
}

const miniBtnPrimary = {
  flex: 1,
  background: "#0d47a1",
  color: "white",
  border: "none",
  borderRadius: 6,
  padding: "6px 10px",
  fontSize: 13,
  cursor: "pointer",
};

const miniBtnSecondary = {
  flex: 1,
  background: "#e9eefc",
  color: "#0d47a1",
  border: "none",
  borderRadius: 6,
  padding: "6px 10px",
  fontSize: 13,
  cursor: "pointer",
};

export default App;
