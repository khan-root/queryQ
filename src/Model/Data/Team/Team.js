import { axiosInstance } from "../../base"


const teamApi = {
    getAllTeams: function(orgId){
        return axiosInstance.request({
            method: 'GET',
            url: `/team/org/${orgId}`
        })
    },
    getTeamDetail: function(id){
        return axiosInstance.request({
            method: 'GET',
            url: `/team/${id}/member`
        })
    },
    inviteMembers: function(id, emails){
        return axiosInstance.request({
            method: 'POST',
            url: `/invite`,
            data:{id, emails}
        })
    },
    getExcludedMember: function(id){
        return axiosInstance.request({
            method: 'GET',
            url: `/team/member/excluded/${id}`
        })
    },
    getEmpleadoMember: function(){
        return axiosInstance.request({
            method: 'GET',
            url: `/empleado`
        })
    },
    addTeam: function(team){
        return axiosInstance.request({
            method: 'POST',
            url: `/team`,
            data: {title:team}
        })
    },
    updateTeam: function(id, teamName){
        return axiosInstance.request({
            method: 'PATCH',
            url: `/team/${id}`,
            data: {title:teamName}
        })
    },
    deleteTeam: function(id){
        return axiosInstance.request({
            method: 'DELETE',
            url: `/team/${id}`,
        })
    },
    addMemberToTeam: function(data){
        return axiosInstance.request({
            method: 'POST',
            url: `/team/member/add`,
            data: data
        })
    },
    
    remMemberFromTeam: function(data){
        return axiosInstance.request({
            method: 'POST',
            url: `/team/member/remove`,
            data: data
        })
    },
    addNewMember: function(data){
        return axiosInstance.request({
            method: 'POST',
            url: `/user/internal`,
            data: data
        })
    },

}

export default teamApi