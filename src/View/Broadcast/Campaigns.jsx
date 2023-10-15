import CampaignDetails from './CampaignDetails'
import BroadcastMessages from './BroadcastMessages'
import useBroadcast from '../../ViewModel/BraodcastViewModel/broadcastServices'


const Campaigns = (props) => {
  const { campaignData } = props
  const {mesagesHandler, bIndMessage, groupList} = useBroadcast()
  const { broadcastMessages, showMessages, backToMessages} = useBroadcast()
  // console.log('broadcastMessages', broadcastMessages)
  return (
    <div className='campaignContainer'>

        <>
      <div className='mainCampaign'>
        
          <BroadcastMessages 
            data = {broadcastMessages}
            campaignData = { campaignData }
            mesagesHandler = {mesagesHandler}
            showMessages ={showMessages}
            backToMessages = {backToMessages}
            bIndMessage = {bIndMessage}
          />
          
      </div>
      <div className='campaignDetails'>
        <CampaignDetails 
          data = {broadcastMessages[0]}
          campaignData = {campaignData}
          showMessages ={showMessages}
          bIndMessage = { bIndMessage }
          groupList = {groupList}
          totalBroadcast = {broadcastMessages.length}
        />
      </div>
      </>

    </div>
  )
}

export default Campaigns