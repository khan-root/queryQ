import teamApi from '../../Model/Data/Team/Team'
import { showToast } from '../../Toaster/Toaster'
import useStore from '../../store/store'
import { useState } from "react"



export const useTeam = () =>{

    const users = useStore((state)=> state.allTeamUsers)
    const teamDetailHandler = useStore((state)=> state.teamDetailHandler)
    const show = useStore((state)=> state.showUsers)
    const team = useStore((state)=> state.team)
    const excludedMember = useStore((state) => state.excludedMember)
    const excludedUsers = useStore((state) => state.excludedUsers)
    const getEmpMember = useStore((state) => state.getEmpMember)
    const emplMembers = useStore((state) => state.emplMembers)
    const addMemberToTeam = useStore((state) => state.addMemberToTeam)
    const remMemberFromQueryQ = useStore((state) => state.remMemberFromQueryQ)
    const addMemberFromEmpToTeam = useStore((state) => state.addMemberFromEmpToTeam)
    const remMemberFromEmpleado = useStore((state) => state.remMemberFromEmpleado)
    const addtoQueryQ = useStore((state)=> state.addtoQueryQ)
    const removeMemberFromTeam = useStore((state)=> state.removeMemberFromTeam)

    
    const toggleState = useStore((state) => state.toggleState)
    const toggleIndex = useStore((state) => state.toggleIndex)

    const [showUpdateTitle, setShowUpdateTitle] = useState(false)

    // console.log('users', users)
    const [memeberTab, setMemberTab] = useState(1)

    function handleTabClick(id){
        setMemberTab(id)

        switch (id) {
            case 1:
                excludedMember(team._id)
            return
            case 2:
                getEmpMember()
                return;
        
            default:
                break;
        }
        
    }

    const handleDragStart = (e, ele, teamId, type )=>{
        e.dataTransfer.setData('text/plain', JSON.stringify({ ele, teamId, type }));

    }


    


    const handleDrop = async(e) => {
        e.preventDefault();
        const droppedData = e.dataTransfer.getData('text/plain');
        const { ele, teamId, type } = JSON.parse(droppedData)
        
        if(type === 'queryQ'){
            const oneId = ele.oneId
            const data = {member_oneid: oneId.toString(), teamId:teamId.toString()}
            
            const response = await teamApi.addMemberToTeam(data)
            console.log(response)
            if(response.status == 201){
                addMemberToTeam(ele)
                remMemberFromQueryQ(ele)
                // console.log('drag and drop ele',ele)
                showToast('Member Added to Team', 'success')
            }
        }else{
            const data = {member_oneid: ele.oneid, teamId:teamId.toString()}
            
            const isUserPresent = users.some(user => user.oneId == ele.oneid);
            // console.log(isUserPresent)
            if (isUserPresent) {
            
                showToast('Member already exists', 'warnning')
            } 
            else {
                const response = await teamApi.addMemberToTeam(data)
                console.log(response)
                if(response.status == 201){
                    addMemberFromEmpToTeam(ele)
                    showToast('Member Added to Team', 'success')
                    remMemberFromEmpleado(ele)
                }
            
            }
    }
        
        
        
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('dragOver');
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('dragOver');
    };


    
    const [toggleTab, setToggleTab] = useState(1)

    const handleToggle = (id)=>{
        setToggleTab(id)
        switch (id) {
            case 1:
                // excludedMember(team._id)
            return
            case 2:
                excludedMember(team._id)
                return;
        
            default:
                break;
        }
    }


    const handleRemoveMemberFromTeam = async(team, user)=>{
        // console.log(user, team)
        
        let one_id;

  if (typeof user.oneId === 'number') {
    one_id = user.oneId.toString();
  }  else {
    one_id = user.oneId || user.oneid;
  }
        
        const data = {member_oneid:one_id, teamId: team._id}
        const response = await teamApi.remMemberFromTeam(data)
        const result = response.data 
        if(response.status == 200){
        if(result.STATUS === 'SUCCESSFUL'){
            addtoQueryQ(user)
            removeMemberFromTeam(user._id)
            showToast('Member Removed from Team', 'success')
        }
        }
      
    }
    

   



    return { teamDetailHandler, show, users, team, memeberTab, handleTabClick, excludedUsers ,emplMembers, handleRemoveMemberFromTeam,
        toggleState, toggleIndex,handleDragStart,handleDrop, handleDragEnter,handleDragLeave, handleToggle, toggleTab,
    }    
}
