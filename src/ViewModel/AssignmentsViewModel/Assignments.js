import assignmenstApi from "../../Model/Data/Assignment/Assignment"
import teamApi from "../../Model/Data/Team/Team"


const assignmentViewModal = (set, get) => ({
    allAssigments: [],
    allTeams: [],
    allRules : [],

    getAllTeam: async(orgId)=>{
        try{
            const response = await teamApi.getAllTeams(orgId)
            const result = await response.data
            set({allTeams: result})
            
        }
        catch(err){
            console.log(err)
        }
    },
    getRules: async(id)=>{
        try{
            const response = await assignmenstApi.rulesAndConditions(id)
            const data = await response.data
            const result = await data.results
            set({allRules: result})
            console.log(response)
            
        }
        catch(err){
            set({allRules: []})
        }
    },

    getAllAssignment: async()=>{
        try{
            const response = await assignmenstApi.getAllAssignments()
            const result = response.data
            set({allAssigments: result.getting_all_the_data})
            console.log('Assignments : ',result)
        }catch(err){
            console.log(err)
        }
    },
    addNewAssignment:function(teamData ){
        // const tempValue  = teamData.tempVarValue
        // const team = get().allTeams.find((ele) => {
        //     return ele._id === teamData.teamId
            
        // });
        // const result = {
        //     teamId: team,     
        //     _id: id,     
        //     tempVarValue: tempValue,
        // };
        set({
            allAssigments: [...new Set([...get().allAssigments, teamData])],
            
        })
        
    },
    deleteAssignment:function(id){
        set({
            allAssigments: get().allAssigments.filter(assignment => assignment._id !== id)
        })  
    },
    updateAssignment: (updatedAssignment)=>{
        set({
            allAssigments: get().allAssigments.map((assignment) => assignment._id === updatedAssignment._id ? updatedAssignment :  assignment)
        })
    },



    
    
})

export default assignmentViewModal