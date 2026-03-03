import React, { useState, useRef, useEffect } from "react";

function Chatbot({ vitals }) {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello — I can help with common issues. Enter vitals and ask your question." }
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    // auto-scroll
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");

    const payloadVitals = {
      bp_sys: vitals.bp_sys || null,
      bp_dia: vitals.bp_dia || null,
      temp_f: vitals.temp_f || null,
      fasting_glucose: vitals.fasting_glucose || null,
      pulse: vitals.pulse || null,
      height_cm: vitals.height_cm || null,
      weight_kg: vitals.weight_kg || null,
    };

    setMessages((prev) => [...prev, { sender: "ai", text: "⏳ Thinking..." }]);

    try {
      const res = await fetch("http://127.0.0.1:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, vitals: payloadVitals }),
      });

      const data = await res.json();
      setMessages((prev) => {
        const withoutThinking = prev.filter((m) => !(m.sender === "ai" && m.text.includes("⏳ Thinking")));
        return [...withoutThinking, { sender: "ai", text: data.reply }];
      });
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const withoutThinking = prev.filter((m) => !(m.sender === "ai" && m.text.includes("⏳ Thinking")));
        return [...withoutThinking, { sender: "ai", text: "⚠️ Server error. Is the backend running?" }];
      });
    }
  };

  return (
    <div style={{
      width: 420,
      background: "white",
      padding: 16,
      borderRadius: 10,
      boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
    }}>
      <h3 style={{ marginTop: 0, color: "#0d47a1", textAlign: "center" }}>🧠 Health Chatbot</h3>

      <div ref={bodyRef} style={{
        height: 420,
        overflowY: "auto",
        padding: 10,
        borderRadius: 8,
        border: "1px solid #eee",
        background: "#fafafa",
        marginBottom: 12
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.sender === "user" ? "flex-end" : "flex-start", marginBottom: 8 }}>
            <div style={{
              maxWidth: "78%",
              padding: "8px 12px",
              borderRadius: 12,
              background: m.sender === "user" ? "#0d47a1" : "#e9eefc",
              color: m.sender === "user" ? "white" : "#022a5a",
              fontSize: 14,
              whiteSpace: "pre-wrap",
            }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
               placeholder="Type symptoms, e.g., 'I have fever and cough'"
               style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ccc" }} />
        <button onClick={sendMessage} style={{
          background: "#0d47a1", color: "white", border: "none", padding: "10px 14px", borderRadius: 8, cursor: "pointer"
        }}>Send</button>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
        Tip: Chatbot will use the vitals you entered on the left. Always seek emergency care for severe/worsening symptoms.
      </div>
    </div>
  );
}

export default Chatbot;
