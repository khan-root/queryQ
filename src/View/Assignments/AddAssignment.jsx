import { useState } from 'react';
import Select from 'react-select';
import useStore from '../../store/store';
import Button from '../../Components/Button/Button';
import assignmenstApi from '../../Model/Data/Assignment/Assignment';
import { showToast } from '../../Toaster/Toaster';
import AddFilter from './AddFilter';

const AddAssignment = (props) => {

    const {data, close, update, ruleData} = props


    
    
    
    const addNewAssignment = useStore((state)=> state.addNewAssignment)
    const updateAssignment = useStore((state)=> state.updateAssignment)
    const [showFilter, setShowFilter] = useState(false)
    
    const [ruleId, setRuleId] = useState('')
    const team = data?.find((ele)=> ele._id == ruleData.action_team)

    const [values, setValues] = useState({
       
        teamId: update ? team._id :  '', 
        teamName: update? team.title :  '',
        ruleName: update? ruleData.name: '', 
        selectTeam:false
    });
    

    const handleTeamChange = (selectedOption, field) => {
        setValues((prevState) => ({
            ...prevState,
            teamId: selectedOption.value,
            teamName: selectedOption.label,
            selectTeam: true
        }));
    
    };




    function handleInputChange (e){
        const { name, value } = e.target;
        setValues(prevValues => ({
        ...prevValues,
        [name]: value
        }));  
    }

    const formValidate = ()=>{

        if(!values.ruleName){
            showToast('Rule name required', 'error')
            return 
        }
        else if (/^\s*$/.test(values.ruleName)) {
            // newErrors.campaignName = "Campagin name can't be empty"
            showToast("Rule name can't be empty",'error')
            return 
        }
        
         else if (/^[\s]+/.test(values.ruleName)) {
            showToast('Remove spaces from the start of rule name','error')
            return 
        }
        if (!values.teamId) {
            showToast('Select Team','error')
            // newErrors.selectChannel = 'Select Inbox';
            return 
        }

        return true
    }
    
    const  handleAddTeam = async(e)=>{
        e.preventDefault()
        const validate = formValidate()
        
        
        if(validate){
            const teamData = {action_team: values.teamId, name: values.ruleName}
            if(update){
                console.log(teamData)
                const response = await assignmenstApi.updateAssignment(ruleData._id, teamData)
                console.log(response)
                const data = response.data 
                if(response.status == 200 && data.STATUS === "SUCCESSFUL"){
                    updateAssignment(data.updating_all_the_data)
                    close()
                    showToast('Rule updated successfully', 'success')

                }
                
            }else{
                
                const response = await assignmenstApi.addRule(teamData)
                console.log(response)
                const data = response.data
                const result = data.newRule
                if(response.status === 200 && data.STATUS === "SUCCESSFUL"){
                
                    addNewAssignment(result)
                    showToast('Rule created successfully', 'success')
                    setRuleId(result._id)
                    
                    setShowFilter(true)
                }
            }
        }
    }

    
  return (
    <form onSubmit={handleAddTeam } className='addAssignmentCanvasContainer'>
        {!showFilter ?

            <>
            <div className='label'>
                <label>Rule Name</label>
                <input type='text' name='ruleName' value={values.ruleName} placeholder='Enter Rule Name' onChange={handleInputChange}/>
            </div>
            <div>
                <label>Select Team</label>
                <Select
                    options = {data.map((ele)=> ({value:ele._id, label:ele.title}))}
                    components={{ IndicatorSeparator: null}}
                    onChange={(selectedOption) => handleTeamChange(selectedOption, 'teamId')} 
                    value={{value:values.teamId, label:values.teamName}}
                    placeholder='Select Team'
                    styles={{
                        control: base => ({
                            ...base,
                            fontSize: 14,
                            padding: '0 8px',
                            boxShadow: 'none',
                            outline: 'none',
                            border: '1px solid #B3B3B3',
                            borderRadius: '10px',
                            color: '#495057'
                        }),
                        placeholder: base => ({
                            ...base,
                            color: '#999 !important',
                        }),
                        input: base => ({
                            ...base,
                            padding: 0,
                            margin: 0,
                        }),
                    }}
                /> 
            </div>
        </>
        :
            <AddFilter 
                close = {close}
                ruleId = {ruleId}
            />
        }
        
        {!showFilter && 
        <div style={{display: 'flex', alignSelf: update ? '' : 'flex-end' }}>           
            <Button 
                text={update ? 'Update' : 'Next'}
                variant='primaryBtn'
                padding='5px 20px'
                fontSize='13px'
            />
        </div>
        }
    </form>
  )
}

export default AddAssignment


