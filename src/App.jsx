import './App.css'
import { useState, useEffect } from 'react';

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

  const [text, setText] = useState("");

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
            </div>
            <div className="chatInput">
                <input 
                 type='text'
                 placeholder='Write your message here!'
                 style={{ fontSize: '11pt' }}
                />
                <div className="buttons">
                  <BsFillSendFill size="2em"/>  
                </div>
            </div>
      </div>
    </>
  )
}

export default App
