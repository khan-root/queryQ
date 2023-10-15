import React, { useState } from 'react'
import { BsTelephoneFill } from 'react-icons/bs'
import { contactIcons } from './data'
import useContact from '../../ViewModel/ContactsViewModel/contactsServices'
import contactGif from '../../assets/Images/groups.gif'
import Contact from './Contact'
import Groups from './Groups'
import { FaUsers } from 'react-icons/fa'
import { Button } from '../../Components'
import SVG from '../../Components/SVG/SVG'
import ContactGif from '../../assets/Images/contacts.gif'
import AddContact from './AddContact'
const ContactsList = () => {
    const [toggleState, setToggleState] = useState('')
    const [contactChannel, setContactChannel] = useState({
        title:'',
        icon: '',
        bg: '',
        iColor: '',
        tp_inbox_id: ''
    })
    const { 
        getWhatsappContacts, getEmailContacts, getFacebookContacts, getInstaContacts, getTwitterContacts, 
        allConatcts,allEmails, allFaceBook, allInsta, allTwitter,
        allGroups,
        data,
        groupData,groupContacts
    } = useContact()

    // const [channelToggle, setChannelToggle] = useState(0)
    const contactsCount = [allConatcts, allFaceBook, allEmails , allInsta, allTwitter]
    const [showGroup, setShowGroup] = useState(false)
    const [showSVG, setShowSVG] = useState(true)
    const contactsHandler = (ele)=>{
        setShowSVG(false)
        setShowGroup(true)
        setToggleState(ele.id)
        setContactChannel({
            title: ele.name,
            icon: ele.icon,
            bg: ele.bg,
            iColor: ele.iColor,
            tp_inbox_id: ele.tp_inbox_id
            
        })
        switch (ele.id) {
            case 1:
                getWhatsappContacts();
                allGroups();
                return;
            case 2: 
                getFacebookContacts();
                allGroups();
            return;
            case 3:
                getEmailContacts();
                allGroups();
            return;

            case 4:
                getInstaContacts()
                allGroups();
                return;
            case 5:
                getTwitterContacts()
                allGroups();
                return;
            default:
                return;
        }
    }
     
  return (
    <div className='container-fluid  mainContacts'>
        <div className='row contacts'>
            <div className='col-lg-3 p-0 contactsLeft'>
                <div className='leftTop'>
                   <span className='contactIcon'><BsTelephoneFill /></span> 
                   <span className='contactTitle'>Conatct List</span>
                </div>
                <div className='contactList'>

                    {contactIcons.map((ele, i)=>(
                        <div
                            key={ele.id}
                            className={`listContainer ${
                                toggleState === ele.id ? 'activeContactList' : ''
                            } ${ele.tap_inbox_id !== 16 ? 'disabledContact' : ''}`}
                            onClick={() => {
                                if (ele.tap_inbox_id === 16) {
                                contactsHandler(ele);
                                }
                            }}
                        >
                            
                                
                                <div className='contactChannelIcon'>
                                    <span 
                                        style={{ backgroundColor: ele.bg, color: ele.iColor }}
                                    >{ele.icon}</span>
                                </div>
                                <div className='contactListDetails'>
                                    <span className='title'>{ele.name}</span>
                                    <span className={`numbers ${contactsCount[i] > 0 ? '' : 'comingSoonText'}`}>
                                        {contactsCount[i] > 0 ? `${contactsCount[i]} Contacts` : "This channel will be added soon"}
                                    </span>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='col-lg-6 contactsCenter'>
                
               {showSVG ? (
                    <SVG 
                        gif={ContactGif}
                        showBtn={false}
                        height='250'
                        width='350'
                        firstText='Select Channel'
                    />
                    ) : (
                        
                            <Contact 
                                data={data}
                                contactChannel={contactChannel}
                                toggleState={toggleState}
                                tp_inbox_id={contactChannel?.tp_inbox_id}
                            />
                        ) 
                            // <SVG 
                            //     gif={ContactGif}
                            //     showBtn={true}
                            //     height='250'
                            //     width='350'
                            //     firstText="Haven’t Added"
                            //     secondText="Any Contact yet !"
                                
                            // />
                            
                    
                }
            </div>
            <div className={`col-lg-3 contactsRight`}>
                {showGroup ? 
                <>
                    <div className='groupExist'>
                        <span><FaUsers /></span>
                        <span>Existing Groups</span>
                    </div>
                    <div className='groupExistMain'>
                        {groupData.map((ele)=>(

                            
                            <div key={ele._id}> 

                                <Groups 
                                    data = {ele}
                                    contactChannel = { contactChannel }
                                />
                            </div>
                        ))} 
                    </div>
                </>
                : 
                <>
                    <div className='groupSvgContainer d-flex align-items-center justify-content-center' style={{height: '100%', background: '#F5F7FB', borderRadius: '10px'}}>
                        <div className='d-flex flex-column align-items-center justify-content-center gap-2'>
                            <div>
                                <img src={contactGif} alt='gif' width={200} height={195} style={{borderRadius:'20px'}}/>
                            </div>
                            <div className='d-flex flex-column align-items-center' style={{color: '#0D3A4F', fontWeight: '500'}}>
                                <span>Haven’t Created</span>
                                <span>Any Group yet !</span>
                            </div>
                            <div>
                                <Button 
                                    text='Create now'
                                    variant='primaryBtn'
                                    fontSize='13px'
                                />
                            </div>
                        </div>
                    </div>
                </>

                }
            </div>
            
        </div>
        

    </div>
  )
}

export default ContactsList