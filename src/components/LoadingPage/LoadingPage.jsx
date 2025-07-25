import {DotLoader} from 'react-spinners';
import "./LoadingPage.css";

function LoadingPage(){
    return(
        <div className='loading-page-content'>
            <DotLoader color='#2b3d8f'/>
        </div>
    )

}

export default LoadingPage;
