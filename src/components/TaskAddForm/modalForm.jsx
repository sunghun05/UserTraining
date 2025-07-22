
import { useState } from "react";
import useFetch from "../../hooks/usefetch.js";
import useSubmit from "../../hooks/useSubmit.js"
import "./modalForm.css"
import { FaFolder } from "react-icons/fa";
import FolderForm from "./FolderForm.jsx";
import { getUserId } from "../../utils/getuser.js";

function Modal({ isOpen, onClose}) {
    if (!isOpen) return null;
    return (
      <div className="modal-container">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="add-process">작업 추가</div>
          <ModalForm onClose={onClose}/>
        </div>
      </div>
    );
  }



function ModalForm({ onClose}) {
    const {post, data, loading, error} = useSubmit('db/create_task', onClose);
    const [isFolderOpen, setIsFolderOpen] = useState(false);

    const imageName = useFetch("image/list");
    const [CodePath, setCodePath] = useState("/");
    const priority = useFetch("priority/list");
    const projectName = {'data': {'data': ['API test22', 'API test']}}
    const userID = getUserId();
    const onClickFolder = (e) => {
      e.preventDefault();
      setIsFolderOpen(!isFolderOpen);
    }
    if (imageName.loading || projectName.loading || priority.loading) return <div>loading...</div>;

    // 작업명(text)
    // -프로젝트명(dropdown)
    // -이미지 파일명(dropdown)
    // -코드위치(dropdown)
    // 우선순위(dropdown)
    // 설명(text)

    return (
      <form onSubmit={post}>
        <div className="job-form-wrapper">
          <div className="job-form-left-content">
            <Text labelName={"생성자"} name={"worker"} value={userID}></Text>
            <Text labelName={"작업명"} name={"task_name"}/>
            <ComboBox
            labelName="이미지 선택"
            selectName="image_name"
            data={imageName.data?.data}
          />
        </div>
        <div className="job-form-right-content">
          <ComboBox
              labelName="프로젝트명"
              selectName="project_name"
              data={projectName.data?.data}
          />
          
          <ComboBox
                labelName="우선 순위"
                selectName="priority"
                data={priority.data?.data}
          />
          
       
        </div>
        </div>
        <div className="codePath-wrapper">
          <Text 
            labelName={"코드 경로"} 
            name={"code_location"}
            value={CodePath}
            setValue={setCodePath}
          />
          <button type= "button"
            className="file-select-btn"
            onClick={onClickFolder}
          >
            <FaFolder size={17} color="#FFCF49"/>
          </button>
          {isFolderOpen && (
            <FolderForm CodePath = {CodePath} setCodePath = {setCodePath} onClose={setIsFolderOpen}/>
          )}
        </div>
        <Description/>
        <div className="submit-area">
          <button type="submit" className="add-task-button">추가</button>
          <button type="button" className="modal-close-button" onClick={onClose}>취소</button>
        </div>
      </form>
    );
}


function ComboBox({labelName, selectName, data}){
    return (
        <label className="labels">
            {labelName}
            <select name={selectName}>
                {Array.isArray(data) && data.map((item, index) => (
                    <option value={item} key={index}>{item}</option>
                ))}
            </select>
        </label>
    )
}

function Text({labelName, name, value, setValue}){
  const valueProp =
    value !== undefined ? { value, onChange: (e) => setValue(e.target.value) } : {};
    return (
      <div className="textfieldWrapper">
        {labelName}
        <input className="text-input"
                name={name}
                {...valueProp}
              />
      </div>
    );
}

function Description() {
    return (
      <div className="textareaWrapper">
          <div >설명</div>
          <textarea name="task_description"/>
      </div>
    );
}

export default Modal