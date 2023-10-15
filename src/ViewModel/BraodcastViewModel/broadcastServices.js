
import {  useEffect, useState } from "react"
import useStore from "../../store/store"
import usersApi from "../../Model/Data/Uers/Users"
import contactsApi from "../../Model/Data/Contact/contact"
import broadcastApi from "../../Model/Data/Broadcast/Broadcast"
import { showToast } from "../../Toaster/Toaster"

const useBroadcast = () => {
    const [toggleState, setToggleState] = useState(null)
    const [showSVG, setShowSVG] = useState(false)
    const [show, setShow] = useState(false)
    const [showBroadcast, setShowBroadcast] = useState(false)
    const allCampaign = useStore((state)=> state.allCampaign)
    const getBroadcastMessages = useStore((state) => state.getBroadcastMessages)
    const broadcastMessages = useStore((state) => state.broadcastMessages)
    const hideBroadcastMessage = useStore((state) => state.hideBroadcastMessage)
    const showBroadcastMessage = useStore((state) => state.showBroadcastMessage)
    const showBroadcastData = useStore((state) => state.showBroadcastData)
    const getallGroups = useStore((state) => state.getAllGroups)

    const groups = useStore((state) => state.contactGroups)
    const searchGroup = useStore((state) => state.searchGroup)
    // const searchGroup = 
    const [groupData, setGroupData] = useState([])
    const [showGrpCanvas, setShowGrpCanvas] = useState(false)
    
    const [groupMember, setGroupMember] = useState(false)
    const [groupMemberList, setGroupMemberList] = useState([])
    const [bIndMessage, setBIndMessage ] = useState([])
    const [campaignData, setCampaignData] = useState({})
    const showMessages = useStore((state) => state.showMessages)
    const showCampaingsData = useStore((state) => state.showCampaingsData)
    const hideBroadcastData = useStore((state) => state.hideBroadcastData)
    const [groupList, setGroupList] = useState([])
    
    const newBroadcastMessages = useStore((state)=> state.newBroadcastMessages)
    const allTemplates = useStore((state) => state.allTemplates)
    const templates = useStore((state) => state.templates)
    const deleteBroadcast = useStore((state)=> state.deleteBroadcast)
    const searchCampaing = useStore((state)=> state.searchCampaing)
    const showBroadcastCanvas = useStore((state)=> state.showBroadcastCanvas)
    const broadcastCanvas = useStore((state)=> state.broadcastCanvas)
    const hideBroadcastCanvas = useStore((state)=> state.hideBroadcastCanvas)


    const [showLabel, setShowLabel] = useState(false)
    const [allLabels, setAllLabels] = useState({})
    const [channelId, setChannelId] = useState('')
    
    const [campaignID, setCampaignID] = useState('')

    const [searchValue, setSearchValue] = useState({
      serachInput: ''
    })
    // for storing campaignId in zustand so the boradcastmessage see in 
    // same campaign in which user want to send
    const newCampaignId = useStore((state) => state.newCampaignId)
    const campaignId = useStore((state)=> state.campaignId)



    const campaignHandler = (ele)=>{
      // console.log(ele)
      setShowSVG(true)
        showBroadcastMessage()
        showBroadcastData()
        setCampaignData(ele)
        setToggleState(ele._id)
        getBroadcastMessages(ele._id)
        newCampaignId(ele._id)
       
    }

    const [confirm, setConfirm] = useState(false)


    
    
    
    const handleAddCampaing = () =>{
        setShow(true)
    }
    const handleCloseCampaign = () =>{
        setShow(false)
    }

    const handleAddBroadcast = ()=>{
        setShowBroadcast(true)
    }
    const handleCloseBroadcast = ()=>{
        setShowBroadcast(false)
    }
    const getBroadcastCreator = async(orgId, oneId)=>{
      const response = await usersApi.getUser(orgId, oneId)
      const data = response.data 
      const result = data[0]
      // console.log('getBroadcastCreator',result)
      setBIndMessage(prevBIndMessage => ({
        ...prevBIndMessage,
        broadcastCreator: result
      }));
      // console.log(bIndMessage.action_by)
    }
    const mesagesHandler = async (ele) => {
      getBroadcastCreator(ele.orgId, ele.oneId)
      hideBroadcastMessage();
      
      const res = broadcastMessages.find((data) => data._id === ele._id);
      // console.log('broadcastMessages', res)
        setBIndMessage((prevBindMessage) => (res ? res : prevBindMessage));
        const groupsIds = ele.broadcast_group;

        try {
            const apiResponses = await Promise.all(
            groupsIds.map(async (item) => {
                const { groupId } = item;
                try {
                const response = await contactsApi.getGroupContacts(groupId);
                const data = response.data;
                return data;
                } catch (error) {
                console.log(`Error fetching data for groupId ${groupId}:`, error);
                return null;
                }
            })
            );

            // Filter out any null values from the API responses
            const filteredResponses = apiResponses.filter((response) => response !== null);

            setGroupList(filteredResponses);
        } catch (error) {
            console.log('Error fetching group contacts:', error);
        }
    };


    const backToMessages = ()=>{
        showBroadcastMessage()
    }



    // new broadcast 
    const [broadcastValues, setBroadcastValues] = useState({ 
      inbox:'',
      selectChannel: 16,
      broadcastName: '',
      groupName: '',
      channelTemplateId: '',
      templateDesc:'',
      labelsLen:'',
      mediaUrl:[],
      selectedFile: null,
      fileUrl:[],
      fileContent: '',
    })
    
    const [toggleChannel, setToggleChannel] = useState(0)

    const [options, setOptions] = useState([]);
    const [showChannel, setShowChannel] = useState(false)

    const [fileSelection, setFileSelection] = useState(true)

    const [inputValues, setInputValues] = useState({})


  const handleSearchInputChange = (newValue) => {
    setBroadcastValues(prevValues => ({
      ...prevValues,
      groupName: newValue
    }));
  };
    
  const handleChannel = async (id, tpId) => {
    
      setToggleChannel(id);
      setChannelId(tpId)
      if(tpId === 14){   

            await getallGroups();
            // setGroupData(groups)
          
          
        }
       
  };

  // useEffect(()=>{
  //   if(channelId === 14){
  //     getallGroups()
  //   }
  // },[toggleChannel, channelId])

   const handleInputChange = (e) => {
    
    
    const { name, value, } = e.target

    
 
    setBroadcastValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    useEffect(() => {
      if(broadcastValues.groupName){ 
        searchGroup(broadcastValues.groupName);
      }
    }, [broadcastValues.groupName]); 

    const handleFileChange = (e) => {
      const file = e.target.files[0]; // Get the first selected file
      const mediaUrl  = broadcastValues.mediaUrl;
      


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
              setBroadcastValues((prevValues) => ({
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


  // const handleFileChange = (e)=>{
    
  //   const file = e.target.files[0]; // Get the first selected file
    
    
  //   setFileSelection(false)
    
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const fileContent = event.target.result;
  //       setBroadcastValues((prevValues) => ({
  //         ...prevValues,
  //         selectedFile: file,
  //         fileContent: fileContent,
  //       }));
  //     };
  //     reader.readAsDataURL(file); // Read the file as a data URL
      
  //   }
  
  // };

  // calling elephant api for url 
  useEffect(() => {
    if(broadcastValues.selectedFile){
      elephanatFileHandler(broadcastValues.selectedFile)

    }
  }, [broadcastValues.selectedFile])
  

  const handleLableInputChange = (e, index) => {
    const { value, name } = e.target;

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
    
  };



  const handleSearch = (e) => {
    // if (e.key === 'Enter') {
    //   searchFunction(broadcastValues.groupName);
    // }
  };

  // const searchFunction = async(name) => {
  //   try{

        
  //       setGroupData(result)
  //       setBroadcastValues({
  //           groupName: ''
  //       });
  //   }catch(err){
  //       console.log(err)
  //   }
  // };




    // const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);

  
const handleCheckboxChange = (item, isChecked) => {
    setSelectedArray(prevSelectedArray => {
      if (isChecked) {
        // Item is checked, so add it to the selectedArray
        
        return [...prevSelectedArray, item];
      } else {
        // Item is unchecked, so remove it from the selectedArray
        return prevSelectedArray.filter(selectedItem => selectedItem._id !== item._id);
      }
    });
    if(isChecked){
      console.log('item', item)
      showToast(`${item.name} successfully added`, 'success');
    }else{
      showToast(`${item.name} successfully removed from list`, 'success');


    }
  };


  const handleSelectChange = (e) => {

    
    const { name, value } = e.target
    const ele = JSON.parse(value)
    console.log(ele)
    
    setBroadcastValues(prevValues => ({
      ...prevValues,
        mediaUrl: []
      }))
    if(value === '0'){
      setShowChannel(false)
      
    }else{
      setShowChannel(true)

      setBroadcastValues(prevValues => ({
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
        
        setBroadcastValues(prevValues => ({
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
  };

 



  const removeGroup = (index, ele) => {
    setSelectedArray(prevSelectedArray => {
      const updatedArray = [...prevSelectedArray];
      updatedArray.splice(index, 1);
      return updatedArray;
    });
    showToast(`${ele.name} successfully removed from list`,'success')
  };


  const handleGroupMember =async(ele)=>{
    setGroupMember(true)
    const response = await contactsApi.getGroupContacts(ele._id)
    const data = response.data
    const result = data.groups 
    setGroupMemberList(result)
   
  }
  
  const handleGroupMemberClose = ()=>{
    setGroupMember(false)

  }


  // validate new broadcast form

   const validateForm = () => {

    if (!broadcastValues.inbox) {
      showToast('Select Inbox', 'error')
      return
    }
    if (!channelId) {
      showToast('Select Channel', 'error')
      return
    }
    if (!broadcastValues.broadcastName) {
      showToast('Broadcast name required', 'error')
      return
    }else if (/^\s*$/.test(broadcastValues.broadcastName)) {
      showToast("Broadcast Name can't be empty", 'error');
      return
    }
    else if (/^[\s]+/.test(broadcastValues.broadcastName)) {
        showToast(`Remove spaces from the start of broadcast name`, 'error');
        return;
    }
    if(selectedArray.length == 0){
      showToast('Atleast select one group', 'error')
      return
    }
    if (!broadcastValues.channelTemplateId) {
      showToast('Select template', 'error')
      return
    }
    
    const numLabels = parseInt(broadcastValues.labelsLen);
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


  // const validateInputs = (inputs) => {

    

  //   return true;
  // };
  

// ***************************

  const elephanatFileHandler = async(name)=>{
    const broadMediaFile = {file:name}
    const response = await broadcastApi.addBroadcastFile(broadMediaFile)
    const data = await response.data 
    const file = data.file
    setBroadcastValues(prevValues => ({
      ...prevValues,
      fileUrl: [file.url]
    })) 
    
  }
  

  const addBroadcastHandler = async (e) => {
    e.preventDefault();
    console.log(broadcastValues)
    // handleCloseBroadcast()
    // hideBroadcastCanvas()
    const validate = validateForm()
    if(validate){
// 
      const modifiedTemplateDesc = broadcastValues.templateDesc.replace(/\{\{(\d+)\}\}/g, (match, index) => {
        const inputIndex = parseInt(index, 10) - 1;
        const inputValue = inputValues[`input_${inputIndex}`] || '';
        return inputValue;
      });

      const message = {
        campaignId: campaignId.toString(),
        name: broadcastValues.broadcastName,
        channel: broadcastValues.selectChannel.toString(),
        channel_template: broadcastValues.channelTemplateId,
        broadcast_group: selectedArray.map(obj => obj._id),
        attachment_size: 0,
        messageBody: {
          recipient_type: "individual",
          type: "template",
          mediaUrl: broadcastValues.fileUrl ?  broadcastValues.fileUrl : [],
          templateVariables: Object.values(inputValues)
          .map(value => value.split(' ').join(' '))
          .filter(value => value.trim() !== '')
          // templateVariables: Object.values(inputValues).flatMap(value => value.split(' ')),
        },
        text: modifiedTemplateDesc,
      };
      // console.log(message)


      
        try{
          
          
          const response = await broadcastApi.addBroadcast(message);
          const data = response.data;
          const result = data.data;
          console.log(response)
          if (response.status === 201 && data.STATUS === "SUCCESSFUL") {
            newBroadcastMessages(result);
            // hideBroadcastCanvas()
          }
        }
        catch(err){
          console.log(err)
          setBroadcastValues(prevValues => ({
            ...prevValues,
            fileUrl: ''
          }))
        }
      }

  };


  const confirmCampaignDelete = (id)=>{
    setCampaignID(id)
    setConfirm(true)
  }
  
  const deleteBroadcastHandler = async()=>{
    const response = await broadcastApi.deleteBroadcast(campaignID)
    const data = response.data 
    if(response.status === 200){
      if(data.STATUS === "SUCCESSFUL"){
        deleteBroadcast(campaignID)
        hideBroadcastData();
        showToast('Campaign successfully delete', 'success')
        
      }
    }
  }


  


  const groupHandler = async (ele)=>{
    // const response = await contactsApi.getGroupContacts(ele.groups._id)
    // console.log(response)
    setShowGrpCanvas(true)
    setGroupData(ele.groups)
  }


  

  const handleSearchInput = (e) =>{
    const {name, value} = e.target
    setSearchValue((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
    // searchCampaing(searchValue.serachInput)
  }
  useEffect(() => {
    searchCampaing(searchValue.serachInput);
}, [searchValue.serachInput]); // Run searchCampaing when searchValue.serachInput changes

  const handleSearchBar = async(e)=>{
    

      // if(e.key === 'Enter'){
        
        
      // }
    
  }
  
  



    return { 
        allCampaign, campaignHandler,toggleState, showSVG, show, handleAddCampaing, handleCloseCampaign, showBroadcast,groups,groupData,
        handleAddBroadcast, handleCloseBroadcast,showMessages,groupList,
        broadcastMessages, campaignData, mesagesHandler, backToMessages, bIndMessage, broadcastValues, setBroadcastValues, addBroadcastHandler,
        handleSearchInputChange, options, handleChannel,handleInputChange, showChannel, toggleChannel, selectedArray, handleSelectChange, removeGroup,
        handleSearchBar,deleteBroadcastHandler, confirmCampaignDelete, groupHandler, confirm, setConfirm, showGrpCanvas, setShowGrpCanvas,
        channelId, handleCheckboxChange, groupMember, handleGroupMember, groupMemberList, handleGroupMemberClose, templates,showLabel, allLabels,inputValues,handleLableInputChange, handleFileChange,showCampaingsData, handleSearch,handleSearchInput, broadcastCanvas,showBroadcastCanvas,hideBroadcastCanvas
    }
}
export default useBroadcast