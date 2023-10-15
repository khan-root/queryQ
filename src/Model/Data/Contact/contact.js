import { axiosInstance } from "../../base"

const contactsApi = {
    getAllContacts : function (){
        return axiosInstance.request({
            method: 'GET',
            url: `contact_info/all`
        })
    },
    getWhatsAppContacts: function(){
        return axiosInstance.request({
            method: 'GET',
            url: `/contact_info`
        })
    },
    getNextWhatsAppContacts: function(nextUrl){
        return axiosInstance.request({
            method: 'GET',
            url: `${nextUrl}`
        })
    },
    getEmailContacts: function(){
        return axiosInstance.request({
            method: 'GET',
            url: `/contact_info/all/email`
        })
    },

    getAllContactGroups: function(){
        return axiosInstance.request({
            method: 'GET',
            url: `/contact_groups_info`
        })
    },
    getSearchContacts: function(name){
        return axiosInstance.request({
            method: 'GET',
            url:`/contact_info/search?q=${name}`
        })
    },
    deleteGroupMember: function(id){
        return axiosInstance.request({
            method: 'DELETE',
            url:`/contact_groups_links_info/${id}`
        })
    },
    createGroup:function(groupInfo){
        return axiosInstance.request({
            method: 'POST',
            url:`/contact_groups_info`,
            data:groupInfo, 
        })
    },
    groupContact:function(group_info_link){
        return axiosInstance.request({
            method: 'POST',
            url:`/contact_groups_links_info`,
            data:group_info_link, 
        })
    },
    groupDelete:function(id){
        return axiosInstance.request({
            method: 'DELETE',
            url:`/contact_groups_info/${id}`,
        })
    },
    getGroupContacts:function(id){
        return axiosInstance.request({
            method: 'GET',
            url:`/contact_groups_links_info/groups_contacts/${id}`,
        })
    },
    getGroupContactGroupsLink:function(){
        return axiosInstance.request({
            method: 'GET',
            url:`/contact_groups_links_info`,
        })
    },
    getSearchGroup: function(name){
        return axiosInstance.request({
            method: 'GET',
            url: `/contact_groups_info/search?q=${name}`
        })
    },
    addContact : function(data){
        return axiosInstance.request({
            method: 'POST',
            url: `/contact_info`,
            data: data
        })
    },
    deleteContact: function(id){
        return axiosInstance.request({
            method: 'DELETE',
            url: `/contact_info/${id}`
        })
    },
    updateContact: function(id, data){
        return axiosInstance.request({
            method: 'PATCH',
            url: `/contact_info/${id}`,
            data: data
        })
    }

}

export default contactsApi