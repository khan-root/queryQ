import './imageModal.scss'
import {  Modal } from 'react-bootstrap'
import Button from '../Button/Button'
import { BsSendFill } from 'react-icons/bs'

const ImageModal = (props) => {
  const {show, handleClose,data, handleAdd, size, positionData} = props


  const customModalStyle = {
    position: 'absolute',
    bottom: positionData.bottom - positionData.top,
    // top: positionData.top - positionData.bottom,
    right: positionData.right,
  };

 
    
   
  return (
    <Modal show={show} onHide={handleClose}
      style={customModalStyle}
      backdropClassName="modalbackdrop"
      size ={size}
    >
        
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className='filebody'>
        {data?.selectedFile?.type.includes("image/") && (
          <img src={data.prFile} alt="File Preview" style={{width: '100%'}}/>
        )}
        {data?.selectedFile?.type.includes("video/") && (
          <video controls>
            <source src={data.prFile} type={data?.selectedFile?.type} />
          </video>
        )}
        {data?.selectedFile?.type.includes("application/pdf") && (
          <div className='pdfFiles'>
            <embed src={data?.prFile} width="500" height="600" type="application/pdf" style={{width: '100%', height: '100%'}}/>
          </div>
        )}
        {!data?.selectedFile?.type.includes("image/") &&
          !data?.selectedFile?.type.includes("video/") &&
          data?.selectedFile?.type !== "application/pdf" && (
            <span>{data?.selectedFile?.name}</span>
        )}
      </Modal.Body>
      <Modal.Footer>
          <Button 
              text='Discard'
              variant='remBtn'
              onClick={handleClose}
              fontSize='14px'
              padding='0'
          /> 
          <Button 
              variant='primaryBtn'
              fontSize='14px'
              text = {<BsSendFill />}
              padding='0'
              onClick={handleAdd}
          />
      </Modal.Footer>
    </Modal>
  )
}

export default ImageModal