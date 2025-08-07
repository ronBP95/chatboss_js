import './App.css'
import { useState, useEffect, useRef } from 'react';

// Icon Imports
import { HiUserCircle, HiDotsVertical } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { BsFillSendFill } from "react-icons/bs";

// useState

function App() {

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(timerId);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Initial Text Message
  const [messages, setMessages] = useState([
  { role: "bot", text: "Hi! How can I help you today?" }
  ]);

  // Initial Input
  const [input, setInput] = useState("");

  // Text Submission Variables
  const addMessage = (role, text) => {
  setMessages((prev) => [...prev, { role, text }]);
  };

  const handleSend = () => {
  if (input.trim() === "") return;

  addMessage("user", input);

  // Example bot response:
  setTimeout(() => {
    addMessage("bot", "Got it! I'll look into that.");
  }, 500);

  setInput(""); // clear input field
  };

  // Scroll to bottom on chat response send
  const chatEndRef = useRef(null);

  // Nice effect to scroll to new message 
  useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="parentContainer">
            <div className="userName">
              <div className="userIcons">
                <div><HiUserCircle size ="2em"/></div>
                <div className="userText">Support Agent</div>
              </div>
                <div className="userButtons">
                  <HiDotsVertical size="1.5em"/>
                  <IoMdClose size="1.5em"/>
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
              <div style={{ marginTop: "10px" }}>
            </div>
    </div>
            </div>
            <div className="chatInput">
                <input 
                 type='text'
                 value={input}
                 placeholder='Write your message here!'
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
                 style={{ fontSize: '11pt' }}
                />
                <div className="buttons">
                  <BsFillSendFill size="2em" onClick={handleSend}/>  
                </div>
            </div>
      </div>
    </>
  )
}

export default App
