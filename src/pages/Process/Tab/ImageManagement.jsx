import SideBar from "../../../components/SideBar/SideBar";
import MenuBar from "../../../components/MenuBar/MenuBar";
import {useState, useEffect} from "react";
import "./ImageManagement.css";
import ProcessMenuBar from "../../../components/ProcessMenuBar/ProcessMenuBar.jsx";
import LoadingPage from "../../../components/LoadingPage/LoadingPage.jsx";
import ErrorPage from "../../../components/ErrorPage/ErrorPage.jsx";
import useFetch from "../../../hooks/useFetch.js";
function ImageManagement(){

    const [isOpen, setIsOpen] = useState(false);
    const baseImage = useFetch('image/base/list');
    const ImageName = useFetch('image/list/name');
    const [selectImage, setSelectImage] = useState('');
    const [TagData, setTagData] = useState({});
        
    useEffect(() => {
        const fetchTags = async () => {
            if (!selectImage) return;
            try {
                const res = await fetch(`http://192.168.10.17:8000/image/list/tag?image_name=${selectImage}`);
                const json = await res.json();
                if (json.success) {
                    console.log(json.tags)
                    setTagData(json.tags);
                }
            } catch (err) {
                setImageTags([]);
            }
        };
            fetchTags();
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
                        data={ImageName.data.data}
                        TagData ={TagData?.data?.data}
                        selectImage={selectImage}
                        setSelectImage = {setSelectImage}
                    />
                    <BaseImagesContainer data={baseImage.data.data}/>
                </div>
            </div>
        </>
    );

}

function ImagesContainer({data, TagData, selectImage, setSelectImage}){
    return(
        <div className="image-contents">
            <div className="image-title">Images</div>
            <div className="image-table-container">
                <ImageNameTable data={data} setSelectImage = {setSelectImage}/>
                {selectImage === '' ? <div className="image-name-none-container">이미지를 선택해 주세요</div> : <ImageTagTable TagData={TagData} />}
            </div>
        </div>  
    )
}

function ImageTagTable({TagData}){

    return(
            <table className="image-tag-table-container">
                        {console.log(TagData)}
            </table>
    )
}

function ImageNameTable({data, setSelectImage}) {
    return(
        <table className="image-name-table-container">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>이미지명</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) =>(
                    <tr key={i} onClick={() => setSelectImage(row)} className={i%2===0 ? "base-table-row0" : "base-table-row1"}>
                        <td className="base-table-content">{i+1}</td>
                        <td className="base-table-content">{row}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
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
        {label: "번호", key :"index"}, 
        {label: "이미지명", key :"image_name"},
        {label: "태그", key :"tag"}, 
        {label: "빌드된 이미지", key :"build_count"}, 
    ]
    
    return(
        <table className="base-image-table-container">
            <thead>
                <tr>
                    {label_map.map(({ label, key }) => (
                        <th key={key}>{label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i} className={i%2===0 ? "base-table-row0" : "base-table-row1"}>
                        {label_map.map(({ key }) => (
                            <td key={key} className="base-table-content">
                                {key === "index" ? i + 1 : row[key]}
                            </td>    
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default ImageManagement
