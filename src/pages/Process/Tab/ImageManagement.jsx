import SideBar from "../../../components/SideBar/SideBar";
import MenuBar from "../../../components/MenuBar/MenuBar";
import {useState} from "react";
import "./ImageManagement.css";
import ProcessMenuBar from "../../../components/ProcessMenuBar/ProcessMenuBar.jsx";
import LoadingPage from "../../../components/LoadingPage/LoadingPage.jsx";
import ErrorPage from "../../../components/ErrorPage/ErrorPage.jsx";

function ImageManagement(){

    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <SideBar/>
            <div className="entire-process-container">
                <MenuBar/>
                <ProcessMenuBar/>
                <div className="process-contents-wrapper">
                    hi
                </div>
            </div>
        </>
    );

}

export default ImageManagement
