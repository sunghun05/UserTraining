import LoadingPage from "../../components/LoadingPage/LoadingPage.jsx";
import MenuBar from "../../components/MenuBar/MenuBar.jsx";
import ErrorPage from "../../components/ErrorPage/ErrorPage.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";

import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

import useFetch from "../../hooks/useFetch.js";

import "./ProjectDetail.css"

function ProjectDetail() {

    const [param] = useSearchParams();
    const projId = param.get("projId");
    const projData = useFetch(`db/projects/${projId}`);
    const taskData = useFetch(`db/tasks?project_name=${projId}`)

    if(projData.loading || taskData.loading) {
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
        console.log(projData);
        return (
            <>
                <SideBar/>
                <div className="home-container">
                    <MenuBar/>
                    <div className="project-detail-wrapper">
                        <div className="project-detail-container">
                            <div className="project-detail-title">{projData.data.project_name}</div>
                            <div className="project-basic-info"></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }


}

export default ProjectDetail;
