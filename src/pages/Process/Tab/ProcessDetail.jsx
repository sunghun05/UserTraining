
import MenuBar from "../../../components/MenuBar/MenuBar.jsx"
import SideBar from "../../../components/SideBar/SideBar.jsx"
import LoadingPage from "../../../components/LoadingPage/LoadingPage.jsx";
import ErrorPage from "../../../components/ErrorPage/ErrorPage.jsx";
import "./ProcessDetail.css";

import {useSearchParams} from "react-router-dom";
import useFetch from "../../../hooks/useFetch.js";
import ProcessMenuBar from "../../../components/ProcessMenuBar/ProcessMenuBar.jsx";
import useLogs from "../../../hooks/useLogs.js";

function ProcessDetail() {

    const [param] = useSearchParams();
    const taskId = param.get("taskId");
    const info = [
        ['Enqueue', 'yellow'], 
        ['Pending', 'grey'],
        ['Running', 'green'], 
        ['Succeed', 'blue'], 
        ['Error', 'red']
    ];

    const {data, loading, error, statusCode} = useFetch(`db/task/${taskId}`);

    if(loading) {
        return(
            <>
                <SideBar/>
                <div className="home-container">
                    <MenuBar/>
                    <LoadingPage/>
                </div>
            </>
        )
    }else if(error) {
        return (<>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                <ErrorPage msg={error.message} code={statusCode}/>
            </div>
        </>)
    }
    return (
        <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                <ProcessMenuBar/>
                <div className="process-detail-container">
                    <div className="task-detail-contents-wrapper">
                        <div className="task-detail-content">
                            <div className="task-detail-title">
                                <div>
                                    <div className="task-detail-task-name">{data.task_name}</div>
                                    <Status status={data.task_status} info={info}/>
                                </div>
                                <div className="task-detail-download-wrapper">
                                    <h3>다운로드</h3>
                                    <div className="task-detail-download">
                                        <button className="download-btn">로그</button>
                                        <button className="download-btn">모델</button>
                                    </div>
                                </div>
                            </div>
                            <div className="task-detail-detail">
                                <div><h2>기본 정보</h2></div>
                                <DetailInformation name="작업명" data={data.task_name}/>
                                <DetailInformation name="프로젝트명" data={data.project_name}/>
                                <DetailInformation name="작업자" data={data.worker}/>
                                <DetailInformation name="작업일시" data={data.created_at}/>
                                <DetailInformation name="이미지명" data={data.image_name}/>
                                <DetailInformation name="우선순위" data={data.priority}/>
                                <DetailInformation name="코드 경로" data={data.code_location}/>
                                <DetailInformation name="작업 설명" data={data.task_description}/>
                            </div>
                        </div>
                        <div className="task-detail-detail">
                            <div><h2>Accuracy</h2></div>
                            <div className="task-detail-result-image">img</div>
                        </div>
                        <div className="task-detail-detail">
                            <div><h2>{info[data.task_status][0]}</h2></div>
                            <TaskDetailLogs taskId={taskId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function TaskDetailLogs({taskId}){
    const {logs, logCount, logsLoading} = useLogs(taskId);

    if(!logsLoading){
        return (
            <div className="task-detail-logs">
                <div>{logs}</div>
            </div>
        )
    }else{
        return (
            <LoadingPage/>
        )
    }
}

function DetailInformation({name, data}){
    return (
        <div className="task-detail-default-info">
            <div className="task-detail-default-info-item-title">{name}</div>
            <div className="task-detail-default-info-item-content">{data}</div>
        </div>
    );
}

function Status({status, info}){

    return (
        <>
            <div className="status-container">
                <div className="status-detail"
                    style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: info[status][1],
                        margin: '4px 8px 4px 4px',
                        boxShadow: '0 0 6px #8888'
                    }}
                />
                <span style={{fontSize: '25px'}}>{info[status][0]}</span>
            </div>
        </>
    )

}

export default ProcessDetail;