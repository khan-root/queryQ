import useDashboard from '../../ViewModel/DashboardViewModel/dashboardServices'
import ActiveChannels from './ActiveChannels'
import DashTeams from './DashTeams'
import QuickUsers from './QuickUsers'
import Quries from './Quries'
import Reports from './Reports'
import './dashboard.scss'

const Dashboard = () => {
  const {getDashboardData, onlineUsers} = useDashboard()

  const queriesData = {
    totalQueries : getDashboardData?.totalQuery,
    totalUnasweredQuries: getDashboardData?.unanswered,
    totalClosedQuries :getDashboardData?.closeQuery,
    totalOpenQuries: getDashboardData?.openQuery,
 
  }
  const teamData = {
    totalTeam: getDashboardData?.teamCount,
    totalTeamMember: getDashboardData?.memberCount
  }

  const reportsData = {
    labels : getDashboardData?.graph?.label,
    closeCount : getDashboardData?.graph?.closeCount,
    openCount :getDashboardData?.graph?.openCount

  }
  return (
    <div className='container-fluid dash'>
      <div className='row py-2 dashTop'>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
            <DashTeams 
              onlineUsers = {onlineUsers}
              teamData = {teamData }
            />
        </div>
         <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 px-0' >
          
            <Quries 
              queriesData = {queriesData}
            />
        </div>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'> 
            <QuickUsers 
              data = {getDashboardData?.topResponders}
            />
        </div>
      </div>
      <div className='container-fluid pe-1'>
        <div className='row dashBottom'>
          <div className='col-xs-12 col-sm-6 col-md-6 col-lg-8 reports'>
            <Reports 
              
              reportsData = {reportsData}
            />
          </div>
          <div className='col-xs-12 col-sm-6 col-md-6 col-lg-4  activeChannel'>
            <ActiveChannels />
          </div>  
        </div>
      </div>
    </div>
    
  )
}

export default Dashboard