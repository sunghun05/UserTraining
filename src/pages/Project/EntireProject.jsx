import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import "./project.css";

import ProjectTable from "../../components/ProjectTable/ProjectTable.jsx";

function Project(){

    return(
        <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                <div className="home-contents-wrapper">
                    <div className="project-page-title">
                        <div className="project-page-title-text">
                            PROJECTS
                        </div>
                    </div>
                    <ProjectTable/>
                </div>
            </div>
        </>
    );
}

export default Project
