import { useState } from "react";

import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

import "./HomeForm.css";
import TasksTable from "../Process/components/TasksTable/TasksTable";
import TaskAddButton from "../../components/TaskAddBtn/TaskAddBtn";

import useFetch from "../../hooks/useFetch";
import { FaFolder } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
function Home(){
    const project_data = useFetch('db/projects/task-counts?limit=3')
    const {data, loading, error, statusCode} = useFetch('db/tasks?page=1&per_page=8');
    const [isOpen, setIsOpen] = useState(false);
    if (loading || project_data.loading) {
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
    if(error) {
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
                    {console.log(project_data.data)}
                    <ProjectContent
                        data={project_data.data}
                    />
                    <TaskContent 
                        data={data}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                </div>
            </div>
        </>
    );
}

function ProjectContent({data}){
    return(
        <div className="home-project-contianer">
            <div className="home-project-header">
                <div className="home-project-title">PROJECTS</div>
                <button>프로젝트 추가</button>
            </div>
            <div className="home-project-content">
                {
                    data.projects.map((project) => (
                        <Project data={project}/>
                    ))
                }
            </div>
        </div>  
    )
}

function Project({data}){
    const count_map = [
        { label: "Task", key: "total_task_count" },
        { label: "Running", key: "running_task_count" },
        { label: "Result", key: "successed_task_count" },
    ]
    return(
        <div className="home-project-folder-container">
            {console.log(String(data["total_task_count"]).length)}
            <FaFolder color="#99D9EA" size={350}/>
            <div className="home-project-folder-wrapper">
                <div className="home-project-folder-header">{data.project_name}</div>
                <div className="home-project-folder-content">
                    { count_map.map(({ label, key }) => ( 
                        <div className="home-project-folder-item">
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
function TaskContent({data, isOpen, setIsOpen}){
    return(
        <div className="home-task-contianer">
            <div className="home-task-header">
                <div className="home-task-title">TASKS</div>
                <TaskAddButton
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </div>
            <TasksTable offset={1} data={data.tasks || []}/>
        </div>
    )
}


export default Home