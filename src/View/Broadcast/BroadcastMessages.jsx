import { FaBroadcastTower } from 'react-icons/fa'
import useBroadcast from '../../ViewModel/BraodcastViewModel/broadcastServices'
import { titleNameAlpha } from '../Teams/utils/titleUtils'
import Button from '../../Components/Button/Button'
import OffCanvas from '../../Components/OffCanvas/OffCanvas'
import NewBroadcast from './NewBroadcast'
import { useState } from 'react'
const BroadcastMessages = (props) => {
    const { data, campaignData, mesagesHandler,showMessages, backToMessages, bIndMessage} = props 
    const title = campaignData?.name
    const titleColorProps = titleNameAlpha(title)
    const nameStyles = { 
      backgroundColor: titleColorProps.bgColor,
    };
    
    const { broadcastCanvas, hideBroadcastCanvas, handleAddBroadcast, showBroadcastCanvas } = useBroadcast()
    console.log('bIndMessage',bIndMessage)

        // const [show, setShow] = useState(false)
  return (
    <>
   
    <div className='broadcastMessagesContainer'>
        <div className='broadcastMessagesSections'>
            <div className='header'>
                <div className='headerLeft'>
                    <span className='campaignFirstLetter' style={nameStyles}>{titleColorProps.firstLetter}</span>
                    <span className='campaignName' >{campaignData.name}</span>
                </div>
                <div className='headerRight'>
                    {showMessages ? 
                    (<div className='oneBtn'>
                        <Button 
                            text='New Broadcast'
                            onClick={()=>showBroadcastCanvas()}
                            variant='primaryBtn'
                            padding= '3px 10px'
                            fontSize='13px'
                        />
                        {/* <button onClick={handleAddBroadcast}>New Broadcast</button> */}
                    </div>)
                    :
                    (<div className='multiBtn'>

                        {/* <button onClick={handleAddBroadcast}>New Broadcast</button> */}
                        <Button 
                            text='New Broadcast'
                            onClick={()=>showBroadcastCanvas()}
                            variant='primaryBtn'
                            padding= '3px 10px'
                            fontSize='13px'
                        />
                        <Button 
                            text='Back'
                            onClick={backToMessages}
                            variant='primaryBtn'
                            padding= '3px 10px'
                            fontSize='13px'
                        />
                        {/* <button onClick={backToMessages}> </button> */}

                    </div>)    
                }
                    
                </div>
            </div>
            <div className='body'>
                {data.length>0 ? 
                    <div className='bodyMain'>
                        {data.map((ele, i) => {
                            const title = ele?.name
                            const titleColorProps = titleNameAlpha(title)
                            const nameStyles = { 
                                backgroundColor: titleColorProps.bgColor,
                            };

                            return(
                            
                            showMessages ? (
                                <div onClick={() => mesagesHandler(ele)} className='broadcastMessages' key={i}>
                                    <div className='nameIcon'>
                                        <span style={nameStyles} className='icon'><FaBroadcastTower /></span>
                                        <span className='name'>{ele.name}</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                {ele._id === bIndMessage._id ?
                                    <div>
                                        <div>
                                            <span>{bIndMessage.text}</span>
                                        </div>
                                        <div>
                                            {bIndMessage.messageBody.mediaUrl.length > 0 ? 
                                                <img src={bIndMessage.messageBody.mediaUrl} alt='check' style={{width: '250px', height: '250px', borderRadius: '20px', objectFit: 'cover'}}/> : ''    
                                            }
                                            
                                        </div>

                                    </div>
                                : null}
                                </>
                            )
                        )})}
                    </div>
                    :
                    ''
                    // <BroadcastSvg />
                        
                }
            </div>
        </div>
    </div>
    <OffCanvas 
        show={broadcastCanvas} 
        handleClose={()=>hideBroadcastCanvas()}
        style={{width: '60vw'}}
        placement='end'
        title='Add New Broadcast Message'
        children={
            <NewBroadcast 
            />
        }


    />
    {/* <Offcanvas show={showBroadcast} onHide={handleCloseBroadcast} placement={'end'} className={styles.broadcastCanvas}>
        <Offcanvas.Header closeButton className={styles.header}>
          <Offcanvas.Title>Add new Broad Cast Message</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.body}>
            <NewBroadcast />
        </Offcanvas.Body>
    </Offcanvas> */}
    
    </>
  )
}

export default BroadcastMessages