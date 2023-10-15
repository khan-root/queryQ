import useStore from "../../store/store"

const useDashboard =()=>{

    const getDashboardData = useStore((state)=> state.allData)
    const getAllDashboard = useStore((state)=> state.getAllDashboard)
    const getOnlineUser = useStore((state)=> state.getOnlineUser)
    const onlineUsers = useStore((state)=> state.onlineUsers)
    
    return{
        getDashboardData,getAllDashboard,onlineUsers,getOnlineUser
    }
}

export default useDashboard