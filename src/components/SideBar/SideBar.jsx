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

  const navItems = [
    { label: "홈", icon: <FaHome size={30} />, path: "/" },
    { label: "작업", icon: <BiCategoryAlt size={30} />, path: "/process/all" },
    { label: "프로젝트", icon: <LuNewspaper size={30} />, path: "/project" },
    { label: "데이터", icon: <FaDatabase size={30} />, path: "/data" },
    { label: "서버", icon: <FaServer size={30} />, path: "/server" },
  ];

    return(
        <div className="sidebar">
      <div className="sidebar-top">
        <h2 className="sidebar-title"><GrHpeLabs size={33} /></h2>
      </div>
      <nav className="sidebar-menu">
        <ul>
          {navItems.map((item, idx) => (
            <li 
              key={idx} 
              onClick={() => navigate(item.path)}
              className= "sidebar-item"
            >
              {item.icon}
              <div>{item.label}</div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SideBar