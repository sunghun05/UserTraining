import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import "./project.css";
import LoadingPage from "../../components/LoadingPage/LoadingPage.jsx";
import ErrorPage from "../../components/ErrorPage/ErrorPage.jsx";
import {useEffect, useState} from "react";
import ProjectAddForm from "../../components/ProjectAddForm/ProjectAddForm.jsx";

function Project(){

    const [page, setPage] = useState(0);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [statusCode, setStatusCode] = useState(null);
    const [error, setError] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://192.168.10.17:8000/db/projects?page=${page+1}`);
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

    const handleProjModal = () => {
        if(isOpen){
            setIsOpen(false);
        }else{
            setIsOpen(true);
        }
    }

    if(loading){
        return(
            <>
                <SideBar/>
                <div className="home-container">
                    <MenuBar/>
                    <LoadingPage/>
                </div>
            </>
        );
    }
    if(error){
        return(
            <>
                <SideBar/>
                <div className="home-container">
                    <MenuBar/>
                    <ErrorPage msg={error} code={statusCode}/>
                </div>
            </>
        );
    }

    return(
        <>
            <ProjectAddForm isOpen={isOpen} setIsOpen={setIsOpen}/>
            <SideBar/>

            <div className="home-container">
                <MenuBar/>

                <div className="contents-wrapper">
                    <div className="project-page-title">
                        <div className="project-page-title-text">
                            PROJECTS
                        </div>
                    </div>
                    <div className="project-page-content">
                        <ProjectTable data={data.projects || []}/>
                        <div className="project-page-proj-add-btn" onClick={handleProjModal}>
                            + 프로젝트 추가
                        </div>
                    </div>
                    <TablePageCounter currentPage={page} handlePageIncrease={handlePageIncrease}
                                      handlePageDecrease={handlePageDecrease} totalPages={data.pagination.total_pages}/>
                </div>
            </div>
        </>
    );
}

function ProjectTable({data}) {

    return (
        <table className="project-page-table">
            <thead>
            <tr className="column-head">
                <th><div className="tasktable-right-bar">ID</div></th>
                <th><div className="tasktable-right-bar">프로젝트</div></th>
                <th><div className="tasktable-right-bar">멤버</div></th>
                <th><div className="tasktable-right-bar">생성일시</div></th>
                <th><div>작업 개수</div></th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx%2===0 ? "proj-data-row0" : "proj-data-row1"} onClick={()=>{
                        onPressProject(item.id);
                    }}>
                        <td key="id">
                            {item['id']}
                        </td>
                        <td key="project_name">
                            {item['project_name']}
                        </td>
                        <td key="members">
                            {item['members']}
                        </td>
                        <td key="created_at">
                            {item['created_at']}
                        </td>
                        <td key="task_count">
                            {item['task_count']}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

function onPressProject({id}){
    console.log(id);
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

export default Project
