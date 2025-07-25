import SideBar from "../../../components/SideBar/SideBar.jsx";
import MenuBar from "../../../components/MenuBar/MenuBar.jsx";
import ProcessMenuBar from "../../../components/ProcessMenuBar/ProcessMenuBar.jsx";
import "./Executeprocess.css"
import {useNavigate} from "react-router-dom";
import useFetch from "../../../hooks/useFetch.js";
import LoadingPage from "../../../components/LoadingPage/LoadingPage.jsx";
import ErrorPage from "../../../components/ErrorPage/ErrorPage.jsx";
function ExecuteProcess(){
    const navigate = useNavigate();
    

    const {data, loading, error, statusCode} = useFetch("db/scheduler/gpu")
    
    if (loading) {
        return (
            <>
                <SideBar/>
                <div className="execute-process-container">
                    <MenuBar/>
                    <ProcessMenuBar/>
                    <LoadingPage/>
                </div>
            </>
        );
    }
    if(error) {
        return (
            <>
                <SideBar/>
                <div className="execute-process-container">
                    <MenuBar/>
                    <ProcessMenuBar/>
                    <ErrorPage msg={error.message} code={statusCode} cancelFun={null}/>
                </div>
            </>
            
        )
    }

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
                            />
                            
                    ))}
                    
                </div>
            </div>
        </>
    );

}

function Workstation({workstation_name, data}){
    return(
        <div className="workstation_container">
            <div className="workstation-title">{workstation_name}</div>
            <ul className="workstation-content-wrapper">
            {Object.entries(data.gpus).map(([gpuId, taskData]) => (     
                <GPU
                    key={workstation_name+gpuId}
                    GPU_title={gpuId}
                    taskData={taskData}
                     />
            ))}
            </ul>
        </div>
    )
}

function GPU({GPU_title, taskData}){

    return(
        <li className="GPU_container">
            <div className="gpu-header">
                <div>A-6000 </div> 
                <div>{GPU_title}번 </div>
            </div>
            <div className="gpu-content">
                {taskData !== false ?  <FullGPU taskData={taskData}/> : <EmptyGPU/> }
            </div>
                
        </li>
    )
}

function FullGPU({taskData}){
    const navigate = useNavigate();
    const onPressHome = () => {
        navigate(`/process/execute/detail?taskId=${taskData.id}`);
      }
    return(
        <div onClick={onPressHome} className="FullGPU-container">
            <div>프로젝트명: {taskData.project_name}</div>
            <div>작업명: {taskData.task_name}</div>
            <div>작업자: {taskData.worker}</div>
            <div>작업일시: {taskData.created_at} </div>
            <div>작업상태: {taskData.task_status}</div>
        </div>
    )
}

function EmptyGPU(){
    return(
        <div className="EmptyGPU-container">
            <div>EMPTY</div>
        </div>
    )
}

export default ExecuteProcess
