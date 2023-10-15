import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import './offCanvas.scss'

const OffCanvas = (props) => {


    const {show, handleClose, placement, children, title, style, autoClose} = props

    
  return (
    <Offcanvas show={show} placement={placement} className="mainCanvas" style={style}
      onHide={handleClose}
      backdrop= {autoClose ? 'true' : 'false'}

    >
        <Offcanvas.Header closeButton className='canvasHeader'>
          <Offcanvas.Title className='canvasTitle'>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='canvasBody'>
          {children}
        </Offcanvas.Body>
      </Offcanvas>
  )
}

export default OffCanvas