import {axiosInstance}  from '../../base'
const conversationApi = {
    getAllStory: function(){
        return axiosInstance.request({
            method: 'GET',
            url: `/inbox/story`
        })
    },
    getUnassignedStory: function(){
        return axiosInstance.request({
            method: 'GET',
            url: `/inbox/story?unassign=1`
        })
    },
    getUnansweredStory: function(){
        return axiosInstance.request({
            method: 'GET',
            url: `/inbox/story?replyEnd=0`
        })
    },
    getSnoozedStory: function(){
        return axiosInstance.request({
            method: 'GET',
            url: `/inbox/story?snoozedTime=1`
        })
    },
    getUserChat: function(id){
        return axiosInstance.request({
            method: 'GET',
            url: `/inbox/message/${id}`
        })
    },
    getAllLabels: function(){
        return axiosInstance.request({
            method: 'GET',
            url: `/label`
        })
    },
    getChatLabels: function(id){
        return axiosInstance.request({
            method: 'GET',
            url: `/label/assign/${id}`
        })
    },
    getNextStories: function(nextUrl){
        return axiosInstance.request({
            method: 'GET',
            url: `${nextUrl}`
        })
    },
    getNextUnassignedStories: function(nextUrl){
        return axiosInstance.request({
            method: 'GET',
            url: `${nextUrl}`
        })
    },
    getNextUnansweredStories:function(nextUrl){
        return axiosInstance.request({
            method: 'GET',
            url: `${nextUrl}`
        })
    },
    getMoreChat: function(nextUrl){
        return axiosInstance.request({
            method: 'GET',
            url: `${nextUrl}`
        })
    },
    getOpenStory:function(){
        return axiosInstance.request({
            method: 'GET',
            url:`/inbox/story?status=0`
        })
    },
    getNextOpenStories:function(nextUrl){
        return axiosInstance.request({
            method: 'GET',
            url: `${nextUrl}`
        })
    },
    getHoldStory:function(){
        return axiosInstance.request({
            method: 'GET',
            url:`/inbox/story?status=1`
        })
    },
    getNextHoldStories:function(nextUrl){
        return axiosInstance.request({
            method: 'GET',
            url: `${nextUrl}`
        })
    },
    getCloseStory:function(){
        return axiosInstance.request({
            method: 'GET',
            url:`/inbox/story?status=3`
        })
    },
    getNextCloseStories:function(nextUrl){
        return axiosInstance.request({
            method: 'GET',
            url: `${nextUrl}`
        })
    },
    getUnreadStory:function(){
        return axiosInstance.request({
            method: 'GET',
            url:`/inbox/story?unread=1`
        })
    },
    getNextUnReadStories:function(nextUrl){
        return axiosInstance.request({
            method: 'GET',
            url: `${nextUrl}`
        })
    },
    addNewUserChat: function (message, tpId){
        
        return axiosInstance.request({
            method: 'POST',
            url: `/inbox/sendMessage/${tpId}`,
            data: {message}
        })
    },
     sendMediaMessage : function (message, attachment, tpId){
        
        return axiosInstance.request({
            method: 'POST',
            url: `/inbox/sendMessage/${tpId}`,
            data: {message:message, attachments: attachment}
        })
    },
    getAllQuickReplies : function(){
        return axiosInstance.request({
            method: 'GET',
            url: `/tpinboxes/get-quick-reply`
        })
    },
    addQuickMessage: function(quickMessgae){
        return axiosInstance.request({
            method: 'POST',
            url: `/tpinboxes/create-push-quick-reply`,
            data: quickMessgae
        })
    },
    deleteQuickMessage: function(id){
        return axiosInstance.request({
            method: 'DELETE',
            url: `/tpinboxes/delete-reply/${id}`
        })
    },
    updateQuickMessage: function(id, quickMessgae){
        return axiosInstance.request({
            method: 'PATCH',
            url:`tpinboxes/quick-reply/${id}`,
            data:quickMessgae
        })
    },

    totalQueriesData : function (id){
        return axiosInstance.request({
            method: 'GET',
            url: `/inbox/countTotalStory/${id}`
        })
    },
    priority: function (id, data){
        return axiosInstance.request({
            method: 'PATCH',
            url: `/inbox/story/${id}`,
            data: data
        })
    },
    statusAssign: function(id, data){
        return axiosInstance.request({
            method: 'PATCH',
            url:`/inbox/story/share/${id}`,
            data:data

        })
    },
    systemMessage: function(id, data){
        return axiosInstance.request({
            method: 'POST',
            url:`/inbox/system-message/${id}`,
            data:data

        })
    },
    addLabel: function(data){
        return axiosInstance.request({
            method: 'POST',
            url: `/label`,
            data: data
        })
    },
    deleteLabel: function(id){
        return axiosInstance.request({
            method: 'DELETE',
            url: `/label/${id}`,
        })
    },
    updateLabel: function(id, data){
        return axiosInstance.request({
            method: 'PATCH',
            url: `/label/${id}`,
            data: data
        })
    },
    addAssignLabel: function(data){
        return axiosInstance.request({
            method: 'POST',
            url: `/label/assign`,
            data: data
        })
    },
    deleteAssignLabel: function(data){
        return axiosInstance.request({
            method: 'DELETE',
            url: `/label/assign/remove`,
            data: data
        })
    },
    newConversation: function(data){
        return axiosInstance.request({
            method: 'POST',
            url: `/inbox/template/send`,
            data: data
        })
    },
    searchStory: function(name){
        return axiosInstance.request({
            method: 'GET',
            url: `/inbox/story?name=${name}`,
        })
    },
    singleStory: function(id){
        return axiosInstance.request({
            method: 'GET',
            url:`/inbox/story/${id}`
        })
    },
    getAttachments: function(id){
        return axiosInstance.request({
            method: 'GET',
            url:`/inbox/attachments/${id}`
        })
    }
}

export default conversationApi