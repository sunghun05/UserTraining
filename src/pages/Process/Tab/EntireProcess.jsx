import SideBar from "../../../components/SideBar/SideBar";
import MenuBar from "../../../components/MenuBar/MenuBar";
import {useState, useEffect} from "react";
import "./Process.css";
import ProcessMenuBar from "../../../components/ProcessMenuBar/ProcessMenuBar.jsx";
import TasksTable from ".././components/TasksTable/TasksTable.jsx";
import LoadingPage from "../../../components/LoadingPage/LoadingPage.jsx";
import ErrorPage from "../../../components/ErrorPage/ErrorPage.jsx";
import TaskAddButton from "../../../components/TaskAddBtn/TaskAddBtn.jsx";
function EntireProcess(){

    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [statusCode, setStatusCode] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://192.168.10.17:8000/db/tasks?page=${page+1}`);
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
            <>
                <SideBar/>
                <div className="entire-process-container">
                    <MenuBar/>
                    <ProcessMenuBar/>
                    <LoadingPage/>
                </div>
            </>
        );
    }
    if(error) {
        return (
            <>
                <SideBar/>
                <div className="entire-process-container">
                    <MenuBar/>
                    <ProcessMenuBar/>
                    <ErrorPage msg={error.message} code={statusCode} cancelFun={null}/>
                </div>
            </>
            
        )
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
                        <TaskAddButton
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                    <div style={{width: '65vw',}}>
                        <TasksTable data={data.tasks || []}/>
                    </div>
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
