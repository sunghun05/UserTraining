import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import "./Process.css";
import SubMenuBar from "./components/SubMenuBar/SubMenuBar";
import styled from 'styled-components'
import TasksTable from "./components/TasksTable/TasksTable.jsx";

function Process(){

    const AddButton = styled.button`
      display: flex;
      align-items: center;
      background-color: #3498db; /* 파란색 */
      height: 50%;
      color: #fff;
      border: none;
      border-radius: 20px;
      padding: 8px 20px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
      outline: none;
    
      &:hover {
        background-color: #2176bd;
      }
    `;

    const PlusIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-size: 18px;
`;

    function JobAddButton({ onClick }) {
        return (
            <div className="button-wrapper">
                <AddButton onClick={onClick} className="addTask">
                    <PlusIcon>＋</PlusIcon>
                    작업 추가
                </AddButton>
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
                    <TablePageCounter
                        currentPage={page} onPageChange={setPage} totalPages={data.length}/>
                </div>
            </div>
        </>
    );

}
function TablePageCounter({ currentPage=0, totalPages, onPageChange }) {
    console.log(totalPages)
    const pageNumbers = [];
    const maxPageButtons = 5; // 한 번에 보여줄 최대 페이지 버튼 수

    // 페이지 버튼 범위 계산
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
        endPage = Math.min(totalPages, maxPageButtons);
    } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - maxPageButtons + 1);
    }

    // 페이지 번호 배열 생성
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            {/* 이전 버튼 */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {/* 첫 페이지 */}
            {startPage > 1 && (
                <>
                    <button onClick={() => onPageChange(1)}>1</button>
                    {startPage > 2 && <span>...</span>}
                </>
            )}

            {/* 중간 페이지들 */}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={number === currentPage ? "active" : ""}
                >
                    {number}
                </button>
            ))}

            {/* 마지막 페이지 */}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span>...</span>}
                    <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                </>
            )}

            {/* 다음 버튼 */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
}

export default Process
