import "./SideBar.css";
function SideBar(){
    return(
        <div className="sidebar">
      <div className="sidebar-top">
        <h2 className="sidebar-title">LabOps</h2>
      </div>
      <nav className="sidebar-menu">
        <ul>
          <li>홈</li>
          <li>프로젝트</li>
          <li>작업</li>
          <li>내 정보</li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar