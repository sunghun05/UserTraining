import SideBar from "../../../components/SideBar/SideBar";
import MenuBar from "../../../components/MenuBar/MenuBar";
import {useState, useEffect} from "react";
import "./Process.css";
import ProcessMenuBar from "../../../components/ProcessMenuBar/ProcessMenuBar.jsx";
import TasksTable from ".././components/TasksTable/TasksTable.jsx";
import Modal from "../../../components/TaskAddForm/modalForm.jsx";
import useFetch from "../../../hooks/useFetch.js";

function EntireProcess(){

    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://192.168.10.17:8000/db/tasks`,{
                    "page": (page+1)
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [page]);

    function JobAddButton() {
        return (
            <div className="button-wrapper">
                <button onClick={() => setIsOpen(true)} className="add-button addTask">
                    <span className="plus-icon">＋</span>
                    작업 추가
                </button>
            </div>
        );
    }

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
            <>
                <SideBar/>
                <div className="entire-process-container">
                    <MenuBar/>
                    <ProcessMenuBar/>
                    <div className="contents-wrapper">
                        loading...
                    </div>
                </div>
            </>
        );
    }
    if(error) {
        return <div>Error: {error.message}</div>
    }
    return(
        <>
            <SideBar/>
            <div className="entire-process-container">
                <MenuBar/>
                <ProcessMenuBar/>
                <div className="process-contents-wrapper">

                    {/*    contents*/}

                    <div className="name_and_functions">
                        <div className="title-sort-wrapper">
                            <div className="Tasks"><h1 style={{margin: '0',}}>TASKS</h1></div>
                            <label className="sort">
                                <select className="sort_methods">
                                    <option className="ascendingByDate">날짜 오름차순</option>
                                    <option className="descendingByDate">날짜 내림차순</option>
                                </select>
                            </label>
                        </div>
                        <JobAddButton/>
                        <Modal isOpen={isOpen}
                               onClose={() => setIsOpen(false)}/>
                    </div>
                    <TasksTable offset={page} data={data.tasks || []}/>
                </div>

                    <TablePageCounter
                        currentPage={page}
                        totalPages={data.pagination?.total_pages || 1}
                        handlePageIncrease={handlePageIncrease}
                        handlePageDecrease={handlePageDecrease}/>

            </div>
        </>
    );

}
function TablePageCounter({ currentPage, totalPages, handlePageIncrease, handlePageDecrease }) {
    // console.log(`total pages: ${totalPages}`);
    // console.log(`current pages: ${currentPage}`);
    return (
        <div className="pagination">
            <button onClick={handlePageDecrease} className="prevPageBtn">{"<"}</button>
            <span className="currentPage">{` ${currentPage+1} / ${totalPages} `}</span>
            <button onClick={handlePageIncrease} className="nextPageBtn">{">"}</button>
        </div>
    );
}

export default EntireProcess
