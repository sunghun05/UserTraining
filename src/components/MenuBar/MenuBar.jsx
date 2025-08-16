import "./MenuBar.css";
import { FaUserCircle } from "react-icons/fa";

import useFetch from "../../hooks/useFetch";
import { getUserId } from "../../utils/getuser.js";
import { useState } from "react";

import UserComponent from "../../pages/User/User.jsx";

function MenuBar(){

    const userInfo = getUserId();
    
    const [isOpen, setIsOpen] = useState(false);
    const user = getUserId();

    const handleDisplay = ()=>{
        setIsOpen(!isOpen);
    }

    return(
      <div className="menubar">
          <ul className="menubar-menu">
            <li className="menubar-logo">LabOps</li>
            <li className="user-button" onClick={handleDisplay}>
                <div className="user-button-name-text">{userInfo.user_name}</div>
                <div className="user-button-img"><FaUserCircle size={25}/></div>
            </li>
          </ul>
          <UserComponent isOpen={isOpen} setIsOpen={setIsOpen} info={user}/>
    </div>
  );
}

export default MenuBar;