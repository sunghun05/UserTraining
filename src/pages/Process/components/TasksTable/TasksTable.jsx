
import {useNavigate} from "react-router-dom";
import "./TasksTable.css";
import {useEffect, useState} from "react";

import LoadingPage from "../../../../components/LoadingPage/LoadingPage.jsx";
import ErrorPage from "../../../../components/ErrorPage/ErrorPage.jsx";

function TasksTable({queries}) {

    const [page, setPage] = useState(0);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [statusCode, setStatusCode] = useState(null);
    const [error, setError] = useState(null);

    const queryString = new URLSearchParams(queries).toString();

    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks?page=${page+1}&${queryString}`);
                setStatusCode(response.status);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
                if(statusCode === null){
                    setStatusCode(500);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [page]);


    const handlePageIncrease = () => {
        if(data.pagination && page < data.pagination.total_pages - 1) {
            setPage(page + 1);
        }
    };

    const handlePageDecrease = () => {
        if(page > 0) {
            setPage(page - 1);
        }
    };

    if (loading) {
        return (
                <LoadingPage height_vmin={queries['per_page']*4.5}/>
        );
    }
    if(error) {
        return (
            <div className="entire-table">
                <ErrorPage msg={error.message} code={statusCode} cancelFun={null}/>
            </div>

        )
    }
    if(data.tasks.length === 0){
        return (
            <>
                <div className="no-data">Task doesn't exist</div>
            </>
        );
    }
    return (
        <>
            <div style={{
                height: `${(queries['per_page']+2)*5}vmin`,
                minHeight: `${queries['per_page']*50}px`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
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
                    <Jobs data={data.tasks || []}/>
                </table>

            </div>
            <TablePageCounter
            currentPage={page}
            totalPages={data.pagination?.total_pages || 1}
            handlePageIncrease={handlePageIncrease}
            handlePageDecrease={handlePageDecrease}/>
        </>
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
                    <td key="상태" className="taskTable-status-wrapper">
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
        <div className="taskTable-status">
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

        </div>
    )
}

function TablePageCounter({ currentPage, totalPages, handlePageIncrease, handlePageDecrease }) {
    return (
        <div className="pagination">
            <button onClick={handlePageDecrease} className="prevPageBtn">{"<"}</button>
            <span className="currentPage">{` ${currentPage+1} / ${totalPages} `}</span>
            <button onClick={handlePageIncrease} className="nextPageBtn">{">"}</button>
        </div>
    );
}

export default TasksTable;