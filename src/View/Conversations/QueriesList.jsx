import { namesAlpha} from './utils/namesAlpha';
import { convertToTime } from './utils/timesUtils';
import { qStatus } from '../../Utils/Data';


const QueriesList = (props) => {
    const { data } = props
    const userInfo = data.initiatorContactId
    const priorty = data.priority
    const channelIcon = data.tpOptedInboxId.tpInboxProfile
    const namescolorProps = namesAlpha(userInfo, priorty, channelIcon)

    // const { chatInboxHandler } = useConversation()
    // console.log('list',data.unreadCount)
    const style = { 
      backgroundColor: namescolorProps.bgColor, 
      color: namescolorProps.textColor,
      border: `2px solid ${namescolorProps.textColor}` 
    };

    // Step 1: Remove any extra characters after the first name
    const firstNameOnly = data.initiatorContactId.name.split("@")[0]; // Split the name string by space and take the first element

    // Step 2: Remove any non-alphabetic characters from the first name
    const firstName = firstNameOnly.replace(/[^a-zA-Z]/g, ""); // Remove any non-alphabetic characters from the first name

        
    let truncatedFirstName = firstName;
    if (truncatedFirstName.length > 10) {
      truncatedFirstName = truncatedFirstName.substring(0, 10);
    }

    // getting status icon compare it with data.status and icons place in another files
    const statusData = Object.values(qStatus).find((statusObj) => statusObj.status === data.status);

    
    return (
      <div className='queriesListContiner'>
         <div className='queriesListContinerUser'>
          {data.unreadCount > 0 &&
            <div className='unreadCount'>

              <span>{data.unreadCount}</span>
            </div>
          }
           <div className='queryUser'>
             <span className='userFirstLetter' style={style}>{namescolorProps.firstLetter}</span>
           </div>
           <div className='queryUserDetails'>
             <div>
               <span className='userName'>{truncatedFirstName}</span>
               <span className='channelLabel'>{data.ticket}</span>
               <span style={{color: namescolorProps.color}}>{namescolorProps.icon()}</span>
             </div>
             <div className='userLastMessage'>
               <span>{data.lastMessage}</span>
             </div>
           </div>
         </div>
         <div className='queryUseruserTime'>
           <div className=''>
             <span>{convertToTime(data.entryTime)}</span>
              <span style={{ color: statusData?.statusColor }}>{statusData?.statusIcon()}</span>

           </div>
         </div>
     </div>
    
  )
}

export default QueriesList