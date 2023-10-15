import React, { useEffect, useState } from 'react'
import useStore from '../../store/store'
import teamApi from '../../Model/Data/Team/Team'
import Button from '../../Components/Button/Button'
import { showToast } from '../../Toaster/Toaster'
const NewTeam = (props) => {
  const {data, teamData, close} = props
  const [teamName, setTeamName] = useState('')
  const addNewTeam = useStore((state) => state.addNewTeam)
  const updateTeam = useStore((state) => state.updateTeam)



 
  useEffect(() => {
    if (data === 'add') {
      setTeamName(''); // Reset the teamName state when data is 'add'
    } else {
      setTeamName(teamData.title); // Set the teamName state to the initial value when data is not 'add'
    }
  }, [data, teamData]);

  const addNewTeamHandler = async(e)=>{
    e.preventDefault()
    if (teamName === "") {
      showToast("Team Name can't be empty", 'error');
      
    } else if (/^\s*$/.test(teamName)) {
      showToast("Team Name can't be empty", 'error');
    }else{
      const response = await teamApi.addTeam(teamName)
      const data = response.data
      const newTeam = data.team
      if(response.status === 201){
        if(data.STATUS === "SUCCESSFUL"){

          showToast('Team created successfully', 'success')
          addNewTeam(newTeam)
          setTeamName('')
          close()
        }
      }
    }
  }
  
  const updateTeamHandler = async(e)=>{
    e.preventDefault()
    if (teamName === "") {
      showToast("Team Name can't be empty", 'error');
      
    } else if (/^\s*$/.test(teamName)) {
      showToast("Team Name can't be empty", 'error');
    }else{
      const response = await teamApi.updateTeam(teamData._id, teamName)
      console.log(response)
      const updatedTeam = {...teamData, title:teamName}
      if(response.status === 200){
        updateTeam(updatedTeam)
        setTeamName('')
        showToast('Team updated successfully', 'success')
        close()
      }
    }
  }

  return (
    <div className='newTeamContianer'>
      <form onSubmit={data === 'add' ? addNewTeamHandler: updateTeamHandler}>
        <div className='teamTitle'>
          <span>Team Name</span>
        </div>   
        <div className='teamInput'>
          <input type='text' placeholder='Enter team name' value={teamName} onChange={(e)=>setTeamName(e.target.value)} />
        </div>
        <div className='addTeamBtn'>
          {/* <button>{data === 'add' ? : ''}</button> */}
          <Button 
            variant='primaryBtn'
            text = {data === 'add' ? 'Add Team' : 'Update Team' }
            fontSize='14px'
            padding='5px 15px'
          />
        </div>
      </form>
      
    </div>
  )
}

export default NewTeam