import { BsFillTrashFill, BsSearch } from 'react-icons/bs'
import { useEffect, useRef, useState } from 'react'
import ContactImge from '../../assets/Images/contact.png'
import useStore from '../../store/store'
import  OffCanvas  from '../../Components/OffCanvas/OffCanvas'
import AddContact from './AddContact'
import AddGroup from './AddGroup'
import Button from '../../Components/Button/Button'
import { MdEdit } from 'react-icons/md'
import useContact from '../../ViewModel/ContactsViewModel/contactsServices'
import ConfirmModal from '../../Components/Modal/ConfirmModal'
import UpdateContact from './UpdateContact'


const Contact = (props) => {
    const {data, contactChannel, toggleState, tp_inbox_id}  = props
    const scrollRef = useRef()
    const nextWhatsAppContacts = useStore((state) => state.getNextWhatsAppContacts)

    const {onChnageHandler,selectedContacts,handleSelectAll,handleSelectIndividual, deleteMulitpleContacts, deleteConfirm, closeConfirm,showConfirmModal,openSingleConfirm,
        singleConfirm, closeSingleConfirm, deleteSingleContact
    } = useContact()
    const [show, setShow] = useState(false)
    const [gcShow, setgcShow] = useState(false)
    const [contactData, setContactData] = useState({})
    const [updateCanvas, setUpdateCanavas] = useState(false)



  const handleClose = () =>{
    setShow(false)
  }

  const handleGroupClose = () =>{
    setgcShow(false)
  }

  const handleUpdate = (contact)=>{
    setContactData(contact)
    setUpdateCanavas(true)

  }
  
  

  


  


  const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isScrollAtBottom = scrollTop + clientHeight === scrollHeight;

        // setScrollPosition(scrollTop);
        if(isScrollAtBottom){
          switch (toggleState) {
            
            case 1:
              nextWhatsAppContacts()
              return;
            case 2:
              console.log('FaceBook')
              return;
            case 3:
              console.log('email')
              return;
            case 4:
              console.log('Instagram')
              return;
            case 5:
              console.log('Twitter')
              return;
          
            default:
              return;
          }
        }
    };


    useEffect(() => {
    // Attach the scroll event listener to the <tbody> element
    const scrollElement = scrollRef.current;
    if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', handleScroll);
            }
        };
  }, [toggleState]);
 
  return (
    <>
    <div className='contactList'>
        <div className='contactListTop'>
            <div className='titleIcon'>

                <span className='channelIcon'>{contactChannel.icon}</span>
                <span className='channelTitle'>{contactChannel.title}</span>
            </div>
            {toggleState === '' ? '' : 
            <div className='contactSearch'>
                <div className='search'>
                    <span><BsSearch /></span>
                    <input type='text' placeholder='Search Contact' name='contactSeacrh' onChange={(e)=>onChnageHandler(e)}/>
                </div>
                <div className='buttons'>
                    <div className='contactBtn'>
                        <Button 
                            onClick={()=> setShow(true)}
                            text = 'Add Contact'
                            variant='primaryBtn'
                            fontSize='13px'
                            padding= '3px 10px'   
                        />
                       
                        
                    </div>
                    <div className='groupBtn'>
                         <Button 
                            onClick={()=> setgcShow(true)}
                            text = 'Create New Group'
                            variant='primaryBtn'
                            fontSize='13px'
                            padding= '3px 10px'   
                        />
                    </div> 
                </div>
            </div>
            }
        </div>
        <div className='contactListsContainer'>
                <div className='tableHeader'>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Actions</th>
                </div>
            <div className='d-flex align-items-center justify-content-between contactSelecting'>
                    <div className='d-flex items-center gap-4'>
                        <input
                            type="checkbox"
                            checked={selectedContacts?.length > 0}
                            onChange={handleSelectAll}
                            style={{cursor: 'pointer'}}
                        />
                    </div>
                <div>
                    <span style={{color: selectedContacts?.length > 0 ? 'red': 'black', cursor: 'pointer'}}
                        onClick={deleteConfirm}
                    >
                        Delete Selected Contacts
                    </span>
                </div>
            </div>
            <div className='contactList' ref={scrollRef}>

                {data?.map((ele, i) => (
                    <div key={i} className={`userContactList ${i % 2 === 0 ? 'even' : 'odd'}`}>
                        <div className='user'>
                            <input
                                type="checkbox"
                                checked={selectedContacts.includes(ele._id)}
                                onChange={() => handleSelectIndividual(ele._id)}
                                style={{cursor: 'pointer'}}
                            />
                            <img src={ele.dp_link === "0" || !ele.dp_link ? ContactImge : ele.dp_link} alt='contactImage' style={{width: '30px', height: '30px', borderRadius: '50%'}}  />
                            <span>{ele.name}</span>
                        </div>
                        <div className='contactNumber'>
                            <span>

                                +{ele.tp_uid}
                            </span>
                        </div>
                        <div className='actions'>
                            <span className='update' onClick={()=> handleUpdate(ele)}><MdEdit /></span>
                            <span className='delete' onClick={()=> openSingleConfirm(ele._id)}><BsFillTrashFill /></span> 
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    <OffCanvas 
        show = {show}
        handleClose ={ handleClose}
        children = {<AddContact 
            toggleState = {toggleState}
            tp_inbox_id = {tp_inbox_id}
            close = {()=> setShow(false)}
        />}
        title='Add new Contact'
        placement= 'end'
        style={{width: '35vw'}}
    />
    <OffCanvas 
        show = {gcShow}
        handleClose ={ handleGroupClose}
        children = {<AddGroup 
            close={()=>setgcShow(false)}
        />}
        title='Add new Group'
        placement= 'end'
        style={{width: '50vw !important'}}

    />


    <OffCanvas 
        show= {updateCanvas}
        handleClose  = {()=> setUpdateCanavas(false)}
        children={
            <UpdateContact
                data = {contactData}
                close = {()=> setUpdateCanavas(false)}
            />
        }
        title='Update Contact'
        placement='end'
        style={{width: '30vw'}}
    />


    <ConfirmModal 
        show  = {showConfirmModal}
        handleClose = {closeConfirm}
        title = 'Confrim Delete' 
        confirmDelete = {deleteMulitpleContacts}
    />
    <ConfirmModal 
        show  = {singleConfirm}
        handleClose = {closeSingleConfirm}
        title = 'Confrim Delete' 
        confirmDelete = {deleteSingleContact}
    />


    </>
  )
}

export default Contact