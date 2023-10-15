import React, { useState } from 'react'
import conversationGif from '../../assets/Images/conversation.gif'
import Button from '../../Components/Button/Button'
const SVGConversation = () => {
  const [show, setShow] = useState(false)

  return (
    <>
    <div className='svgConversationMain'>
      <div>
        <img src={conversationGif} alt='gif' width={350} height={250}/>
      </div>
      <div className='newConText'>
        <span>Haven't Created</span>
        <span>Any Conversation Yet !</span>
      </div>
      <div className='newCon'>
        <Button 
          variant = 'primaryBtn'
          text = 'Create new'
          onClick={()=>setShow(true)}
        />
      </div>
    </div>
    
    
    </>
  )
}

export default SVGConversation