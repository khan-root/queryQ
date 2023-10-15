import React from 'react'

const updateAssignment = () => {

    const {data, close, update, ruleData} = props
    // const { showFilter, ruleId, assData, handleTeamChange,
    //      handleAddTeam, handleInputChange,
    // } = useAssignment()

    if(update){
        console.log('ruleData', ruleData)
    }


    
    
    
    const addNewAssignment = useStore((state)=> state.addNewAssignment)
    const [showFilter, setShowFilter] = useState(false)
    
    const [ruleId, setRuleId] = useState('')
    const [values, setValues] = useState({teamId:null, teamName: null,ruleName:'', selectTeam:false});
    
    const team = data?.find((ele)=> ele._id == assignmentData.action_team)

    const handleTeamChange = (selectedOption, field) => {
        setValues((prevState) => ({
            ...prevState,
            [field]: selectedOption,
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
        if (!values.selectTeam) {
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
            const teamData = {action_team: values.teamId.value, name: values.ruleName}
        // // const teamData = {teamId: values.teamId.value, automationTemplateId:1,tempVarValue:[values.startHour.value, values.endHour.value, values.startDay.value, values.endDay.value, values.label, values.teamId.value]}
            if(update){
                console.log('kkkkkk')

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
    <form onSubmit={handleAddTeam} className='addAssignmentCanvasContainer'>
        {!showFilter ?

            <>
            <div className='label'>
                <label>Rule Name</label>
                <input type='text' name='ruleName'   onChange={handleInputChange} placeholder='Enter Rule Name'/>
            </div>
            <div>
                <label>Select Team</label>
                <Select
                    options = {data.map((ele)=> ({value:ele._id, label:ele.title}))}
                    components={{ IndicatorSeparator: null}}
                    onChange={(selectedOption) => handleTeamChange(selectedOption, 'teamId')} 
                    placeholder={     
                        'Select Team'
                    }
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
        </>
        :
            <AddFilter 
                close = {close}
                ruleId = {ruleId}
            />
        }
        
        {!showFilter && 
        // <div style={ assignmentData ?  {display:'flex', alignSelf:'flex-end'} : {display:'flex'}}>
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

export default updateAssignment