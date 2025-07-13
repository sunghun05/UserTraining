import "./MenuBar.css";
import { FaUserCircle } from "react-icons/fa";

function MenuBar(){
    return(
      <div className="menubar">
          <ul className="menubar-menu">
            <li className="menubar-logo">LabOps</li>
            <li><FaUserCircle size={25}/></li>
          </ul>
    </div>
  );
}

export default MenuBar