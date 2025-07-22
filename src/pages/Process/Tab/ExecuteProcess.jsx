import SideBar from "../../../components/SideBar/SideBar.jsx";
import MenuBar from "../../../components/MenuBar/MenuBar.jsx";
import ProcessMenuBar from "../../../components/ProcessMenuBar/ProcessMenuBar.jsx";
import "./Executeprocess.css"
import {useNavigate} from "react-router-dom";
import useFetch from "../../../hooks/useFetch.js";

function ExecuteProcess(){
    const navigate = useNavigate();
    

    const {data, loading, error} = useFetch("db/scheduler/gpu")
    
    if (loading) return <div>로딩 중…</div>;
    if (error)   return <div>에러: {String(error)}</div>;
    return(
        <>
            <SideBar/>
            <div className="execute-process-container">
                <MenuBar/>
                <ProcessMenuBar/>
                <div className="execute-process-contents-wrapper">
                    {Object.entries(data.data).map(([nodeName, nodeInfo]) => (
                        <Workstation 
                            key={nodeName} 
                            workstation_name={nodeName} 
                            data={nodeInfo}
                            navigate={navigate}
                            />
                            
                    ))}
                    
                </div>
            </div>
        </>
    );

}

function Workstation({workstation_name, data, navigate}){
    return(
        <div className="workstation_container">
            <div className="workstation-title">{workstation_name}</div>
            <ul className="workstation-content-wrapper">
            {Object.entries(data.gpus).map(([gpuId, taskId]) => (     
                <GPU
                    key={workstation_name+gpuId}
                    GPU_title={gpuId}
                    taskId={taskId}
                    navigate={navigate}
                     />
            ))}
            </ul>
        </div>
    )
}

function GPU({GPU_title, taskId, navigate}){
    const onPressHome = () => {
        navigate(`/process/execute/detail?taskId=${taskId}`);
      }
    return(
        <li className="GPU_container">
            <div className="gpu-header">
                A-6000 {GPU_title}
            </div>
            <div className="gpu-content">
                {taskId !== false && (
                    <button onClick={onPressHome}>but</button>
                )}
            </div>
        </li>
    )
}
export default ExecuteProcess
