import { useState, useEffect } from 'react';
import "./TasksTable.css";

function TasksTable() {


    return (
        <>
            <div className="tasks-table-container">
                <div className="column-names">
                    <ul className="column">
                        <li>상태</li>
                        <li>작업명</li>
                        <li>프로젝트</li>
                        <li>작업자</li>
                        <li>작업일시</li>
                        <li>설명</li>
                    </ul>
                </div>
                <Jobs />
            </div>
        </>
    );
}
function Jobs() {

    // get data from api
    const data = [
        ['o', 'hello', 'hello project', '왕성훈', '2025-07-09', 'detail'],
        ['o', 'uu', 'labops project', '윤태준', '2025-07-09', 'detail'],
        ['o', 'o', 'labops project', '왕성훈', '2025-07-09', 'detail'],
        ['o', 'hello', 'hello project', '윤태준', '2025-07-09', 'detail'],
        ['o', 'hello', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
        ['o', 'hello', 'hello project', '이소연', '2025-07-09', 'detail']
    ]

    return (
        <>
            <div className="table-content">
                {Array.isArray(data) && data.map(item => (
                    <ul key={item} className="column-data">
                        {Array.isArray(item) && item.map((detail) => (
                            <li value={detail} key={detail} className="column">{detail}</li>
                        ))}
                    </ul>
                ))}
            </div>
        </>
    )
}

export default TasksTable;