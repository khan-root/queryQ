import { axiosInstance } from "../../base"


const usersApi={
    getUser: function(orgId, oneId){
        return axiosInstance.request({
            method: 'GET',
            url: `/user/${orgId}?oneId=${oneId}`
        })
    }
}

export default usersApi