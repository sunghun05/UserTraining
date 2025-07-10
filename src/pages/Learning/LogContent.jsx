import { useState } from 'react';
import "./index.css";
import useLogs from '../../hooks/useLogs';

function LogContent({ jobName }) {
    console.log(jobName);
    const [shouldFetchLogs, setShouldFetchLogs] = useState(false);
    const { logs } = useLogs(shouldFetchLogs ? jobName : null); // 조건부 스트리밍

    const handleCheckStatus = async () => {
        try {
      const res = await fetch(`http://192.168.10.17:8000/job/status/${jobName}`);
      const data = await res.json();

      if (data.status === "Running") {
        setShouldFetchLogs(true);
      } else {
        alert(`현재 상태: ${data.status}`);
      }
    } catch (error) {
      console.error("상태 확인 실패:", error);
      alert("Job 상태 확인 중 에러 발생");
    }
  };

  return (
    <div className="log-content">
      <button onClick={handleCheckStatus}>Job 상태 확인</button>
      <ul>
        {shouldFetchLogs && Array.isArray(logs) ? (
          logs.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>아직 로그가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default LogContent;
