import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import { useNavigate } from "react-router-dom"
import "./Server.css";
function Server(){

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

export default Server
