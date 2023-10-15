import TeamList from './TeamList'
import './teams.scss'

const Teams = () => {
  return (
    <div className='container-fluid p-0 mainTeam'>
        <div className='teamMainContainer'>
            <TeamList />
        </div>
    </div>
  )
}

export default Teams