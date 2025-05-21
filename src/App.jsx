import {useEffect, useState} from 'react'
import "./App.css"

function handleSubmit(e, setJobName) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(formJson);
    let job_name = "";

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch('http://192.168.10.17:8000/train', {
        method: "POST",
        headers: headers,
        body: jsonData   // JSON 문자열로 전달
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태: ${response.status}`);
            }
            return response.json();
        })
        .then((json) => {
            console.log('POST 성공:', json);
            setJobName(json.job_name);

        })
        .catch(error => {
            console.error('오류:', error);
        });

    console.log(new URLSearchParams(formData).toString());
    console.log(formJson);
    console.log([...formData.entries()]);
}


function Modal({isOpen, onClose, children1, children2, setJobName}){
  if(!isOpen) return null;
  console.log(children2);
  return (
    <div className="modal-overlay" >
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <form method="post" onSubmit={handleSubmit}>
            <label>
              label
              <select name="image_name">
                {children1.map((item, index)=>{
                  return (<option value={item} key={index}>{item}</option>);
                })}
              </select>
            </label>
            <br/>
            <label>
              label
              <select name="code_file">
                {children2.map((item, index)=>{
                  return (<option value={item} key={index}>{item}</option>);
                })}
              </select>
            </label>
            <br/>
            <button type="submit" onSubmit={(e)=>{handleSubmit(e, setJobName);}} onClick={onClose}>시작</button>
            <button type="reset" onClick={onClose}>취소</button>
        </form>
      </div>
    </div>
  );
}
//http://192.168.10.17:8000/docs#

function App() {

    const [isOpen, setIsOpen] = useState(false);
    const [labels1, setLabels1] = useState([]);
    const [labels2, setLabels2] = useState([]);
    const [job_name, setJobName] = useState("");

    useEffect(() => {
        try {
            fetch("http://192.168.10.17:8000/image/list")
                .then((response) => response.json())
                .then((json) => {
                    //console.log(json);
                    setLabels1(json);
                });
        }catch(error){
            alert(`${error} occured.`);
        }

    }, []);
    useEffect(() => {
        try {
            fetch("http://192.168.10.17:8000/code/list")
                .then((response) => response.json())
                .then((json) => {
                    //console.log(json);
                    setLabels2(json);
                });
        }catch(error){
            alert(`${error} occured.`);
        }

    }, []);

    useEffect(() => {
        try {
            fetch(`http://192.168.10.17:8000/logs/${job_name}`)
                .then((response) => response.json())
                .then((json) => {
                    //console.log(json);
                    setLabels1(json);
                });
        }catch(error){
            alert(`${error} occured.`);
        }

    }, []);

  return (
    <>
      <div className="log-content">LOG 창</div>
      <button onClick={() => setIsOpen(true)}>학습 버튼</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}
             children1={labels1["data"]} children2={labels2["data"] setJobName={setJobName}}></Modal>
    </>
  )
}

export default App
