import { axiosInstance } from "../../base"

const dashboardApi = {
    getAllData: function(){
        return axiosInstance.request({
            method: 'GET',
            url: `/dashboard`
        })
    },
    getAllOnlineUsers: function(orgOneId){
        return axiosInstance.request({
            method: 'GET',
            url: `user/${orgOneId}?online=1`
        })
    }
}

export default dashboardApi


