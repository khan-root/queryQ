import { axiosInstance } from "../../base"


const templateApi = {
    getAllTemplates: function(tpId){
        return axiosInstance.request({
            method: 'GET',
            url: `/tpinboxes/whatsApp/template/${tpId}`
        })
    }
}


export default templateApi