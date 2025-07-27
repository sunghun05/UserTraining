import { useState } from "react";

import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import "./HomeForm.css";
import TasksTable from "../Process/components/TasksTable/TasksTable";

import useFetch from "../../hooks/useFetch";
import TaskAddButton from "../../components/TaskAddBtn/TaskAddBtn";
function Home(){
    const {data, loading, error, statusCode} = useFetch('db/tasks?page=1&per_page=8');
    const [isOpen, setIsOpen] = useState(false);
    if (loading) {
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
                    <ProjectContent/>
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

function ProjectContent(){
    return(
        <div className="home-project-contianer">
            <div className="home-project-header">
                <div className="home-project-title">PROJECTS</div>
                <button>프로젝트 추가</button>
            </div>
            <div className="home-project-content">

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