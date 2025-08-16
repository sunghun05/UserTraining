
import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { FaFolder, FaFile } from "react-icons/fa";
import './FolderForm.css'
import { getUserId } from "../../utils/getuser";
function FolderForm({CodePath, setCodePath, onClose}){
    const OnClickBtn = (isCancel) =>{
        if (isCancel) setCodePath('/');
        onClose?.();
    }

    return(
        <div className="folder-modal-container">
            <FolderContent setCodePath={setCodePath}/>
            <div className="path-title">경로: {CodePath}</div>
            <div className="path-btn-wrapper">
                <button type="button" className="path-button" onClick={() => OnClickBtn(false)}>선택</button>
                <button type="button" className="path-button" onClick={() => OnClickBtn(true)}>취소</button>
            </div>
        </div>
    )
}

function FolderContent({setCodePath}){
    //localstorage에서 uid 가져오기 -> 경로에 추가
    const userName = "ytj0903"
    //const userName = getUserId
    
    const { data, loading, error } = useFetch(`/folder/${userName}`);
    const [expanded, setExpanded] = useState({});
    
    const toggle = (path) =>
        setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
    
        if (!data?.data) {
            if (loading) return <div>로딩 중...</div>;
            if (error)   return <div>에러: {String(error)}</div>;
            return null;
        }


     // 재귀 렌더링 (열린 폴더만 children 표시)
    const renderNode = (node, depth = 0 ,parentPath = "") => {
        const path = parentPath ? `${parentPath}/${node.name}` : `/${node.name}`;
        const isOpen = !!expanded[path];
        const indent = { paddingLeft: `${depth * 1.25}rem` };

        // 폴더
        if (node.is_dir) {
            return (
            <div key={path}>
                <FolderRow 
                    name={node.name} 
                    ClickFolder = {() => toggle(path)}
                    indent={indent}
                />
                {isOpen &&
                    node.children?.map((child) => 
                        renderNode(child, depth + 1, path)
                )}
            </div>
            );
        }
        // 파일
        return (
            <FileRow 
                key={path}
                name={node.name}
                indent={indent}
                ClickFile ={() => setCodePath(node.path)}
                />
        );
    };

    return (
        <div className="folder-modal-content">
            {data.data.map((root) => renderNode(root))}
        </div>
    );
}


function FolderRow({ name, indent, ClickFolder }) {
  return (
    <div 
        className="row dir" 
        style={indent} 
        onClick={ClickFolder}
    >
      <FaFolder size={16} color="#FFCF49" style={{ marginRight: 4 }} />
      {name}
    </div>
  );
}

function FileRow({ name, indent, ClickFile}) {
  return (
    <div 
        className="row file" 
        style={indent}
        onClick={ClickFile}
    >
      <FaFile size={15} color="#60a5fa" style={{ marginRight: 4 }} />
      {name}
    </div>
  );
} 
export default FolderForm;
