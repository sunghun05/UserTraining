import { useState } from "react";
import {useNavigate} from "react-router-dom";

import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

import "./HomeForm.css";
import TasksTable from "../Process/components/TasksTable/TasksTable";
import TaskAddButton from "../../components/TaskAddBtn/TaskAddBtn";
import ProjectAddForm from "../../components/ProjectAddForm/ProjectAddForm";
import useFetch from "../../hooks/useFetch";
import { FaFolder } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

function Home(){
    const project_data = useFetch('db/projects/task-counts?limit=3')
    const [isOpen, setIsOpen] = useState(false);
    const [isprojectOpen, setIsprojectOpen] = useState(false);

    if (project_data.loading) {
        return (
            <>
                <SideBar/>
                <div className="home-container">
                    <MenuBar/>
                    <LoadingPage/>
                </div>
            </>
        );
    }
    if(project_data.error) {
        return (
            <>
                <SideBar/>
                <div className="home-container">
                    <MenuBar/>
                    <ErrorPage msg={error.message} code={statusCode} cancelFun={null}/>
                </div>
            </>
            
        )
    }

    return(
        <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                <div className="home-contents-wrapper">
                    <ProjectContent
                        data={project_data.data}
                        isprojectOpen={isprojectOpen}
                        setIsprojectOpen={setIsprojectOpen}
                    />
                    <TaskContent
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                </div>
            </div>
        </>
    );
}

function ProjectContent({data, isprojectOpen, setIsprojectOpen}){
    return(
        <div className="home-project-contianer">
            <div className="home-project-header">
                <div className="home-project-title">PROJECTS</div>
                <ProjectAddButton 
                    isOpen={isprojectOpen} 
                    setIsOpen={setIsprojectOpen}
                />
            </div>
            <div className="home-project-content">
                {
                    data.projects.map((project) => (
                        <Project data={project} key={project.project_id}/>
                    ))
                }
            </div>
        </div>  
    )
}

function Project({data}){
    const navigate = useNavigate();
    
    const count_map = [
        { label: "Task", key: "total_task_count" },
        { label: "Running", key: "running_task_count" },
        { label: "Result", key: "successed_task_count" },
    ]
    return(
        <div className="home-project-folder-container" onClick={(e)=>{navigate(`/project/detail?projId=${data.project_id}`)}}>
            <FaFolder color="#99D9EA" size={350}/>
            <div className="home-project-folder-wrapper">
                <div className="home-project-folder-header">{data.project_name}</div>
                <div className="home-project-folder-content">
                    { count_map.map(({ label, key }) => ( 
                        <div className="home-project-folder-item" key={key}>
                            <div>{label}</div>
                            <div className="home-project-folder-item-content">
                                <FaCircle size={70} color="#fff"/>
                                <div className="home-project-folder-item-text"
                                    style={{
                                        left: String(data[key])?.length >= 2 ? '30%' : '38%',
                                    }}
                                >{data[key]}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
function TaskContent({isOpen, setIsOpen}){

    const query = {
        "per_page": 5,
    }

    return(
        <div className="home-task-contianer">
            <div className="home-task-header">
                <div className="home-task-title">TASKS</div>
                <TaskAddButton
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </div>
            <div style={{width: '65vw',}}>
                <TasksTable queries={query}/>
            </div>
        </div>
    )
}

function ProjectAddButton({isOpen, setIsOpen}) {
    return (
        <div>
            <div className="project-button-wrapper">
                <button onClick={() => setIsOpen(true)} className="project-add-button">
                    <span className="project-add-plus-icon">＋</span>
                    프로젝트 추가
                </button>
            </div>
            <ProjectAddForm
                isOpen={isOpen}
                setIsOpen={() => setIsOpen(false)}
            />            
        </div>
    );
}

export default Home