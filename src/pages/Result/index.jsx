import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import { useNavigate } from "react-router-dom"
import "./Result.css";
function Result(){

    return(
        <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                {/*    contents*/}
                <text>Result</text>
            </div>
        </>
    );
}

export default Result
