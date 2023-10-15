import { useState } from "react"
import { Icons } from "../../assets/Icons/icons"
import { Table } from "react-bootstrap"
import useAssignment from "../../ViewModel/AssignmentsViewModel/assignmentsServices"
import { BsFillEyeFill, BsFillTrashFill } from 'react-icons/bs'
import { formatDateTime } from "../../Utils/timeUtils"
import OffCanvas from "../../Components/OffCanvas/OffCanvas"
import ViewAssignment from "./ViewAssignment"
import { FaFilter } from "react-icons/fa"
import AddFilter from "./AddFilter"
import ConfirmModal from "../../Components/Modal/ConfirmModal"
import AddAssignment from "./AddAssignment"
import { formatTimestamp } from "../Conversations/utils/timesUtils"


const AssignmentsList = () => {
    const { allAssigments, allTeam, confirmHandler, getRules, confirmModal, setConfirmModal, assignmentDeleteHandler} = useAssignment()
    
    const [show, setShow] = useState(false)
    const [naShow, setnaShow] = useState(false)
    const [filterCanvas, setFilterCanvas] = useState(false)
    const [ruleId, setRuleId] = useState('')
    const [ruleData, setRuleData] = useState({})
    const [update, setUpdate] = useState(false)
    

    

    const handleClose = () =>{
        setShow(false)
    }
    const nahandleClose = () =>{
        setnaShow(false)
    }

    const handleFilter = (id)=>{
        setRuleId(id)
        setFilterCanvas(true)
    }

    const edit = (ele) =>{
        setRuleData(ele)
        setnaShow(true)
        setUpdate(true)
    }


    

    const viewFilter= async(ele, tName)=>{
        setShow(true)
        getRules(ele._id)

        setRuleData(prevState=>({
            ...prevState,
            action_team: tName,
            name:ele.name

        }))
    }
  return (
    <>
        <div className={`d-flex flex-column gap-2 assignmentMain`}>
            <div className={`d-flex align-items-center justify-content-between assignmentHeader`}>
                <div className={`d-flex align-items-center gap-2 headerLeft`}>
                    <span className='assignmentIcon'>{Icons.CharRightIcon}</span>
                    <span className='assignmentTitle'>Assignments</span>
                </div>
                <div className='headerRight'>
                    <button onClick={()=>{setnaShow(true); setUpdate(false)}}>Add new</button>
                </div>
            </div>
            <div className='assignmentTableContainer'>
                <Table striped hover fixed className={`border rounded-5 assignmentTable`}>
                    <thead className='tableHeader'>
                        <tr>
                            <th>Rule</th>
                            <th>Team</th>
                            <th>Date Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className={`scrollable tableBody`}>
                        {allAssigments.map((ele)=>{
                            const teamName = allTeam?.filter((team) => team._id === ele.action_team).map((team) => team.title);
                            return(
                                <tr key={ele._id}>
                                    <td>{ele.name}</td>
                                    <td>{teamName}</td>
                                    
                                    <td>{formatTimestamp(ele.entryTime)}</td>
                                    
                                    <td>
                                        <div className='tableIcons'>
                                            <span className='seenIcon' onClick={()=>viewFilter(ele, teamName)}><BsFillEyeFill /></span>
                                            <span className='editIcon' onClick={()=>edit(ele)}><Icons.EditIcon /></span>
                                            <span className='filterIcon' onClick={()=>handleFilter(ele._id)}><FaFilter/></span>
                                            <span className='deleteIcon' onClick={()=> confirmHandler(ele._id)}><BsFillTrashFill /></span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>

        {/* View Assignment Canvas */}
        <OffCanvas 
            show = {show}
            handleClose = {handleClose}
            placement= 'end'
            children={<ViewAssignment 
                data = {ruleData}
            />}
            title = 'Rules'
            style={{width: '40vw'}}
        />

        {/* Add assignment Canvas */}
        <OffCanvas 
            show = {naShow}
            handleClose = {nahandleClose}
            placement= 'end'
            children={
                <AddAssignment 
                    data = {allTeam}
                    close = {nahandleClose}
                    update = {update}
                    ruleData = {ruleData}
                />
            }
            title = {update ? 'Update Assignment':'Add Assignment'}
            // title = 'Add New Rule'
            style={{width: '35vw'}}


        />

        {/* Adding filter canvas */}
        <OffCanvas 
            show = {filterCanvas}
            handleClose = {()=> setFilterCanvas(false)}
            placement= 'end'
            children={
                <AddFilter 
                    close = {()=> setFilterCanvas(false)}
                    ruleId= {ruleId}
                />
            }
            title = 'Add Filter'
            style={{width: '40vw'}}


        />

        {/* Confirm modal for delete */}
        <ConfirmModal 
            show ={confirmModal}
            handleClose = {()=>setConfirmModal(false)}
            title='Confirm Delete'
            confirmDelete = {assignmentDeleteHandler}
            
        />

    
    </>
  )
}

export default AssignmentsList