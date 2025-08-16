import {useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";

function useHybridSubmit(url, onClose){
    const IP = import.meta.env.VITE_API_URL + url;
    const [data, setData] = useState(null);     // 성공 데이터
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null);     // 에러 상태
    const [statusCode, setStatusCode] = useState(null);
    const navigate = useNavigate();

    const post = async (eOrData) => {
        let formJson;
        // 폼 submit으로 온 경우
        if (eOrData && typeof eOrData.preventDefault === 'function') {
            eOrData.preventDefault();
            const formData = new FormData(eOrData.target);
            formJson = Object.fromEntries(formData.entries());

            if (formJson.requirements) {
                formJson.requirements = formJson.requirements
                    .split("\n")
                    .map(s => s.trim())
                    .filter(s => s.length > 0);
            }

            if (formJson.members) {
                formJson.members = formData.getAll("members");
            }
        } else {
            // 직접 객체로 데이터 넣는 경우
            formJson = { ...eOrData };
        }

        // console.log(formJson)
        setLoading(true);
        setError(null);
        setData(null);
        setStatusCode(null);
        
        try {
            const response = await fetch(IP, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formJson),
            });
            setStatusCode(response.status);

            if (!response.ok) {
                alert(`HTTP 오류! 상태: ${response.status}`);
                throw new Error(`HTTP 오류! 상태: ${response.status}`);
            }

            const json = await response.json();
            setData(json);
            console.log("POST 성공:", json);
            onClose?.();
            navigate(0);

            return json;
        } catch (err) {
            setError(err);
            if (statusCode === null) {
                setStatusCode(500);  // ⛔ 네트워크 에러 등
            }
        } finally {
            setLoading(false);
        }
    };
    return {post, data, loading, error, statusCode};
}

export default useHybridSubmit;