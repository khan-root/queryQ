
import {  BiChat } from 'react-icons/bi'
import MulitChatGif from '../../assets/Images/multi-chats.png'
import { AiOutlineSearch } from 'react-icons/ai'; 
import { Dropdown } from 'react-bootstrap';
import useConversation from '../../ViewModel/ConversationViewModel/conversationServices';
import { qStatus } from '../../Utils/Data';
import MultiChatQueriesList from './MultiChatQueriesList';
import MultiChatInboxTemplate from './MultiChatInboxTemplate';
import SVG from '../../Components/SVG/SVG';
import { BsFillTrashFill } from 'react-icons/bs';




const statusOptions = ['all', 'open', 'unread', 'hold','close'];



const MultiChatQuries = () => {


    const {  
        selectedStatus,
        toggleStates,
        QueryIndexs,
        messageTypes, 
        handleMessageTypeClick, 
        MessageType, 
        data, 
        multiChatInbox,  
        scrollRefState,
        showChat,
        handleSelectType,
        scrollMainRef, 
        scrollSubRef,
        multiChatInboxHandler,
        clearAllChat
    } = useConversation();

    
    



  
  return (
    <>
    <div className='conversationQueriesContainer'>
        <div className='conversationQueriesContainerTop'>
            <div className='topIconTitle'>
                <span className='icon'><BiChat /></span>
                <span className='title'>Multi chats</span>
            </div>    
        </div>
        <div className='conversationQueriesheader'>
            <div className='headerAssignedBtn'>
                {messageTypes.map((type) => (
                    <span className= {type === MessageType ? `assignedBtnList active`  : 'assignedBtnList'}  key={type} onClick={() => handleMessageTypeClick(type)}>     
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                ))}
            </div>
            <div className='queriesSearch'>
                <div className='searchIconInput'>
                    <span><AiOutlineSearch /></span>
                    <input placeholder='Search' />
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
                    <div key={i} onClick={()=>multiChatInboxHandler(ele._id, i)} className={`checkCss ${toggleStates?.includes(ele._id) ? 'testActive' : 'textUnActive'} 
                        ${QueryIndexs?.some(item => item.i === i- 1) ? 'above-active' : ''}
                        ${QueryIndexs?.some(item => item.i === i + 1) ? 'below-active' : ''}
                    `}> 
                        <MultiChatQueriesList 
                            data={ele}
                        /> 
                    </div>
                 );
            })} 
        </div> 
    </div>
    <div className={`conversationRight ${showChat ? 'conTemp' : 'svgTemp'}`}> 
        {showChat && toggleStates.length !== 0 ? 
            <>
                <div className='multiCon'>
                    {Object.entries(multiChatInbox).map(([key, chatArray]) => (
                        <div key={key} className='multiConList'>
                            {chatArray.map((chatData, index) => (
                                <div key={index} className='listItems'>
                                    <MultiChatInboxTemplate 
                                        data = {chatData.chat}
                                        story = {chatData.story}
                                    />
                                </div>
                            ))}
                        </div> 
                    ))}
                </div>
                <div className='trashAllOpenChat'>
                    <div className='trashAllOpenChatContainer'>
                        <span className='deleteIcon' title='Clear All Chat' onClick={clearAllChat}>

                            <BsFillTrashFill />
                        </span>
                    </div>
                </div>
            </>
        : 
                
            <SVG 
                gif = {MulitChatGif}
                showBtn = {false}
            />
        }  
    </div> 
    
    </>
  )
}

export default MultiChatQuries