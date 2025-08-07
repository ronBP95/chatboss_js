import './App.css'

// Icon Imports
import { HiUserCircle, HiDotsVertical } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

function App() {
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
              Chat Content
            </div>
            <div className="chatInput">
              Chat Input
            </div>
      </div>
    </>
  )
}

export default App
