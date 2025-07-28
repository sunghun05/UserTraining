
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
                <div className="task_detail_contents_wrapper">
                    <ul className="task_detail_side_contents_list">
                        <Status status={data.task_status}/>
                        <li className="status-detail1">{`Worker: ${data.worker}`}</li>
                        <li className="status-detail1">{`Project: ${data.project_name}`}</li>
                        <li className="status-detail1">{`Created: ${data.created_at}`}</li>
                        <div className="task-detail-bottom">
                            <h3 style={{
                                margin: '5px',
                            }}>작업 결과 다운로드</h3>
                            <button className="task-detail-download-result-button">download</button>
                        </div>
                    </ul>
                    <div className="task-detail-main-contents-wrapper">
                        <div className="task-detail-title">
                            <span>
                                <span className="task-detail-task-name">
                                    {data.task_name}
                                </span>
                                <span>의 상세 정보</span>
                            </span>
                            <span>{`ID: ${data.id}`}</span>
                        </div>
                        <div className="task-detail-information">
                            <div className="task-detail-information-description">
                                <h2>Description</h2>
                                <div>{data.task_description}</div>
                            </div>
                        </div>

                        <div className="task-detail-result-visualization">
                            visualization images
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

function Status({status}) {

    const info = [['Enqueue', 'yellow'], ['Pending', 'grey'],
        ['Running', 'green'], ['Succeed', 'blue'], ['Error', 'red']];

    return (
        <>
            <div className="status-container">
                <div
                    style={{
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        background: info[status][1],
                        margin: '4px 8px 4px 4px',
                        boxShadow: '0 0 6px #8888'
                    }}
                />
                <span className="status-detail">{info[status][0]}</span>
            </div>

        </>
    )
}

export default ProcessDetail;