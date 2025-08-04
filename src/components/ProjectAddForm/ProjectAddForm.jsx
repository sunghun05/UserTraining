
import "./ProjectAddForm.css"
import useSubmit from "../../hooks/useSubmit.js";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";

function ProjectAddForm({isOpen, setIsOpen}) {
    const {post, data, loading, error, statusCode} = useSubmit('db/create_project');



    const handleProjAddForm = (e)=>{
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    if (error){
        alert(`error: ${statusCode}`);
    }
    if(loading){
        return (
            <LoadingPage/>
        )
    }
    if(isOpen) {
        return (
            <>
                <div className="project-add-form-wrapper">
                    <div className="project-add-form-container">
                        <form onSubmit={post}>
                            <div className="project-add-textfieldWrapper">
                                <Text name="project_name" labelName="프로젝트 이름"/>
                            </div>
                            <div className="textareaWrapper">
                                <div>설명</div>
                                <textarea name="project_description"></textarea>
                            </div>
                            <div className="project-add-textfieldWrapper">
                                <Text name="members" labelName="멤버"/>
                            </div>
                            <div className="project-add-form-handle-button-wrapper">
                                <button className="project-add-form-handle-btn0"
                                        type="button"
                                        onClick={handleProjAddForm}
                                >취소
                                </button>
                                <button className="project-add-form-handle-btn1"
                                        type="submit"
                                >확인
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
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

export default ProjectAddForm;