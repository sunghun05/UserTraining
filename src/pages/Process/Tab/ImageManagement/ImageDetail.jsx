import SideBar from "../../../../components/SideBar/SideBar.jsx";
import MenuBar from "../../../../components/MenuBar/MenuBar.jsx";
import LoadingPage from "../../../../components/LoadingPage/LoadingPage.jsx";
import ErrorPage from "../../../../components/ErrorPage/ErrorPage.jsx";
import ProcessMenuBar from "../../../../components/ProcessMenuBar/ProcessMenuBar.jsx";

import {useState, useEffect} from "react";

import { useSearchParams } from "react-router-dom";
import "./ImageDetail.css";

import TasksTable from "../../components/TasksTable/TasksTable.jsx";
import useFetch from "../../../../hooks/useFetch.js";

function ImageDetail(){
    const [params] = useSearchParams();
    const image_id = params.get("imageId");
    const ImageData = useFetch(`image/${image_id}`);

    const query = {
        "per_page": 8,
    }

    if (ImageData.loading) {
        return (
            <>
                <SideBar/>
                <div className="image-detail-container">
                    <MenuBar/>
                    <ProcessMenuBar/>
                    <LoadingPage/>
                </div>
            </>
        );
    }
    if(ImageData.error) {
        return (
            <>
                <SideBar/>
                <div className="image-detail-container">
                    <MenuBar/>
                    <ProcessMenuBar/>
                    <ErrorPage msg={ImageData.error.message} code={ImageData.statusCode} cancelFun={null}/>
                </div>
            </>
            
        )
    }

    return(
        <>
            <SideBar/>
            <div className="image-detail-container">
                <MenuBar/>
                <ProcessMenuBar/>
                <div className="image-detail-contents-wrapper">
                    <div className="image-detail-top-layout">
                        <div className="image-detail-header">images</div>
                        <div className="image-detail-top-layout-content">
                            <ImageDetailContent data={ImageData?.data.data}/>
                            <RequirementsContent data={ImageData?.data.data.requirements}/>
                        </div>
                    </div>
                    <TasksTable queries={query}/>
                </div>
            </div>
        </>
    );
}

function ImageDetailContent({data}){
    const label_map = [
        {label: "이미지명", key :"image_name"}, 
        {label: "태그", key :"tag",},
        {label: "생성자", key :"created_by"},
        {label: "생성 일자", key :"created_at"},
        {label: "빌드 상태", key : "status"}
    ]

    return(
        <div >
            <div>이미지 세부 정보</div>
            <div>
                {label_map.map(({ key, width }) => (
                    <div
                        key={key} 
                        className="base-table-content" 
                        style={{width: width}}
                        onClick={()=>{navigate(`/process/image/detail?imageId=${data['id']}`)}}
                    >
                        {key === "status"
                            ? ""
                            : data[key]}
                    </div>
                ))}
            </div>
        </div>
    )
}

function RequirementsContent({data}){
    return(
        <div>
            <div>requirements</div>
            <div>
                {data.map((row, i) => (
                    <div key={row}>{row}</div>
                ))} 
            </div>
        </div>
    )
}




export default ImageDetail;