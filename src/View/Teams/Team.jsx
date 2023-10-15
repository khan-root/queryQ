import { titleNameAlpha } from './utils/titleUtils'
import { MdModeEditOutline } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { useState } from 'react'
import useStore from '../../store/store'
import teamApi from '../../Model/Data/Team/Team'
import OffCanvas from '../../Components/OffCanvas/OffCanvas'
import NewTeam from './NewTeam'
import { useTeam } from '../../ViewModel/TeamViewModal/teamServices'
import ConfirmModal from '../../Components/Modal/ConfirmModal'
import { showToast } from '../../Toaster/Toaster'

const Team = (props) => {
    const { data,index } = props
    const title = data?.title
     const titleColorProps = titleNameAlpha(title)
    const nameStyles = { 
      backgroundColor: titleColorProps.bgColor,
    };
    const [addShowTeam, setAddShowTeam] = useState(false)
    const [currentTeamId, setCurrentTeamID] = useState('')
    const deleteTeam = useStore((state) => state.deleteTeam)
    const { teamDetailHandler } = useTeam()

    const handleClose = () =>{
        setAddShowTeam(false)
    }

    const [showConfirm, setShowConfirm] = useState(false)

    const handleTeamConfirm = async(id)=>{
      setCurrentTeamID(id)
      setShowConfirm(true)

       
    }

    const handleDelete = async()=>{
       const response = await teamApi.deleteTeam(currentTeamId)
        if(response.status === 200){
          deleteTeam(currentTeamId)
          showToast('Team deleted successfully', 'success')
        }
    }
  return (
    <>
    
    <div className='teamContainer'>
        <div className='teamList'>

            <div className='teamTitle'>
                <span className='teamLetter' style={nameStyles} onClick={()=>teamDetailHandler(data._id, index)}>{titleColorProps.firstLetter}</span>
                <span className='title' onClick={()=>teamDetailHandler(data._id, index)}>{data.title}</span>
            </div>
            <div className='teamCrudIcon'>
                <span className='edit' onClick={()=>setAddShowTeam(true)}><MdModeEditOutline /></span>
                <span className='delete' onClick={()=>handleTeamConfirm(data._id)}><MdDelete /></span>
            </div>

        </div>
    </div>
    <OffCanvas 
        show = {addShowTeam}
        handleClose = {handleClose}
        placement = 'end'
        children = {<NewTeam 
            data = {'update'}
            teamData = {data}

        />}
        title= {data === 'add' ? 'Add New Team' : 'Update Team'}
        style={{width: '25vw !important'}}
       
    />
    <ConfirmModal 
        show ={showConfirm}
        handleClose = {()=>setShowConfirm(false)}
        title='Confirm Delete'
        confirmDelete = {handleDelete}
          
    />
    {/* <Offcanvas show={addShowTeam} onHide={handleClose} placement={'end'} className={style.newTeamCanvas}>
        <Offcanvas.Header closeButton className={style.clsbbtn}>
          <Offcanvas.Title>Udpate Team</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={style.canvasBody}>
          <NewTeam 
            data = {'update'}
            teamData = {data}
          />
        </Offcanvas.Body>
    </Offcanvas> */}
    </>
  )
}

export default Team