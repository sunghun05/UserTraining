import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
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
                    <TasksTable/>

                </div>
            </div>
        </>
    );
}

export default Process
