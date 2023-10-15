import conversationApi from "../../Model/Data/Conversation/conversation";
import { showToast } from "../../Toaster/Toaster";

const conversationViewModal = (set, get)=>({

    allStories:[],
    orignalStories:[],
    nextAllStoriesUrl: '',
    allUnassignedStories: [],
    nextUnassignedStoriesUrl: '',
    allUnansweredStories: [],
    nextUnansweredStoriesUrl: '',
    allSnoozedStories: [],
    nextSnoozedStoriesUrl:'',
    lastAssign:{},
    chatInbox: [],
    chatStory: [],
    multiChatInbox: [],
    multiChatStory: [],
    loadMoreChatUrl: '',
    allOpenStories:[],
    nextOpenStoriesUrl:'',  
    allHoldStories: [],
    nextHoldStoriesUrl: '', 
    allCloseStories: [],
    nextCloseStoriesUrl:'',    
    allUnreadStories: [],
    nextUnreadStoriesUrl:'',    
    loading: true,
    showChat: false,
    openedTabs: [],

    loadMulitMoreChatUrl: '',
    QueryIndex: '',
    QueryIndexs: [],
    toggleStates: [],
    showDetails: false,

    scrollRef: true,


    QuickReplies:[],
    toggleState: '',
    fileType:'',
    allLabels:[],
    chatLables:[],
    orignalLabels:[],

     searchLabel: async (name) => {
        if (name === '') {
            // If the search input is empty, restore original labels data
            set({ allLabels: get().orignalLabels });
        } 
        else {
            const lowercaseName = name.toLowerCase();
            
            const matchedLabels = get().orignalLabels.filter(label =>
                label.label.toLowerCase().includes(lowercaseName)
            );

            
            set({ allLabels: matchedLabels });
            
        }
    },

       

    getAllStories: async()=>{
        try{
            const response = await conversationApi.getAllStory()
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length >0){
            const loadmore = await data.next
            const path     = new URL(loadmore).pathname + new URL(loadmore).search;
    
            set({ nextAllStoriesUrl: path})
            }
            set({allStories: result, orignalStories:result})
        }catch(err){
            console.log(err)
        }
    },
    fetchNextData : async ()=>{
        try{
            const nextAllStoriesUrl = get().nextAllStoriesUrl;
            const response = await conversationApi.getNextStories(nextAllStoriesUrl)
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length >0){
            const loadmore = await data.next
            const path     = new URL(loadmore).pathname + new URL(loadmore).search;
            set({ nextAllStoriesUrl: path})
        }
            const updatedAllStories = [...get().allStories, ...result]; // Append new data to existing allStories array
            set({ allStories: updatedAllStories });
        }catch(err){
            console.log(err)
        }
    },

    getUnassignedStories: async()=>{
        
        const response = await conversationApi.getUnassignedStory()
        const data     = await response.data
        const result   = await data.stories
        if(data.next && data.stories.length >0){
        const loadmore = await data.next
        const path     = new URL(loadmore).pathname + new URL(loadmore).search;
        set({ nextUnassignedStoriesUrl: path})
        }
        set({allUnassignedStories: result})
    },
    fetchNextUnassignedData : async ()=>{
        try{
            const nextUnassignedStoriesUrl = get().nextUnassignedStoriesUrl;
            const response = await conversationApi.getNextUnassignedStories(nextUnassignedStoriesUrl)
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length >0){
            const loadmore = await data.next
            const path     = new URL(loadmore).pathname + new URL(loadmore).search;
            set({ nextUnassignedStoriesUrl: path})
        }
            const updatedUnassignedStories = [...get().allUnassignedStories, ...result]; // Append new data to existing allStories array
            set({ allUnassignedStories: updatedUnassignedStories });
        }catch(err){
            console.log(err)
        }
    },



    getUnansweredStories: async()=>{
        try{
            const response = await conversationApi.getUnansweredStory()
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length >0){
            const loadmore = await data.next
            const path     = new URL(loadmore).pathname + new URL(loadmore).search;
            set({ nextUnansweredStoriesUrl: path})
            }
            set({allUnansweredStories: result})
        }catch(err){
            console.log(err)
        }
    },
    fetchNextAnsweredData : async ()=>{
        try{
            const nextUnansweredStoriesUrl = get().nextUnansweredStoriesUrl;
            const response = await conversationApi.getNextUnansweredStories(nextUnansweredStoriesUrl)
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories>0){

                const loadmore = await data.next
                const path     = new URL(loadmore).pathname + new URL(loadmore).search;
                set({ nextUnansweredStoriesUrl: path})
            }
            const updatedUnansweredStories = [...get().allUnansweredStories, ...result]; // Append new data to existing allStories array

            set({ allUnansweredStories: updatedUnansweredStories });
        }catch(err){
            console.log(err)
        }
    },

    getSnoozedStories: async()=>{
        try{
            const response = await conversationApi.getSnoozedStory()
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length > 0){

                const loadmore = await data.next
                
                const path     = new URL(loadmore).pathname + new URL(loadmore).search;
                set({ nextSnoozedStoriesUrl: path})
            }
    
            set({allSnoozedStories: result})
        }catch(err){console.log(err)}
    },
    getOpenStories: async()=>{
        try{
            const response = await conversationApi.getOpenStory()
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length > 0){

                const loadmore = await data.next
                
                const path     = new URL(loadmore).pathname + new URL(loadmore).search;
                set({ nextOpenStoriesUrl: path})
            }
    
            set({allOpenStories: result})
        }catch(err){console.log(err)}
    },
    fetchNextOpenData : async ()=>{
        try{
            const nextOpenStoriesUrl = get().nextOpenStoriesUrl;
            const response = await conversationApi.getNextOpenStories(nextOpenStoriesUrl)
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length >0){

                const loadmore = await data.next
                const path     = new URL(loadmore).pathname + new URL(loadmore).search;
                set({ nextOpenStoriesUrl: path})
            }
            const updatedOpenStories = [...get().allOpenStories, ...result]; // Append new data to existing allStories array

            set({ allOpenStories: updatedOpenStories });
        }catch(err){
            console.log(err)
        }
    },
    getHoldStories: async()=>{
        try{
            const response = await conversationApi.getHoldStory()
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length >0){
            const loadmore = await data.next
            
            const path     = new URL(loadmore).pathname + new URL(loadmore).search;
            set({ nextHoldStoriesUrl: path})
            }
            set({allHoldStories: result})
        }catch(err){console.log(err)}
    },
    fetchNextHoldData : async ()=>{
        try{
            const nextHoldStoriesUrl = get().nextHoldStoriesUrl;
            const response = await conversationApi.getNextHoldStories(nextHoldStoriesUrl)
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length >0){
            const loadmore = await data.next
            const path     = new URL(loadmore).pathname + new URL(loadmore).search;
            set({ nextHoldStoriesUrl: path})
            }
            const updatedHoldStories = [...get().allHoldStories, ...result]; // Append new data to existing allStories array

            set({ allHoldStories: updatedHoldStories });
        }catch(err){
            console.log(err)
        }
    },
    getCloseStories: async()=>{
        try{
            const response = await conversationApi.getCloseStory()
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length >0){
            const loadmore = await data.next
            
            const path     = new URL(loadmore).pathname + new URL(loadmore).search;
            set({ nextCloseStoriesUrl: path})
            }
            set({allCloseStories: result})
        }catch(err){console.log(err)}
    },
    fetchNextCloseData : async ()=>{
        try{
            const nextCloseStoriesUrl = get().nextCloseStoriesUrl;
            console.log(nextCloseStoriesUrl)
            const response = await conversationApi.getNextCloseStories(nextCloseStoriesUrl)
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length >0){
            const loadmore = await data.next
            const path     = new URL(loadmore).pathname + new URL(loadmore).search;
            set({ nextCloseStoriesUrl: path})
        }
        const updatedCloseStories = [...get().allCloseStories, ...result]; // Append new data to existing allStories array
            set({ allCloseStories: updatedCloseStories });
        }catch(err){
            console.log(err)
        }
    },
    getUnreadStories: async()=>{
        try{
            const response = await conversationApi.getUnreadStory()
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length >0){
            const loadmore = await data.next
            
            const path     = new URL(loadmore).pathname + new URL(loadmore).search;
            set({ nextUnreadStoriesUrl: path})
            }
            set({allUnreadStories: result})
        }catch(err){console.log(err)}
    },
    fetchNextUnreadData : async ()=>{
        try{
            const nextUnreadStoriesUrl = get().nextUnreadStoriesUrl;
            const response = await conversationApi.getNextUnReadStories(nextUnreadStoriesUrl)
            const data     = await response.data
            const result   = await data.stories
            if(data.next && data.stories.length > 0){

                const loadmore = await data.next
                const path     = new URL(loadmore).pathname + new URL(loadmore).search;
                set({ nextUnreadStoriesUrl: path})
            }
            const updatedUnreadStories = [...get().allUnreadStories, ...result]; // Append new data to existing allStories array

            set({ allUnreadStories: updatedUnreadStories });
        }catch(err){
            console.log(err)
        }
    },

    chatInboxHandler : async (id, i)=>{
        try{
            set({chatInbox: []})
            set({toggleState: id})
            set({QueryIndex: i})
            set({showDetails : false})
            set({lastAssign: {}})
            set({chatLables: []})
            const response =  await conversationApi.getUserChat(id)
            const data = response.data
            const chatRes = data.chat
            const storyRes = data.story
            const labelResponse =  await conversationApi.getChatLabels(id)
            const labelData = labelResponse.data
            console.log('chats', get().chatInbox)
            set({chatLables: labelData})           
            if(data.next){
                const loadmore = await data.next
                const path     = new URL(loadmore).pathname + new URL(loadmore).search;
                set({loadMoreChatUrl:path})
            }
            const reversedChatInbox = chatRes.reverse();
            set({ chatInbox: reversedChatInbox });
            set({chatStory:storyRes})
            set({lastAssign: storyRes.assigneToList[storyRes.assigneToList.length - 1]})
            set({showChat: true})

            
        }catch(err){
            console.log(err)
        }     
    },
    
    gettingAllLabels: async()=>{
        try{
            const response = await conversationApi.getAllLabels()
            const data = response.data 
            set({allLabels: data.labels, orignalLabels:data.labels})         
        }catch(err){
            console.log(err)
        }
    },

    multiChatInboxHandler: async (id, i) => {
        try {
            set({toggleStates : [...new Set([...get().toggleStates || [], id])]})
            set({QueryIndexs : [...new Set([...get().QueryIndexs || [], {i: i, id:id}])]})

            const openedTabs = get().openedTabs;
            if (openedTabs.includes(id)) {
            return;
            }

            const response = await conversationApi.getUserChat(id);
            const data = response.data;
            if (data.next) {
            const loadmore = await data.next;
            const path = new URL(loadmore).pathname + new URL(loadmore).search;

            set({ loadMulitMoreChatUrl: path });
            }

            set((prevState) => {
                const existingChat = prevState.multiChatInbox[id] || [];
                const reversedChat = data.chat.slice().reverse();
                const updatedChat = [...existingChat, { ...data, chat: reversedChat }];

                return {
                    multiChatInbox: {
                    ...prevState.multiChatInbox,
                    [id]: updatedChat,
                    },
                    showChat: true,
                };
            });
            set((prevState) => ({
                openedTabs: [...prevState.openedTabs, id],
            }));
        } catch (err) {
            console.log(err);
        }
    },





    removeChatFromMutli:(id)=>{

        set({toggleStates: get().toggleStates.filter(toggle => toggle !== id)})
        set({QueryIndexs: get().QueryIndexs.filter(index => index.id !== id)})

        set((prevState) => {
            const updatedMultiChatInbox = { ...prevState.multiChatInbox };
            delete updatedMultiChatInbox[id];
            const updatedTabopened = prevState.openedTabs.filter((item) => item !== id);
            return {
                multiChatInbox: updatedMultiChatInbox,
                openedTabs: updatedTabopened,
            };
        });

        
    },
    
    loadMoreChat : async () => {
        try {
            const loadMoreChatUrl = get().loadMoreChatUrl;
            if (!loadMoreChatUrl) {
            return;
            }

            
            const response = await conversationApi.getMoreChat(loadMoreChatUrl);
            const data = await response.data;
            const result = await data.chat;
            set({loading: false})
            

            if (data.next) {
                set({loading: true})
            const loadmore = await data.next;
            const path = new URL(loadmore).pathname + new URL(loadmore).search;
            set({ loadMoreChatUrl: path });
            } else {
            set({ loadMoreChatUrl: null }); // No more next URL available, set it to null
            }
          
            const updatedAllChatStories = [...result.reverse(), ...get().chatInbox];
            set({ chatInbox: updatedAllChatStories });

           
            
        }catch (err) {
            console.log(err);
        }
    },

    
    loadMultiChatMore : async (id) => {
        try {
            const loadMoreChatUrl = get().loadMulitMoreChatUrl;
            if (!loadMoreChatUrl) {
            return;
            }


            const response = await conversationApi.getMoreChat(loadMoreChatUrl);
            const data = await response.data;
            const result = await data.chat;
            // console.log(result)

            if (data.next) {
                const loadmore = await data.next;
                const path = new URL(loadmore).pathname + new URL(loadmore).search;
                set({ loadMulitMoreChatUrl: path });
                // console.log(loadmore)
            } else {
            set({ loadMulitMoreChatUrl: null }); // No more next URL available, set it to null
            }

            const updatedChat = { ...get().multiChatInbox };
            const chatResult = updatedChat[id];
            const moreChat = chatResult.map((data) => data.chat);
            const mergedChat = [...result.reverse(), ...moreChat[0]]
            // console.log('mergedChat',mergedChat)
            const updatedChatResult = chatResult.map((data, index) => ({
                ...data,
                chat: index === 0 ? mergedChat : data.chat,
            }));
                const updatedMultiChatInbox = {
                ...updatedChat,
                [id]: updatedChatResult,
            };


            
            set({multiChatInbox : updatedMultiChatInbox})
            

    
            
        }catch (err) {
            console.log(err);
        }
    },

    getQuickReplies:async()=>{
        const response = await conversationApi.getAllQuickReplies()
        const result = response.data 
        const [data] = result.data;
        const messages = data.message;
        set({QuickReplies: messages})
        // console.log(messages)
    },
    newQuickReply:(newQuickResponse)=>{
        set({QuickReplies : [...new Set([...get().QuickReplies, newQuickResponse])]})
    },
    deleteQuickReply: (id)=>{
        set({
            QuickReplies: get().QuickReplies.filter(quickReply => quickReply._id !== id)
        })
    },
    updateQuickReply: (updatedQuickReply)=>{
       console.log('in main conversation',updatedQuickReply)
        set({
            QuickReplies: get().QuickReplies.map((quickReply) => quickReply._id === updatedQuickReply._id ? updatedQuickReply :  quickReply)
        })
    },


    detailsShowHandler:()=>{
        set({showDetails: true})
    },
    detailsHideHandler:()=>{
        set({showDetails: false})
    },
    scrollRefTrueHandler:()=>{
        set({scrollRef: true})
    },
    scrollRefFalseHandler:()=>{
        set({scrollRef: false})
    },

    togglePriority:(i, data)=>{ 
        const stories = get().allStories
        const chatStory = get().chatStory
        const userStoryId = data._id
        const newPriorityData = stories.find((story) => story._id === userStoryId);
        if (newPriorityData) {
            newPriorityData.priority = i;

            const updatedAllStories = stories.map((story) =>
                story._id === userStoryId ? newPriorityData : story
            );
            console.log('chatStory',chatStory)
      

            set({ allStories: updatedAllStories });
            set({ chatStory: newPriorityData });
    }
        
    },
    toggleStatus:(i, data)=>{ 
            
        const updatedAllStories = get().allStories.map((story) =>
            story._id === i ? { ...story, status: data.status } : story
        );

        set({ allStories: updatedAllStories });

    },
    updateStoryMessage:(id, data)=>{ 
            
        const updatedAllStories = get().allStories.map((story) =>
            story._id === id ? { ...story, lastMessage: data} : story
        );

        set({ allStories: updatedAllStories });

    },
    setFileType:(fileType)=>{
        set({fileType: fileType})
        
    },
    updateAssignList:(data)=>{
        // const updatedAllStories = get().allStories.map((story) =>
        // story._id === id ? { ...story, assigneToList:[...story.assigneToList, data] } : story
        // );
        
        // console.log('allStories',updatedAllStories)
        set({ lastAssign: data });


    },
    updateConAssignMessage:(data)=>{
        set({chatInbox : [...new Set([...get().chatInbox, data])]})

    },
    newLabel:(data)=>{
        set({allLabels: [...new Set([...get().allLabels, data])]})
    },
    removeLabel:(id)=>{
        set({
            allLabels: get().allLabels.filter(label => label._id !== id)
        })
    },
    
    updateLabel:(labelData)=>{
         set({
            allLabels: get().allLabels.map((label) => label._id === labelData._id ? labelData :  label)
        })
       
    },
    removeChatAssignLabel:(id)=>{
        set({
            chatLables: get().chatLables.filter(chatLabel => chatLabel._id !== id)
        })
    },
    assignLabelToChat:(label)=>{
        set({chatLables: [...new Set([...get().chatLables, label])]})

        // console.log(get().chatLables)
        // console.log(label)
    },

    searchStory: async (name) => {
        if (name.trim() === '') {
            // If the search input is empty, restore original stories data
            set({ allStories: get().orignalStories });
        } else {
        const lowercaseName = name.toLowerCase();
        
        const matchedStories = get().orignalStories.filter(story =>
            story.initiatorContactId.name.toLowerCase().includes(lowercaseName)
        );

        if (matchedStories.length === 0) {
            set({allStories: []})
            try {
                const response = await conversationApi.searchStory(name);
                const result = response.data;
                console.log(response);

                if (response.status === 200) {
                    set({ allStories: result.stories});
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            set({ allStories: matchedStories });
        }
        }
    },
    clearAllChat:()=>{
        set({multiChatInbox: []})
        set({openedTabs: []})
        set({toggleStates: []})
        set({QueryIndexs: []})
    },

    // from sockets story
    addToStoryFromSocketData : (data)=>{
        const allStories = get().allStories
        const existingIndex = allStories.findIndex((item) => item._id === data._id);

        if (existingIndex !== -1) {
            // If the object exists, replace and move it to the top
            const updatedStories = [...allStories];
            updatedStories.splice(existingIndex, 1); // Remove the existing object
            updatedStories.unshift(data); // Add the data object to the top

            set({allStories: updatedStories})
        } else {
            // Add the data object to the top
            set({allStories: [...new Set([data, ...get().allStories])]})
            
            
        }
    
    

    },
    // from sockets conversation
    newChatMessage:(msg)=>{
        const existStory = get().chatInbox[0]?.storyId === msg.storyId;
        if(existStory){
            set({chatInbox: [...new Set([...get().chatInbox, msg])]})
        }

    }
})



export default conversationViewModal