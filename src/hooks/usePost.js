import { useState } from "react";

function usePost() {
  const [data, setData] = useState(null);     // 응답 데이터
  const [loading, setLoading] = useState(false); // 로딩 중 여부
  const [error, setError] = useState(null);     // 에러 상태

  const post = async (url, payload = {}, options = {}, onSuccess) => {
    const API_URL = import.meta.env.VITE_API_URL + url;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const isFormData = payload instanceof FormData;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: isFormData
          ? options.headers
          : { "Content-Type": "application/json", ...options.headers },
        body: isFormData ? payload : JSON.stringify(payload),
        ...options,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const result = await response.json();
      setData(result);
      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err);
      console.error("POST 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  return { post, data, loading, error };
}

export default usePost;