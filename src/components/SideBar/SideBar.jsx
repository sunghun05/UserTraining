import "./SideBar.css";
import {useNavigate} from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { LuNewspaper } from "react-icons/lu";
import { FaDatabase } from "react-icons/fa";
import { FaServer } from "react-icons/fa6";
import { GrHpeLabs } from "react-icons/gr";

function SideBar(){

  const navigate = useNavigate();

  const onPressHome = () => {
    navigate("/");
  }
  const onPressProcess = () => {
    navigate("/process/all");
  }
  const onPressResult = () => {
    navigate("/project");
  }
  const onPressData = () => {
    navigate("/data");
  }
  const onPressServer = () => {
    navigate("/server");
  }

    return(
        <div className="sidebar">
      <div className="sidebar-top">
        <h2 className="sidebar-title"><GrHpeLabs size={33 } /></h2>
      </div>
      <nav className="sidebar-menu">
        <ul>
          <li onClick={onPressHome}><FaHome size={30} /></li>
          <li onClick={onPressProcess}><BiCategoryAlt size={30} /></li>
          <li onClick={onPressResult}><LuNewspaper size={30} /></li>
          <li onClick={onPressData}><FaDatabase size={30} /></li>
          <li onClick={onPressServer}><FaServer size={30} /></li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar