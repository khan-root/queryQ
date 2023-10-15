import { Button, Modal } from 'react-bootstrap'
import './modal.scss'


const ConfirmModal = (props) => {
    const {show, handleClose,  title,confirmDelete } = props
  return (

    <Modal
      show={show}
      onHide={handleClose}
      keyboard={false}
      centered
      dialogClassName='confirmModalMain'
      backdrop='static'
      
    >
      <Modal.Header className='confirmModalHeader'>
        <Modal.Title className='confirmModalTitle'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='confirmModalBody'>
          <span>Are you sure you want to delete this ?</span>
          <div className='d-flex align-items-center gap-2 confirmModalBodyButtons'>
            <button  onClick={handleClose}>
              Cancel
            </button>
            <button  onClick={confirmDelete}>Confirm</button>
          </div>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmModal