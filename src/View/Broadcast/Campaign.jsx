
import { FaCalendarAlt } from 'react-icons/fa' 
import { titleNameAlpha } from '../Teams/utils/titleUtils'
import { formatTimestamp } from '../Conversations/utils/timesUtils'

const Campaign = (props) => {
    const { data, onClick } = props
    const title = data?.name
    const titleColorProps = titleNameAlpha(title)
    const nameStyles = { 
      backgroundColor: titleColorProps.bgColor,
    };
    const entryTime = formatTimestamp(data?.entry_time)
    
  return (
    <>
        <div className='campaignFirstLetter'>
            <span  style={nameStyles} onClick={onClick}>{titleColorProps.firstLetter}</span>
        </div>
        <div className='campaingTitleData'>
            <span className='title' onClick={onClick}>{data.name}</span>
            <div className='dateandTime'>
                <span className='calIcon'><FaCalendarAlt /></span>
                <span className='dAt'>{entryTime}</span>
            </div>
        </div>
    
    </>
  )
}


export default Campaign