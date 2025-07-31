import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import "./project.css";

function Project(){

    return(
        <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                <div className="contents-wrapper">
                    <div className="project-page-title">
                        <div className="project-page-title-text">
                            PROJECTS
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Project
