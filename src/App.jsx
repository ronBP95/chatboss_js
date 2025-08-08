import './App.css';
import { useState, useEffect, useRef } from 'react';

// Icon Imports
import { HiUserCircle, HiDotsVertical } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { BsFillSendFill } from "react-icons/bs";

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const addMessage = (role, text) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

const handleSend = async () => {
  if (input.trim() === "") return;

  addMessage("user", input);

  try {
    const res = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    if (res.ok) {
      addMessage("bot", data.response);
    } else {
      addMessage("bot", "Oops, something went wrong.");
    }
  } catch (error) {
    console.error("Error connecting to Flask backend:", error);
    addMessage("bot", "Server error. Please try again later.");
  }

  setInput("");
};

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="parentContainer">
        <div className="userName">
          <div className="userIcons">
            <div><HiUserCircle size="2em" /></div>
            <div className="userText">Support Agent</div>
          </div>
          <div className="userButtons">
            <HiDotsVertical size="1.5em" />
            <IoMdClose size="1.5em" />
          </div>
        </div>

        <div className="chatBox">
          <div className='time'>{currentDateTime.toLocaleTimeString()}</div>
          <div style={{ height: "400px", overflowY: "auto", padding: "10px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
                <div style={{ margin: "5px 0" }}>
                  <strong>{msg.role}:</strong> {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="chatInput">
          <input
            type="text"
            value={input}
            placeholder="Write your message here!"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            style={{ fontSize: '11pt' }}
          />
          <div className="buttons">
            <BsFillSendFill size="2em" onClick={handleSend} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;