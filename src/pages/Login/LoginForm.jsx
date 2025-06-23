import { useState } from "react";
import "./LoginForm.css";

import { useNavigate } from "react-router-dom";
function LoginForm(){
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  

    const onPressButton = () =>{
        console.log("아이디:", id);
        console.log("비밀번호:", password);
        //jwt 인증 로직 추가
        navigate('/');
    }

    return(
        <div className="login-container">
            <h1 className="login-title">LabOps</h1>
            <div className="login-box">
                <input 
                    type="text" 
                    placeholder="아이디" 
                    className="login-input"
                    value={id} 
                    onChange={(e) => setId(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="비밀번호"
                    className="login-input" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" onClick={onPressButton}>
                    로그인
                </button>
            </div>
        </div>
    );
}

export default LoginForm