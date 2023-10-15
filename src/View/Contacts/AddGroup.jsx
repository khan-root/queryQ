import { useEffect, useState } from 'react'
import { channelIcons } from '../Channels/data'
import Select from 'react-select'
import { FaSearch } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import useContact from '../../ViewModel/ContactsViewModel/contactsServices';
import useStore from '../../store/store';
import contactsApi from '../../Model/Data/Contact/contact';
import Button from '../../Components/Button/Button';
import { components } from 'react-select'
import { showToast } from '../../Toaster/Toaster';



const AddGroup = (props) => {
  const {close} = props
  const {whatsAppContacts , getWhatsappContacts } = useContact()

  const addGroup = useStore((state) => state.addGroup)
  
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const initialOptions = whatsAppContacts?.map((contact) => ({
      value: contact._id,
      label: `${contact.name} (${contact.tp_uid})`,
    }));
    setOptions(initialOptions);
  }, [whatsAppContacts]);

  

  
  const [toggleChannel, setToggleChannel] = useState('')


  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);

  


  const [values, setValues] = useState({
    groupName: '',
    tpInboxId: '',
    contactName: '',
  })
  // from cookies 
  const action_by = 10268458;
  const org_id = 9677375
  // .........
  const handleSearchInputChange = (newValue) => {
    setValues(prevValues => ({
      ...prevValues,
      contactName: newValue
    }));
  };

  useEffect(() => {

    if(values.contactName){
      handleSearch(values.contactName)
    }
  }, [values.contactName])


  const handleSearch = async (name) => {
     
    try{

      const response = await contactsApi.getSearchContacts(name);
      const data = response.data;
      const result = data.results;
      
      const updatedOptions = [
        ...options,
        ...result.map((contact) => ({
          value: contact._id,
          label: `${contact.name} ${contact.tp_uid}`,
        })),
      ];
      
      setOptions(updatedOptions);
    }catch(err){

    }
  };


  


  const handleChannel = (id, tpId) => {
    setToggleChannel(id);
    setValues(prevValues => ({
      ...prevValues,
      tpInboxId: tpId.toString()
    }));
    getWhatsappContacts();
  };
  const handleChange = (e) =>{
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  }


const handleSelectChange = (selectedOption) => {
  const nameOnly = selectedOption.label.split(' ')[0];
  // const contactNumber = selectedOption.label.split(' ')[1].replace(/\(|\)/g, '');

  const newNameOnlyOption = {
    value: selectedOption.value,
    label: nameOnly,
  };
  setSelectedOptions((prevSelectedOptions) => {
    const isOptionSelected = prevSelectedOptions.some(
      (option) => option.value === newNameOnlyOption.value
    );

    if (isOptionSelected) {
      showToast('User already exists in group', 'error');
      return prevSelectedOptions;
    } else {
      showToast('Contact added to list', 'success');
      return [...prevSelectedOptions, newNameOnlyOption];
    }
  });

  setSelectedArray((prevSelectedArray) => {
    const isOptionSelected = prevSelectedArray.some(
      (option) => option.value === newNameOnlyOption.value
    );

    if (!isOptionSelected) {
      return [...prevSelectedArray, newNameOnlyOption];
    } else {
      return prevSelectedArray;
    }
  });
};



  const removeContact = (i)=>{
    const updateConactList = [...selectedArray];
    updateConactList.splice(i, 1);
    setSelectedArray(updateConactList);
    showToast('Contact removed from list', 'success')
  }

  const validateForm = ()=>{

    if(!values.tpInboxId){
      showToast('Select channel', 'error')
      return
    }
    else if (!selectedArray.length>0){
      showToast('Add at least one contact','error')
      return
    }else if (!values.groupName) {
      showToast(`Group name required`, 'error');
      return;
    }else if (/^\s*$/.test(values.groupName)) {
        showToast(` Group name can't be empty`, 'error');
        return;
    }else if (/^[\s]+/.test(values.groupName)) {
        showToast(`Remove spaces from the start of group name`, 'error');
        return;
    }


    return true
  }
// disable button after one click 
  const addGroupHandler = async (e) => {
    e.preventDefault();
    
    const groupInfo = { name: values.groupName, tp_inbox_id: values.tpInboxId, org_id, action_by };
    const validate = validateForm()
    if(validate){
      try {
        const groupInfoRes = await contactsApi.createGroup(groupInfo);
        // console.log('groupInfoRes', groupInfoRes);
        const infoData = groupInfoRes.data 
        const infoResult = infoData.posting_all_the_data
        addGroup(infoResult)

        const groupInfoLinkPromises = selectedArray.map(async (item) => {
          const groupInfoLink = {
            contacts_id: item.value,
            action_by: action_by,
            group_id: infoResult._id
          };

          try {
            const groupContacts = await contactsApi.groupContact(groupInfoLink);
            
            return groupContacts;
          } catch (error) {
            console.error('Error in groupContact:', error);
            // Handle the error for individual groupContact API call
            throw error;
          }
        });

        close()
        showToast('Group created successfully', 'success');
        
        const groupInfoLinkResponses = await Promise.all(groupInfoLinkPromises);
        const allRequestsSuccessful = groupInfoLinkResponses.every(response => {
          return response.status === 200 && response.data.STATUS === 'SUCCESSFUL';
        });

        if (allRequestsSuccessful) {
          // Show a success toast indicating that the group was created successfully
        } else {
          // Handle the case where not all requests were successful
          showToast('Try again', 'error');
        }
  

        // Process the responses as needed
      } catch (error) {
        console.error('Error in createGroup:', error);
        // Handle the error for createGroup API call
      }
    }
  };


  const SearchIcon = props => (
    <components.DropdownIndicator {...props}>
      <FaSearch />
    </components.DropdownIndicator>
  );
  
  return (
    <div className='addGroup'>
        <form onSubmit={addGroupHandler}>
            <div className='groupChannel'>
                <div className='groupChannelTitle'>
                  <span>Select Channel</span>
                </div>
                <div className='channelsIcons'>
                {channelIcons.map((ele, i)=>(
                  <div key={i} 
                    onClick={()=>{
                      if(ele.tp_inbox_id === 14){
                        handleChannel(ele.id, ele.tp_inbox_id)
                      }
                    }}
                  >

                      <span key={ele.id}
                        className={`channelIcon ${
                                toggleChannel === ele.id ? 'activeChannelIcon' : ''
                            } ${ele.tp_inbox_id !== 14 ? 'disabledChannel' : ''}`}
                      
                      >{ele.icon()}</span>
                  </div>
                ))}
              </div>
            </div>
          <div className='gorupContacts'>
            <div className='groupContactTitle'>
              <span>Group Contact</span>
            </div>
            <div className='groupContactSelect'>
              <div className='selectOption'>
                <FaSearch style={{color: '#DCDCDC'}}/>
                
                <Select
                  options = {options}
                  className='selectContact'
                  components={{ IndicatorSeparator: null}} // Corrected component key

                  onChange={handleSelectChange}
                  inputValue={values.contactName}
                  onInputChange={handleSearchInputChange}
                  // onKeyDown={handleSearchContact}
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
              <div className='slectedOptions'>
                {selectedArray.length > 0 ?
                  selectedArray.map((ele, i)=>(
                    <div key ={i} className='selectedItem'>
                      <span>{ele.label}</span>
                      <span className='selectRemIcon' onClick={()=> removeContact(i)}><AiOutlineClose /></span>
                    </div>
                  )) : ''
                }
              </div>
            </div>
            <div className='groupName'>
              <label>Group Name</label>
              <input type='text' placeholder='Enter Group Name' name='groupName' onChange={handleChange}/>
            </div>
            <div className='addGroup'>
              <Button 
                text='Create'
                variant='primaryBtn'
                fontSize='13px'
                padding='5px 15px'
              />
              {/* <<button>Create</button>> */}
            </div>
          </div>
        </form>
    </div>
  )
}

export default AddGroup