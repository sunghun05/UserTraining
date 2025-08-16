import { useEffect, useState, useRef } from "react";

function useLogs(jobName) {
  const [logs, setLogs] = useState([]);
  const [logCount, setLogCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const logsRef = useRef([]); // 최신 상태 유지

  useEffect(() => {
    if (!jobName || jobName === "job") return;

    const decoder = new TextDecoder();
    let reader;
    let isCancelled = false;

    async function getLogs() {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/logs/${jobName}`);
        reader = response.body.getReader();

        while (!isCancelled) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });
          logsRef.current = [...logsRef.current, text];
          setLogs([...logsRef.current]);
          setLogCount((prev) => prev + 1);
        }
      } catch (e) {
        console.error("로그 fetch 실패:", e);
      } finally {
        setLoading(false);
      }
    }

    getLogs();

    return () => {
      isCancelled = true;
      reader?.cancel?.();
    };
  }, [jobName]);

  return { logs, logCount, loading };
}

export default useLogs;