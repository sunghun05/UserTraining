import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
  const IP = "http://192.168.10.17:8000/"+url
  const [data, setData] = useState(null);     // 성공 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null);     // 에러 상태

  useEffect(() => {
    let isCancelled = false; // 컴포넌트 언마운트 시 방지

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(IP, options);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        if (!isCancelled) setData(result);
      } catch (err) {
        if (!isCancelled) setError(err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
