import "./ImageAddBtn.css"
import useFetch from "../../../../hooks/useFetch";
import useSubmit from "../../../../hooks/useSubmit";
import { getUserId } from "../../../../utils/getuser";
import { useState, useEffect } from "react";
import LoadingPage from "../../../../components/LoadingPage/LoadingPage";
function ImageAddBtn({ isOpen, setIsOpen}){
        return (
            <div>
                <div className="image-button-wrapper">
                    <button onClick={() => setIsOpen(true)} className="image-add-button">
                        <span className="image-add-plus-icon">＋</span>
                        이미지 추가
                    </button>
                </div>
                <ImageForm
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />          
            </div>
        );
}

function ImageForm({ isOpen, onClose}){
    if (!isOpen) return null;
    return(
        <div className="image-form-container">
        <div className="image-form-content" onClick={(e) => e.stopPropagation()}>
           <ImageFormContent onClose={onClose}/>
        </div>
      </div>
    )
}

function ImageFormContent({onClose}){
    const {post, data, loading, error, statusCode} = useSubmit('image/create', onClose);

    const baseImage = useFetch("image/base/list");
    const user = getUserId();

    const [selectedBaseImage, setSelectedBaseImage] = useState("");
    
    useEffect(() => {
        if (Array.isArray(baseImage?.data?.data) && baseImage?.data?.data.length > 0) {
            setSelectedBaseImage(baseImage?.data?.data[0].id);
        }
    }, [baseImage.data]);

    if (baseImage.loading || loading) {
        return (
            <LoadingPage/>
        );
    }

    if(error){
        return(
          <ErrorPage msg={error.message} code={statusCode} cancelFun={onClose}/>
        )
      }
    return(
        <div>
            <div className="image-form-header">
                이미지 추가
           </div>
           <form className="image-form-wrapper" onSubmit={post}>
                <div className="image-form-top">
                    <Text 
                        labelName={"생성자"}
                        value={user.user_name}
                        readOnly 
                        width={"48%"}
                    />
                    <input type="hidden" name={"created_by"} value={user.user_name}/>
                    <ImageComboBox 
                        labelName={"베이스 이미지"} 
                        data={baseImage?.data?.data} 
                        width={"48%"}
                        onChange={(e) => setSelectedBaseImage(e.target.value)}
                    />
                    <input type="hidden" name={"base_image_id"} value={selectedBaseImage}/>
                </div>
                <div className="image-form-middle">
                    <Text 
                        labelName={"이미지명"}
                        name="image_name" 
                        width={"48%"}
                    />
                    <Text 
                        labelName={"태그"} 
                        name="tag" 
                        width={"48%"}
                    />
                </div>
                <Requirements/>
                <div className="image-submit-container">
                    <button type="submit" className="image-form-add-btn">추가</button>
                    <button type="button" className="image-form-cancel-btn" onClick={onClose}>취소</button>
                </div>
           </form>
        </div>
    )
}

function ImageComboBox({ labelName, data, width, onChange}) {
    return (
        <div className="image-form-comboBox-container" style={{ width: width || "100%" }}>
            <label>
                {labelName}
            </label>
            <select className="image-form-comboBox" onChange={onChange}>
                {Array.isArray(data) && data.map((item) => (
                <option key={item.id} value={item.id}>
                    {`${item.image_name}:${item.tag}`}
                </option>
                ))}
            </select>
        </div>
    );
  }
  

function Text({labelName, name, readOnly = false,value, width}){
    const valueProp =
        value !== undefined 
        ? {value}
        : {};

    return (
        <div className="image-form-text-container" style={{ width: width || "100%" }}>
          {labelName}
          <input className="image-form-text"
                  name={name}
                  value={value}
                  readOnly={readOnly}
                />
        </div>
      );
}

function Requirements() {
    return (
      <div className="RequirementsWrapper">
            <div >라이브러리</div>
            <textarea
                name="requirements"
                id="requirements"
                placeholder={"pandas==1.3.5\nnumpy>=1.21.0"}
            />
      </div>
    );
}


export default ImageAddBtn;