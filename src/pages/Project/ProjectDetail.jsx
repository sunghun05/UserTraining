import LoadingPage from "../../components/LoadingPage/LoadingPage.jsx";
import MenuBar from "../../components/MenuBar/MenuBar.jsx";
import ErrorPage from "../../components/ErrorPage/ErrorPage.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";

import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

import useFetch from "../../hooks/useFetch.js";

import "./ProjectDetail.css"
import TasksTable from "../Process/components/TasksTable/TasksTable.jsx";

function ProjectDetail() {

    const [param] = useSearchParams();
    const projId = param.get("projId");
    const projData = useFetch(`projects/${projId}`);

    if(projData.loading) {
        return(
            <>
                <SideBar/>
                <div className="home-container">
                    <MenuBar/>
                    <LoadingPage/>
                </div>
            </>
        );
    }else{

        return (
            <>
                <SideBar/>
                <div className="home-container">
                    <MenuBar/>
                    <div className="project-detail-wrapper">
                        <div className="project-detail-container">
                            <div className="project-detail-title">{projData.data.project_name}</div>
                            <div className="project-detail-time">{projData.data.created_at}</div>
                            <div className="project-basic-info">
                                <div style={{
                                    fontSize: '26px',
                                }}>Members</div>
                                <div className="project-detail-members">
                                    {projData?.data?.users?.map(({username}) =>(
                                        <div 
                                            key={username}
                                            className="user-tag"
                                        >
                                            {username}
                                        </div>
                                    ))}
                                    </div>
                            </div>
                            <div className="project-detail-description-wrapper">
                                <div style={{
                                    fontSize: '26px',
                                }}>Description</div>
                                <div className="project-detail-members">{projData.data.project_description}</div>
                            </div>
                            <ThisProjectTasks projData={projData.data}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }


}

function ThisProjectTasks({projData}){

    const query = {
        "project": projData.project_name,
        "per_page": 6,
    }

    return(
        <>
            <div className="project-detail-tasks-info-wrapper">
                <span className="project-detail-tasks-info-title">{projData.project_name}</span>
                <span className="project-detail-tasks-info-poss">
                    {projData.project_name[projData.project_name.length - 1] === "s" ? "' tasks" : "'s tasks"}
                </span>
                <TasksTable queries={query}/>
            </div>
        </>
    )

}

export default ProjectDetail;
