import SideBar from "../../../../components/SideBar/SideBar.jsx";
import MenuBar from "../../../../components/MenuBar/MenuBar.jsx";
import LoadingPage from "../../../../components/LoadingPage/LoadingPage.jsx";
import ErrorPage from "../../../../components/ErrorPage/ErrorPage.jsx";
import ProcessMenuBar from "../../../../components/ProcessMenuBar/ProcessMenuBar.jsx";

import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import "./ImageManagement.css";

import useFetch from "../../../../hooks/useFetch.js";
import ImageAddBtn from "./ImageAddBtn.jsx";

function ImageManagement(){

    const [isOpen, setIsOpen] = useState(false);

    const baseImage = useFetch('image/base/list');
    const ImageName = useFetch('image/list/name');
    const [selectImage, setSelectImage] = useState('');


    const [TagData, setTagData] = useState([]);
    const [ImagePageInfo, setImagePageInfo] = useState({ page: 1, total_pages: 1 });
    const [Tagloading, setTagLoading] = useState(false);

    const fetchTags = async (page = 1, reset = false) => {
        if (Tagloading) return;
        setTagLoading(true);
    
        try {
            const res = await fetch(`http://192.168.10.17:8000/image/list/tag/detail?image_name=${selectImage}&page=${page}&per_page=10`);
            const json = await res.json();
    
            setTagData(prev =>
                reset ? json.data : [...prev, ...json.data]
            );
            setImagePageInfo({
                page: json.pagination.page,
                total_pages: json.pagination.total_pages
            });
        } catch (err) {
            console.error(err);
        }
        setTagLoading(false);
    };



    useEffect(() => {
            if (!selectImage) return;
        
            setTagData([]);  // 초기화
            setImagePageInfo({ page: 1, total_pages: 1 });
        
            fetchTags(1, true);
    }, [selectImage]);

    if (baseImage.loading) {
        return (
            <>
                <SideBar/>
                <div className="image-container">
                    <MenuBar/>
                    <ProcessMenuBar/>
                    <LoadingPage/>
                </div>
            </>
        );
    }
    if(baseImage.error) {
        return (
            <>
                <SideBar/>
                <div className="image-container">
                    <MenuBar/>
                    <ProcessMenuBar/>
                    <ErrorPage msg={baseImage.error.message} code={baseImage.statusCode} cancelFun={null}/>
                </div>
            </>
            
        )
    }

    return(
        <>
            <SideBar/>
            <div className="image-container">
                <MenuBar/>
                <ProcessMenuBar/>
                <div className="image-contents-wrapper">
                    <ImagesContainer
                        isOpen = {isOpen}
                        setIsOpen = {setIsOpen}
                        Imagedata={ImageName.data.data}
                        TagData ={TagData}
                        selectImage={selectImage}
                        setSelectImage = {setSelectImage}
                        onBottomReached={() => {
                            if (!Tagloading && ImagePageInfo.page < ImagePageInfo.total_pages) {
                              fetchTags(ImagePageInfo.page + 1);
                            }
                          }}
                    />
                    <BaseImagesContainer data={baseImage.data.data}/>
                </div>
            </div>
        </>
    );

}




function ImagesContainer({isOpen, setIsOpen, Imagedata, TagData, selectImage, setSelectImage, onBottomReached}){
    return(
        <div className="image-contents">
            <div className="image-header">
                <div className="image-title">Images</div>
                <ImageAddBtn isOpen={isOpen} setIsOpen= {setIsOpen}/>
            </div>
            <div className="image-table-container">
                <ImageNameTable 
                    data={Imagedata} 
                    setSelectImage = {setSelectImage}
                />

                {selectImage === '' ? 
                    <div className="image-name-none-container">
                        <div>이미지를 선택해 주세요</div>
                    </div> : 
                    <ImageTagTable 
                        TagData={TagData} 
                        onBottomReached = {onBottomReached}
                    />
                }
            </div>
        </div>  
    )
}

function ImageNameTable({data, setSelectImage}) {
    return(
        <div className="image-name-table-wrapper">
            <table className="image-name-table-container">
                <thead>
                    <tr>
                        <th style={{width: "20%"}}>번호</th>
                        <th style={{width: "80%"}}>이미지명</th>
                    </tr>
                </thead>
            </table>
            <div className="scrollable-body">
                <table className="image-name-table-container">
                    <tbody>
                        {data.map((row, i) =>(
                            <tr key={i} onClick={() => setSelectImage(row)} className={i%2===0 ? "base-table-row0" : "base-table-row1"}>
                                <td style={{width: "20%"}} className="base-table-content">{i+1}</td>
                                <td style={{width: "80%"}} className="base-table-content">{row}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function ImageTagTable({TagData, onBottomReached}){
    const label_map = [
        {label: "상태", key :"status", width: "20%"}, 
        {label: "태그", key :"tag", width: "50%"},
        {label: "생성자", key :"created_by", width: "30%"}
    ]
    const navigate = useNavigate();
    return(
        <div className="image-tag-table-wrapper">
            {/* 고정 헤더 */}
            <table className="image-tag-table-container">
                <thead>
                    <tr>
                        {label_map.map(({ label, key, width }) => (
                            <th key={key} style={{width: width}}>{label}</th>
                        ))}
                    </tr>
                </thead>
            </table>

            {/* 스크롤 바디 */}
            <ScrollWrapper onBottomReached={onBottomReached}>
                <table className="image-tag-table-container">
                    <tbody>
                        {TagData.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? "base-table-row1" : "base-table-row0"}>
                                {label_map.map(({ key, width }) => (
                                    <td 
                                        key={key} 
                                        className="base-table-content" 
                                        style={{width: width}}
                                        onClick={()=>{navigate(`/process/image/${row['id']}`)}}
                                    >
                                        {key === "status"
                                            ? (row[key] ? "정상" : "미빌드")
                                            : row[key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ScrollWrapper>
        </div>
    );
}

function BaseImagesContainer({data, selectImage}){
    return(
        <div className="base-image-contents">
            <div className="image-title">Base Images</div>
            <BaseImageTable data={data} selectImage={selectImage}/>
        </div>
    )
}

function BaseImageTable({data}){
    const label_map = [
        {label: "번호", key :"index", width: "10%"}, 
        {label: "이미지명", key :"image_name", width: "40%"},
        {label: "태그", key :"tag", width: "40%"}, 
        {label: "빌드된 이미지", key :"build_count", width: "10%"}, 
    ]
    return(
        <div className="base-image-table-wrapper">
            <table className="base-image-table-container">
                <thead>
                    <tr>
                        {label_map.map(({ label, key, width }) => (
                            <th key={key} style={{width: width}}>{label}</th>
                        ))}
                    </tr>
                </thead>
            </table>
            <div className="scrollable-base-body">
                <table className="base-image-table-container">
                    <tbody>
                        {data.map((row, i) => (
                            <tr 
                                key={i} 
                                className={i%2===0 ? "base-table-row0" : "base-table-row1"}
                                onClick={()=>{navigate(`/process/image/${row['id']}`)}}
                            >
                                {label_map.map(({ key,width }) => (
                                    <td key={key} style={{width: width}} className="base-table-content">
                                        {key === "index" ? i + 1 : row[key]}
                                    </td>    
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



function ScrollWrapper({ children, onBottomReached }) {
    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;

        if (scrollHeight - scrollTop - clientHeight < 50) {
            onBottomReached();  // 하단 도달 시 콜백
        }
    };

    return (
        <div className="scrollable-body" onScroll={handleScroll}>
            {children}
        </div>
    );
}


export default ImageManagement
