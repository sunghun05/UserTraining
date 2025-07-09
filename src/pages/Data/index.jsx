import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import { useNavigate } from "react-router-dom"
import "./Data.css";
function Data(){

    return(
        <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                {/*    contents*/}
                <text>Data</text>
            </div>
        </>
    );
}

export default Data
