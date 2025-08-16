import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
  // if (!url) return;
  const IP = import.meta.env.VITE_API_URL+url
  const [data, setData] = useState(null);     // 성공 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null);     // 에러 상태
  const [statusCode, setStatusCode] = useState(null);
  useEffect(() => {
    let isCancelled = false; // 컴포넌트 언마운트 시 방지

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(IP, options);
        if (!isCancelled) setStatusCode(response.status);
        if (!response.ok) throw new Error(`HTTP ${response.statusText}`);
        const result = await response.json();

        if (!isCancelled) setData(result);
      } catch (err) {
        if (!isCancelled) setError(err);
        if (statusCode === null) {
          setStatusCode(500);  // ⛔ 네트워크 에러 등
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [url]);
  return { data, loading, error, statusCode };
}

export default useFetch;
