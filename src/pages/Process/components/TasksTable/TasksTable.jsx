import { useState, useEffect } from 'react';
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
    console.log(`data: ${data[0].type}`);
    return (
        <tbody>
        {data.map((item, rowIdx) => (
            <tr key={rowIdx} className="data-row">
                <td key="상태" className="data-column"><Status status={item['task_status']}/></td>
                <td key="작업명" className="data-column">
                    <span id="task_name">
                        {item['task_name']}
                        <div className="dropdown">클릭하여 보기</div>
                    </span>

                </td>
                <td key="프로젝트" className="data-column">{item['project_name']}</td>
                <td key="작업자" className="data-column">{item['worker']}</td>
                <td key="작업일시" className="data-column">{item['created_at']}</td>
                <td key="설명" className="data-column">{item['task_description']}</td>
            </tr>
        ))}
        </tbody>
    );
}
function Status({status}) {
    let color = '';

    if(status === 'not started'){
        color = 'gray';
    }else if(status === 'progress'){
        color = 'green'
    }else if(status === 'finished'){
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