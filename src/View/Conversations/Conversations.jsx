import ConversationQueries from './ConversationQueries'
import './conversation.scss'

const Conversations = () => {
  return (
    <div className='container-fluid p-0 mainConversation'>
        <div className='conversationQuries'>
          
          <ConversationQueries />
          
        </div>
    </div>
  )
}

export default Conversations