
import { BsTelephoneFill, BsFillEnvelopeFill, BsCalendar3 } from 'react-icons/bs'
import { formatTimestamp } from './utils/timesUtils';
import { AiFillSetting } from 'react-icons/ai';
import { Dropdown } from 'react-bootstrap';
import { priorityAlphas } from './utils/namesAlpha';
import useStore from '../../store/store';
import conversationApi from '../../Model/Data/Conversation/conversation';
import OffCanvas from '../../Components/OffCanvas/OffCanvas';
import Labels from './Labels';
import useConversation from '../../ViewModel/ConversationViewModel/conversationServices';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { showToast } from '../../Toaster/Toaster';

const UserDetails = (props) => {
  const { id, data, totalQ} = props
  const { allLabels, searchLabel,sreachLabelHandler,assignLabelToChat} = useConversation()

  
  const user = data.find(item => item._id === id);
  const [show, setShow] = useState(false)
  // console.log(user)
  const userName = user?.initiatorContactId?.name
  const userEmail = user?.initiatorContactI?.email 
  const entryTime = formatTimestamp(user?.entryTime)
  const phoneNo = user?.initiatorContactId?.tp_uid
  const priority = user?.priority
  const priorityColorProps = priorityAlphas(priority)
  const style = { 
    // backgroundColor: namescolorProps.bgColor, 
    color: priorityColorProps.textColor, 
  };
  const togglePriority = useStore((state)=> state.togglePriority)
    const handleToggle = async(pName, i, user)=>{
      
      const priority = {priority: i}
      const response = await conversationApi.priority(user._id, priority)
      if(response.status === 200){
        togglePriority(i, user)
        const name = pName.charAt(0).toUpperCase() + pName.slice(1);
        showToast(`Priority Change to ${name}`, 'success');
    }


    }
  return (
    <>
    <div className='userDetaislContainer'>
        <div className='userInfo'>
          <div className='userInfoContainer'>
            <div>
              {/* <img src={data?.full_dp} alt='userImage' /> */}
            </div>
            <div className='userName'>
              <span>{userName}</span>
            </div>
            <div className='userPriority'>
              <span className='priorityTitle'>Priority</span>
                <Dropdown className='dropdown'>
                  <Dropdown.Toggle id="dropdown-basic" className='priorityDropdown' style={style}>
                    {priorityColorProps.priorityName}
                  </Dropdown.Toggle>
                  <div style={{width: '100px',}}>
                      <Dropdown.Menu className='customMenu'>
                        {priorityColorProps.dropdownItems.map(({ name, key, color}) => (
                          <Dropdown.Item key={name} style={{ color }} className='dropdownItems'
                            onClick={()=>handleToggle(name, key, user)}
                          >
                            {name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                  </div>
                </Dropdown>
            </div>
            <div className='userContactNo'>
              <span className='contactIcon'><BsTelephoneFill /></span>
              <span className='contactNo'>+{phoneNo}</span>
            </div>
            <div className='userContactEmail'>
              <span className='emailIcon'><BsFillEnvelopeFill /></span>
              <span className='email'>{userEmail ? userEmail : 'no email'}</span>
            </div>
            <div className='userCreation'>
              <div className='calendarIcontitle'>
                <span className='calendarIcon'><BsCalendar3 /></span>
                <span className='title'>Date Created</span>
              </div>
              <div className='dateTime'>
                <span>{entryTime}</span>
              </div>
            </div>
            <div className='userBlock'>
              <span>Block</span>
            </div>
          </div>
        </div>

        <div className='userQueryInfo'>
          <div className='totalQueries'>
            <span className='queryCount'>{totalQ.totalStories}</span>
            <span className='queryDescription'>Total Queries</span>
          </div>
          <div className='userInteracting'>
            <span className='interactingTitle'>Interacting Since</span>
            <div className='interactingDate'>
              <span className='icon'><BsCalendar3 /></span>
              <span className='dataTime'>{formatTimestamp(totalQ?.interactingSince)}</span>
            </div>
          </div>
        </div>

        <div className='userLabelNotes'>
          <div className='userLabel'>
              <div className='labelTop'>
                <span className='labelTitle'>Label</span>
                <div className='labelIconTitle'>
                  <span className='labelIcon' onClick={()=> setShow(true)}><AiFillSetting /></span>
                  <span className='labelManage' onClick={()=> setShow(true)}>Manage labels</span>
                </div>
              </div>
              <div className='labelAdd'>
                <div className='labelInput'>
                  <span><BiSearch /></span>
                  <input name='name' value={searchLabel.name} onChange={sreachLabelHandler} placeholder='Search Label'/>
                </div>
                {searchLabel.labelResult && 
                  <div className='labelResult'>
                    <div className='labels'>
                      {allLabels?.map((data)=>(
                        <div key={data._id} className='labelList' onClick={()=>assignLabelToChat(data, id)}>
                          <div style={{background: data.color}} className='labelListColor'></div>
                          <div className='labelName'>
                            <span>{data.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              </div>
          </div>
          <div className='hr'></div>
          <div className='userNotes'>
              <div className='noteTop'>
                <span>Note</span>
              </div>
              <div className='noteAdd'>
                <span>Add Note</span>
              </div>
          </div>

        </div>

    </div>
    <OffCanvas 
      show= {show}
      placement ='end'
      title = 'Manage Lables'
      style={{width: '36vw'}}
      children={
        <Labels 
          data = {allLabels}
          id ={id}

        />
      }
      handleClose = {()=>setShow(false)}
    />
    </>
  )
}

export default UserDetails