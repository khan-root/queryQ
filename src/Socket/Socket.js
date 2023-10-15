import { io } from 'socket.io-client';
import conversationApi from '../Model/Data/Conversation/conversation';
import useStore from '../store/store';
import { playSound } from './socketServices';




var oneid =  10268458;
var org_oneid = 9677375 
var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvbmVpZCI6IjEwMjY4NDU4Iiwib3JnX29uZWlkIjoiOTY3NzM3NSIsIm9yZ19uYW1lIjoiVEVTVF9PUkdfUXVlcnlRIiwiZnVsbF91c2VybmFtZSI6IlNhcm1hZCBGYWl6YW4gVWxsYWgiLCJmdWxsX2RwIjoiaHR0cHM6XC9cL29uZWlkLnZlZXZvdGVjaC5jb21cL2RwXC9maWxlc1wvNGQ1NDQxNzk0ZTZhNjczMDRlNTQ2NzNkLURFRkFVTFQuanBlZyIsInJlY29yZF9pZCI6IkRFRkFVTFQiLCJhY2Nlc3NfdG9rZW4iOiJhNTMzNDE4OTFtMjg2Nzg2NTE1ZjA4OWMxOTE5OTU1NmQ5ZDc1NzQ0ZDBjZTk3NTk4MGNhMTQxZTJhNiIsImF1ZCI6ImdhUDV6dWI1WDk5c20iLCJyb2xlX2lkIjoiQWRtaW4iLCJyb2xlX2RiX2lkIjoiNzMiLCJvdGhlcl9wZXJtaXNzaW9ucyI6bnVsbCwiYWxsb3dlZF9hcHBfdG9rZW4iOiIxM2ZiYWRhMzU5NDkxMmFhMTEzNDkxMzU5IiwiaWF0IjoxNjk3MTc2NzE4LCJleHAiOjE2OTcyNjMxMTgsIm9yZ19kYXRhIjp7Il9pZCI6OTY3NzM3NSwidXNlcl9vbmVpZCI6OTMyNjkzMywib3JnX25hbWUiOiJURVNUX09SR19RdWVyeVEiLCJvcmdfdHlwZSI6MTU4LCJudG5fbm8iOiIiLCJvcmdfYnJmX2ludHJvIjoiVEVTVF9PUkdfUXVlcnlRIiwidXNlcl9jb250YWN0IjoiMDMzNDA5MzM4NTAiLCJlbWFpbCI6ImZhcmF6YWhtYWRraGFuMTVAZ21haWwuY29tIiwiYWRkcmVzcyI6IlZUIFBlc2hhd2FyIiwiY291bnRyeV9pZCI6MTYyLCJjaXR5X2lkIjo4NTkwOSwib3JnX2RwIjp7ImZpbGVfaWQiOiI0ZjQ0NTU3OTRlNTEzZDNkIiwiZmlsZV9uYW1lIjoiMV8zODkzZmUzMjM4MTY3OTcucG5nIn0sImNvdW50cnlfY29kZSI6IlBLIn19.RlZXB7okDADebTgupUctIS88mAt3p3g3--lnjCBd_mE'



// hitting socket url

const socket = io('https://queryq.veevotech.com/',{
    query: {
        oneid,
        orgId : org_oneid,
    },
});

// creating socket connection and also use it in main file App.jsx to call in useEffect
 const useSocketConnection =()=>{
    const newSocketStory = useStore((state) => state.addToStoryFromSocketData);
    const newChatMessage = useStore((state)=> state.newChatMessage)
    const newOnlineUser = useStore((state)=> state.newOnlineUser)
    const offlineUser = useStore((state)=> state.offlineUser)
    // Socket Connection and subscribing room
    function socketConnection(){
   
        socket.on('connect',async function () {
            console.log('connected to sockets');
            socket.emit("join", { jwt });
        });
    }

   

    // these are the functions which give me data from sockets

    // for online users
    socket.on(`online`, (user) => {
        newOnlineUser(user)

    })
    // for offline users
    socket.on(`offline`, (user) => {
        offlineUser(user)
    })




    // for new Message
    // story
    socket.on(org_oneid.toString(), async(msg) => {
        
        try {
            
            const id = msg.storyId
            const response = await conversationApi.singleStory(id)
            if(response.status === 200){

                const data = response.data
                appendingNewMessage(msg)
                playSound()
                newSocketStory(data)
            }
            
            
        } catch (error) {
            console.error('Error in event listener:', error);
        }
    });


    // conversation

    const appendingNewMessage = async(msg)=>{
        try{
            const id = msg._id
            if(msg.attachments){
    
                const response = await conversationApi.getAttachments(id)
                const result = response.data
                msg.attach_file = result 
                newChatMessage(msg)
                
            }else{
                
                newChatMessage(msg)
            }
        }
        catch(err){
            console.log(err)
        }
    }


    


    // return things which can be use in another files 
    
    return{
        socketConnection
    }
    
}

export default useSocketConnection
