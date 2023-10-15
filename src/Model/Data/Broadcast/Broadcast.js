import { axiosInstance, axiosInstanceMediaFiles } from "../../base"

const broadcastApi ={
    getAllCampaign: function(){
        return axiosInstance.request({
            method: 'GET',
            url: `broadcast/campaign/get`
        })
    },
    addNewCampaign: function(data){
        return axiosInstance.request({
            method: 'POST',
            url:`/broadcast/campaign/create`,
            data: data
        })
    },
    getBroadcastMessages: function(id){
        return axiosInstance.request({
            method: 'GET',
            url: `/broadcast/get?campaignId=${id}`
        })
    },
    addBroadcastFile: function(data){
        return axiosInstanceMediaFiles.request({
            method: 'POST',
            url: `/upload`,
            data: data
        })
    },
    addBroadcast: function(message){
        return axiosInstance.request({
            method: 'POST',
            url: `/broadcast/message`,
            data: message
        })
    },
    deleteBroadcast: function(id){
        return axiosInstance.request({
            method: 'DELETE',
            url: `/broadcast/compaign/delete/${id}`
        })
    },
    searchBroadcast: function(data){
        return axiosInstance.request({
            method: 'GET',
            url: `/broadcast/compaign/search?q=${data}`
        })
    }
}


export default broadcastApi