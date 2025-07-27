import Modal from "../TaskAddForm/modalForm";
import "./TaskAddBtn.css"
function TaskAddButton({isOpen, setIsOpen}) {
    return (
        <div>
            <div className="task-button-wrapper">
                <button onClick={() => setIsOpen(true)} className="task-add-button">
                    <span className="task-add-plus-icon">＋</span>
                    작업 추가
                </button>
            </div>
            <Modal 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />            
        </div>
    );
}

export default TaskAddButton