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
    const imageName = useFetch("image/list");
    const codePath = useFetch("code/list");

    if (imageName.loading || codePath.loading) return <div>loading...</div>;

    function handleSubmit(){
        useSubmit('train', postSet, setJobName, onClose);
    }
  
    return (
      <form onSubmit={handleSubmit}>

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

export default Modal