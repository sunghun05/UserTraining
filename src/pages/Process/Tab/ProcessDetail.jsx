
import MenuBar from "../../../components/MenuBar/MenuBar.jsx"
import SideBar from "../../../components/SideBar/SideBar.jsx"

import "./ProcessDetail.css";

import {useSearchParams} from "react-router-dom";
import useFetch from "../../../hooks/useFetch.js";

function ProcessDetail() {

    const [param] = useSearchParams();
    const taskId = param.get("taskId");

    const {data, loading, error} = useFetch(`db/task/${taskId}`);

    if(loading) {
        return(
            <>
                <SideBar/>
                <div className="home-container">
                    <MenuBar/>
                    <div className="contents-wrapper">loading...</div>
                </div>
            </>
        )
    }else if(error){
       return( <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                <div className="contents-wrapper">{`error: ${error}`}</div>
            </div>
        </>)
    }
    return (
        <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                <div className="contents-wrapper">
                    <div className="details">
                        <div className="task_detail">
                            <div>
                                <span className="task_name_detail">{data.task_name}</span>
                                <span>의 작업 정보</span>
                            </div>
                            <span>{`Task ID: ${data.id}`}</span>
                        </div>
                        <div className="details_information_box">
                            <Status status={data.task_status}/>
                            <div className="status-container">
                                <div className="status-detail">{`Project: ${data.project_name}`}</div>
                            </div>
                            <div className="status-container">
                                <div className="status-detail">{`Worker: ${data.worker}`}</div>
                            </div>
                            <div className="status-container">
                                <div className="status-detail">{`Created At: ${data.created_at}`}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Status({status}) {
    let color = '';
    let status_text = '';

    if (status === 'enqueue') {
        color = 'gray';
        status_text = 'ENQUEUE';
    }else if(status === 'running'){
        color = 'green';
        status_text = 'RUNNING';
    }else if(status === 'finish'){
        color = 'blue';
        status_text = 'FINISHED';
    }else{
        color = 'red';
        status_text = 'ERROR';
    }

    return (
        <div className="status-container">
            <div className="status-detail" style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: color,
                display: 'inline-block',
                margin: '4px',
                boxShadow: '0 0 6px #8888'
            }}/>
            <span className="status-detail">{status_text}</span>
        </div>
    )
}

export default ProcessDetail;