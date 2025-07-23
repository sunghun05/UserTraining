
import {useNavigate} from "react-router-dom";
import "./TasksTable.css";

function TasksTable({offset, data}) {
    return (
        <div className="tasks-table-container">
            <table className="entire-table">
                <thead>
                <tr className="column-head">
                    <th><div className="tasktable-right-bar">상태</div> </th>
                    <th><div className="tasktable-right-bar">작업명</div> </th>
                    <th><div className="tasktable-right-bar">프로젝트</div> </th>
                    <th><div className="tasktable-right-bar">작업자</div> </th>
                    <th><div className="tasktable-right-bar">작업일시</div> </th>
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
            <tr key={rowIdx} className={rowIdx%2===0 ? "data-row0" : "data-row1"} onClick={()=>{
                onPressTask(item.id);
            }}>
                <td key="상태" className="taskTable-status">
                    <Status status={item['task_status']}/>
                </td>
                <td key="작업명">
                    {item['task_name']}
                </td>
                <td key="프로젝트">
                    {item['project_name']}
                </td>
                <td key="작업자">

                    {item['worker']}
                </td>
                <td key="작업일시">
                    {item['created_at']}
                </td>
                <td key="설명">
                    {item['task_description']}
                </td>
            </tr>
        ))}
        </tbody>
    );
}
function Status({status}) {

    const info = [['Enqueue', 'yellow'], ['Pending', 'grey'],
        ['Running', 'green'], ['Succeed', 'blue'], ['Error', 'red']];

    return (
        <>

            <div
                style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    background: info[status][1],
                    margin: '4px 8px 4px 4px',
                    boxShadow: '0 0 6px #8888'
                }}
            />
            <span>{info[status][0]}</span>

        </>
    )
}

export default TasksTable;