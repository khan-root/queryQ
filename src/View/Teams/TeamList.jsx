
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { AiOutlineSearch } from 'react-icons/ai'
import { useTeam } from '../../ViewModel/TeamViewModal/teamServices'
import useStore from '../../store/store'
import TeamUsers from './TeamUsers'
import Team from './Team'
import Button from '../../Components/Button/Button'
import AddMembers from './AddMembers'
import OffCanvas from '../../Components/OffCanvas/OffCanvas'
import { useState } from 'react'
import NewTeam from './NewTeam'
import SVG from '../../Components/SVG/SVG'
import teamSvg from '../../assets/Images/team.svg'




const TeamList = () => {
    const { show, team, users, toggleState, toggleIndex,

        handleDrop, handleDragEnter, handleDragLeave,
        showCanvas,setShowCanvas
        
    } = useTeam()

    const teams = useStore((state)=> state.allTeams) 
    
    const [addShowTeamCanvas, setAddShowTeamCanvas] = useState(false)

    
    // const teams = []

    
        
  return (
    <>
    {teams.length <=0 ?
    <div>
        <SVG 
            gif={teamSvg}
        />
    </div>  
    : (

    
    <div className='teamTemplate'>
        <div className={`row g-0`}>
            <div className={`col col-lg-3`} style={{ width: '30%'}}>
                <div className='templateLeft'>
                    <div className='leftTop'>
                        <div className='topContainer'>
                            <div className='team'>
                                <span className='teamIcon'><HiOutlineUserGroup /></span>
                                <span className='teamTitle'>Teams</span>
                            </div>
                            <div className='addTeam'>
                                <Button 
                                    variant='primaryBtn'
                                    text = 'New Team'
                                    onClick={()=> setAddShowTeamCanvas(true)}

                                />
                            </div>
                        </div>
                        <div className='teamSearch'>
                            <span><AiOutlineSearch /></span>
                            <input type='text' placeholder='Search'/>
                        </div>
                    </div>
                    <div className='leftBottom'>
                        {teams.map((ele, i)=>(
                        <div key={ele._id} 
                            
                            className={`team ${toggleState === ele._id ? 'Active' : 'notActive'} 
                                ${toggleIndex === i - 1 ? 'above-active' : ''
                                } ${toggleIndex === i+ 1 ? 'below-active' : ''}
                            `}
                        >
                            <Team 
                                data = {ele}
                                index = {i}
                            />
                        </div>
                        ))} 
                    </div>
                </div>
            </div>
            {show ? 
            
            <>
                <div className={`col col-3 teamDetailsContainer`} style={{ width: '30%', height: 'calc(100vh - 50px)'}}

                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    draggable="false"
                
                >
                    
                        
                <TeamUsers
                    users = {users}
                    team = { team }
                />
                    
                </div>
                <div className={`col col-5 addMembersContainer`} style={{ width: '36%', height: 'calc(100vh - 45px)'}}>
                    <AddMembers
                        
                        
                    />
                </div>
            </>
            :
            (
            
            <div className='teamSvgContainer'>

                <div>
                    <SVG 
                        gif={teamSvg}
                        firstText='Open team'
                        showBtn= {false}
                    />
                </div>
            
            </div>
            )
            
        }
        </div>
    </div>
    )  
}
    <OffCanvas 
        show = {addShowTeamCanvas}
        handleClose = {()=> setAddShowTeamCanvas(false)}
        placement = 'end'
        children = {<NewTeam 
            data = 'add'
            close = {()=> setAddShowTeamCanvas(false)}
        />}
        title= 'Add New Team'
        style={{width: '25vw'}}
       
    />
    
    </>
  )
}

export default TeamList