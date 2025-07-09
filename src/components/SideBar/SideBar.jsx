import "./SideBar.css";
function SideBar(){
    return(
        <div className="sidebar">
      <div className="sidebar-top">
        <h2 className="sidebar-title">로고</h2>
      </div>
      <nav className="sidebar-menu">
        <ul>
          <li>홈</li>
          <li>작업</li>
          <li>결과</li>
          <li>데이터</li>
          <li>서버</li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar