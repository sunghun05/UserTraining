
import "./ProjectAddForm.css"
import useSubmit from "../../hooks/useSubmit.js";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import { useState, Fragment} from "react";

function ProjectAddForm({isOpen, setIsOpen}) {
    const {post, data, loading, error, statusCode} = useSubmit('create_project');
    const userData = ['ytj0903', 'admin']
    
    const [selectedUser, setSelectedUser] = useState([]);

    const handleProjAddForm = (e)=>{
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    const toggleTag = (value) => {
        setSelectedUser(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };


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
                            
                            <div className="project-add-textfieldWrapper">
                            <Tagbox
                                data={userData}
                                toggleHandle={toggleTag}
                                selectedUser={selectedUser}
                            />
                            </div>
                            <div className="textareaWrapper">
                                <div>설명</div>
                                <textarea name="project_description"></textarea>
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

function Tagbox({data, toggleHandle, selectedUser}) {
    return(
        <div>
            멤버
            <div className="tag-container">          
                {data.map((user) => (
                    <Fragment key={user}>
                    <button
                      type="button"
                      onClick={() => toggleHandle(user)}
                      className={selectedUser.includes(user) ? "tag selected" : "tag"}
                    >
                      {user}
                    </button>
                    {selectedUser.includes(user) && (
                      <input type="hidden" name="members" value={user} />
                    )}
                  </Fragment>
                ))}
            </div>
        </div>
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


export default ProjectAddForm;