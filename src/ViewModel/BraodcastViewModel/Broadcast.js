import broadcastApi from "../../Model/Data/Broadcast/Broadcast"
import templateApi from "../../Model/Data/Templates/Template"


const boradcastViewModal = (set, get)=>({
    allCampaign: [],
    broadcastMessages: [],
    showMessages: true,
    showCampaingsData : true,

    templates:[],
    campaignId: '',
    originalCampaigns: [],

    broadcastCanvas: false,

    showBroadcastCanvas:()=>{
        set({broadcastCanvas: true})
    },
    hideBroadcastCanvas:()=>{
        set({broadcastCanvas: false})

    },




    getAllCampaign: async()=>{
        try{
            const response = await broadcastApi.getAllCampaign()
            const result = response.data
            const data = result.campaign
            set({ allCampaign: data, originalCampaigns:data})
        }catch(err){
            console.log(err)
        }
    },
    addCampaign: (campaign)=>{
        set({allCampaign:[...new Set([...get().allCampaign, campaign])]})
        set({originalCampaigns:get().allCampaign})
    },
    getBroadcastMessages: async(id)=>{
        const response = await broadcastApi.getBroadcastMessages(id)
        const data = response.data 
        const result = data.broadcastMessage
        set({broadcastMessages: result})
    },
    hideBroadcastMessage:()=>{
        set({showMessages: false})
    },
    showBroadcastMessage:()=>{
        set({showMessages: true})
    },
    hideBroadcastData:()=>{
        set({showCampaingsData: false})
    },
    showBroadcastData:()=>{
        set({showCampaingsData: true})
    },

    allTemplates:async(tpId)=>{
        const response = await templateApi.getAllTemplates(tpId)
        const data = response.data 
        console.log(data)
        const result = data.waba_templates
        
        set({templates: result})
    },
    newBroadcastMessages:(newBroadcast)=>{
        set({broadcastMessages:[...new Set([...get().broadcastMessages, newBroadcast])]})
    },

    newCampaignId:(id)=>{
        set({campaignId: id})
    },

    deleteBroadcast:(id)=>{
        
        set((state) => ({
            allCampaign: state.allCampaign.map((campaign) =>
                campaign._id === id ? { ...campaign, deleted: true } : campaign
            )
        }))
        set({originalCampaigns: get().allCampaign})
    },
    searchCampaing: async (name) => {
        if (name.trim() === '') {
            // If the search input is empty, restore original campaign data
            set({ allCampaign: get().originalCampaigns });
        } else {
            const lowercaseName = name.toLowerCase();
            
            const matchedCampaigns = get().originalCampaigns.filter(campaign =>
                campaign.name.toLowerCase().includes(lowercaseName)
            );

            if (matchedCampaigns.length === 0) {
                set({allCampaign: []})
                try {
                    const response = await broadcastApi.searchBroadcast(name);
                    const result = response.data;
                    console.log(result);

                    if (response.status === 200 && result.STATUS === "SUCCESSFULL") {
                        set({ allCampaign: result.results });
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                set({ allCampaign: matchedCampaigns });
            }
        }
    }
})

export default boradcastViewModal