import SideBar from "../../../components/SideBar/SideBar.jsx";
import MenuBar from "../../../components/MenuBar/MenuBar.jsx";
import ProcessMenuBar from "../../../components/ProcessMenuBar/ProcessMenuBar.jsx";

import {useNavigate} from "react-router-dom";

import { useSearchParams } from "react-router-dom";


function ExecuteProcess(){
    const navigate = useNavigate();
    const id = "bbf44802-250b-438b-9ec2-b5dd1840e6e9"
    const onPressHome = () => {
        navigate(`/process/execute/detail?taskId=${id}`);
      }
    const [params] = useSearchParams();

    return(
        <>
            <SideBar/>
            <div className="execute-process-detail-container">
                <MenuBar/>
                <ProcessMenuBar/>
                <div className="execute-process-details-contents-wrapper">
                    <button onClick={onPressHome}>but</button>
                </div>
            </div>
        </>
    );

}


export default ExecuteProcess
