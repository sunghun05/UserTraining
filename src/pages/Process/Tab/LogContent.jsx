import { useState, useRef, useEffect } from 'react';
import "./LogContent.css";
import useLogs from '../../../hooks/useLogs';
import { IoIosRefresh } from "react-icons/io";


function LogContent({ jobName }) {
    const [shouldFetchLogs, setShouldFetchLogs] = useState(false);
    const [status, setStatus] =useState("unkown");

    const { logs } = useLogs(shouldFetchLogs ? jobName : null); // 조건부 스트리밍
    const logWrapperRef = useRef(null);
    const logEndRef = useRef(null);
    const [autoScroll, setAutoScroll] = useState(true);
    const scrollTimeout = useRef(null);

    const handleCheckStatus = async () => {
          try {
              const res = await fetch(`${import.meta.env.VITE_API_URL}/db/job/status/${jobName}`);
              const data = await res.json();
              console.log(data);
              setStatus(data.data.status)
              if (data.data.status === "Running") {
                  setShouldFetchLogs(true);
              } else {
              
              }
          } catch (error) {
              console.error("상태 확인 실패:", error);
              alert("Job 상태 확인 중 에러 발생");
          }
      };


    // ✅ 사용자가 스크롤할 때: 자동 스크롤 잠깐 중지 후, 일정 시간 후 다시 켜기
    const handleScroll = () => {
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }
        setAutoScroll(false);

        scrollTimeout.current = setTimeout(() => {
            setAutoScroll(true);
        }, 1000); // 사용자가 스크롤 멈춘 뒤 1초 후 자동 스크롤 재개
    };

    useEffect(() => {
        if (autoScroll && logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs, autoScroll]);

    return (
        <div className="log-content">
            <div className='log-title'>
                <div className='log-status'>{status}</div>
                <button className="status-btn" onClick={handleCheckStatus}><IoIosRefresh /></button>
            </div>
            <div
                className="log-wrapper"
                onScroll={handleScroll}
                ref={logWrapperRef}
                style={{ overflowY: 'auto', maxHeight: '400px' }}
            >
                <ul>
                    {shouldFetchLogs && Array.isArray(logs) ? (
                        logs.map((item, index) => <li key={index}>{item}</li>)
                    ) : (
                        <li>Running 상태에서만 로그를 받아올 수 있습니다.</li>
                    )}
                    <div ref={logEndRef} />
                </ul>
            </div>
        </div>
  );
}

export default LogContent;
