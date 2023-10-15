import { ImAttachment } from 'react-icons/im'
import { FaMicrophone } from 'react-icons/fa'
import { AiFillThunderbolt } from 'react-icons/ai'
import { BsFillShareFill,BsArrowLeftRight }  from 'react-icons/bs'
import {  HiXMark } from 'react-icons/hi2'
import { useEffect, useRef, useState } from 'react'
import QuickResponse from '../Conversations/QuickResponse'
import useStore from '../../store/store'
import { userNamesAlphas } from '../Conversations/utils/namesAlpha'
import { convertToTime } from '../Conversations/utils/timesUtils'
import conversationApi from '../../Model/Data/Conversation/conversation'
import { Dropdown } from 'react-bootstrap'
import { PiImageSquareThin } from 'react-icons/pi'
import { HiOutlineDocument } from 'react-icons/hi'
import useConversation from '../../ViewModel/ConversationViewModel/conversationServices'
import ImageModal from '../../Components/ImageModal/ImageModal'
import broadcastApi from '../../Model/Data/Broadcast/Broadcast'


const MultiChatInboxTemplate = (props) => {
    const { data, story  } = props
    
    const removeChatFromMutli = useStore((state)=> state.removeChatFromMutli)



    const {
        handlePreviewFile,handleCloseMediaFile,showMediaFile

    } = useConversation()





  const userInfo = story?.initiatorContactId
  const userName = userInfo?.name
  const firstLetter = userName?.charAt(0)
  const priority = story?.priority
  const tpInId = story?.tpOptedInboxId?.tpInboxProfile?._id


  const [values, setValues] = useState({
    userStoryId: story?._id,
    userMessageText: '',
    userMessageFile: false,
    usertpInboxid: tpInId
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



  const moreChat = useStore((state)=> state.loadMultiChatMore)

  const namescolorProps = userNamesAlphas(userInfo, priority)
  
  const style = { 
      backgroundColor: namescolorProps?.bgColor, 
      color: namescolorProps?.textColor,
      border: `2px solid ${namescolorProps?.textColor}` 
    };


    const attachButtonRef = useRef(null)
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
      moreChat(story._id);
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
  }, [data, prevScrollHeight]);






  function handleOnChange(e){
     
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(e);
    }
  };
    async function handleSendMessage(e){
      e.preventDefault()
      const message = {storyId: values.userStoryId, attachments: values.userMessageFile,  message: values.userMessageText, 
        
      }
      const tpId = values.usertpInboxid 
      const response = await conversationApi.addNewUserChat(message, tpId)
      console.log(response)
      setValues({
        userStoryId:story._id,
        userMessageText: '',
        userMessageFile:false,
        usertpInboxid: tpInId
      })
    
    }

    // const handleQResponse = async(quickRes) =>{
    //     const response = await conversationApi.addQuickMessage(quickRes)
    //     console.log(response)
    // }

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

       const fileInputRef = useRef(null);

       const [positionData, setPostionData] = useState({})

  const handleAttachmentClick = () => {
    // Programmatically trigger a click event on the hidden file input
     const data = attachButtonRef.current.getBoundingClientRect();
     setPostionData(data)
    setTimeout(() => {
      
      fileInputRef.current.click();
    }, 100);
    // setSelectedFileType(accept);
  };
   const dropdownData = [
    { title: 'Photo & Video', icon: <PiImageSquareThin />, accept: '.jpg, .jpeg, .png, .mp4, .avi' },
    { title: 'Document', icon: <HiOutlineDocument />, accept: '.pdf, .doc, .docx' },
  ];
  
  const [selectFile, setSelectFile] = useState({})
  const [selectedFileType, setSelectedFileType] = useState('')

  
  const handleFileInputChange = (e)=>{
    const file = e.target.files[0];
    if(file){
      
      handlePreviewFile(file)
      // handleShowMediaFile()
    }
    setSelectFile(file)
    // setShowMediaFile(true)
    
    
  }
  const handleFunction = ()=>{
    elephanatFileHandler(selectFile)
    // setShowMediaFile(false)
    handleCloseMediaFile()

  }
   const elephanatFileHandler = async(name)=>{
      
      const broadMediaFile = {file:name}
      try{

        const response = await broadcastApi.addBroadcastFile(broadMediaFile)
        const data = await response.data 

        const file = await data.file
        console.log(file)
        if(response.status == 200 && data.message === "OK"){
         
          
          
          if(file.FILE_EXT === "opus"){
            // handleSendVoiceMessage(file)
          }else{
            handleSendFile(file)
          }
        }
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


  
  return (
    <>
    <div className='conTemplateContainer'>
        <div className='conTemplateTop'>
            <div className='templateTopLeft'>
            
                    <span className='firstLetter' style={style}>{firstLetter}</span>
                    <span className='topLeftUserName'>{userName}</span>
                
            </div>
            <div className='multiIcons'>
                <span> <BsFillShareFill /> </span>
                <span> <BsArrowLeftRight /></span>
                <span onClick={()=>removeChatFromMutli(story._id)}> <HiXMark /> </span>
            
            </div>
        </div>
        <div className='messagesContianer' ref={scrollRef}>
            {data?.map((ele, i) => { 
                return( 
                    <div 
                        key={i}
                        className={ele.oneId === -1 ? 'recMessage' : 'sendMessages'}
                    >
                        <div className='messageContainer'>
                            <div className='user'>
                                <span style={style} className='userFirstLetter'>
                                    {ele.oneId === -1 ? firstLetter  : ele.sender.full_username.charAt(0)}
                                </span>
                            </div>
                            {ele.attach_file ? (
                      ele.attach_file.map((attachFile) => (
                        <div key={attachFile._id} className='attachFile'>

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
                )
            })} 

        </div>
     <div className='sendMessageContianer'>

      <form onSubmit={handleSendMessage}>

        <div className='inputContainer'>
          <input type='text' name='userMessageText' value={values.userMessageText} placeholder='start typing your text' onChange={handleOnChange} onKeyDown={handleKeyPress}/>
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
                  <span style={{color: '#bdbfc4'}} ref={attachButtonRef}><ImAttachment /></span>
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
            <span><FaMicrophone /></span>
            <span onClick={handleQuickResponse}><AiFillThunderbolt /></span>              
              {isOpen && 
                <div className='multiQuickResponseContainer' ref={containerRef}>
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
        
      </form>
    
    </div> 
    
    </div>


      {showMediaFile.show && 
        <ImageModal 
          show= {showMediaFile.show}
          handleClose = {handleCloseMediaFile}
          data = {showMediaFile}
          handleAdd={handleFunction}
          size='sm'
          positionData = {positionData}
        />
      }
    
    </>

  )
}

export default MultiChatInboxTemplate 

