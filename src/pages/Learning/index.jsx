import {useEffect, useState} from 'react'
import Modal from './modalForm';
import "./index.css"
import useLogs from '../../hooks/useLogs';
function Log({Logs, logBoxRef}){
    return (
        <>
            <div className="log-content" ref={logBoxRef}>
                <ul>
                {Array.isArray(Logs) && Logs.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
                </ul>
            </div>
        </>
    )
}

function Learning() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPosted, setIsPosted] = useState(false);
    const [jobName, setJobName] = useState("job");
    const { logs, logCount, loading } = useLogs(jobName);

    const handleJobName = (name) => {
        setJobName(`${name}`)
        setIsPosted(false);
    }

  return (
    <>
      <Log Logs={logs}></Log>
      <button onClick={() => setIsOpen(true)}>학습 버튼</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}
             postSet={()=>setIsPosted(true)}
             setJobName={handleJobName}
             isPosted={isPosted}></Modal>
    </>
  )
}

export default Learning