
import "./ErrorPage.css";
import { BiSolidError } from "react-icons/bi";

function ErrorPage({msg, code, cancelFun}){
    return(
        <div className='error-page-content'>
            <BiSolidError size={100} color="#2b3d8f"/>
            <div className='error-page-code'>{code} ERROR</div>
            <div className='error-page-msg'>{msg}</div>
            {cancelFun && (
                <div className="error-page-btn" onClick={cancelFun}>
                확인
                </div>
            )}
        </div>
    )

}

export default ErrorPage;
