import { useState } from 'react'
import { channelIcons } from './data'
import OffCanvas from '../../Components/OffCanvas/OffCanvas'
import Button from '../../Components/Button/Button'
import NewChannel from './NewChannel'
// import styles from './channel.module.scss'

// import { Offcanvas } from 'react-bootstrap'
// import style from '../../styles/channelCanvas.module.scss'
// import NewChannel from './NewChannel'


const ChannlesList = () => {
    const [showChannel, setShowChannel] = useState(false)
    const [toggleTab, setToggleTab] = useState('')

    const channelHandler = (id)=>{
        setShowChannel(true)
        setToggleTab(id)
    }
    const [show, setShow] = useState(false)

    const handleClose = () =>{
        setShow(false)
    }

  return (
    <>
    <div className='channelsIcons'>
        {channelIcons.map((ele, i)=>(
            <div key={i}>
                <span key={ele.id} onClick={()=>channelHandler(ele.id)}
                    className={toggleTab === ele.id ? `channelIcon activeChannelIcon` : 'channelIcon'}

                >{ele.icon()}</span>
                <span className='badge'>{ele.badge}</span>
            </div>
        ))}
    </div>
    {showChannel && 
        <div className='channels'>
            <div className='channelsTop'>
                {/* <span className='channelsAdd' onClick={()=> setShow(true)}>Add new</span> */}
                <Button  
                    onClick={()=> setShow(true)} 
                    variant='primaryBtn'
                    text = 'Add new'
                    padding='5px 10px'
                    fontSize='13px'
                />
            </div>
            <div className='channelsList'>
                <div className='channelsListTop'>
                    <span className='channelsTitle'>
                        Channel(s)
                    </span>
                    <span className='channelAction'>
                        Action
                    </span>
                </div>
                <div className='channelsListBottom'>

                </div>
            </div>
        </div>
    }

    <OffCanvas 
        show={show}
        handleClose = {handleClose}
        placement = 'end'
        title= 'Add new channel'
        children= {<NewChannel />}
        style={{width: '30vw !important'}}
    />
    {/* <Offcanvas show={show} onHide={handleClose} placement={'end'} className={style.newChannelCanvas}>
        <Offcanvas.Header closeButton className={style.clsbbtn}>
          <Offcanvas.Title>Add new channel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={style.canvasBody}>
          <NewChannel />
        </Offcanvas.Body>
    </Offcanvas> */}
    </>
  )
}

export default ChannlesList