import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import "./project.css";
import useFetch from "../../hooks/useFetch.js";
import LoadingPage from "../../components/LoadingPage/LoadingPage.jsx";
function Project(){

    const { data, loading, error, statusCode } = useFetch('db/projects');

    console.log(data);
    console.log(loading)
    console.log(error)

    if(loading){
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

    return(
        <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                <div className="project-contents-wrapper">

                </div>
            </div>
        </>
    );
}

export default Project
