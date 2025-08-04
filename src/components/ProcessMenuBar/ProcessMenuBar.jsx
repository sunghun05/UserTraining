import "./SubMenuBar.css";
import {useNavigate} from "react-router-dom";

function ProcessMenuBar(){

    const navigate = useNavigate();


    const onPressAllProcess = () => {
      navigate("/process/all");
    }
    const onPressExecutingProcess = () => {
      navigate("/process/execute");
    }
    const onPressCompareProcess = () => {
      navigate("/process/compare");
    }
    const onPressScheduler = () => {
      navigate("/process/scheduler");
    }

    const onePressImage = () =>{
      navigate("/process/image");
    }

    return(
        <div className="submenubar">
            <ul className="submenubar-menu">
                <li className="display-mode" onClick={onPressAllProcess}>전체 작업</li>
                <li className="display-mode" onClick={onPressExecutingProcess}>실행중인 작업</li>
                <li className="display-mode" onClick={onPressCompareProcess}>작업 비교</li>
                <li className="display-mode" onClick={onPressScheduler}> 작업 스케줄러</li>
                <li className="display-mode" onClick={onePressImage}> 이미지 관리</li>
            </ul>
        </div>
    );
}

export default ProcessMenuBar