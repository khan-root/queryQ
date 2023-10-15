import dashboardApi from "../../Model/Data/Dashboard/Dashboard"

const dashboardViewModel = (set, get)=>({
    allData:[],
    orgOneId : 9677375,
    onlineUsers:[],

    getAllDashboard:async()=>{
        try {
            const response = await dashboardApi.getAllData()
            const data = await response.data 
            set({allData: data})
        } catch (err) {
            console.log(err)
        }
    },
    getOnlineUser: async()=>{
        try{
            const response = await dashboardApi.getAllOnlineUsers(get().orgOneId)
            const data = await response.data 
            set({onlineUsers: data})
        }catch(err){
            console.log(err)
        }
    },
    newOnlineUser :(user)=>{
        const existingUser = get().onlineUsers.find((onlineUser) => onlineUser._id === user._id);
        if (!existingUser) {
            set({ onlineUsers: [...get().onlineUsers, user] });
        }
    },
    offlineUser :(user)=>{
        set({
            onlineUsers: get().onlineUsers.filter(data => data._id !== user._id)
        })  

    }
})
export default dashboardViewModel