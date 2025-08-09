
import {useState, useEffect, use} from "react";
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

    //
    const user = getUserId();

    const [taskName, setTaskName] = useState("");

    const [selectedImageName, setSelectedImageName] = useState("");
    const [imageTags, setImageTags] = useState([]);

    const [_projectName, setprojectName] = useState("");

    const [_priority, setPriority] = useState("");

    const [CodePath, setCodePath] = useState("/");

    const [description, setDescription] = useState("");
    //

    const [selectedImageId, setSelectedImageId] = useState("");

    const imageName = useFetch("image/list/name");
    const priority = useFetch("priority/list");
    const projectName = {'data': {'data': ['테스트2', 'API test']}}

    const onClickFolder = (e) => {
      e.preventDefault();
      setIsFolderOpen(!isFolderOpen);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(
            `userName: ${user.user_name} 
            taskName: ${taskName}
            image: ${imageName}
            tag: ${imageTags}
            code path: ${CodePath}
            projectName: ${_projectName}
            priority: ${_priority}
            description: ${description}`
        )
    }

    useEffect(() => {
      if (
        !selectedImageName &&
        Array.isArray(imageName.data?.data) &&
        imageName.data.data.length > 0
      ) {
        setSelectedImageName(imageName.data.data[0]);
      }
    }, [imageName.data, selectedImageName]);
    
    useEffect(() => {
      const fetchTags = async () => {
        if (!selectedImageName) return;
        try {
          const res = await fetch(`http://192.168.10.17:8000/image/list/tag?image_name=${selectedImageName}`);
          const json = await res.json();
          if (json.success) {
            setImageTags(json.tags);
            if (json.tags.length > 0) {
              setSelectedImageId(json.tags[0].image_id);
            }
          }
        } catch (err) {
          setImageTags([]);
        }
      };
      fetchTags();
    }, [selectedImageName]);

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
        <form onSubmit={onSubmit}>
        <div className="job-form-wrapper">
          <div className="job-form-left-content">
            <Text labelName={"생성자"} name="user_name" value={user.user_name} readOnly></Text>
            <input type="hidden" name={"worker"} value={user.userId}/>
            <Text labelName={"작업명"} name={"task_name"} setValue={setTaskName}/>
            <div className="image-comboBox">
              <ImageComboBox
                labelName="이미지 선택"
                data={imageName.data?.data}
                width="70%"
                onChange={(e) => setSelectedImageName(e.target.value)}
              />
              <ImageComboBox
                labelName="태그"
                data={imageTags}
                width="30%"
                isObject={true}
                onChange={(e) => setSelectedImageId(e.target.value)}
              />
              <input type="hidden" name={"image_id"} value={selectedImageId}/>
            </div>
        </div>
        <div className="job-form-right-content">
          <ComboBox
              labelName="프로젝트명"
              selectName="project_name"
              data={projectName.data?.data}
              onChange={(e) => setprojectName(e.target.value)}
          />
          
          <ComboBox
                labelName="우선 순위"
                selectName="priority"
                data={priority.data?.data}
                onChange={(e) => setPriority(e.target.value)}
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
        <Description onChange={(e)=>setDescription(e.target.value)}/>
        <div className="submit-area">
            <button type="button" className="project-add-form-handle-btn0" onClick={onClose}>취소</button>
            <button type="submit" className="project-add-form-handle-btn1">추가</button>
        </div>
      </form>
      </div>
    );
}


function ComboBox({labelName, selectName, data, onChange}){
    return (
        <label className="labels">
            {labelName}
            <select name={selectName} onChange={onChange}>
                {Array.isArray(data) && data.map((item, index) => (
                    <option value={item} key={index}>{item}</option>
                ))}
            </select>
        </label>
    )
}

function ImageComboBox({ labelName, data, width, onChange, isObject = false }) {
  return (
    <label className="labels" style={{ width: width || "100%" }}>
      {labelName}
      <select onChange={onChange}>
        {Array.isArray(data) && data.map((item, index) => {
          const value = isObject ? item.image_id : item;
          const label = isObject ? item.tag : item;
          return <option value={value} key={index}>{label}</option>;
        })}
      </select>
    </label>
  );
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

function Description({onChange}) {
    return (
      <div className="textareaWrapper">
          <div >설명</div>
          <textarea name="task_description" onChange={onChange}/>
      </div>
    );
}

export default Modal