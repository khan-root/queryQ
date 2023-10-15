import { axiosInstance } from "../../base"


const assignmenstApi = {
    getAllAssignments: function (){
        return axiosInstance.request({
            method: 'GET',
            url: `inbox/story/automation/get_rule`
        })
    },
    addAssignment: function(data){
        return axiosInstance.request({
            method: 'POST',
            url: `/inbox/story/automation`,
            data: data
        })
    },
    addRule: function(data){
        return axiosInstance.request({
            method: 'POST',
            url: `/inbox/story/automation/rule`,
            data: data
        })
    },
    deletAssignment: function(id){
        return axiosInstance.request({
            method: 'DELETE',
            url: `/inbox/story/automation/rule/delete/${id}`
        })
    },
    addFilterAndRules: function(data){
        return axiosInstance.request({
            method: 'POST',
            url: `/inbox/story/automation/conditions`,
            data: data
        })
    },
    
    rulesAndConditions: function(id){
        return axiosInstance.request({
            method: 'GET',
            url: `/inbox/story/automation/get_condition?q=${id}`,
        })
    },
    updateAssignment: function(id, data){
        return axiosInstance.request({
            method: 'PATCH',
            url: `/inbox/story/automation/rule/update/${id}`,
            data: data
        })
    }
    

}

export default assignmenstApi