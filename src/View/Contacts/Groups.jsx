import React, { useState } from 'react'
import useContact from '../../ViewModel/ContactsViewModel/contactsServices'
import { CiSettings } from 'react-icons/ci'
import { formatTimestamp } from '../Conversations/utils/timesUtils'
import { FaCalendarAlt } from 'react-icons/fa'
import OffCanvas from '../../Components/OffCanvas/OffCanvas'
import ManageGroup from './ManageGroup'
import { capitalizeWords } from './Utils/utils'
import ConfirmModal from '../../Components/Modal/ConfirmModal'
const Groups = (props) => {
    const {data, contactChannel} = props
    const createdTime = formatTimestamp(data.entryTime)
    const { deleteGroupHanlder, manageGroupHandler, sgManage, setSgManage, groupContacts, confirmDelete, showConfirm, setShowConfirm} = useContact()

    
    
  return (
    <>
    <div className='groupsContainer'>
        <div className={`d-flex justify-content-between align-items-center top`}>
            <div className='topLeft'>
                <span className='groupIcon' style={{backgroundColor: contactChannel?.bg, color:contactChannel?.iColor}}>{contactChannel?.icon}</span>
                <span className='groupTitle'>{data.name}</span>
            </div>
            <div className={`d-flex gap-2 topRight`}>
                <span className='settingIcon' onClick={()=>manageGroupHandler(data._id)}><CiSettings /></span>
                <span className='manageSetting' onClick={()=>manageGroupHandler(data._id)}>Manage</span>
            </div>

        </div>
        <div className='center'>
            <div className='centerTop'>
                <span className='calendar'><FaCalendarAlt /></span>
                <span className='title'>Date Created</span>
            </div>
            <div className='centerBottom'>
                <span>{createdTime}</span>
            </div>
        </div>
        <div className='bottom'>
            <span onClick={()=>confirmDelete(data._id)}>Delete</span>
        </div>
    </div>
    <OffCanvas 
        show = {sgManage}
        handleClose = {()=>setSgManage(false)}
        placement = 'end'
        style={{width: '45vw'}}
        title={`Manage ${capitalizeWords(data.name)}`}
        children={
            <ManageGroup 
                groupData ={data}
                close = {()=>setSgManage(false)}
                groupContacts={groupContacts}
            />
        }
        autoClose = {false}
    />

    <ConfirmModal 
        show={showConfirm}
        handleClose ={()=> setShowConfirm(false)}
        title = 'Confirm Delete'
        confirmDelete = {deleteGroupHanlder}
    />
    
    </>
  )
}

export default Groups