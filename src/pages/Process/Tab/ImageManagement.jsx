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
            <div className="image-container">
                <MenuBar/>
                <ProcessMenuBar/>
                <div className="image-contents-wrapper">
                    <ImagesContainer/>
                </div>
            </div>
        </>
    );

}

function ImagesContainer(){
    return(
        <div>
            <div>Images</div>
            <ImageTable/>
        </div>
    )
}

function BaseImagesContainer(){

}

function ImageTable(){
    const label_map = [
        {label: "번호", key :"idx"}, 
        {label: "이미지명", key :"image_name"}, 
        {label: "태그", key :"tag"}, 
        {label: "생성자", key :"worker"}, 
        {label: "상태", key : "state"}
    ]
    
    return(
        <table className="image-table-container">
            <thead>
                <tr>
                {label_map.map(({label, key}) =>(
                    <th key={key}>{label}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                        {label_map.map(({ key }) => (
                            <td key={key}></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default ImageManagement
