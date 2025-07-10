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
function Jobs({offset=0, data}) {

    return (
        <tbody>
        {data[offset].map((item, rowIdx) => (
            <tr key={rowIdx} className="data-row">

                <td key="상태" className="data-column"><Status status={item[0]}/></td>

                <td key="작업명" className="data-column">{item[1]}</td>
                <td key="프로젝트" className="data-column">{item[2]}</td>
                <td key="작업자" className="data-column">{item[3]}</td>
                <td key="작업일시" className="data-column">{item[4]}</td>
                <td key="설명" className="data-column">{item[5]}</td>

            </tr>
        ))}
        </tbody>
    );
}
function Status({status}) {
    let color = ''

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