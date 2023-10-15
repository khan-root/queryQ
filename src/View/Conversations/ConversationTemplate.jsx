import { userNamesAlphas } from './utils/namesAlpha'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { BsInfo, BsAlarm, BsArrowLeftRight } from 'react-icons/bs'
import { Dropdown } from 'react-bootstrap'
import {convertToTime, formatTimestamp} from './utils/timesUtils'
import { ImAttachment } from 'react-icons/im'
import { AiFillThunderbolt } from 'react-icons/ai'
import { BsSendFill } from 'react-icons/bs'  
import { useEffect, useRef, useState } from 'react'
import useStore from '../../store/store'
import conversationApi from '../../Model/Data/Conversation/conversation'
import Button from '../../Components/Button/Button'
import useConversation from '../../ViewModel/ConversationViewModel/conversationServices'
import UserDetails from './UserDetails'
import QuickResponse from './QuickResponse'
import { qStatusOptions } from '../../Utils/Data'
import { AudioRecorder } from 'react-audio-voice-recorder'
import broadcastApi from '../../Model/Data/Broadcast/Broadcast'
import { PiImageSquareThin } from 'react-icons/pi'
import { HiOutlineDocument } from 'react-icons/hi'
import ImageModal from '../../Components/ImageModal/ImageModal'
import { showToast } from '../../Toaster/Toaster'
import { MdDelete } from 'react-icons/md'


const ConversationTemplate = (props) => {
  const { message, story, data, chatLables = {chatLables} } = props

  
  const userInfo = story?.initiatorContactId
  const userName = userInfo?.name
  const firstLetter = userName?.charAt(0)
  const priority = story?.priority
  const tpInId = story?.tpOptedInboxId?.tpInboxProfile?._id
  const [selectedFileType, setSelectedFileType] = useState('')


  const dropdownData = [
    { title: 'Photo & Video', icon: <PiImageSquareThin />, accept: '.jpg, .jpeg, .png, .mp4, .avi' },
    { title: 'Document', icon: <HiOutlineDocument />, accept: '.pdf, .doc, .docx' },
  ];
   
  const { 
    showDetails, 
    selectId, 
    detailsHandler,
    totalQ,
    statusType,
    statusHandler,
    handlePreviewFile,handleCloseMediaFile,
    allTeams,
    updateAssignList,
    lastAssign,
    updateStoryMessage,
    updateConAssignMessage,
    removeChatAssignLabel,
    showMediaFile
  } = useConversation();



  


  const [values, setValues] = useState({
    userStoryId: story?._id,
    userMessageText: '',
    userMessageFile: false,
    usertpInboxid: tpInId,
    mediaFile:{}
  });
  
  
  
  useEffect(() => {
    if (story) {
      setValues((prevValues) => ({
        ...prevValues,
        userStoryId: story._id,
        usertpInboxid: tpInId
      }));
    }
}, [story]);



const moreChat = useStore((state)=> state.loadMoreChat)

const namescolorProps = userNamesAlphas(userInfo, priority)

const style = { 
  backgroundColor: namescolorProps?.bgColor, 
  color: namescolorProps?.textColor,
  border: `2px solid ${namescolorProps?.textColor}` 
};




  const scrollRef = useRef(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
  const scrollElement = scrollRef.current;

  if (scrollElement) {
    // Scroll to the bottom when opening the chat
    scrollElement.scrollTop = scrollElement.scrollHeight - scrollElement.clientHeight;
  }
}, [story?._id]);


  const handleScroll = () => {
     const { scrollTop } = scrollRef.current;
    const isScrollAtTop = scrollTop === 0;

    if (isScrollAtTop && !isLoading) {
      moreChat();
      setisLoading(true)
    }
    setisLoading(false)
  };

 useEffect(() => {
    const scrollElement = scrollRef.current;

    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading]);
  useEffect(() => {
    const scrollElement = scrollRef.current;

  if (scrollElement && prevScrollHeight !== scrollElement.scrollHeight) {
    // Calculate the difference in scroll height
    const scrollHeightDifference = scrollElement.scrollHeight - prevScrollHeight;

    // Adjust the scrollTop to maintain the relative position
    scrollElement.scrollTop += scrollHeightDifference;

    // Update the previous scroll height
    setPrevScrollHeight(scrollElement.scrollHeight);
  }
  }, [message, prevScrollHeight]);




  function handleOnChange(e){
     
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  }

    async function handleSendMessage(e){
      e.preventDefault()
      const message = {storyId: values.userStoryId, attachments: false,  message: values.userMessageText, 
        
      }
      const tpId = values.usertpInboxid 
      const response = await conversationApi.addNewUserChat(message, tpId)
      
      setValues({
        userStoryId:story._id,
        userMessageText: '',
        userMessageFile:false,
        usertpInboxid: tpInId
      })
    
    }
    
    const handleVoiceMessage = (data)=>{
     const blob = new Blob([data], { type: 'audio/opus' }); // AU audio MIME type

// Create a File object from the Blob
      const audioFile = new File([blob], 'audio.opus', { type: 'audio/opus' }); // Adjust the file nmpeg' });     
      console.log('audioFile',audioFile)
      elephanatFileHandler(audioFile)
      

    }

    const elephanatFileHandler = async(name)=>{
      
      const broadMediaFile = {file:name}
      try{

        const response = await broadcastApi.addBroadcastFile(broadMediaFile)
        const data = await response.data 

        const file = await data.file
        if(response.status == 200 && data.message === "OK"){
         
          
          
          if(file.FILE_EXT === "opus"){
            handleSendVoiceMessage(file)
          }else{
            handleSendFile(file)
          }
        }
      }catch(err){
        console.log(err)
      }
    }

    async function handleSendVoiceMessage(data){
      const message = {storyId: parseInt(values.userStoryId), attachments: true,  message: " ", 
        
        
       
      }
      const attachments = {
        fileName:data.FILE_NAME,
        mimeType:'audio/mpeg',
        type: 'AUDIO',
        url:data.url
      }

      const tpId = values.usertpInboxid 
      try{

        const response = await conversationApi.sendMediaMessage(message, attachments, tpId)
        console.log(response)
        setValues({
          userStoryId:story._id,
          mediaFile: {},
          usertpInboxid: tpInId
        })
      }catch(err){
        console.log(err)
      }
    
    }

    async function handleSendFile(data){
      const message = {storyId: parseInt(values.userStoryId), attachments: true,  message: " "}

      // console.log('Data',data)

      const attachments = {
        fileName:data.FILE_NAME,
        mimeType:data.FILE_MIME,
        type: data.FILE_MIME.split('/')[0].toUpperCase() === "APPLICATION" ? "FILE" : data.FILE_MIME.split('/')[0].toUpperCase(),
        url:data.url
      }

      const tpId = values.usertpInboxid 
      setValues({
        userStoryId:story._id,
        mediaFile: {},
        usertpInboxid: tpInId,

      })
      try{

        const response = await conversationApi.sendMediaMessage(message, attachments, tpId)
        console.log(response)
        setValues({
          userStoryId:story._id,
          audioFile: {},
          usertpInboxid: tpInId
        })
      }catch(err){
        console.log(err)
      }
    
    }


    
  

    const handleQResponse = async(quickRes) =>{
        const response = await conversationApi.addQuickMessage(quickRes)
        console.log(response)
    }

    const getQuickReplies = useStore((state) => state.getQuickReplies)
    const QuickReplies = useStore((state)=> state.QuickReplies)

    const [isOpen, setIsOpen] = useState(false)

    const handleQuickResponse = (e)=>{
      e.stopPropagation(); 
      setIsOpen(!isOpen)
      getQuickReplies()
    }
    const containerRef = useRef(null);

    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, []);
    const handleQuickResponseText = (text) => {
      setValues((prevValues) => ({
        ...prevValues,
        userMessageText: text
      }));
    };




    // -----------------
    const fileInputRef = useRef(null);


  const handleAttachmentClick = () => {
    // Programmatically trigger a click event on the hidden file input
    setTimeout(() => {
      
      fileInputRef.current.click();
    }, 100);
    // setSelectedFileType(accept);
  };
  
  const [selectFile, setSelectFile] = useState({})
  
  const handleFileInputChange = (e)=>{
    const file = e.target.files[0];
    if(file){
      
      handlePreviewFile(file)
      // handleShowMediaFile()
    }
    setSelectFile(file)
    // setShowMediaFile(true)
    
    
  }

  // useEffect(() => {
  //   if(Object.keys(selectFile).length > 0) {
  //     handlePreviewFile(selectFile)
  //   }
  // }, [selectFile])
  
  const handleFunction = ()=>{
    elephanatFileHandler(selectFile)
    // setShowMediaFile(false)
    handleCloseMediaFile()

  }
  

  const handleAssignToTeam =async(data)=>{
    const id = story._id
    const team ={
      teamId: data._id
    }
    const systemMessage = {
      message: `Assign to ${data.title}`,
      type: 'SYSTEM'
    }
    const userDateTime = new Date();
    const timestamp = Math.floor(userDateTime.getTime() / 1000);
    const conMessage = {
      type:'SYSTEM',
      entryTime: timestamp,
      message: systemMessage.message

    }
   const [response1, response2] = await Promise.all([
      conversationApi.statusAssign(id, team),
      conversationApi.systemMessage(id, systemMessage),
    ]);


    if (response1.status === 200 && response2.status === 200) {
      showToast('Story shared', 'success');
      updateAssignList(data);
      updateStoryMessage(id, systemMessage.message)
      updateConAssignMessage(conMessage)
    } else {
      // Handle the case where one or both requests failed
      console.error('API error(s)');
    }
  }


  const [showDelete, setShowDelete] = useState(false);

  const handleChatLabel = (label, i) => {
    setShowDelete((prevState)=>({
      ...prevState,
      [i]:!prevState[i]
    }))
  };

  const deleteChatLabel = async(label)=>{
    const labelData = {
      labelId:label.labelId._id,
      storyId : label.storyId
    }

    try{
      const response = await conversationApi.deleteAssignLabel(labelData)
      const data = await response.data
      if(response.status == 201 && data.STATUS === 'SUCCESSFUL'){

        removeChatAssignLabel(label._id)
        showToast('Assign label removed', 'success')
      }
    }catch(err){
      console.log(err)
    }
  }

  
  return (
    <>
    <div className={`conTemplateContainer  ${showDetails ? 'takelowWidth' : 'takeFullWidth'}`}>
      <div className='conTemplateTop'>
        <div className='templateTopLeft'>
          <div>
            <span className='firstLetter' style={style}>{firstLetter}</span>
          </div>
          <div className='topLeftNameShare'>
            <div className='d-flex align-items-center gap-4'>
              <span className='topLeftUserName'>{userName}</span>
              <div className='d-flex align-items-center gap-2'>
                {chatLables.map((ele, i)=>(
                  <>
                  <span key={i} 
                    onClick={()=>handleChatLabel(ele, i)}
                    style={{background:ele.labelId.color, fontSize:'10px', color: '#fff', padding: '1px 3px', borderRadius: '5px', cursor: 'pointer'}}>
                    {ele.labelId.label}
                    </span>
                    {
                      showDelete[i] &&
                      (<span style={{cursor: 'pointer', color: '#ccc'}}
                        onClick={()=> deleteChatLabel(ele)}
                      ><MdDelete /></span>)
                    }
                    </>
                ))}
              </div>
            </div>
          <Dropdown className='shareDropDown'>
            <Dropdown.Toggle className='topLefShareWith' id="dropdown-basic">
              {lastAssign ? lastAssign.title : 'Share with'}
            </Dropdown.Toggle>

            <Dropdown.Menu className='shareWithMenu'>
              {allTeams.map((ele, i)=>(



                <Dropdown.Item className='shareWithMenuList' key={i} onClick={()=>handleAssignToTeam(ele)}>
                  <HiOutlineUserGroup className='menuListIcon' />
                  <span className='menuListTeam'>{ele.title}</span>
                </Dropdown.Item>

              ))}
              
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </div>
        <div className='templateTopRight'>
          <div className='topRight'>
            <span onClick={()=>detailsHandler(story)} className='info'><BsInfo /></span>
            
            <Dropdown className='expireDropDown'>
              <Dropdown.Toggle className='topLefShareWith no-caret' id="dropdown-basic">
                <BsAlarm />
              </Dropdown.Toggle>

              <Dropdown.Menu className='expireMenu'>
                <div className='expireMenuList'>
                  <span className='expireOn'>

                    Expire on
                  </span>
                  <span className='dataTime'>

                  {formatTimestamp(story?.expiration)}
                  </span>
                </div>
              
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className='statusChange'>
              <Dropdown.Toggle  id="dropdown-basic" className='topLefShareWith no-caret'>
                <BsArrowLeftRight />
              </Dropdown.Toggle>

            <Dropdown.Menu className='statusDropdownMenu'>

                {statusType.map((ele) => (
                    <Dropdown.Item key={ele} value={ele} className='statusDropdownMenuItem' onClick={()=>statusHandler(story._id, qStatusOptions[ele]?.status)}>
                      <div className='statusMenuList'>
                        <span style={{ color: qStatusOptions[ele]?.statusColor }}>{qStatusOptions[ele]?.statusIcon()}</span>
                        <span className='statusText'>{ele.charAt(0).toUpperCase() + ele.slice(1)}</span>
                      </div>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </div>
      </div>
      <div className='messagesContainerOuter'>
      <div className='messagesContianer' ref={scrollRef}>
        {/* {loading ? 
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid pariatur nihil porro minus doloribus! Molestiae similique cupiditate iure libero ipsa doloremque veniam ipsum inventore, harum, ducimus sed eos illum error cum, magni sint labore optio sequi assumenda laborum perferendis in illo voluptatem! Perspiciatis iure enim tempore nam rem deleniti reiciendis, temporibus minus dignissimos quod dolorum voluptate, accusantium reprehenderit consectetur veritatis molestias eum est maxime fuga corrupti unde atque rerum! Nostrum, sunt commodi. Tempora pariatur laudantium vitae blanditiis natus, officiis assumenda veritatis eveniet iusto libero magnam quam provident consequuntur laborum praesentium! Suscipit, dolorem numquam molestias itaque praesentium repellendus odio commodi, distinctio tempora quibusdam explicabo non est ipsum. Quia temporibus in cupiditate ad ex eveniet quisquam quod aspernatur officia adipisci. Modi suscipit quae maxime sint eaque consectetur itaque et fugiat, ipsa neque similique natus voluptatum alias. Quaerat eius nesciunt eaque tempora veritatis veniam voluptate repellat qui excepturi incidunt id quo in ab consequuntur quam, error quod assumenda eum deserunt. Rem porro ea excepturi obcaecati officiis maxime veritatis aliquid minus consequatur voluptate architecto aspernatur sit corrupti nostrum provident velit, labore vero fuga itaque, laborum debitis quidem eveniet totam omnis. Magnam ex blanditiis excepturi eaque qui atque officiis dolor assumenda autem officia, velit nam.
          </span>
        : ''} */}
        {message?.map((ele, i) => {
          return(
            ele.type === 'GENERAL'?
            
                <div key={i}
                  className={ele.oneId === -1 ? 'recMessage' : 'sendMessages'}
                >
                  <div className='messageContainer'>
                    
                    <div className='user'>
                      <span style={style} className='userFirstLetter'>{
                          ele.oneId === -1 ? firstLetter  : ele.sender.full_username.charAt(0) 
                          
                        }</span>
                    </div>
                      {ele.attach_file ? (
                      ele.attach_file.map((attachFile, i) => (
                        <div key={i} className='attachFile'>

                          {/* Conditional rendering based on the 'type' property of 'attachFile' */}
                          {attachFile.type === 'AUDIO' && (
                            // Render audio player if the file type is 'audio'
                            <audio controls>
                              <source src={attachFile.url} type={attachFile.mime} />
                            </audio>
                          )}

                          {attachFile.type === 'IMAGE' && (
                            // Render image tag if the file type is 'image'
                            <img src={attachFile.url} alt={attachFile.name}  style={{width: '200px'}}/>
                          )}

                          {attachFile.type === 'FILE' && (
                                
                              <iframe src={attachFile.url} title={attachFile.name} 
                                width="100%"
                                height="200px"
                              ></iframe>
                            //  
                          )}
                          {attachFile.type === 'VIDEO' && (
                            // Render download link if the file type is 'file'
                             <video width="240" height="460" controls>
                                <source src={attachFile.url}  />
                              </video>
                          )}
                        </div>
                      ))

                      ):(
                      <div className='userMessage'>
                        <span className='messageText'>{ele.message}</span>
                        
                        <span className='messageTime'>{convertToTime(ele.entryTime)}</span>
                      </div>
                      )}
                  </div>
                </div>
            :
              <div className='system' key={i}>
                <div>
                  <span className='messageText'>{ele.message}</span>
                  <span>On :</span>
                  <span className='messageTime'>{convertToTime(ele.entryTime)}</span>
                </div>
              </div>
            )
        })}
      </div>

      </div>
      <div className='sendMessageContianer'>
        <form onSubmit={handleSendMessage}>

          <div className='inputContainer'>
            <input type='text' name='userMessageText' value={values.userMessageText} placeholder='start typing your text' onChange={handleOnChange} />
            <div className='inputIcons'>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
                accept={selectedFileType}
                ref={fileInputRef}
              />
              <Dropdown className='fileTypeDropdown'>
                <Dropdown.Toggle id="dropdown-basic" className='no-caret' style={{padding: 0, margin:0, background: 'none', border: 'none'}}>
                  <span style={{color: '#bdbfc4'}}><ImAttachment /></span>
                </Dropdown.Toggle>

                <Dropdown.Menu className='fileTypeDropdownMenu'>
                  {dropdownData.map((ele, index)=>(

                  <Dropdown.Item  
                    onClick={() => {
                      setSelectedFileType(ele.accept);
                      handleAttachmentClick();
                    }}
                  key={index} className='fileTypeDropdownItem'>
                    <div className='dropdownIcon' >
                      <span>{ele.icon}</span>
                      <span>{ele.title}</span>
                    </div>
                  </Dropdown.Item>
                  ))}
                 
                </Dropdown.Menu>
              </Dropdown>
              <span style={{background: 'none !important'}}>
                <AudioRecorder   
                  showVisualizer={true}
                  audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                  }} 
                  onRecordingComplete={(data) => handleVoiceMessage(data)}
                  
                />
              </span>
              <span onClick={handleQuickResponse}><AiFillThunderbolt /></span>
                
                {isOpen && 
                  <div className='QuickResponseContainer' ref={containerRef}>
                    <QuickResponse 
                      data = {QuickReplies}
                      handleQuickResponse = { handleQuickResponse }
                      onClick={handleQuickResponseText}
                      onSubmit = {(e)=>e.preventDefault()}
                    />
                  </div>
                }

            </div>
          </div>
          <div className='sendMessageIcon'>
            {!showMediaFile.show && 
            <Button 

              variant='primaryBtn'
              fontSize='20px'
              padding='5px 10px'
              text = {<BsSendFill />}
            />
            }
          </div>
        </form>
      
      </div>
    
    </div>

    {showDetails &&  
      <div className='userDetails'>
           <UserDetails 
            data = {data}
            story = {story}
            id = {selectId}
            show={showDetails}
            totalQ = {totalQ}
          /> 
      </div>
    }

    {showMediaFile.show && 
      <ImageModal 
        size='md'
        show= {showMediaFile.show}
        handleClose = {handleCloseMediaFile}
        data = {showMediaFile}
        handleAdd={handleFunction}
      />
    }
    </>

  )
}

export default ConversationTemplate 