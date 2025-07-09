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
                {/*    contents*/}
                <text>Server</text>
            </div>
        </>
    );
}

export default Server
