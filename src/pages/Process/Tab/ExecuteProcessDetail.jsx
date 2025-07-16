import SideBar from "../../../components/SideBar/SideBar.jsx";
import MenuBar from "../../../components/MenuBar/MenuBar.jsx";
import ProcessMenuBar from "../../../components/ProcessMenuBar/ProcessMenuBar.jsx";
import "./ExecuteProcessDetail.css"
import useFetch from "../../../hooks/useFetch.js";
import { useSearchParams } from "react-router-dom";

import LogContent from "./LogContent.jsx";

function ExecuteProcessDetail(){
    const [params] = useSearchParams();
    const task_id = params.get("taskId");
    const { data, loading, error } = useFetch(`db/task/${task_id}`);
    console.log(data)
    if (loading) return <>로딩중</>
    return(
        <>
            <SideBar/>
            <div className="execute-process-detail-container">
                <MenuBar/>
                <ProcessMenuBar/>
                <div className="execute-process-details-contents-wrapper">
                    <div className="details-title">Workstation- 1</div>
                    <div className="graphics-detail-tasks-contents">
                        <div className="graphics-title">● A6000</div>
                        <div className="graphics-tasks-information-wrapper">
                            <TaskInformatinon title={"작업 정보"} information={data}/>
                            <TaskInformatinon title={"GPU 정보"} information={"ds"}/>
                        </div>
                        <LogContent jobName={"12345"}/>
                    </div>
                </div>
            </div>
        </>
    );

}

function TaskInformatinon({title, information}){
    return(
        <div>
            <div className="information-title">{title}</div>
            <div className="information-wrapper">
                <div className="information">작업명:{information.task_name}</div>
                <div className="information">프로젝트명:{information.project_name}</div>
                <div className="information">작업자: {information.worker}</div>
                <div className="information">작업일시: {information.created_at}</div>
                <div className="information">이미지명</div>
                <div className="information">우선순위</div>
                <div className="information">코드경로</div>
                <div className="information">설명:{information.task_description}</div>
            </div>
        </div>
    )
}
export default ExecuteProcessDetail
