import { titleNameAlpha } from './utils/titleUtils'
import { FiMoreVertical } from 'react-icons/fi'
import { Dropdown } from 'react-bootstrap'
import { Icons } from '../../assets/Icons/icons'
import { BsFillTrashFill } from 'react-icons/bs'
import { useTeam } from '../../ViewModel/TeamViewModal/teamServices'
import { useState } from 'react'
import ConfirmModal from '../../Components/Modal/ConfirmModal'


const TeamUsers = (props) => {

    const { users, team } = props
    const [showConfirm, setShowConfirm] = useState(false)
    const [currentTeam, setCurrentTeam] = useState({})
    const [currentUser, setCurrentUser] = useState({})

      // console.log(users)
    const { handleRemoveMemberFromTeam } = useTeam()  

    const handleConfirmToggle = (user, team) =>{
      setCurrentTeam(team)
      setCurrentUser(user)
      setShowConfirm(true)
      
    }

    const handleConfirmDelete = () =>{
      setShowConfirm(false)
      handleRemoveMemberFromTeam(currentTeam, currentUser)
      
    }
   
    const title = team?.title
     const titleColorProps = titleNameAlpha(title)
    const style = { 
      backgroundColor: titleColorProps.bgColor,
    };
    
  return (
    <>
    <div className='usersContainer'>
      <div className='top'>
        <span className='teamFirstLetter' style={style}>{titleColorProps.firstLetter}</span>
        <span className='teamTitle'>{team.title}</span>
      </div>
      <div className='teamUsers'>


          {users?.map((user,i)=>(


            <div key={i} className='userList'>
                <div className='user'>
                  <img src={user?.full_dp || `https://emp-beta.veevotech.com${user?.dp}`} alt='userImage' className='userDp' />
                  
                  <span className='userName'>{user?.full_username || user?.name}</span>
                </div>
                <div className='userDetails'>
                  <Dropdown className='customDropdown'>
                    <Dropdown.Toggle className='detailsBtn'>
                      Details
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='dropdownCustomMenu'>
                      <div className='dropdownCustomMenuContainer'>
                        <div>
                          <span className='title'>ID</span>
                          <span className='desc'>#{user?.oneId || user?.oneid}</span>
                        </div>
                        <div>
                          <span className='title'>Avg response time</span>
                          <span className='desc'>{user?.respondedTime || ''}</span>
                        </div>
                        <div>
                          <span className='title'>Status</span>
                          <span className='desc'>{user?.isActive === 'true' ? 'Active': 'Offline'}</span>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>


                  <Dropdown className='moreIconDropDown'>
                    <Dropdown.Toggle className='detailsIcon'>
                      <FiMoreVertical />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='moreIconDropDownMenu'>
                      <div className='detailsContainer'>
                        <div>
                          <span className='crossIcon'><Icons.CrossIcon /></span>
                          <span className='iconDesc' onClick={()=>handleConfirmToggle(user, team)}>Remove from team</span>
                        </div>
                        <div>
                          <span className='trashIcon'><BsFillTrashFill /></span>
                          <span className='iconDesc'>Remove from Query-Q</span>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
            </div>
            ))}


      </div>
    </div>
      <ConfirmModal 
        show ={showConfirm}
        handleClose = {()=>setShowConfirm(false)}
        title='Confirm Delete'
        confirmDelete = {handleConfirmDelete}
          
      />
    </>
  )
}

export default TeamUsers