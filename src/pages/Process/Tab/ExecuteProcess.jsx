import SideBar from "../../../components/SideBar/SideBar";
import MenuBar from "../../../components/MenuBar/MenuBar";
import ProcessMenuBar from "../../../components/ProcessMenuBar/ProcessMenuBar.jsx";
import "./ExecuteProcess.css"
import {useState, useEffect} from "react";
import LogContent from "./LogContent.jsx";
function ExecuteProcess(){
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
                            <TaskInformatinon title={"작업 정보"} information={"as"}/>
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
                <div className="information">작업명</div>
                <div className="information">프로젝트명</div>
                <div className="information">작업자</div>
                <div className="information">작업일시</div>
                <div className="information">이미지명</div>
                <div className="information">우선순위</div>
                <div className="information">코드경로</div>
                <div className="information">설명</div>
            </div>
        </div>
    )
}
export default ExecuteProcess
