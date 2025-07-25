
import { useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import useSubmit from "../../hooks/useSubmit.js"
import "./modalForm.css"
import { FaFolder } from "react-icons/fa";
import FolderForm from "./FolderForm.jsx";
import { getUserId } from "../../utils/getuser.js";
import LoadingPage  from "../LoadingPage/LoadingPage.jsx"
import ErrorPage from "../ErrorPage/ErrorPage.jsx";

function Modal({ isOpen, onClose}) {
    if (!isOpen) return null;
    return (
      <div className="modal-container">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <ModalForm onClose={onClose}/>
        </div>
      </div>
    );
  }



function ModalForm({ onClose}) {
    const {post, data, loading, error, statusCode} = useSubmit('db/create_task', onClose);
    const [isFolderOpen, setIsFolderOpen] = useState(false);

    const imageName = useFetch("image/list");
    const priority = useFetch("priority/list");
    
    const [CodePath, setCodePath] = useState("/");
    
    const projectName = {'data': {'data': ['API test22', 'API test']}}
    const user = getUserId();
    
    const onClickFolder = (e) => {
      e.preventDefault();
      setIsFolderOpen(!isFolderOpen);
    }
    if (imageName.loading || projectName.loading || priority.loading || loading) {
      return (
          <LoadingPage/>
      );
    }

    if(imageName.error || projectName.error || priority.error){
      return(
        <ErrorPage msg={imageName.error.message} code={imageName.statusCode} cancelFun={onClose}/>
      );
    }

    if(error){
      return(
        <ErrorPage msg={error.message} code={statusCode} cancelFun={onClose}/>
      )
    }


    return (
      <div>
        <div className="add-process">작업 추가</div>
        <form onSubmit={post}>
        <div className="job-form-wrapper">
          <div className="job-form-left-content">
            <Text labelName={"생성자"} value={user.user_name} readOnly></Text>
            <input type="hidden" name={"worker"} value={user.userId}/>
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
      </div>
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

function Text({labelName, name, value, setValue, readOnly = false}){
  const valueProp =
    value !== undefined 
    ? { 
      value,
      onChange: (e) => setValue(e.target.value) 
    } 
    : {};
    
    return (
      <div className="textfieldWrapper">
        {labelName}
        <input className="text-input"
                name={name}
                {...valueProp}
                readOnly={readOnly}
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