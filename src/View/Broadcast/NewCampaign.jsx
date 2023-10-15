import { useState } from 'react'
import useStore from '../../store/store'
import broadcastApi from '../../Model/Data/Broadcast/Broadcast'
import Button from '../../Components/Button/Button'
import { showToast } from '../../Toaster/Toaster'

const NewCampaign = (props) => {
    const { close } = props

    const addCampaign = useStore((state) => state.addCampaign)
    // const [errors, setErrors] = useState({});


    
    const [values, setValues] = useState({
        campaignName: '',
        selectChannel: ''

    })

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setValues(prevValues => ({
        ...prevValues,
        [name]: value
        }));
    }

    const validateForm = () => {
        // const newErrors = {};
        if (!values.campaignName) {
            // newErrors.campaignName = 'Campagin name is required';
            showToast('Campagin name is required','error')
            return 
            
        }
        else if (/^\s*$/.test(values.campaignName)) {
            // newErrors.campaignName = "Campagin name can't be empty"
            showToast("Campagin name can't be empty",'error')
            return 
        }
         else if (/[^a-zA-Z0-9\s]/.test(values.campaignName)) {
            showToast('Remove special characters from campaign name!','error')
            return 
        }
        if (!values.selectChannel) {
            showToast('Select Inbox','error')
            // newErrors.selectChannel = 'Select Inbox';
            return 
        }
         return true
        // setErrors(newErrors);
        // return Object.keys(newErrors).length === 0;
    }


    const addCampaignHandler = async(e)=>{
        e.preventDefault()
        console.log('hello testing')
        const isValid = validateForm();
        const newCampaign = {name: values.campaignName, tp_inbox_id: values.selectChannel}
        if(isValid){

            const response = await broadcastApi.addNewCampaign(newCampaign)
            console.log(response)
            const data = response.data
            const campaign = data.compaigns
            if(response.status === 201){
                if(data.STATUS === "SUCCESSFUL"){
                    close()
                    addCampaign(campaign)
                    showToast('Campaign successfully created', 'success')
                }
            }
        }
    }

    
  return (
    <form className='NewCampaignformContainer' onSubmit={addCampaignHandler}>
        <div className='formInput'>
            <label>Campaign Name</label>
            <input type="text" placeholder="Enter Campaign Name"  name='campaignName' onChange={handleChange}/>
            {/* <span className='text-danger'>{errors.campaignName}</span> */}
        </div>

        <div className='formSelect'>
            <label>Select Inbox</label>
            <select name="selectChannel" onChange={handleChange}>
                <option>--Select Inbox--</option>
                <option value="16">Keptua</option>
            </select>
            {/* <span className='text-danger'>{errors.selectChannel}</span> */}
        </div>
        <div className='formButton'>
            <Button 
                text='Add Campaign'
                variant='primaryBtn'
                fontSize='13px'
                padding='3px 10px'
            />
        </div>
    </form>
  )
}

export default NewCampaign