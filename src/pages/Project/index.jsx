import SideBar from "../../components/SideBar/SideBar";
import MenuBar from "../../components/MenuBar/MenuBar";
import "./project.css";

function Project(){

    const { data, loading, error, statusCode } = useFetch('db/projects');

    console.log(data);
    console.log(loading)
    console.log(error)

    if(loading){
        return (
            <>
                <SideBar/>
                <div className="home-container">
                    <MenuBar/>
                    <LoadingPage/>
                </div>
            </>
        );
    }

    return(
        <>
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
                        <ProjectTable data={null}/>
                    </div>

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
        </table>
    )
}

export default Project
