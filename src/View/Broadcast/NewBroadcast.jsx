import { HiXMark } from 'react-icons/hi2'; 
import { FaSearch } from 'react-icons/fa';
import useBroadcast from '../../ViewModel/BraodcastViewModel/broadcastServices';
import { channelIcons } from '../Channels/data';
import Button from '../../Components/Button/Button';


const NewBroadcast = () => { 
    
    
    
    const { 

        addBroadcastHandler, broadcastValues, groups,
        handleChannel, handleInputChange , showChannel, removeGroup,selectedArray, 
        toggleChannel, handleSelectChange, groupData,  handleSearch, channelId, handleCheckboxChange, groupMember, handleGroupMember, groupMemberList, templates,handleFileChange,
        handleGroupMemberClose, showLabel, inputValues, handleLableInputChange
    } = useBroadcast()

    
    
    const numLabels = parseInt(broadcastValues.labelsLen);
    
  return (
    <form className='newBroadcastContainer' onSubmit={addBroadcastHandler}>
        <div className='left'>
            <div className='selectInbox'>
                <label>Inbox</label>
                <select onChange={handleSelectChange} name='inbox'>
                    <option value = '0'>--Select Inbox--</option>
                    <option value={broadcastValues.selectChannel}>Keptua</option>
                </select>
            </div>
            {showChannel &&
                <>
                 <div className='selectChannel'>
                    
                    <span>Select Channel</span>
                    <div className='channelList'>
                    {channelIcons.map((ele, i)=>(
                    <div key={i} onClick={()=>handleChannel(ele.id, ele.tp_inbox_id)}>
                        <span key={ele.id}
                            className={toggleChannel === ele.id ? `channelIcon activeChannelIcon` : 'channelIcon'}
                            
                            
                        >{ele.icon()}</span>
                    </div>
                    ))}
                    </div>
                </div>
                <div className='broadcastName'>
                    <label>Broadcast Name</label>
                    <input type='text' placeholder='Enter Broadcast Name' name='broadcastName' onChange={handleInputChange} />
                </div>
                <div className='groups'>
                    <label>Group(s)</label>
                    <div className='groupContainer'>
                        <FaSearch style={{color: '#DCDCDC'}}/>
                

                        <input 
                            name ='groupName'
                            type='text'
                            placeholder='Search Group'
                            // onKeyDown={handleSearch}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className='allGroups'>
                        {channelId === 14 ? 

                        groups.length > 0 ?
                        
                            groups?.map((ele)=>(

                        
                                <div key={ele._id}>
                                    <input 
                                        type='checkbox'
                                        checked={selectedArray.some(selectedItem => selectedItem._id === ele._id)}
                                        onChange={(e) => handleCheckboxChange(ele, e.target.checked)}
                                    />
                                    <span>{ele.name}</span>
                                </div>
                            ))
                            : 'Loading...'
                        : 'no group available'
                        }
                        
                    </div>
                </div>
                <div className='selectedGroup'>
                    {selectedArray.length > 0 ?
                        selectedArray.map((ele, i)=>(
                            <div key={i}>
                                <span className='groupName' onClick={()=>handleGroupMember(ele)}>{ele.name}</span>
                                <span className='groupRemIcon' onClick={()=> removeGroup(i, ele)}><HiXMark /></span>
                            </div>
                        )) : ''
                    }
                   
                </div> 
                { groupMember && 
                <div className='groupMember'>
                    <div className='groupName'>
                        <span className='groupTitle'>{groupMemberList.name}</span>
                        <span className='groupRemIcon' onClick={handleGroupMemberClose}><HiXMark /></span>
                    </div>
                    <div className='groupData'>
                        <span>Contact Name</span>
                        <span>Contact#</span>
                    </div>
                    <div>
                        {groupMemberList.contacts?.map((ele, index) => (
                            <div
                                key={index}
                                className={
                                    index % 2 === 0 
                                    ? `groupAllMember groupAllMemberEven`
                                    : 'groupAllMember'
                                }
                            >
                                <div className='member'>
                                    <img
                                    src="https://img.freepik.com/free-photo/rabbit-with-pink-tongue-is-sitting-brown-background_1340-24078.jpg?size=626&ext=jpg&ga=GA1.2.1631720873.1682579871"
                                    alt="name"
                                    />
                                    <span>{ele.name}</span>
                                </div>
                                <div className='memberContact'>
                                    <span>{ele.tp_uid}</span>
                                </div>
                            </div>
                        ))}
                        
                    </div>

                </div>
                }
                <div className='messageTemplate'>
                    <label>Select Message Temaplate</label>
                    <select onChange={handleSelectChange} name='selectTemplate'>
                        <option>Select one</option>
                        {templates.map((ele, i)=>{
                            return(
                                // <option key={i} value={`${ele.category} : ${ele.eng_template_id} : ${JSON.stringify(ele.mediaUrl)} : ${ele.name} : ${ele.templateVariables.length} : ${ele.text}`}>{ele.category} {ele.name} ({ele.language})</option> 

                                // <option key={ele._id} value={`${JSON.stringify(ele.mediaUrl)}:${ele.templateVariables.length}:${ele.text} : ${ele.name}: ${ele.category}: ${ele.eng_template_id}`}>{ele.category} {ele.name} ({ele.language})</option> 
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
                            <label>{`Label ${index + 1}`}</label>
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
                        (broadcastValues.mediaUrl?.[0]?.includes('image') ||
                        broadcastValues.mediaUrl?.[0]?.includes('document') ||
                            broadcastValues.mediaUrl?.[0]?.includes('video')) ? (
                            <div>
                                <label>{`Upload ${broadcastValues.mediaUrl[0]} `}</label>
                                <input type="file" name="selectedFile" onChange={handleFileChange} 
                                    accept={
                                        broadcastValues.mediaUrl[0]?.includes('image')
                                        ? 'image/*'
                                        : broadcastValues.mediaUrl[0]?.includes('document')
                                        ? 'application/pdf,.doc,.docx' // Add other document types as needed
                                        : broadcastValues.mediaUrl[0]?.includes('video')
                                        ? 'video/*'
                                        : ''
                                    }
                                />
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
                
                {broadcastValues.templateDesc && (
                <span>
                    {broadcastValues.templateDesc.split(/\{\{(\d+)\}\}/g).map((part, index) => {
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
                {/* <button>Send message</button> */}
                <Button 
                    variant='primaryBtn'
                    text = 'Send message'
                    padding='3px 10px'
                    fontSize='13px'
                />
            </div>
        <div>
  {broadcastValues.selectedFile && (
    <div style={{width:'300px', height: '300px'}}>
      Selected File Preview:
      <br />
      {broadcastValues.selectedFile.type.startsWith("image") && (
        <img src={broadcastValues.fileContent} alt="File Preview" style={{width: '100%', height: '100%'}}/>
      )}
      {broadcastValues.selectedFile.type.startsWith("video") && (
        <video controls>
          <source src={broadcastValues.fileContent} type={broadcastValues.selectedFile.type} style={{width: '100%', height: '100%'}}/>
        </video>
      )}
      {broadcastValues.selectedFile.type === "application/pdf" && (
        <div>
          <embed src={broadcastValues.fileContent} width="500" height="600" type="application/pdf" style={{width: '100%', height: '100%'}}/>
        </div>
      )} 
      {broadcastValues.selectedFile.type === "application/msword" ||
      broadcastValues.selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
      <div >
  <iframe src={`https://docs.google.com/viewer?${broadcastValues.selectedFile}`} width="600" height="400"></iframe>

</div>
    ) : null}
    {
        !broadcastValues.selectedFile.type.startsWith("image") &&
        !broadcastValues.selectedFile.type.startsWith("video") &&
        broadcastValues.selectedFile.type !== "application/pdf" &&
        broadcastValues.selectedFile.type !== "application/msword" &&
        broadcastValues.selectedFile.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
        <span>{broadcastValues.selectedFile.name}</span>
    )}
    </div>
  )}
</div>





            
        </div> 
    </form>
  )
}

export default NewBroadcast