


import { FiEdit } from 'react-icons/fi'
import { useTeam } from '../../ViewModel/TeamViewModal/teamServices'

const Empleado = () => {
    const { team, emplMembers,handleDragStart } = useTeam()
  return (
    <div className='empleadoMain'>
        <div className='empleadoTop'>
            <span className='topIcon'><FiEdit /></span>
            <span className='topDesc'>Please drag member to add to the team</span>
        </div>

        <div className='empleadoMember'>
            <div className='memberContainer'>
                {emplMembers.map((ele)=>(
                    <div key={ele.id} className='memberList'
                        onDragStart={(e) => handleDragStart(e, ele, team._id, 'empleado')}
                        draggable="true"
                    >
                        <div style={{width: '40px', height: '40px',borderRadius: '50%', overflow: 'hidden'}}>
                            <img src={`https://emp-beta.veevotech.com${ele.dp}`} alt='userImage' className='memberImg' /> 
                        </div>
                        <span className='memberName' style={{cursor: 'pointer'}}>{ele.name}</span>   
                    </div>
                ))}        
            </div>

        </div>

        
    </div>
  )
}

export default Empleado