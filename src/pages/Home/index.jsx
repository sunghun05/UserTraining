import SideBar from "../../components/SideBar/SideBar";
import {useNavigate } from "react-router-dom";
function Home(){
    const navigate = useNavigate();  
    const onPressButton = () =>{
        navigate('/learning');
    }

    return(
        <div className="home-container">
        <SideBar/>
        <button onClick={onPressButton}>Home</button>        
        </div>
    );
}

export default Home