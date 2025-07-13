import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import "./HomeForm.css";
function Home(){

    return(
        <>
        <SideBar/>
        <div className="home-container">
            <MenuBar/>  
        </div>
        </>
    );
}

export default Home