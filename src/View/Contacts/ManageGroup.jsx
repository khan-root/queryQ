import { BsFillTrashFill } from 'react-icons/bs'
import ContactImge from '../../assets/Images/contact.png'
import { FaSearch } from 'react-icons/fa'
import { useEffect , useState} from 'react'
import Select from 'react-select'
import useContact from '../../ViewModel/ContactsViewModel/contactsServices'
import contactsApi from '../../Model/Data/Contact/contact'
import { components } from 'react-select'
import { showToast } from '../../Toaster/Toaster'
import ConfirmModal from '../../Components/Modal/ConfirmModal'



const ManageGroup = (props) => {
    const {whatsAppContacts, deleteMemberHanlder, addContactToGroup, selectedContacts, handleSelectAll, handleSelectIndividual,  deleteConfirm, showConfirmModal,closeConfirm, singleConfirm,closeSingleConfirm, deleteMutipleHandlerMember, openSingleConfirm, newContactLink } = useContact()

    
    const {groupData, groupContacts } = props
    const group = groupContacts
    
    
    

    const [options, setOptions] = useState([]);



  useEffect(() => {
    const initialOptions = whatsAppContacts?.map((contact) => ({
      value: contact._id,
      label: `${contact.name} (${contact.tp_uid})`, 
    }));
    setOptions(initialOptions);
  }, [whatsAppContacts]);


  


  const [values, setValues] = useState({
    groupName: '',
    tpInboxId: '',
    contactName: '',
  })


  const handleSearchInputChange =async(newValue) => {
    setValues(prevValues => ({
      ...prevValues,
      contactName: newValue
    }));

    

  };
   useEffect(() => {
      if(values.contactName){

        serachContact(values.contactName);
      }
    }, [values.contactName]);

  const serachContact = async(name)=>{
    try{

        const response = await contactsApi.getSearchContacts(name.trim());
        const data = response.data;
        const result = data.results;
         const updatedOptions = [
        ...options,
        ...result.map((contact) => ({
          value: contact._id,
          label: `${contact.name} (${contact.tp_uid})`,
          // contactNumber: 
        })),
      ];

      setOptions(updatedOptions);
      }catch(err){

      }
  }
  



  const handleSelectChange = async (selectedOption) => {
 
    const label = selectedOption.label.split(/[\(\)]/);

  // parts[0] will contain the name, and parts[1] will contain the number
    const nameOnly = label[0].trim();
    const contactNumber = label[1].trim();

    const newNameOnlyOption = {
      value: selectedOption.value,
      label: nameOnly,
    };

    const groupInfoLink = {
      contacts_id: newNameOnlyOption.value,
      action_by: group.groups.action_by,
      group_id: groupData._id,
    };

    const contactData = {
      _id: newNameOnlyOption.value,
      tp_uid: contactNumber,
      name: nameOnly,
      dp_link: '0',
      deleted: false,
    };

    let checkUser = [];

    if (group.groups.contacts) {
      checkUser = group.groups.contacts.filter((data) => data._id === newNameOnlyOption.value);
    }

    if (checkUser.length === 0) {

      try {
        const response = await contactsApi.groupContact(groupInfoLink);
        const result = response.data;
        const data = result.saved_contact_group_link;
        if (response.status === 200) {
          if (result.STATUS === 'SUCCESSFUL') {
            addContactToGroup(contactData);
            newContactLink(data);

            showToast('Contact added to list', 'success');
          }
        }
        // console.log(response)
      } catch (error) {
        console.error('Error in groupContact:', error);
        // Handle the error for individual groupContact API call
        throw error;
      }
    } else {
      showToast('User already exists in this group', 'error');
    }
  };





    





  

  const SearchIcon = props => (
    <components.DropdownIndicator {...props}>
      <FaSearch />
    </components.DropdownIndicator>
  );
  return (
    <>
      <form className='ManageGroupContainer'>
              
              
          <div className='selectOption'>
              <FaSearch style={{color: '#DCDCDC'}}/>
              
              <Select
                options={options.length > 0 ? options : [{ label: 'Loading...', value: '' }]}
                className='selectContact'
                components={{ IndicatorSeparator: null,
                    SearchIcon, 
                }}
                onChange={handleSelectChange}
                inputValue={values.contactName}
                onInputChange={handleSearchInputChange}
                placeholder={     
                  'Select Contact'
                }
              
                styles={{
                    control: base => ({
                        ...base,
                        height: 40,
                        fontSize: 16,
                        padding: '0 8px',
                        boxShadow: 'none',
                        outline: 'none',
                        border: 'none'
                    }),
                    placeholder: base => ({
                        ...base,
                        color: '#999',
                    }),
                    input: base => ({
                        ...base,
                        padding: 0,
                        margin: 0,
                    }),
                }}
              />
          </div>
          {groupContacts?.groups?.contacts?.length> 0 ? 
          <div className='contactContainer'>
            <div className='contactContainerHeader'>
                <span>Name</span>
                <span>Number</span>
                <span>Actions</span>
            </div>
            <div  className='contactSelecting'>
                  
                <div>
                  <input
                      type="checkbox"
                      checked={selectedContacts?.length > 0}
                      onChange={handleSelectAll}
                      style={{cursor: 'pointer'}}
                      
                  />
                </div>
                <div>
                  <span style={{color: selectedContacts?.length > 0 ? 'red': 'black', cursor: 'pointer', fontSize: '15px'}} onClick={deleteConfirm}>
                    Delete Selected Contacts
                  </span>
                </div>
                  
            </div>
            
            <div className='userContactLists'>
                
              

                {groupContacts?.groups?.contacts?.map((ele, i) => (
                  <div key={i} className={`userContactList ${i % 2 === 0 ? 'even' : 'odd'}`}>
                    <div className='user'>
                      <div className='selectUser'>
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(ele._id)}
                          onChange={() => handleSelectIndividual(ele._id)}
                          style={{cursor: 'pointer'}}
                        />
                        <img src={ele.dp_link === "0" || !ele.dp_link ? ContactImge : ele.dp_link} alt='contactImage'  />
                      </div>
                      <span>{ele.name}</span>
                        
                    </div>
                    <div className='contactNumber'>+{ele.tp_uid}</div>
                    <div className='deleteActions'>
                        <span className='deleteIcon' onClick={()=>openSingleConfirm(ele._id)}><BsFillTrashFill /></span>
                    </div>
                  </div>
                ))}
                
              </div>
            
          </div>

          : 
            <div className='noData'>
              <span>Add Contact to Group</span>
            </div>
          }
         
      </form>
      <ConfirmModal 
        show  = {showConfirmModal}
        handleClose = {closeConfirm}
        title = 'Confirm Delete' 
        confirmDelete = {deleteMutipleHandlerMember}
      />
      <ConfirmModal 
        show  = {singleConfirm}
        handleClose = {closeSingleConfirm}
        title = 'Confirm Delete' 
        confirmDelete = {deleteMemberHanlder}
      />
    </>
  )
}

export default ManageGroup