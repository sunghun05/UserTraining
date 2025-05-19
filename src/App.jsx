import {useEffect, useState} from 'react'
import "./App.css"

function handleSubmit(e){
    alert("hello");
    e.preventDefault();
    const form = e.target;
    console.log(form);
    const formData = new FormData(form);
    fetch('/train', {method: "POST", body: formData})
        .then((response)=>{response.json()})
        .then((json)=>{
            console.log("json" + json);
        })

    console.log(new URLSearchParams(formData).toString());

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    console.log([...formData.entries()]);

}

function Modal({isOpen, onClose, children1, children2}){
  if(!isOpen) return null;
  // console.log(children2);
  return (
    <div className="modal-overlay" >
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <form method="post" onSubmit={handleSubmit}>
            <label>
              label
              <select name="label1">
                {children1.map((item, index)=>{
                  return (<option value={item} key={index}>{item}</option>);
                })}
              </select>
            </label>
            <br/>
            <label>
              label
              <select name="label2">
                {children2.map((item, index)=>{
                  return (<option value={item} key={index}>{item}</option>);
                })}
              </select>
            </label>
        </form>
        <button type="submit" onClick={onClose} onSubmit={handleSubmit}>시작</button>
        <button type="reset" onClick={onClose}>취소</button>
      </div>
    </div>
  );
}


function App() {

    const [isOpen, setIsOpen] = useState(false);
    const [labels1, setLabels1] = useState([]);
    const [labels2, setLabels2] = useState([]);

    useEffect(() => {
        try {
            fetch("http://192.168.2.76:8000/image/list")
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
            fetch("http://192.168.2.76:8000/code/list")
                .then((response) => response.json())
                .then((json) => {
                    //console.log(json);
                    setLabels2(json);
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
             children1={labels1["data"]} children2={labels2["data"]}></Modal>
    </>
  )
}

export default App
