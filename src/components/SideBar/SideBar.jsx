import "./SideBar.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function SideBar(){

  const navigate = useNavigate();

  const onPressHome = () => {
    navigate("/");
  }
  const onPressProcess = () => {
    navigate("/process/all");
  }
  const onPressResult = () => {
    navigate("/result");
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
        <h2 className="sidebar-title">로고</h2>
      </div>
      <nav className="sidebar-menu">
        <ul>
          <li onClick={onPressHome}>홈</li>
          <li onClick={onPressProcess}>작업</li>
          <li onClick={onPressResult}>결과</li>
          <li onClick={onPressData}>데이터</li>
          <li onClick={onPressServer}>서버</li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar