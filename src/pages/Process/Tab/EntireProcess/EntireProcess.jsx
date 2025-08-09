import SideBar from "../../../../components/SideBar/SideBar.jsx";
import MenuBar from "../../../../components/MenuBar/MenuBar.jsx";
import {useState, useEffect} from "react";
import "./Process.css";
import ProcessMenuBar from "../../../../components/ProcessMenuBar/ProcessMenuBar.jsx";
import TasksTable from "../../components/TasksTable/TasksTable.jsx";
import LoadingPage from "../../../../components/LoadingPage/LoadingPage.jsx";
import ErrorPage from "../../../../components/ErrorPage/ErrorPage.jsx";
import TaskAddButton from "../../../../components/TaskAddBtn/TaskAddBtn.jsx";
function EntireProcess(){

    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                <ProcessMenuBar/>
                <div className="process-contents-wrapper">

                    {/*    contents*/}

                    <div className="name_and_functions">
                        <div className="title-sort-wrapper">
                            <div className="Tasks"><h1 style={{margin: '0',}}>TASKS</h1></div>
                            <label className="sort">
                                <select className="sort_methods">
                                    <option className="ascendingByDate">날짜 오름차순</option>
                                    <option className="descendingByDate">날짜 내림차순</option>
                                </select>
                            </label>
                        </div>
                        <TaskAddButton
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                    <div style={{width: '65vw',}}>
                        <TasksTable/>
                    </div>
                </div>

            </div>
        </>
    );

}
export default EntireProcess
