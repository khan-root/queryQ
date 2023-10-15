import React from 'react'
import Button from '../../Components/Button/Button'
import { AiOutlineSearch } from 'react-icons/ai'
import { channelIcons } from '../Channels/data'
import useConversation from '../../ViewModel/ConversationViewModel/conversationServices'
import Select from 'react-select'

const NewConversation = () => {
    const {handleSelectChangeNewMesssage,showChannel, handleChannelNewMessage, toggleChannel, handleInputChangeNewMessage, templates, messageValues, showLabel,handleFileChange, handleLableInputChange, inputValues, handleNewConversation, searchContact, searchedContacts, selectContact,selectedContact, remContact} = useConversation()
    const numLabels = parseInt(messageValues.labelsLen);

    // const options = 

    const options = searchedContacts?.map((contact) => ({
            value: `${contact.tp_uid}`,
            label: `${contact.name} (+${contact.tp_uid})`,
        }))
    
    
  return (
    <div>
      <form className='newConversationContainer' onSubmit={handleNewConversation}>
        <div className='left'>
            <div className='selectInbox'>
                <label>Inbox</label>
                <select onChange={handleSelectChangeNewMesssage} name= 'inbox'>
                    <option value='0'>--Select Inbox--</option>
                    <option value={messageValues.selectChannel}>Keptua</option>
                </select>
            </div>
            {showChannel &&
                <>
                <div className='selectChannel'>
                    
                    <span>Select Channel</span>
                    <div className='channelList'>
                    {channelIcons.map((ele, i)=>(
                    <div key={i} onClick={()=>handleChannelNewMessage(ele.id, ele.tp_inbox_id)}>
                        <span key={ele.id}
                            className={toggleChannel === ele.id ? `channelIcon activeChannelIcon` : 'channelIcon'}

                        >{ele.icon()}</span>
                    </div>
                    ))}
                    </div>
                </div>
                <div>
                    <Select
                        options={options}
                        onInputChange={(selectedOption) => searchContact(selectedOption)}
                        onChange={(selectedOption) => selectContact(selectedOption)}
                        value={messageValues.contactNumber}
                        placeholder='Search Name'
                        components={{ IndicatorSeparator: null}}
                        styles={{
                            control: base => ({
                                ...base,
                                fontSize: 13,
                                padding: '0 8px',
                                boxShadow: 'none',
                                outline: 'none',
                                border: '1px solid #B3B3B3',
                                borderRadius: '10px',
                                color: '#495057'
                            }),
                            placeholder: base => ({
                                ...base,
                                color: '#999',
                            }),
                            input: base => ({
                                ...base,
                                padding: 0,
                                margin: 0,
                            }),
                        }}
            
                    />
                  {/* <input type='text' placeholder='Search Name' name='userName' onChange={handleInputChangeNewMessage} /> */}
                </div>
                <div>
                {messageValues.contactNumber && 
                    <div className='selectedContact'>
                        <span className='contactName'>{selectedContact.value}</span>
                        <span className='contactRemove' onClick={()=>remContact(selectedContact.label)}>X</span>
                    </div>
                }
                </div>
                <div className='messageTemplate'>
                    <label>Select Message Temaplate</label>
                    <select onChange={handleSelectChangeNewMesssage} name='selectTemplate'>
                        <option>Select one</option>
                        {templates.map((ele)=>{
                            return(
                                // <option key={ele._id} value={`${JSON.stringify(ele.mediaUrl)}:${ele.templateVariables.length}:${ele.text} : ${ele._id}`}>{ele.category} {ele.name} ({ele.language})</option> 
                                <option key={ele._id} value={JSON.stringify(ele)}>{ele.category} {ele.name} ({ele.language})</option> 

                            )
                        })}
                    </select>
                </div>
                  {showLabel && 
                    <div className='broadcastLabel'>
                    {Number.isInteger(numLabels) && numLabels > 0 && (
                        Array.from({ length: numLabels }, (_, index) => (
                            <div className='d-flex flex-row gap-2 align-items-center'>
                            <label className='label'>{`Label ${index + 1}`}</label>
                            <input
                                key={index}
                                type="text"
                                name={`input_${index}`}
                                placeholder={`Enter Label ${index + 1}`}
                                value={inputValues[`input_${index}`] || ''}
                                onChange={ (e)=>handleLableInputChange(e, index)}
                            />
                            </div>
                        ))
                    )}

                    {
                        (messageValues.mediaUrl?.[0]?.includes('image') ||
                        messageValues.mediaUrl?.[0]?.includes('document') ||
                            messageValues.mediaUrl?.[0]?.includes('video')) ? (
                            <div>
                                <label className='label'>{`Upload ${messageValues.mediaUrl[0]} `}</label>
                                <input type="file" name="selectedFile" onChange={handleFileChange} />
                            </div>
                        ) : null
                    }






                    
                    </div>
                }
                
                </>
            }
        </div>
         <div className='right'>
            <div className='templateTitle'>
                <span>Template Preview</span>
            </div>
            <div className='templateView'>
                {messageValues.templateDesc && (
                <span>
                    {messageValues.templateDesc.split(/\{\{(\d+)\}\}/g).map((part, index) => {
                        if (index % 2 === 0) {
                            return part;
                        } else {
                            const inputIndex = parseInt(part, 10) - 1;
                            const inputValue = inputValues[`input_${inputIndex}`] || '';

                            return (
                                <span key={index} style={{color: '#05939F'}}>
                                    {`${inputValue}`}
                                </span>
                            );
                        }
                    })}
                 </span>
                )}
            </div>
            <div className='sendMessageBtn'>
                <Button 
                    variant='primaryBtn'
                    text = 'Send message'
                />
            </div>
            <div style={{width: '150px', height: '150px'}}>
              {messageValues.selectedFile && (
                <div style={{width:'300px', height: '300px'}}>
                  Selected File Preview:
                  <br />
                  {messageValues.selectedFile.type.startsWith("image") && (
                    <img src={messageValues.fileContent} alt="File Preview" style={{width: '100%', height: '100%'}}/>
                  )}
                  {messageValues.selectedFile.type.startsWith("video") && (
                    <video controls>
                      <source src={messageValues.fileContent} type={messageValues.selectedFile.type} style={{width: '100%', height: '100%'}}/>
                    </video>
                  )}
                  {messageValues.selectedFile.type === "application/pdf" && (
                    <div>
                      <embed src={messageValues.fileContent} width="500" height="600" type="application/pdf" style={{width: '100%', height: '100%'}}/>
                    </div>
                  )}
                  {!messageValues.selectedFile.type.startsWith("image") &&
                    !messageValues.selectedFile.type.startsWith("video") &&
                    messageValues.selectedFile.type !== "application/pdf" && (
                      <span>{messageValues.selectedFile.name}</span>
                    )}
                </div>
              )}
            </div>
        </div>
      </form>
    </div>
  )
}

export default NewConversation