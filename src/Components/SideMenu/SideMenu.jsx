import { Assignments, Broadcast, Channels, Contacts, Conversations, Dashboard, MultiChats, Teams  } from '../../View'
import { useState } from 'react'
import './sideMenu.scss'
import {Icons} from '../../assets/Icons/icons'
import useStore from '../../store/store'

const SideMenu = () => {
    const SidebarTabs = [
        { id: 1, tabName: 'Dashboard', icon:<Icons.GridIcon /> },
        { id: 2, tabName: 'Conversation' , icon:<Icons.FillChatIcon />},
        { id: 3, tabName: 'Teams', icon:<Icons.UserGroupIconSecond />},
        { id: 4, tabName: 'Channels', icon:<Icons.NetworkChartIcon />},
        { id: 5, tabName: 'Mutli Chats', icon:<Icons.ChatIcon /> },
        { id: 6, tabName: 'Assignments', icon:<Icons.AssignmentIcon /> },
        { id: 7, tabName: 'Broadcast', icon:<Icons.BroadcastIcon /> },
        { id: 8, tabName: 'Contacts', icon:<Icons.TelephoneIcon />},
    ]

    const SidebarTabsContainer = [
        { id: 1, tabContainerName: <Dashboard /> },
        { id: 2, tabContainerName: <Conversations /> },
        { id: 3, tabContainerName: <Teams /> },
        { id: 4, tabContainerName: <Channels /> },
        { id: 5, tabContainerName: <MultiChats /> },
        { id: 6, tabContainerName: <Assignments /> },
        { id: 7, tabContainerName: <Broadcast /> },
        { id: 8, tabContainerName: <Contacts /> },
    ]

    const [toggleState, setToggleState] = useState(1)
    const [show, setShow] = useState(false)

  

  const getAllDashboard = useStore((state)=> state.getAllDashboard)
  const getOnlineUser = useStore((state)=> state.getOnlineUser)
  const getAll = useStore((state)=> state.getAllStories)
  const getAllTeams = useStore((state) => state.getAllTeam)
  const getAllCampaign = useStore((state) => state.getAllCampaign)
  const getAllContacts = useStore((state) => state.getAllContacts)
  const getAllEmails = useStore((state) => state.getAllEmails)
  const getAllFacebookContacts = useStore((state) => state.getAllFacebookContacts)
  const getAllInstaContacts = useStore((state) => state.getAllInstaContacts)
  const getAllTwitterContacts = useStore((state) => state.getAllTwitterContacts)
  
  const getAllAssignment = useStore((state) => state.getAllAssignment)

  async function toggleTab(id){
    const orgId = 9677375
    setToggleState(id)
    switch (id) {
      case 1:
        getAllDashboard()
        getOnlineUser()
        break;
      case 2:
        getAllTeams(orgId)
        getAll()
        break;
        case 3:
          // Call a function for the 'Teams' tab
          
          getAllTeams(orgId)
          break;
        case 5:
          getAll()  

        break;
        case 6:
          getAllAssignment()  
          getAllTeams(orgId)

        break;
        case 7:
          getAllCampaign()  

        break;
        case 8:
          getAllContacts()
          getAllEmails()
          getAllFacebookContacts()
          getAllInstaContacts()
          getAllTwitterContacts()

        break;
          default:
            break;
    }
  }
            
    function mouseEnterHandler(){
      setShow(true)
    }

    function mouseLeaveHandler(){
      setShow(false)
    }
    return (
      <div className='filterContainer'>
        <div className='filterButtons'>
          <div className='filterbuttons__form'  onMouseLeave={mouseLeaveHandler} onMouseEnter={mouseEnterHandler}>
            {SidebarTabs.map((sidebarTab) => (
    
              <div key={sidebarTab.id} onClick={() => toggleTab(sidebarTab.id)} className={toggleState === sidebarTab.id ?  `heading  activeHeading` : 'heading'} 
                
              >
                <span >{sidebarTab.icon}</span>
                {show && 
                  <span className='headingName'>{sidebarTab.tabName}</span>
                
               }  
              </div>
            ))}

          </div>
        </div>
        <div className='tabContainer'>
          {SidebarTabsContainer.map((tabContainer) => (
            <div key={tabContainer.id} className={toggleState === tabContainer.id ? `content activeContent` : 'content'}>
                {/* {tabContainer.tabContainerName} */}
                            {toggleState === tabContainer.id && tabContainer.tabContainerName}

            
            </div>
          ))}
          </div>
      </div>
    )
}

export default SideMenu