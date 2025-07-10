import {useEffect, useState} from 'react'
import Modal from './modalForm';
import "./index.css"
import LogContent from './LogContent';


function Learning() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div/>
      <button onClick={() => setIsOpen(true)}>학습 버튼</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}
             ></Modal>
    </>
  )
}

export default Learning