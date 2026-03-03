import React, { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, user: true }]);
    setInput("");

    // Temporary bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "AI: I am here to help! (Future AI response)", user: false }]);
    }, 500);
  };

  return (
    <>
      <button className="floating-chat-btn" onClick={toggleChat}>💬</button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>HealthCare AI</h3>
            <button onClick={toggleChat}>✖</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.user ? "message user" : "message bot"}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Type your symptom..." 
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
