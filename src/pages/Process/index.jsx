import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import "./Process.css";
import SubMenuBar from "./components/SubMenuBar/SubMenuBar";
import styled from 'styled-components'
import TasksTable from "./components/TasksTable/TasksTable.jsx";

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
                ['not started', 'hello', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'uu', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'o', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'hello', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'hello', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'hello', 'hello project', '이소연', '2025-07-09', 'detail'],
                ['not started', 'hello', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'uu', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'o', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'hello', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'hello', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'hello', 'hello project', '이소연', '2025-07-09', 'detail']
            ],
            [
                ['not started', 'hello', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'uu', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'o', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'hello', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'hello', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'hello', 'hello project', '이소연', '2025-07-09', 'detail'],
                ['not started', 'hello', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'uu', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'o', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'hello', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'hello', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'hello', 'hello project', '이소연', '2025-07-09', 'detail']
            ],
            [
                ['not started', 'hello', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'uu', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'o', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'hello', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'hello', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'hello', 'hello project', '이소연', '2025-07-09', 'detail'],
                ['not started', 'hello', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'uu', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'o', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'hello', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'hello', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'hello', 'hello project', '이소연', '2025-07-09', 'detail']
            ],
            [
                ['not started', 'hello', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'uu', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'o', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'hello', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'hello', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'hello', 'hello project', '이소연', '2025-07-09', 'detail'],
                ['not started', 'hello', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'uu', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'o', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['error', 'hello', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['not started', 'hello', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['progress', 'hello', 'hello project', '이소연', '2025-07-09', 'detail']
            ],
            [
                ['finished', 'hello', 'hello project', '왕성훈', '2025-07-09', 'detail'],
                ['finished', 'uu', 'labops project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'o', 'labops project', '왕성훈', '2025-07-09', 'detail'],
                ['finished', 'hello', 'hello project', '윤태준', '2025-07-09', 'detail'],
                ['finished', 'hello', 'inslab project', '왕성훈', '2025-07-09', 'detail'],
                ['finished', 'hello', 'hello project', '이소연', '2025-07-09', 'detail']
            ]
        ];

    const [page, setPage] = useState(0);
    useEffect(()=>{
        console.log(page);
    }, [page])

    return(
        <>
            <SideBar/>
            <div className="home-container">
                <MenuBar/>
                <SubMenuBar/>
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
                    {/*<TablePageCounter*/}
                    {/*    currentPage={page} onPageChange={setPage} totalPages={data.length-1}/>*/}
                </div>
            </div>
        </>
    );

}
// function TablePageCounter({ currentPage=0, totalPages, onPageChange }) {
//     console.log(totalPages)
//
//     // 페이지 버튼 범위 계산
//     let startPage = 1;
//     let endPage = totalPages;
//
//     if (currentPage <= 3) {
//         endPage = Math.min(totalPages, maxPageButtons);
//     } else if (currentPage >= totalPages - 2) {
//         startPage = Math.max(1, totalPages - maxPageButtons + 1);
//     }
//
//     // 페이지 번호 배열 생성
//     for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//     }
//
//     return (
//         <div className="pagination">
//
//         </div>
//     );
// }

export default Process
