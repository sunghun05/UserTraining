import {DotLoader} from 'react-spinners';
import "./LoadingPage.css";

function LoadingPage({height_vmin=50}){
    return(
        <div className="loading-page-wrapper" style={{
            height: `${height_vmin}vmin`,
        }}>
            <div className='loading-page-content'>
                <DotLoader color='#2b3d8f'/>
            </div>
        </div>
    )

}

export default LoadingPage;
