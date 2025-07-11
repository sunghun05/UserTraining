
import useFetch from "../../hooks/usefetch.js";
import useSubmit from "../../hooks/useSubmit.js"
import "./modalForm.css"

function Modal({ isOpen, onClose}) {
    if (!isOpen) return null;
    return (
      <div className="modal-container">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="add-process">작업 추가</div>
          <ModalForm onClose={onClose} />
        </div>
      </div>
    );
  }

function ModalForm({ onClose }) {
    const {post, data, loading, error} = useSubmit('train', onClose);

    const projectName = useFetch("image/list");
    const imageName = useFetch("image/list");
    const codePath = useFetch("code/list");
    const priority = useFetch("image/list");


    if (imageName.loading || codePath.loading) return <div>loading...</div>;

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
            <Text labelName={"작업명"} name={"job_name"}/>
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
          <Text labelName={"코드 경로"} name={"code_file"}/>
          
          <button/>
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

function Text({labelName, name}){
    return (
      <div className="textfieldWrapper">
        {labelName}
        <input className="job_name"
                name={name}
              />
      </div>
    );
}
function Description() {
    return (
      <div className="textareaWrapper">
          <div >설명</div>
          <textarea name="description"/>
      </div>
    );
}

export default Modal