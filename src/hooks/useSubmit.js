import {useEffect, useState, useRef} from "react";

function useSubmit(url, onClose){
    const IP = "http://192.168.10.17:8000/" + url;
    const [data, setData] = useState(null);     // 성공 데이터
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null);     // 에러 상태
    const [statusCode, setStatusCode] = useState(null);

    const post = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        
        const formJson = Object.fromEntries(formData.entries());
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

export default useSubmit;