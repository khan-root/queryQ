import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import teamApi from '../../Model/Data/Team/Team'
import { useTeam } from '../../ViewModel/TeamViewModal/teamServices'
import { FiEdit } from 'react-icons/fi'
import { showToast } from '../../Toaster/Toaster'

const QueryQ = () => {
    const { team , excludedUsers, handleDragStart,toggleTab,  handleToggle } = useTeam()
    // const { } = useTeam()
    const tabs = [
        {id: 1, title: 'Invite Members'},
        {id: 2, title: 'Add Existing'}
    ]

    
    const [emailInput, setEmailInput] = useState('');
    const [emailList, setEmailList] = useState([]);

    const handleInputChange = (e) => {
        setEmailInput(e.target.value);
    };
   

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if(!emailInput){
                showToast('Email required', 'error');
                return
            }
            
           if (validateEmail(emailInput)) { // Assuming you have a function to validate emails
                addEmailToList();
                showToast('Email added', 'success');
            } else {
                showToast('Invalid email format', 'error');
            }
        }
    };
    const validateEmail = (email) => {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
    };

    const addEmailToList = () => {
        if (emailInput.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(emailRegex.test(emailInput)){
                setEmailList([...emailList, emailInput]);
                setEmailInput('');
            } 
        }
    };

    const removeEmail = (index) => {
        const updatedEmailList = [...emailList];
        updatedEmailList.splice(index, 1);
        setEmailList(updatedEmailList);
        showToast('Email removed', 'success')
    };

    const addMemberHandler = async (e)=>{
        e.preventDefault()
        if (emailList.length === 0) {
            showToast('At least 1 email is required to send invitation', 'error');
            return;
        }

        const id = team._id;
        const emails = emailList

        
        const response = await teamApi.inviteMembers(id, emails)
        const result = response.data 
        if(result.status === "SUCESSFULL"){
            if(emailList.length > 1){
                showToast('Invitations send', 'success')
            }else{
                showToast('Invitation send', 'success')
            }
            setEmailList([])
        }
    }

  return (
    <div className='queryQContainer'>
        
        <div className='addMemberTab'>
            {tabs.map((tab) => (
                <span
                    key={tab.id}
                    onClick={() => handleToggle(tab.id)}
                    className={toggleTab === tab.id ? `heading activeHeading` : 'heading'}
                >
                    {tab.title}
                </span>


            ))}
        </div>
        <div className='addTabs'>
            {toggleTab === 1 ? 
            <>
                <div className='inviteMemberConainer'>
                    <div className='inviteMemberTitle'>
                        <span>Invite through emails</span>
                    </div>
                    <div className='inviteMemberDescript'>
                        <span>After adding email address, press <b>Enter</b></span>
                    </div>
                    <form onSubmit={addMemberHandler}>
                        <div className='inviteMemberTextArea'>
                            <input
                                placeholder='Enter an email'
                                value={emailInput}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                type='email'
                            />
                            <ul className='emailList'>
                                {emailList.map((email, index) => (
                                <li className='memberEmail' key={index}>
                                    <span className='email'>{email}</span>
                                    <span className='remIcon' onClick={() => removeEmail(index)}>
                                    <AiOutlineClose />
                                    </span>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className='inviteMemberInvite'>
                            <button>Invite</button>
                        </div>
                    </form>
                </div>
            </>
            : 
            <>
                <div className='empleadoMain'>
                    <div className='empleadoTop'>
                        <span className='topIcon'><FiEdit /></span>
                        <span className='topDesc'>Please drag member to add to the team</span>
                    </div>

                <div className='empleadoMember'>
                    <div className='memberContainer'>
                        {excludedUsers.map((ele)=>(
                            <div key={ele._id} className='memberList'
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, ele, team._id, 'queryQ')}
                                
                            >
                                <img src={ele.full_dp} alt='userImage' className='memberImg'  /> 
                                <span className='memberName' style={{cursor: 'pointer'}}>{ele.full_username}</span>   
                            </div>
                        ))}        
                    </div>

                </div>

        
    </div>
            </>    
        }
        </div>
    </div>
  )
}

export default QueryQ