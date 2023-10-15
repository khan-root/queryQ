// import { CrossIcon, DeleteIcon, EditIcon, SettingIcon, ThunderIcon } from '@/icons/icons'
import { useState } from 'react'
import useStore from '../../store/store'
import conversationApi from '../../Model/Data/Conversation/conversation'
import Button from '../../Components/Button/Button'
import { Icons } from '../../assets/Icons/icons'
import { AiFillSetting } from 'react-icons/ai'
import { MdEdit, MdEditNote } from 'react-icons/md'
import { BsFillTrashFill } from 'react-icons/bs'
import { HiXMark } from 'react-icons/hi2'
import { showToast } from '../../Toaster/Toaster'
// import Button from '@/components/Button/Button'
// import conversationApi from '@/model/Data/Conversation/conversation'
// import useStore from '@/store/store'

const QuickResponse = (props) => {
    const {data, handleQuickResponse, onClick} = props 
    const newQuickReply = useStore((state)=> state.newQuickReply)
    const deleteQuickReply = useStore((state)=> state.deleteQuickReply)
    const updateQuickReply = useStore((state)=> state.updateQuickReply)
    const [values, setValues] = useState({
        id: '',
        quickText: '',
    })

    const [showUpd, setShowUpd] = useState(false)
    const [updateRes, setUpdateRes] = useState(false)
    // const truncateText = (text, limit) => {
    //     if (text?.length <= limit) {
    //         return text;
    //     }
    //     return text.substring(0, limit) + '...';
    // };

    const handleClick = (ele) => {
        const text = ele.quick_msg;
        onClick(text);
    };

    const handleResInput = (e)=>{
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

    }

    const handleQResEdit = (ele) =>{
        setValues({
            id:ele._id,
            quickText: ele.quick_msg
        });
        setUpdateRes(true)
    }

    const handleCancelRes= (e) =>{
        e.stopPropagation(); 
        setShowUpd(false);
        setUpdateRes(false)
        setValues({
            id: null,
            quickText: null
        })
    }

    const quickResValidation = ()=>{
        if(!values.quickText){
            showToast('Quick response required', 'error')
            return
        }else if (/^\s*$/.test(values.quickText)) {
            showToast("Quick response can't be empty", 'error');
            return
        }
        return true
    }

    const handleUpdateQuickRes = async(e)=>{
        e.preventDefault();

        const quick_msg = {quick_msg: values.quickText}
        const validate = quickResValidation()
        if(validate){

        
            const response = await conversationApi.updateQuickMessage(values.id, quick_msg)
            const data = response.data
            const realQuickResponse = {_id:values.id, quick_msg:values.quickText} 
            if(response.status === 200){
                if(data.status === "Success"){
                    updateQuickReply(realQuickResponse)
                    showToast('Quick response added successfully','success')
                }
            }
            console.log(response)
        }
    }
    
    const handleQuickResAdd = async(e)=>{
        e.preventDefault();

        const quickResponse = {message_data: values.quickText}
        const validate = quickResValidation()
        if(validate){

            const response = await conversationApi.addQuickMessage(quickResponse)
            const data = await response.data
            const realQuickResponse = {_id:data._id, quick_msg:values.quickText} 
            if(response.status === 200){
                if(data.status === "Success"){
                    newQuickReply(realQuickResponse)
                    showToast('Quick response updated successfully','success')
                }
            }
            console.log(response)
        }

    }

    const handleQResDelete = async(ele)=>{
        // console.log(ele.+id)
        const response = await conversationApi.deleteQuickMessage(ele._id)
        const data = response.data 
        if(response.status === 200){
            if(data.status === 'Success'){
                deleteQuickReply(ele._id)
                showToast('Quick response delete successfully','success')
            }
        }
        console.log(response)
    }

  return (
    <>

        <div className={`d-flex flex-column gap-2 Maincontainer`}>
            <div className={`d-flex align-items-center justify-content-between responseTop`}>
                <div className='m-2'>
                    {/* <span><ThunderIcon /></span> */}
                    <span>Qucik Response</span>
                </div>
                <div className='m-2 crossIcon'>
                    {/* <span onClick={handleQuickResponse}><CrossIcon /></span> */}
                    <span onClick={handleQuickResponse}><HiXMark /></span>
                </div>
            </div>
            {showUpd ? 

            <div
                
                className={`d-flex flex-column gap-1 quickResponseTextArea`}
            >
                <div className='textArea'>
                    <input 
                        type='text' 
                        placeholder='Write a quick response'  
                        name= 'quickText'
                        onClick= {(e)=>e.stopPropagation()}
                        onChange = {handleResInput}
                        value={values.quickText}

                    />
                </div>
                <div className='d-flex justify-content-end gap-2 mx-2'> 
                    <Button 
                        variant= 'danger'
                        padding = '5px 15px'
                        fontSize='12px'
                        text='cancel'
                        onClick={handleCancelRes}
                    />
                    <Button
                        type="submit"
                        variant="primaryBtn"
                        padding="5px 15px"
                        fontSize="12px"
                        text={updateRes ? 'Update' : 'Add'}
                        onClick={updateRes ? (e)=>handleUpdateQuickRes(e) : (e)=>handleQuickResAdd(e)}
                    />
                </div>
            </div>
            :
            
                <div className='d-flex align-items-center gap-1 justify-content-end' style={{fontSize: '13px', color: '#2BB5C1'}}>
                                
                    <span onClick={(e) => { e.stopPropagation(); setShowUpd(true); }}><AiFillSetting /></span>
                    <span onClick={(e) => { e.stopPropagation(); setShowUpd(true); }}>Manage</span>
                    
                </div>
            }
            <div className={showUpd ? 'quickResponseList customHeight' : 'quickResponseList'}>
                {data.map((ele)=>(
                    <div key={ele._id}  className={`d-flex align-items-center gap-5 responseList`}>
                        {/* <span className={`${styles.truncatedText}`} onClick={()=>handleClick(ele)}>{truncateText(ele.quick_msg, 30)}</span> */}
                        <span className={`truncatedText`} onClick={()=>handleClick(ele)}>{ele.quick_msg}</span>
                        {showUpd && 
                            <div className={`d-flex align-items-center gap-1 icons`}>
                                <span className='editIcon' onClick={()=>handleQResEdit(ele)}><MdEdit /></span>
                                {/* <span className={styles.editIcon} onClick={()=>handleQResEdit(ele)}><EditIcon /></span> */}
                                <span className='deleteIcon' onClick={()=>handleQResDelete(ele)}><BsFillTrashFill /></span>
                                {/* <span className='deleteIcon' onClick={()=>handleQResDelete(ele)}><DeleteIcon /></span> */}
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
        
    </>
  )
}

export default QuickResponse