import React, { useState } from 'react'
import Button from '../../Components/Button/Button'
import useConversation from '../../ViewModel/ConversationViewModel/conversationServices'
import { BsChevronDown } from 'react-icons/bs'
import { Sketch } from '@uiw/react-color'
import { MdDelete, MdEdit } from 'react-icons/md'
import { HiOutlineXMark } from 'react-icons/hi2'
import { AiOutlineCheck } from 'react-icons/ai'



const Labels = (props) => {
    const { data } = props
    const [showColorPicker, setShowColorPicker] = useState(false)
    const {
        handelAddLebel, labelValues, handleLabelChange, handleColorChange ,handleDeleteLabel, handleUpdateLable,
        updateLabel,handleDiscardLabel
    
    } = useConversation()


  return (
    <div className='labelsContainer'>

        <div className='labelHeader'>
            <span>
                Use labels to help you describe and organize people. Labels can be about anything, such as customer type and previous orders. Only you or the people who manage your Account can see labels.
            </span>
        </div>

        <div className='labelsForm'>
            <form onSubmit={handelAddLebel}>
                <div className='formContianer'>
                    <div>
                        <div style={{background: labelValues.color, width:'15px', height:'15px', borderRadius:'50%'}}></div>
                    </div>
                    <div className='colorChoose'>
                        <span onClick={()=> setShowColorPicker(prev => !prev)} className='showColor'
                            title='color picker'
                        >
                            <BsChevronDown 
                                className={showColorPicker ? 'openColor' : 'closeColor'}
                            />
                        </span>
                        
                    </div>
                    <div className='labelInput'>
                        <input type='text' name='labelName' placeholder='Label Name' value={labelValues.labelName} onChange={handleLabelChange}/>
                    </div>

                    <div className='submitContianer'>
                        { labelValues.updateForm ? 
                            <div className='updateIcons'> 
                                <span className='updateIcon' onClick={(e)=> updateLabel(e)}><AiOutlineCheck /></span>
                                <span className='discardIcon' onClick={handleDiscardLabel}><HiOutlineXMark /></span>
                            </div>
                        :
                            <Button 
                                text='Add Label'
                                fontSize='13px'
                                variant='primaryBtn'
                            />
                        }
                    </div>
                </div>
                {showColorPicker && 
                    <div className='colorPicker'>
                        <Sketch
                            onChange={handleColorChange}
                        />
                    </div>
                }
            </form>
            
        </div>

        <div className='labelsListsContainer'>
            <div className='labelsLists'>
                {data.map((label, i)=>{
                    return(
                        <div key={i} className='labelsList'>
                            <div className='label'>
                                <div className='color' style={{background: label.color}}></div>
                                <div className='labelName'>
                                    <span>{label.label}</span>
                                </div>
                            </div>
                            <div className='labelIcons'>
                                <div className='icons'>
                                    <span className='editIcon' onClick={()=> handleUpdateLable(label)}><MdEdit /></span>
                                    <span className='deleteIcon' onClick={()=>handleDeleteLabel(label._id)}><MdDelete /></span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        
    </div>
  )
}

export default Labels