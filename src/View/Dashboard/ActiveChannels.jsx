import AddNewChannel from './AddNewChannel'
import './dashboard.scss'
import { FaRegEnvelope,FaWhatsapp, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { useState } from 'react'
import OffCanvas from '../../Components/OffCanvas/OffCanvas'
import { showToast } from '../../Toaster/Toaster'



const channelData = [
  {
    id: 1,
    name: 'Email',
    icon: <FaRegEnvelope />,
  },
  {
    id: 2,
    name: 'Facebook',
    icon: <FaFacebookF />,
  },
  {
    id: 3,
    name: 'WhatsApp',
    icon: <FaWhatsapp />,
  },
  {
    id: 4,
    name: 'Twitter',
    icon: <FaTwitter />,
  },
  {
    id: 5,
    name: 'Instagram',
    icon:<FaInstagram />,
  },
]

const ActiveChannels = () => {
  const [show, setShow] = useState(false)

  const handleClose = () =>{
    setShow(false)
  }
  const handleToast = ()=>{
        showToast('This is a warnning toast!', 'warnning');

  }
  return (
    <>
      <div className='channelMain'>
          <div className='channelUpper'>
            <span className='channelTitle'>Total Active Channel</span>
            <button className='channelAddbtn' 
              //  onClick={()=> setShow(true)}
              onClick={handleToast}
            >Add new</button>
          </div>
          <hr />
          <div className='channelLower'>
            {channelData.map((ele)=>(
              <div key={ele.id} className='channelList'>
                <span className={`channelIcon channelIcon-${ele.id}`}>{ele.icon}</span>
                <span className='channelName'>{ele.name}</span>
              </div>
            ))}
          </div>
      </div>
      <OffCanvas 
        show = {show}
        handleClose = {handleClose}
        placement = 'end'
        title= 'Add New Channel'
        children= {<AddNewChannel />}
      />

       
    </>

  )
}

export default ActiveChannels

