import { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
function LoginForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [stateMsg, setStateMsg] = useState('');
    const navigate = useNavigate();  
    const { setLoggedIn } = useAuth();

    const onPressButton = async (e) =>{

        e.preventDefault();
        try {
            const response = await fetch("http://192.168.10.17:8000/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
              });
        
              if (!response.ok) {
                throw new Error("로그인 실패");
              }
        
              const data = await response.json();
              localStorage.setItem("tokens", JSON.stringify({
                'access_token': data.access_token,
                'refresh_token': data.refresh_token,
                'userId': data.user.uid,
              })); // JWT 저장
              setLoggedIn(true);
              navigate('/');

        } catch (err){
            setStateMsg("아이디, 비밀번호를 확인해 주세요.");
        }
    }

    return(
        <div className="login-container">
            <h1 className="login-title">LabOps</h1>
            <div className="login-box">
                <div className="state-message">{stateMsg}</div>
                <input 
                    type="text" 
                    placeholder="아이디" 
                    className="login-input"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="비밀번호"
                    className="login-input" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" type="button" onClick={onPressButton}>
                    로그인
                </button>
            </div>
        </div>
    );
}

export default LoginForm