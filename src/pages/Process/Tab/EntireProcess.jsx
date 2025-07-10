import SideBar from "../../../components/SideBar/SideBar";
import MenuBar from "../../../components/MenuBar/MenuBar";
import {useState, useEffect} from "react";
import "./Process.css";
import ProcessMenuBar from "../../../components/ProcessMenuBar/ProcessMenuBar.jsx";
import TasksTable from ".././components/TasksTable/TasksTable.jsx";

function Process(){

    function JobAddButton({ onClick }) {
        return (
            <div className="button-wrapper">
                <button onClick={onClick} className="add-button addTask">
                    <span className="plus-icon">＋</span>
                    작업 추가
                </button>
            </div>
        );
    }

    // get data from api
    const data =
        [
            [
                ['not started', 'page1', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page1', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'page1', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'page1', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'page1', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page1', 'hello project', '이소연', '2025-07-09', 'detail'],
                ['not started', 'page1', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page1', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'page1', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'page1', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'page1', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page1', 'hello project', '이소연', '2025-07-09', 'detail']
            ],
            [
                ['not started', 'page2', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page2', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'page2', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'page2', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'page2', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page2', 'hello project', '이소연', '2025-07-09', 'detail'],
                ['not started', 'page2', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page2', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'page2', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'page2', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'page2', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page2', 'hello project', '이소연', '2025-07-09', 'detail']
            ],
            [
                ['not started', 'page3', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page3', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'page3', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'page3', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'page3', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page3', 'hello project', '이소연', '2025-07-09', 'detail'],
                ['not started', 'page3', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page3', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'page3', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'page3', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'page3', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page3', 'hello project', '이소연', '2025-07-09', 'detail']
            ],
            [
                ['not started', 'page4', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page4', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'page4', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'page4', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'page4', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page4', 'hello project', '이소연', '2025-07-09', 'detail'],
                ['not started', 'page4', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page4', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'page4', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'page4', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'page4', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'page4', 'hello project', '이소연', '2025-07-09', 'detail']
            ],
            [
                ['finished', 'page5', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['finished', 'page5', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'page5', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['finished', 'page5', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'page5', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['finished', 'page5', 'hello project', '이소연', '2025-07-09', 'detail']
            ]
        ];
    const dataCount = 5;

    const [page, setPage] = useState(0);

    const handlePageIncrease = () => {
        if(page === dataCount-1){
            setPage(page);
        }
        else{
            setPage(page+1);
        }
    }
    const handlePageDecrease = () => {
        if(page === 0){
            setPage(page);
        }
        else{
            setPage(page-1);
        }
    }
    useEffect(()=>{
        // console.log(page);
    }, [page])

    return(
        <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                <ProcessMenuBar/>
                <div className="contents-wrapper">

                    {/*    contents*/}

                    <div className="name_and_functions">
                        <div className="title-sort-wrapper">
                            <div className="Tasks"><h3>TASKS</h3></div>
                            <label className="sort">
                                <select className="sort_methods">
                                    <option className="ascendingByDate">날짜 오름차순</option>
                                    <option className="descendingByDate">날짜 내림차순</option>
                                </select>
                            </label>
                        </div>
                        <JobAddButton/>

                    </div>
                    <TasksTable offset={page} data={data}/>
                </div>
                <div className="contents-wrapper">
                    <TablePageCounter
                        currentPage={page} totalPages={dataCount}
                        handlePageIncrease={handlePageIncrease}
                        handlePageDecrease={handlePageDecrease}/>
                </div>
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

export default Process
