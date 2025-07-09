
import useFetch from "../../hooks/usefetch";
import useSubmit from "../../hooks/useSubmit.js"
function Modal({ isOpen, onClose, postSet, setJobName }) {
    if (!isOpen) return null;
    return (
      <div className="modal-container">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="add-process">작업 추가</div>
          <ModalForm postSet={postSet} setJobName={setJobName} onClose={onClose} />
        </div>
      </div>
    );
  }

function ModalForm({ postSet, setJobName, onClose }) {
    const {post, data, loading, error} = useSubmit('train', postSet, setJobName, onClose);

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

          <div className="textfieldWrapper">
              <ProjName/>
          </div>

          <ComboBox
              labelName="프로젝트명"
              selectName="project_name"
              data={projectName.data?.data}
          />
        <ComboBox
          labelName="이미지 선택"
          selectName="image_name"
          data={imageName.data?.data}
        />
        <ComboBox
          labelName="코드 경로"
          selectName="code_file"
          data={codePath.data?.data}
        />
          <ComboBox
              labelName="우선 순위"
              selectName="priority"
              data={priority.data?.data}
          />

          <div className="description">설명</div>
          <div className="textareaWrapper">
            <Description/>
          </div>

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

function ProjName(){
    return (
        <>
        작업명
            <input className="job_name"
                    name="job_name"
                   />
        </>
    );
}
function Description() {
    return (
      <>
          <textarea name="description"/>
      </>
    );
}

export default Modal