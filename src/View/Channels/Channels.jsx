import ChannlesList from './ChannelsList'
import './channels.scss'

const Channels = () => {
  return (
    <div className='mainChannels'>
      <div className='channelMain'> 
        <div className='channelTop'>
          <span>Channels are what that are used by your customers to reach you, you can connect your Social media accounts so that messages sent to relevant inboxes are synced here.</span>
        </div>
        <div className='channelConetnt'>
          <ChannlesList />
        </div>
      </div>
    </div>
  )
}

export default Channels