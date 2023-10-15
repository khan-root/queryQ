import { BsChatDots, BsSearch } from 'react-icons/bs'
import { Dropdown } from 'react-bootstrap';
import useConversation from '../../ViewModel/ConversationViewModel/conversationServices';
import Button from '../../Components/Button/Button'
import { qStatus } from '../../Utils/Data';
import QueriesList from './QueriesList'
import ConversationTemplate from './ConversationTemplate'
import SVG from '../../Components/SVG/SVG';
import NewConversation from './NewConversation';
import ConversationGif from '../../assets/Images/conversation.gif'
import OffCanvas from '../../Components/OffCanvas/OffCanvas';
import { useState } from 'react';


const ConversationQueries = () => {

  const {       
        selectedStatus,
        statusOptions,
        scrollRefState,
        handleSelectType,
        toggleState,
        QueryIndex,
        messageTypes, 
        handleMessageTypeClick, 
        MessageType, 
        data, 
        chatInboxHandler,
        chatData, 
        chatStoryData, 
        scrollMainRef, 
        scrollSubRef,
        showChat,  
        chatLables, 
        searchValues, 
        searchChangeHandler    
    } = useConversation();
    
    const [show, setShow] = useState(false)

    const handleClose = () =>{
        setShow(false)
    }

  return (
    <>
    {data.length <0  ? 
        <div className='emptyConversation'>
            <SVG 
                firstText = "Haven't Created"
                secondText = "Any Conversation Yet !"
                compo = {<NewConversation />}
                gif = {ConversationGif}
            />
        </div>
    : (
        <>
    <div className='conversationQueriesContainer'>
        <div className='conversationQueriesContainerTop'>
            <div className='topIconTitle'>
                <span className='icon'><BsChatDots /></span>
                <span className='title'>Queries</span>
            </div>
            <Button 
                variant='primaryBtn'
                text='New conversation'
                fontSize = '13px'
                padding='5px 10px'
                onClick={()=>setShow(true)}
            />
            
        </div>
        <div className='conversationQueriesheader'>
            <div className='headerAssignedBtn'>
                {messageTypes.map((type) => (
                    <span className= {type === MessageType ? `assignedBtnList active`  : `assignedBtnList`}  key={type} onClick={() => handleMessageTypeClick(type)}>     
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                ))}
            </div>
            <div className='queriesSearch'>
                <div className='searchIconInput'>
                    <span><BsSearch /></span>
                    <input placeholder='Search'  name='name' onChange={searchChangeHandler}/>
                </div>

                {MessageType === 'all' && (
                    <Dropdown className='statusDropDown'>
                        <Dropdown.Toggle  id="dropdown-basic" className='dropdownToggle'>
                            {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='dropdownMenu' style={{ minWidth: '150px' }}>

                            {statusOptions.map(status => (
                                <Dropdown.Item key={status} value={status} onClick={() => handleSelectType(status)} className='dropdownMenuItem'>
                                    <span style={{ color: qStatus[status].statusColor }}>{qStatus[status].statusIcon()}</span>
                                    <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                 )}   
            </div>
        </div>
      
        <div className='messageContainer' ref={scrollRefState ? scrollMainRef : scrollSubRef}>
            {data?.map((ele, i)=>{
                return (
                    <div key={i} onClick={()=>chatInboxHandler(ele._id, i)} className={`checkCss ${toggleState === ele._id ? 'testActive' : 'textUnActive'} 
                        ${QueryIndex === i - 1 ? 'above-active' : ''
                        } ${QueryIndex === i+ 1 ? 'below-active' : ''}
                    `}> 
                        <QueriesList
                            data={ele}
                            
                        /> 
                    </div>
                );
            })}
        </div>
    </div>
    
     <div className={`conversationRight ${showChat ? 'conTemp' : 'svgTemp'}`}> 
        {showChat ?
            <div className='conversation'>
                <ConversationTemplate
                    message={chatData}
                    story={chatStoryData}
                    data = {data}
                    chatLables = {chatLables}
                    
                />
            </div>
            : 

            <SVG 
                firstText = "Haven't Created"
                secondText = "Any Conversation Yet !"
                compo = {<NewConversation />}
                gif = {ConversationGif}
                
            />
        }
    </div> 
    
    </>
  )}
  <OffCanvas 
        show = {show}
        handleClose = {handleClose}
        placement = 'end'
        title= 'New Template Message'
        children= {<NewConversation />}
        style={{width: '60vw'}}
      />
  </>
    
  )
}

export default ConversationQueries