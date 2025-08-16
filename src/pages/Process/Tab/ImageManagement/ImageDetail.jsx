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
    const ImageData = useFetch(`/image/${image_id}`);

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
                            <ImageDetailContent data={ImageData?.data?.data}/>
                            <RequirementsContent data={ImageData?.data?.data?.requirements}/>
                        </div>
                    </div>
                    <div className="image-detail-bottom-layout">
                        <div className="image-detail-header">images</div>
                        <TasksTable queries={query}/>
                    </div>
                </div>
            </div>
        </>
    );
}

function ImageDetailContent({data}){
    const label_map = [
        { label: "이미지명", key: "image_name", render: v => v ?? "-" },
        { label: "태그", key: "tag", render: v => v ?? "-" },
        { label: "생성자", key: "created_by", render: v => v ?? "-" },
        { label: "생성 일자", key: "created_at", render: v => v ?? "-" },
    ];

    return(
        <div className="image-detail-top-layout-content-container">
            <div className="image-detail-top-layout-content-header">이미지 세부 정보</div>
            <div className="kv-list">
                {label_map.map(({ label, key, render }) => (
                    <FragmentRow key={key} label={label}>
                        {render(data?.[key])}
                    </FragmentRow>
                ))}
            <div className="kv-label">빌드 상태</div>
                <div className="kv-value">
                    {/* 노드별 상세 */}
                    <div className="status-node-list">
                        {Object.entries(data?.status || {}).map(([node, built]) => (
                        <span key={node} className={`pill ${built ? 'ok' : 'danger'}`}>
                            {node}: {built ? '빌드됨' : '미빌드'}
                        </span>
                        ))}
                    </div>
                </div>    
            </div>
        </div>
    )
}

function FragmentRow({label, children}){
    return (
      <>
        <div className="kv-label">{label}</div>
        <div className="kv-value">{children}</div>
      </>
    );
}

function RequirementsContent({data}){
    return(
        <div className="image-detail-top-layout-content-container">
            <div className="image-detail-top-layout-content-header">requirements</div>
            <div className="requirements-list">
                {data.map((row, i) => (
                    <div className="chip" key={row}>{row}</div>
                ))} 
            </div>
        </div>
    )
}




export default ImageDetail;