import { HiOutlineUserGroup } from 'react-icons/hi2'
import { FaBroadcastTower, FaCalendarAlt } from 'react-icons/fa'
import { CiSettings } from 'react-icons/ci'
import campaingDetailGif from '../../assets/Images/groups.gif'
import useBroadcast from '../../ViewModel/BraodcastViewModel/broadcastServices'
import ConfirmModal from '../../Components/Modal/ConfirmModal'
import OffCanvas from '../../Components/OffCanvas/OffCanvas'
import ContactGroup from './ContactGroup'
import { formatTimestamp } from '../Conversations/utils/timesUtils'


const CampaignDetails = (props) => {
    const {data, campaignData, showMessages, bIndMessage, groupList, totalBroadcast } = props

    const {confirmCampaignDelete,deleteBroadcastHandler, groupHandler, confirm, setConfirm, groupData, showGrpCanvas, setShowGrpCanvas} = useBroadcast()
    const stats = bIndMessage?.stats
    console.log('data', data)
    return (
    <>

    <div className='campaignDetailsContainer'>
        <div className='detailsTopContainer'>
            <div className='topContainerName'>
                <span className='campaignIcon'><FaBroadcastTower /></span>
                <span className='campaignName'>{showMessages ? campaignData.name : bIndMessage.name}</span>
            </div>
            <div className='campaignCreatedby'>
                <img 
                    src={showMessages ?  data?.campaignId?.action_by?.full_dp : bIndMessage?.broadcastCreator?.full_dp}
                    style={{ width: '30px'}}
                />
                <span>created by</span>
                <span>{showMessages ?  data?.campaignId?.action_by?.full_username : bIndMessage?.broadcastCreator?.full_username}</span>
            </div>
            <div className='campaignCreatedDate'>
                <div className='calendar'>
                    <span className='calendarIcon'><FaCalendarAlt /></span>
                    <span className='dataCreated'>Date Created</span>
                </div>
                <div className='dateTime'>
                    <span>{ showMessages ? formatTimestamp(data?.campaignId.entry_time) : formatTimestamp(bIndMessage?.entry_time) }</span>
                </div>
            </div>
            <div className='deleteCampaign'>
                <button onClick={()=>confirmCampaignDelete(campaignData._id)}>Delete</button>
            </div>
        </div>
        {showMessages ? 
            (<>
            <div className='detailsCenterContainer'>
                <div className='centerContianer'>
                    <div className='totalBroadcast'>
                        <span className='count'>{totalBroadcast}</span>
                        <span className='desc'>Total Broadcast</span>
                    </div>
                    <div className='lastBroadcast'>
                        <span className='desc'>Last Broadcast</span>
                        <div className='lastBroadcastTimeDate'>
                            <span className='calendarIcon'><FaCalendarAlt /></span>
                            <span className='lastBroadcasrDateTime'>Sep 12, 2022 11:42 AM</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='detailsBottomContainer'>
                <div>
                    
                <img src={campaingDetailGif} alt='gif' width={300} height={295} style={{borderRadius:'20px'}}/>
                </div>
            </div>
            </>):(
                <>
                    <div className='messageDetails'>
                        <div className='sent'>
                        <span className='messageDetailsCount'>{stats ? stats.total_sent: 0}</span>
                        <span className='messageDetailsDesc'>Sent</span>
                        </div>
                        <div className='deliverd'>
                        <span className='messageDetailsCount'>{stats ? stats.total_delivered: 0}</span>
                        <span className='messageDetailsDesc'>Delivered</span>
                        </div>
                        <div className='read'>
                        <span className='messageDetailsCount'>{stats ? stats.total_read : 0}</span>
                        <span className='messageDetailsDesc'>Read</span>
                        </div>
                        <div className='failed'>
                        <span className='messageDetailsCount'>{stats ? stats.total_failed: 0}</span>
                        <span className='messageDetailsDesc'>Failed</span>
                        </div>
                    </div>
                    <div className='groupListContainer'>
                        <div className='grouplist'>
                            <div className='groupListTop'>
                                <span><HiOutlineUserGroup /></span>
                                <span>GroupList</span>
                            </div>
                            <div className='grouplistContent'>
                                {groupList?.map((ele)=>{
                                    return(
                                    <div key={ele._id} className='grouplistMember'>
                                        <div className='grouplistMemberLeft'>
                                            <img src='https://img.freepik.com/free-photo/floating-civilization-sky_23-2150461607.jpg?size=626&ext=jpg&ga=GA1.2.1631720873.1682579871' alt='userImg' className='groupMemberImg' />
                                            <span>{ele.groups.name}</span>
                                        </div>
                                        <div className='grouplistMemberRight'>
                                            <span className='manageIcon' onClick={()=>groupHandler(ele)}><CiSettings /></span>
                                            <span className='manageMember' onClick={()=>groupHandler(ele)}>Manage</span>
                                        </div>
                                    </div>

                                )})}
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    </div>
    <OffCanvas 
        show = {showGrpCanvas}
        handleClose={()=>setShowGrpCanvas(false)}
        children={
            <ContactGroup 
                data = {groupData}
            />
        }
        title={`${groupData.name} Group`}
        style={{width: '35vw'}}
        placement="end"
    />

    <ConfirmModal 
        show ={confirm}
        handleClose = {()=>setConfirm(false)}
        title='Confirm Delete'
        confirmDelete = {deleteBroadcastHandler}
          
      />
    </>
    )
}

export default CampaignDetails