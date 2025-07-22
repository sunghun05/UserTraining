
import {useNavigate} from "react-router-dom";
import "./TasksTable.css";

function TasksTable({offset, data}) {
    return (
        <div className="tasks-table-container">
            <table className="entire-table">
                <thead>
                <tr className="column-head">
                    <th>상태</th>
                    <th>작업명</th>
                    <th>프로젝트</th>
                    <th>작업자</th>
                    <th>작업일시</th>
                    <th>설명</th>
                </tr>
                </thead>
                <Jobs offset={offset} data={data}/>
            </table>
        </div>
    );
}
function Jobs({data}) {

    const navigate = useNavigate();

    const onPressTask = (id) => {
        navigate(`/process/detail?taskId=${id}`);
    }

    return (
        <tbody>
        {data.map((item, rowIdx) => (
            <tr key={rowIdx} className="data-row">
                <td key="상태" className="data-column"><Status status={item['task_status']}/><span>{item['task_status']}</span></td>
                <td key="작업명">
                    <span className="task_name" onClick={()=>{
                        onPressTask(item['id'])}}>{item['task_name']}</span>
                </td>
                <td key="프로젝트">{item['project_name']}</td>
                <td key="작업자">{item['worker']}</td>
                <td key="작업일시">{item['created_at']}</td>
                <td key="설명">{item['task_description']}</td>
            </tr>
        ))}
        </tbody>
    );
}
function Status({status}) {
    let color = '';

    if(status === 'enqueue'){
        color = 'gray';
    }else if(status === 'running'){
        color = 'green'
    }else if(status === 'finish'){
        color = 'blue'
    }else{
        color = 'red'
    }

    return (
        <div
            style={{
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                background: color,
                display: 'inline-block',
                margin: '4px',
                boxShadow: '0 0 6px #8888'
            }}
        />
    )
}

export default TasksTable;