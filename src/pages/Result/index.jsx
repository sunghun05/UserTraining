import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import { useNavigate } from "react-router-dom"
import "./Result.css";
import SubMenuBar from "../Process/components/SubMenuBar/SubMenuBar.jsx";
import TasksTable from "../Process/components/TasksTable/TasksTable.jsx";
function Result(){

    return(
        <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                <div className="contents-wrapper">

                </div>
            </div>
        </>
    );
}

export default Result
