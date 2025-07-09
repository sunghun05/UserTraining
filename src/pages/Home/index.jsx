import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import {useNavigate } from "react-router-dom"
import "./HomeForm.css";
function Home(){
    const navigate = useNavigate();  
    const onPressButton = () =>{
        navigate('/learning');
    }

    return(
        <>
        <SideBar/>
        <div className="home-container">
            <MenuBar/>
            <button onClick={onPressButton}>Home</button>        
        </div>
        </>
    );
}

export default Home