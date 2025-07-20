import SideBar from "../../../components/SideBar/SideBar.jsx";
import MenuBar from "../../../components/MenuBar/MenuBar.jsx";
import ProcessMenuBar from "../../../components/ProcessMenuBar/ProcessMenuBar.jsx";
import "./Executeprocess.css"
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
            <div className="execute-process-container">
                <MenuBar/>
                <ProcessMenuBar/>
                <div className="execute-process-contents-wrapper">
                    <Workstation workstation_name={"new-workstation"}/>
                    <button onClick={onPressHome}>but</button>
                </div>
            </div>
        </>
    );

}


function Workstation({workstation_name}){
    return(
        <div className="workstation_container">
            {workstation_name}
        </div>
    )
}

function GPU({GPU_title, data}){
    return(
        <div className="GPU_container">
            <div className="gpu-header">
                {GPU_title}
                {data["gpu_status"]}
            </div>
            <div className="gpu-content">
                {data[""]}
            </div>
        </div>
    )
}
export default ExecuteProcess
