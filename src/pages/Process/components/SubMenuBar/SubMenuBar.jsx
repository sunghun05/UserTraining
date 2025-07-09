import "./SubMenuBar.css";
function SubMenuBar(){
    return(
        <div className="submenubar">
            <ul className="submenubar-menu">
                <li className="display-mode">전체 작업</li>
                <li className="display-mode">실행중인 작업</li>
                <li className="display-mode">작업 비교</li>
                <li className="display-mode">작업 스케쥴러</li>
            </ul>
        </div>
    );
}

export default SubMenuBar