
import { useEffect, useState } from "react"
import contactsApi from "../../Model/Data/Contact/contact"
import useStore from "../../store/store"
import { showToast } from "../../Toaster/Toaster"

const useContact = ()=>{

    const getWhatsappContacts = useStore((state) => state.getAllWhatsAppContacts)
    const getEmailContacts =  useStore((state) => state.getAllEmailContacts)
    const getFacebookContacts =  useStore((state) => state.getAllFacebookContacts)
    const getInstaContacts =  useStore((state) => state.getAllInstaContacts)
    const getTwitterContacts =  useStore((state) => state.getAllTwitterContacts)
    
    const whatsAppContacts = useStore((state) => state.whatsAppContacts)
    const emailContacts = useStore((state) => state.emailContacts)
    const facebookContacts = useStore((state) => state.facebookContacts)
    const instaContacts = useStore((state) => state.instaContacts)
    const twitterContacts = useStore((state) => state.twitterContacts)

    
    const allConatcts = useStore((state) => state.allConatcts)
    const allEmails = useStore((state) => state.allEmails)
    const allFaceBook = useStore((state) => state.allFaceBook)
    const allInsta = useStore((state) => state.allInsta)
    const allTwitter = useStore((state) => state.allTwitter)
    
    
    const allGroups = useStore((state) => state.getAllGroups)
    const deleteGroup = useStore((state) => state.deleteGroup)
    const newContactLink = useStore((state)=> state.newContactLink)

    const contactEdit = useStore((state)=> state.updateContact)

    const groups = useStore((state) => state.contactGroups)
    const addContactToGroup = useStore((state)=> state.addContactToGroup)

    
    const [data, setData] = useState([])
    const [groupData, setGroupData] = useState([])

    const [showConfirm, setShowConfirm] = useState(false)

    const searchHandler = useStore((state)=> state.searchHandler)


    useEffect(()=>{
        setData(whatsAppContacts)
    },[whatsAppContacts])
    
    useEffect(()=>{
        setData(emailContacts)
    },[emailContacts])

    useEffect(()=>{
        setData([])
    },[facebookContacts])


    useEffect(()=>{
        setData([])
    },[instaContacts])


    useEffect(()=>{
        setData([])
    },[twitterContacts])


    useEffect(()=>{
        setGroupData(groups)
    },[groups])

    // Delete 

    const [groupID, setgroupId] = useState('')
    const confirmDelete = (id)=>{
        setgroupId(id)
        setShowConfirm(true)

    }

    const deleteGroupHanlder = async ()=>{
        const response = await contactsApi.groupDelete(groupID)
        const data = response.data
        if(response.status === 200){
            if(data.STATUS === "SUCCESSFUL"){
                showToast('Group deleted successfully', 'success')
                deleteGroup(groupID)
                
            }
        }
    }

    const [sgManage, setSgManage] = useState(false)
    const [contactGroup, setcontactGroup] = useState([])
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    
        const [singleConfirm, setSingleConfirm] = useState(false)
        const [contact_id, setcontact_id] = useState('')

        const openSingleConfirm = (id)=>{
            
            if(selectedContacts.length == 0){
                setcontact_id(id)
                setSingleConfirm(true)
            }
        }
        const closeSingleConfirm = ()=>{
            setSingleConfirm(false)
        }


    const contactGroupHandler = useStore((state)=> state.contactGroupHandler)
    const groupContacts = useStore((state)=> state.groupContacts)
    const manageGroupHandler = (id)=>{
        contactGroupHandler(id)
        getAllGorupContactsLink();
        setSgManage(true)
        

        
    }

    const getAllGorupContactsLink = useStore((state) => state.getAllGorupContactsLink)
    const allGroupsLinks = useStore((state) => state.allGroupsLinks)
    const removeMemberFromGroup = useStore((state)=> state.removeMemberFromGroup)

    const deleteMemberHanlder = async () => {
        const group = groupContacts?.groups
            allGroupsLinks?.map(async (data) => {

            
                
                if (group._id  ===  data.group_id &&  data.contacts_id === contact_id ) {
                
                    
                    try{
                        const response = await contactsApi.deleteGroupMember(data._id)
                        const result = response.data
                        console.log(response)
                        if(response.status ==  200){
                            if(result.STATUS === "SUCCESSFUL"){
                                showToast('Member removed', 'success')
                                removeMemberFromGroup(contact_id)
                                setSingleConfirm(false)
                                setcontact_id('')
                            }
                        }
                    }
                    catch(err){
                        console.log(err)
                    }
                }
            });
        
    };
    const deleteMutipleHandlerMember = async () => {
        const group = groupContacts?.groups
                // Map selectedContacts to an array of promises for deletion
                const deletionPromises = selectedContacts.map(async (contactId) => {
                    allGroupsLinks?.map(async (data) => {
                        if (group._id  ===  data.group_id && contactId === data.contacts_id) {
                            try {
                                // Delete the contact using contactsApi.deleteContact() with the contactId
                                const response = await contactsApi.deleteGroupMember(data._id);
                                // console.log('response', response)
                                if(response.status == 200 && response.data.STATUS === "SUCCESSFUL"){

                                    removeMemberFromGroup(contactId)
                                }
                                return response.data; // You can return some data if needed
                            } catch (error) {
                                // Handle errors for individual deletions as needed
                                console.error(`Error deleting contact with ID ${contactId}:`, error);
                                return null; // Return null or handle the error as needed
                            }
                        }
                    })
                });

                // Use Promise.all to wait for all deletion promises to complete
                try {
                    const result = await Promise.all(deletionPromises);
                    
                    // const allSuccessful = response.every((response) => response.status === 200 && response.data.STATUS === "SUCCESSFUL");
                    // if(allSuccessful){
                        setSelectedContacts([])
                        setShowConfirmModal(false)
                        
                        showToast('Contacts deleted successfully ','success')
                        // console.log( 'response',response)

                    // }


                    // Handle results here, if necessary
                    console.log('Deletion results:', result);
                    
                } catch (error) {
                    // Handle any errors that occurred during the Promise.all operation
                    console.error('Error deleting contacts in parallel:', error);
                    showToast('Error deleting contacts', 'error');
                }
            
    };

    // sreach
    const [sreachValue, setSearchValue] = useState({
        contactSeacrh: ''
    })
    useEffect(() => {
      
    //     // console.log('checkk', sreachValue.contactSeacrh)
        searchHandler(sreachValue.contactSeacrh)
      

    },[sreachValue.contactSeacrh])

    const onChnageHandler =(e)=>{
        const {name, value} = e.target
         setSearchValue(prevValues => ({
            ...prevValues,
            [name]: value
        }));
        
    }


        

        const handleSelectAll = () => {
            setSelectedContacts([]);
            
        };

        const handleSelectIndividual = (id) => {
            if (selectedContacts.includes(id)) {
                setSelectedContacts(selectedContacts.filter((ele) => ele !== id));
            } else {
                setSelectedContacts([...selectedContacts, id]);
            }
        };
        const deleteConfirm = ()=>{
            if(selectedContacts.length > 0){
                setShowConfirmModal(true)
            }
        }
        const closeConfirm = ()=>{
            setShowConfirmModal(false)
        }

        const deleteContacts = useStore((state)=> state.deleteContact) 
        const deleteMulitpleContacts = async()=>{
                // Map selectedContacts to an array of promises for deletion
                const deletionPromises = selectedContacts.map(async (contactId) => {
                    try {
                        // Delete the contact using contactsApi.deleteContact() with the contactId
                        const response = await contactsApi.deleteContact(contactId);
                        // console.log('response', response)
                        if(response.status == 200 && response.data.STATUS === "SUCCESSFUL"){

                            deleteContacts(contactId)
                        }
                        return response.data; // You can return some data if needed
                    } catch (error) {
                        // Handle errors for individual deletions as needed
                        console.error(`Error deleting contact with ID ${contactId}:`, error);
                        return null; // Return null or handle the error as needed
                    }
                });

                // Use Promise.all to wait for all deletion promises to complete
                try {
                    const result = await Promise.all(deletionPromises);
                    
                    // const allSuccessful = response.every((response) => response.status === 200 && response.data.STATUS === "SUCCESSFUL");
                    // if(allSuccessful){
                        setSelectedContacts([])
                        setShowConfirmModal(false)
                        
                        showToast('Contacts deleted successfully ','success')
                        // console.log( 'response',response)

                    // }


                    // Handle results here, if necessary
                    console.log('Deletion results:', result);
                    
                } catch (error) {
                    // Handle any errors that occurred during the Promise.all operation
                    console.error('Error deleting contacts in parallel:', error);
                    showToast('Error deleting contacts', 'error');
                }
             



        }


        const deleteSingleContact = async()=>{
            console.log(contact_id)
            try {
                // Delete the contact using contactsApi.deleteContact() with the contactId
                const response = await contactsApi.deleteContact(contact_id);
                
                if(response.status == 200 && response.data.STATUS === "SUCCESSFUL"){
                    setSingleConfirm(false)
                    deleteContacts(contact_id)
                    showToast('Contact deleted successfully','success')
                
                }
            } catch (error) {
                
            }
        }


    return{ 
        getWhatsappContacts, getEmailContacts, getFacebookContacts, getInstaContacts, getTwitterContacts,
        allConatcts, allEmails, allFaceBook, allInsta, allTwitter,
        allGroups,
        whatsAppContacts,onChnageHandler,
        data,groupContacts,addContactToGroup,
        groupData,sgManage,setSgManage,contactGroup,confirmDelete,
        deleteGroupHanlder,manageGroupHandler, deleteMemberHanlder, showConfirm, setShowConfirm,searchHandler,
        selectedContacts,handleSelectAll,handleSelectIndividual,deleteMulitpleContacts,
        closeConfirm, deleteConfirm, showConfirmModal,closeSingleConfirm,singleConfirm, deleteSingleContact,openSingleConfirm,deleteMutipleHandlerMember, newContactLink,
        contactEdit
    }
}

export default useContact