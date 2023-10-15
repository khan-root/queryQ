import { useState } from "react"
import assignmenstApi from "../../Model/Data/Assignment/Assignment"
import useStore from "../../store/store"
import { showToast } from "../../Toaster/Toaster"


const useAssignment = () =>{
    const allAssigments = useStore((state) => state.allAssigments)
    const allTeam = useStore((state)=> state.allTeams)
    const deleteAssignment = useStore((state)=> state.deleteAssignment)
    const [confirmModal, setConfirmModal] = useState(false)
    const [ruleID, setRuleID] = useState('')

    const getRules = useStore((state)=> state.getRules)
    const allRules = useStore((state)=> state.allRules)


    const [updateCanvas, setUpdateCanvas] = useState(false)

    const confirmHandler = (id)=>{
        setRuleID(id)
        setConfirmModal(true)
        
    }
    const assignmentDeleteHandler = async ()=>{
        const response = await assignmenstApi.deletAssignment(ruleID)
        const data = response.data
        if(response.status == 200){
            if(data.STATUS === "SUCCESSFUL"){
                setConfirmModal(false)
                deleteAssignment(ruleID)
                showToast('Rule successfully deleted', 'success')
            }
        }
    }



    











    return{ 
        allAssigments, allTeam, confirmHandler,assignmentDeleteHandler,  getRules, allRules, confirmModal,  setConfirmModal,
        updateCanvas
    }
}

export default useAssignment