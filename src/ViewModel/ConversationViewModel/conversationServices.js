import broadcastApi from '../../Model/Data/Broadcast/Broadcast';
import contactsApi from '../../Model/Data/Contact/contact';
import conversationApi from '../../Model/Data/Conversation/conversation';
import { showToast } from '../../Toaster/Toaster';
import useStore from '../../store/store';
import { useEffect, useRef, useState } from "react";

const useConversation = ()=>{
    const messageTypes = ['all', 'unassigned', 'unanswered', 'snooze'];
    const statusType = ['open', 'hold', 'snooze', 'close'];
    const [selectStatusType, setSelectedStatusType] = useState('open')
    const [MessageType, setSelectedMessageType] = useState('all');
    const getAll = useStore((state)=> state.getAllStories)
    const getAllUnassined = useStore((state)=> state.getUnassignedStories)
    const getAllUnanswerd = useStore((state)=> state.getUnansweredStories)
    const getAllSnoozed = useStore((state)=> state.getSnoozedStories)
    const getOpenStories = useStore((state)=> state.getOpenStories)
    const getHoldStories = useStore((state)=> state.getHoldStories)
    const getCloseStories = useStore((state)=> state.getCloseStories)
    const getUnreadStories = useStore((state)=> state.getUnreadStories)
    
    const updateAssignList = useStore((state)=> state.updateAssignList)
    const allTeams = useStore((state)=> state.allTeams)
    const chatInbox = useStore((state)=> state.chatInbox)
    
    const chatStory= useStore((state)=> state.chatStory)
    const multiChatInbox= useStore((state)=> state.multiChatInbox)
    const allStories = useStore((state)=> state.allStories)
    const unassignedStories = useStore((state)=> state.allUnassignedStories)
    const unansweredStories = useStore((state)=> state.allUnansweredStories)
    const snoozedStories = useStore((state)=> state.allSnoozedStories)
    const openStories = useStore((state)=> state.allOpenStories)
    const holdStories = useStore((state)=> state.allHoldStories)
    const closeStories = useStore((state)=> state.allCloseStories)
    const unreadStories = useStore((state)=> state.allUnreadStories)
    const searchStory = useStore((state)=> state.searchStory)


    const lastAssign = useStore((state)=> state.lastAssign)

    const allTemplates = useStore((state) => state.allTemplates)
    const templates = useStore((state) => state.templates)

    const chatInboxHandler = useStore((state)=> state.chatInboxHandler)
    const multiChatInboxHandler = useStore((state)=> state.multiChatInboxHandler)
    const openedTabs = useStore((state)=> state.openedTabs)
    const showChat = useStore((state)=>state.showChat)


    const allLabels = useStore((state)=> state.allLabels)
    const gettingAllLabels = useStore((state)=> state.gettingAllLabels)
    const chatLables = useStore((state)=>state.chatLables)
    const newLabel = useStore((state)=> state.newLabel)
    const removeLabel = useStore((state)=> state.removeLabel)
    const labelUpdate = useStore((state)=> state.updateLabel)
    const removeChatAssignLabel = useStore((state)=> state.removeChatAssignLabel)
    const searchedLabels = useStore((state)=> state.searchLabel)
    const newLabelAssignToChat = useStore((state)=> state.assignLabelToChat)


    const nextData = useStore((state)=> state.fetchNextData)
    const nextUnassignedData = useStore((state)=> state.fetchNextUnassignedData)
    const nextUnansweredData = useStore((state)=> state.fetchNextAnsweredData)
    const removeChatFromMutli = useStore((state)=> state.removeChatFromMutli)
    const nextOpenStory = useStore((state)=> state.fetchNextOpenData)
    const nextHoldStory = useStore((state)=> state.fetchNextHoldData)
    const nextCloseStory = useStore((state)=> state.fetchNextCloseData)
    const nextUnreadStory = useStore((state)=> state.fetchNextUnreadData)

    const detailsShowHandler = useStore((state) => state.detailsShowHandler)
    const detailsHideHandler = useStore((state)=> state.detailsHideHandler)
    const showDetails = useStore((state) => state.showDetails)
    const [data, setData] = useState([])
    const [chatData, setChatData] = useState([])
    
    const [totalQ, setTotalQ] = useState({})
    const [chatStoryData, setChatStoryData] = useState([])

    const clearAllChat = useStore((state)=> state.clearAllChat)
    const toggleState = useStore((state)=> state.toggleState)
    const toggleStates = useStore((state)=> state.toggleStates)
    const toggleStatus = useStore((state)=> state.toggleStatus)
    const QueryIndex = useStore((state)=> state.QueryIndex)
    const QueryIndexs = useStore((state)=> state.QueryIndexs)
    
    const scrollRefTrueHandler = useStore((state)=> state.scrollRefTrueHandler)
    const scrollRefFalseHandler = useStore((state)=> state.scrollRefFalseHandler)
    const scrollRefState = useStore((state)=> state.scrollRef)
    const setFileType = useStore((state)=> state.setFileType)
    const fileType = useStore((state)=> state.fileType)

    const [searchedContacts, setSearchedContacts] = useState([])
    const [channelId, setChannelId] = useState()

    const updateStoryMessage = useStore((state)=> state.updateStoryMessage)
    const updateConAssignMessage = useStore((state)=> state.updateConAssignMessage)
    const [selectedContact, setSelectedContact] = useState({})
    
  useEffect(() => {
    setData(allStories);
  }, [allStories]);

  useEffect(() => {
    setData(unassignedStories);
  }, [unassignedStories]);

  useEffect(() => {
    setData(unansweredStories);
  }, [unansweredStories]);

  useEffect(() => {
    setData(snoozedStories);
  }, [snoozedStories]);

  useEffect(() => {
    setData(openStories);
  }, [openStories]);

  useEffect(() => {
    setData(holdStories);
  }, [holdStories]);

  useEffect(() => {
    setData(closeStories);
  }, [closeStories]);

  useEffect(() => {
    setData(unreadStories);
  }, [unreadStories]);

  useEffect(() => {
    setChatData(chatInbox);
  }, [chatInbox]);

  // useEffect(() => {
  //   setMulitChatData(multiChatInbox);
  // }, [multiChatInbox]);
  useEffect(() => {
    setChatStoryData(chatStory);
  }, [chatStory]);
  
    const handleMessageTypeClick =  (messageType) => {
        setSelectedMessageType(messageType);
        scrollRefTrueHandler()
        switch (messageType) {
            case 'all':
              getAll()
              break;
            case 'unassigned':
              getAllUnassined()
              break;
            case 'unanswered':
              getAllUnanswerd()
              break;
            case 'snooze':
              getAllSnoozed()
              break;
                // Add additional cases for other message types if needed
            default:
               
              break;
        }
    }
    



    // fetch new Data on Scroll

    
    const scrollMainRef = useRef(null);
    const scrollSubRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    

    const handleScroll = () => {
        if(scrollRefState && scrollMainRef.current){
        const { scrollTop, scrollHeight, clientHeight } = scrollMainRef.current;
        const isScrollAtBottom = scrollTop + clientHeight === scrollHeight;

        setScrollPosition(scrollTop);
        if(isScrollAtBottom){
          switch (MessageType) {
            case 'all':
              nextData()
              return;
            case 'unassigned':
              nextUnassignedData()
              return;
            case 'unanswered':
              nextUnansweredData()
              return;
            case 'snooze':
              console.log('snooze')
              return;
          
            default:
              return;
          }
        }
        }
    };
  

    const statusOptions = ['all', 'open', 'unread', 'hold','close'];
    const [selectedStatus, setSelectedStatus] = useState('all');

    const handleFilterScroll = () => {
        if(!scrollRefState && scrollSubRef.current){
        const { scrollTop, scrollHeight, clientHeight } = scrollSubRef.current;
        const isScrollAtBottom = scrollTop + clientHeight === scrollHeight;

        setScrollPosition(scrollTop);
        if(isScrollAtBottom){
          switch (selectedStatus) {
            case 'all':
              nextData()
              return;
            case 'unread':
              nextUnreadStory()
              return;
            case 'open':
              nextOpenStory()
              return;
            case 'hold':
              nextHoldStory()
              return;
            case 'close':
              nextCloseStory()
              return;
          
            default:
              return;
          }
        }
        }
    };
    const handleSelectType = async(status)=>{
        setSelectedStatus(status)
        scrollRefFalseHandler()
        switch (status) {
            case 'all':
                getAll()
                return;
            case 'unread':
                getUnreadStories()
                return;
        
            case 'open':
                getOpenStories()
                return;
            case 'hold':
                getHoldStories()
                return;
            case 'close':
                getCloseStories()
                return;
        
            default:
                return;
        }
    }

    


    useEffect(() => {
        const scrollElement = scrollMainRef.current;

        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll, { passive: true });

        }

        return () => {
            if (scrollElement) {
              scrollElement.removeEventListener('scroll', handleScroll);

            }
        };
    }, [MessageType]); 

    useEffect(() => {
        const scrollElement = scrollSubRef.current;

        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleFilterScroll, { passive: true });
        }

        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', handleFilterScroll);
            }
        };
    }, [selectedStatus]);  
    
    // const [show, setShow] = useState(false)
    const [selectId, setSelectedId] = useState('')

      const detailsHandler = async(story)=>{
        setSelectedId(story._id);
        if(allLabels.length === 0){
          gettingAllLabels()
        }
        // console.log(story.initiatorContactId._)
        const response = await conversationApi.totalQueriesData(story.initiatorContactId._id)
        const data = response.data 
        setTotalQ(data)

        if(showDetails){
          detailsHideHandler()
        }else{
          detailsShowHandler()
        }
      }

      const hideChat = (id)=>{

        removeChatFromMutli(id)
      }
      const [showChannel, setShowChannel] = useState(false)
      const [toggleChannel, setToggleChannel ] = useState('')
      const [showLabel, setShowLabel] = useState(false)
      const [inputValues, setInputValues] = useState({})

      const [messageValues, setMessageValues]= useState({
        selectChannel: 16,
        userName: '',
        channelTemplateId: '',
        templateDesc:'',
        labelsLen:'',
        mediaUrl:[],
        selectedFile: null,
        fileUrl:[],
        fileContent: '',
        contactNumber: '',
        inbox:'',

      })

      const handleSelectChangeNewMesssage =(e)=>{
        const { name, value } = e.target
        console.log()
        const ele = JSON.parse(value)
        
        setMessageValues(prevValues => ({
          ...prevValues,
            mediaUrl: []
          }))
        if(value === '0'){
          setShowChannel(false)
          
        }else{
            setShowChannel(true)

            setMessageValues(prevValues => ({
              ...prevValues,
              [name]: value,
              mediaUrl: ele.mediaUrl,
              templateDesc: ele.text,
              
              labelsLen:ele.templateVariables?.length,
              channelTemplateId : parseInt(ele.eng_template_id)
              
            }));

          // console.log(broadcastValues)
          
            if (ele.mediaUrl?.length > 0) {
              setFileSelection(true); // Set fileSelection to true

            } else {
              setFileSelection(false); // Set fileSelection to false
              

            }
          
            setInputValues({});
            
            if (name === 'selectTemplate' && value !== '') {
              setShowLabel(true);
              showToast(`Template ${ele.category} => ${ele.name} selected`, 'success')
              
              setMessageValues(prevValues => ({
              ...prevValues,
              selectedFile: null
              }))
            
            } else {
              setShowLabel(false);
            }
            if (value === '16') {
              allTemplates(value)
          }
        }
      }
       const [fileSelection, setFileSelection] = useState(true)
      const handleChannelNewMessage = (id, tpId) => {
    
        setToggleChannel(id);
        setChannelId(tpId)
        
      };

      const handleInputChangeNewMessage =(e)=>{
        const { name, value, } = e.target

    
 
        setMessageValues((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }

      const handleFileChange = (e)=>{
        // const file = e.target.files[0]; // Get the first selected file

        // if (file) {
        //   const reader = new FileReader();
        //   reader.onload = (event) => {
        //     const fileContent = event.target.result;
        //     setMessageValues((prevValues) => ({
        //       ...prevValues,
        //       selectedFile: file,
        //       fileContent: fileContent,
        //     }));
        //   };
        //   reader.readAsDataURL(file); // Read the file as a data URL
        // }
        const file = e.target.files[0]; // Get the first selected file
      const mediaUrl  = messageValues.mediaUrl;
      


      setFileSelection(false);

      if (file && mediaUrl?.[0]) {
        const expectedMediaType = mediaUrl[0].includes('image')
          ? 'image'
          : mediaUrl[0].includes('document')
          ? 'document'
          : mediaUrl[0].includes('video')
          ? 'video'
          : null;

        if (expectedMediaType) {
          // Perform validation based on expectedMediaType
          if (
            (expectedMediaType === 'image' && file.type.startsWith('image/')) ||
            (expectedMediaType === 'document' &&
              (file.type === 'application/pdf' ||
                file.type === 'application/msword' ||
                file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) ||
            (expectedMediaType === 'video' && file.type.startsWith('video/'))
          ) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const fileContent = event.target.result;
              setMessageValues((prevValues) => ({
                ...prevValues,
                selectedFile: file,
                fileContent: fileContent,
              }));
            };
            reader.readAsDataURL(file); // Read the file as a data URL
          } else {
            // File type does not match expectedMediaType, display an error message or handle the validation accordingly
            showToast('File type does not match the expected media type.', 'error');
          }
        } else {
          // Invalid mediaUrl, display an error message or handle the validation accordingly
          // alert('Invalid mediaUrl format.');
        }
      }


      };

      const handleLableInputChange = (e, index) => {
        const { value, name } = e.target;

        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [name]: value,
        }));
      };

      const statusHandler =async(storyId, status)=>{
        const id = storyId
        const data = {status: status}
        const response = await conversationApi.priority(id, data)
        
        const result = await response.data.story
        if(response.status == 200){
          toggleStatus(id, result)
          showToast('Status Udpated', 'success');
        }else{
          
          showToast('Sorry Status not Udpated', 'error');
        }
      }

      

      // const [prFile, setPrFile] = useState('')
      const [showMediaFile, setShowMediaFile] = useState({
        show: false,
        selectedFile:'', 
        prFile: ''
      })

      const handleShowMediaFile = ()=>{
        setShowMediaFile((prevState)=>({
          ...prevState,
          show: true
        }))
      }
      const handleCloseMediaFile = ()=>{
        setShowMediaFile((prevState)=>({
          ...prevState,
          prFile: '',
          selectedFile: '',
          show: false,
        }))
      }
      function handlePreviewFile(file){
        console.log(file)

        if ((file.type.includes("image/")) ||
            
              (file.type === "application/pdf" ||
                file.type === "application/msword" ||
                file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||
            (file.type.includes("video/"))){
            const reader = new FileReader();
            reader.onload = (event) => {
              const fileContent = event.target.result;
              console.log('fileContent',fileContent)
              setShowMediaFile((prevState)=>({
                ...prevState,
                selectedFile: file,
                prFile:fileContent,
                show:true
              }))
            };
            reader.readAsDataURL(file)
        
        }
      }

      const labelColorRef = useRef(null)
      const [labelValues, setLabelValues] = useState({
        id: '',
        color:'#DDF9FC',
        labelName: '',
        updateForm: false,
      })

      useEffect(() => {
        if(messageValues.selectedFile){
          elephanatFileHandler(messageValues.selectedFile)

        }
      }, [messageValues.selectedFile])

      const elephanatFileHandler = async(name)=>{
        const broadMediaFile = {file:name}
        const response = await broadcastApi.addBroadcastFile(broadMediaFile)
        const data = await response.data 
        const file = data.file
        setMessageValues(prevValues => ({
          ...prevValues,
          fileUrl: [file.url]
        })) 
    
      }

      const newConversationValidation = ()=>{
          if (!messageValues.inbox) {
            showToast('Select Inbox', 'error')
            return
          }
          if (!channelId) {
            showToast('Select Channel', 'error')
            return
          }
          
          if (messageValues.contactNumber === '') {
            showToast('Select Contact Number', 'error')
            return
          }
          if(!messageValues.channelTemplateId){
            showToast('Select template', 'error')
            return
          }
          
          const numLabels = parseInt(messageValues.labelsLen);
          if (Number.isInteger(numLabels) && numLabels > 0) {
            const inputs = Array.from({ length: numLabels }, (_, index) => inputValues[`input_${index}`] || '');
            for (let index = 0; index < inputs.length; index++) {
              const value = inputs[index];
              
              if (!value) {
                showToast(`Label field ${index + 1} is required`, 'error');
                return false;
              } 
              if (/^\s*$/.test(value[index])) {
                showToast(`Label field ${index + 1} is empty`, 'error');
                return false;
              }
            }
          }
            
          if(fileSelection){
            showToast('Select file', 'error')
            
            return
          }
          
          return true
      }

      
     

      const handleLabelChange = (e)=>{
        const {name, value} = e.target
        setLabelValues((prevState)=>({
          ...prevState,
          [name]: value
        }))
      }

      const handleColorChange = (e)=>{
    

        setLabelValues((prevState)=>({
          ...prevState,
          color: e.hex

        }))
      }


      const validateLabelForm = ()=>{
        if(!labelValues.labelName){
          showToast('Label name required', 'error')
          return
        }else if (/^\s*$/.test(labelValues.labelName)) {
          showToast("Label Name can't be empty", 'error');
          return
        }else if (/^[\s]+/.test(labelValues.labelName)) {
          showToast(`Remove spaces from the start of Label Name`, 'error');
          return;
        }
        return true
      }
      const handelAddLebel = async(e)=>{
          e.preventDefault()
          const validate = validateLabelForm()
          const label = {
            label: labelValues.labelName,
            color: labelValues.color
          }
          if(validate){

          
            try{
              const response = await conversationApi.addLabel(label)
              
              const data = response.data 
              if(response.status == 201 && data.STATUS ==='SUCCESSFUL'){
                showToast('Label created successfully', 'success')
                newLabel(data.label)
                setLabelValues((prevState)=>({
                  ...prevState,
                  labelName: '',
                  color: '#DDF9FC'
                }))
              }
            }catch(err){
              console.log(err)
            }
          }
      }

      const handleDeleteLabel = async(id)=>{
        try{
          const response = await conversationApi.deleteLabel(id)
          console.log(response)
          if(response.status == 200){
            showToast('Label removed successfully','success')
            removeLabel(id)
          }

        }catch(err){
          console.log(err)
        }
      }

      const handleUpdateLable = (data)=>{
        console.log(data)
        setLabelValues((prevState)=>({
          ...prevState,
          id: data._id,
          updateForm: true,
          labelName: data.label,
          color:data.color
        }))
      }

      const updateLabel = async(e)=>{
        e.preventDefault()
        const id = labelValues.id
        const validate = validateLabelForm()
        const label = {
          label: labelValues.labelName,
          color: labelValues.color
        }
        if(validate){

        
          try{
            const response = await conversationApi.updateLabel(id, label)
            const data = response.data 
            if(response.status == 200 && data.STATUS === "SUCCESSFUL"){
              showToast('Label updated successfully', 'success')
              labelUpdate(data.label)
              setLabelValues((prevState)=>({
                ...prevState,
                updateForm: false,
                id: '',
                labelName: '',
                color: '#DDF9FC',
              }))
            }
          }catch(err){
            console.log(err)
          }
        }
      }
      const handleDiscardLabel = ()=>{
        setLabelValues((prevState)=>({
          ...prevState,
          updateForm: false,
          id: '',
          labelName: '',
          color: '#DDF9FC',
        }))
      }

      const [searchLabel, setSerachLabel] = useState({
        labelResult: false,
        name:'',

      })
      const sreachLabelHandler = (e)=>{
        const {name, value} = e.target 

        setSerachLabel((prevState)=>({
          ...prevState,
          labelResult:true,
          [name]: value
        }))
      }

      useEffect(() => {

        searchedLabels(searchLabel.name)
        if(!searchLabel.name){
           setSerachLabel((prevState)=>({
          ...prevState,
          labelResult:false,
        }))
        }
       
      }, [searchLabel.name])

      const assignLabelToChat = async(label, id)=>{
        const labelData ={
          labelId:label._id,
          storyId : id
        }
        try {
          
        
          const response = await conversationApi.addAssignLabel(labelData)
          const data = response.data 
          setSerachLabel((prevState)=>({
            ...prevState,
            labelResult:false,
            name:'',
            
          }))
          if(response.status == 201){
            showToast('Label assign to chat', 'success')
            const result = data.assignedLabel
            result._Id = result.labelId
            result.labelId = {
              label:label.label,
              color:label.color,
              _id:result.labelId,
              storyId:result.storyId,
              entryTime: result.entryTime,
            }
            newLabelAssignToChat(result)

          }
        } catch (err) {
          const response = err.response
          const data = response.data 
          showToast(`${data.ERROR_DESCRIPTION}`,'error')
          console.log(response)
        }

      }

          
    const searchContact = (selectedOption)=>{

      contactsHandler(selectedOption)

      
    }

    async function contactsHandler(name){

      try{
        const resposne = await contactsApi.getSearchContacts(name)
        const data = await resposne.data 
        if(resposne.status == 200 && data.STATUS === "SUCCESSFUL"){
          setSearchedContacts(data.results)
        }
        console.log(resposne)
      }
      catch(err){
        // console.log(err)
      }
    }

    const selectContact = (selectedOption)=>{
      setSelectedContact(selectedOption)
      
      const contact = selectedOption.value 
      setMessageValues((prevState)=>({
        ...prevState,
        contactNumber: contact
      }))
      showToast(`${selectedOption.label} successfully added`, 'success')
    }

    const remContact = (name) => {
      setSelectedContact({})
      setMessageValues((prevState)=>({
        ...prevState,
        contactNumber: ''
      }))
      showToast(`${name} successfully removed`,'success')
    
  };
  const handleNewConversation = async(e) =>{
    e.preventDefault()
    const validate = newConversationValidation()
    if(validate){
      const modifiedTemplateDesc = messageValues.templateDesc.replace(/\{\{(\d+)\}\}/g, (match, index) => {
        const inputIndex = parseInt(index, 10) - 1;
        const inputValue = inputValues[`input_${inputIndex}`] || '';
        return inputValue;
      });

      const newConverstaion= {
        inboxId:messageValues.selectChannel.toString(),
        mediaUrl: messageValues.fileUrl ?  messageValues.fileUrl : [],
        
        templateVariables: Object.values(inputValues)
        .map(value => value.split(' ').join(' '))
        .filter(value => value.trim() !== ''),
        template_id:messageValues.channelTemplateId,
        to: messageValues.contactNumber.toString(),
        text: modifiedTemplateDesc

      }
      
      const response = await conversationApi.newConversation(newConverstaion)
      console.log(response)
      console.log(newConverstaion)
    }
  }


  // -----------************-------------//
  const [searchValues, setSearchValues] = useState({
    name: ''
  })


  const searchChangeHandler = (e)=>{
    const {name, value} = e.target

    setSearchValues((prevState)=>({
      ...prevState,
      [name]: value
    }))


    
  }

  useEffect(() => {
   if(searchValues.name){
    searchStory(searchValues.name)
  }
  }, [searchValues.name])





  // const searchStatus = async(name)=>{
  //   const response = await conversationApi.searchStory(name)
  //   console.log(response)
  // }



    return{
        openedTabs, messageTypes, handleMessageTypeClick,MessageType, data, 
        allStories, unassignedStories ,unansweredStories, snoozedStories, chatInboxHandler, chatData, chatStoryData, scrollMainRef, scrollSubRef,  showChat, nextData, detailsHandler, showDetails, selectId, multiChatInboxHandler, multiChatInbox,
        hideChat,toggleState,toggleStates, QueryIndex,QueryIndexs, totalQ,statusOptions, handleSelectType, selectedStatus, scrollRefState,statusHandler,searchChangeHandler,handleCloseMediaFile,handleShowMediaFile,showMediaFile,
        handleSelectChangeNewMesssage, showChannel, handleChannelNewMessage, toggleChannel,handleInputChangeNewMessage, templates, messageValues, handleFileChange, showLabel, handleLableInputChange, inputValues, statusType, selectStatusType, setFileType, fileType, handlePreviewFile,allTeams, updateAssignList, lastAssign,
        updateStoryMessage, updateConAssignMessage, chatLables,handelAddLebel, handleLabelChange, labelValues, labelColorRef, handleColorChange, allLabels,handleDeleteLabel, handleUpdateLable, updateLabel, handleDiscardLabel, removeChatAssignLabel,selectedContact,
        searchLabel,sreachLabelHandler, assignLabelToChat, handleNewConversation,searchContact, searchedContacts, selectContact, remContact, searchValues,clearAllChat
        
    }
}

export default useConversation