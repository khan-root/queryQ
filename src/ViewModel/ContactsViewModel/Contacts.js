import contactsApi from "../../Model/Data/Contact/contact"

const contactsViewModal = (set, get)=>({
    allConatcts: '',

    whatsAppContacts : [],
    nextContactsUrl: '',
    originalWhatsappContact: [],

    contactGroups: [],
    orignailcontactGroups: [],

    allEmails: '',
    emailContacts: [],

    allFaceBook: '',
    facebookContacts:[],

    allInsta: '',
    instaContacts:[],

    allTwitter: '',
    twitterContacts:[],

    allGroupsLinks: [],


    // contacts in group

    groupContacts:[],

    fbGroup:[],
    waGroup:[],
    instaGroup:[],
    twitterGroup:[],
    emailGroup:[],



    
    getAllContacts : async()=>{
        try{
            const response = await contactsApi.getAllContacts()
            const data = response.data
            const allData = data.getting_all_the_data
            console.log('getAllContacts', response)
            set({allConatcts : allData.length})
        }catch(err){
            console.log(err)
        }
    },

    getAllWhatsAppContacts : async()=>{
        try{
            const response = await contactsApi.getWhatsAppContacts()
            const data     = await response.data
            const result   = await data.contacts
            const loadmore = await data.next
            const path     = new URL(loadmore).pathname + new URL(loadmore).search;
    
            console.log(result)
            set({whatsAppContacts: result, originalWhatsappContact: result})
            // set({whatsAppContacts: result})
            set({ nextContactsUrl: path})
        }catch(err){
            console.log(err)
        }


    },
    getNextWhatsAppContacts: async()=>{
        try{
            const nextContactsUrl = get().nextContactsUrl;
            const response = await contactsApi.getNextWhatsAppContacts(nextContactsUrl)
            const data     = await response.data
            const result   = await data.contacts
            const loadmore = await data.next
            const path     = new URL(loadmore).pathname + new URL(loadmore).search;
            const updateAllWhatsAppContacts = [...get().whatsAppContacts, ...result]; // Append new data to existing allStories array

            set({ whatsAppContacts: updateAllWhatsAppContacts, originalWhatsappContact: updateAllWhatsAppContacts});
            set({ nextContactsUrl: path})
        }catch(err){
            console.log(err)
        }
    },

    getAllGroups: async()=>{
        try{
            const response = await contactsApi.getAllContactGroups()
            const data = await response.data 
            const result = data.getting_all_the_data
            console.log(response)
            set({contactGroups: result, orignailcontactGroups: result})
        }catch(err){
            console.log(err)
        }
    },
    getAllEmailContacts : async()=>{
        try{
            const response = await contactsApi.getEmailContacts()
            const data     = await response.data
            const result   = await data.getting_all_the_data
    
        
            set({emailContacts: result})
        }catch(err){
            console.log(err)
        }


    },
    getAllEmails : async()=>{
        try{
            const response = await contactsApi.getEmailContacts()
            const data     = await response.data
            const result   = await data.getting_all_the_data
    
        
            
            set({allEmails: []})
        }catch(err){
            console.log(err)
        }


    },

    getAllFacebookContacts : async()=>{
        try{
            set({facebookContacts: []})
            set({allFaceBook: ''})
        }catch(err){
            console.log(err)
        }
    },


    getAllInstaContacts : async()=>{
        try{
            set({instaContacts: []})
            set({allInsta: ''})
        }catch(err){
            console.log(err)
        }
    },

    getAllTwitterContacts : async()=>{
        try{
            set({twitterContacts: []})
            set({allTwitter: ''})
        }catch(err){
            console.log(err)
        }
    },

    getAllGorupContactsLink : async()=>{
        try{
            const response = await contactsApi.getGroupContactGroupsLink()
            
            const data     = await response.data
            const result   = await data.getting_all_the_data
            console.log('result',result)
    
        
            
            set({allGroupsLinks: result})
        }catch(err){
            console.log(err)
        }


    },
    newContactLink :(data)=>{

        set({allGroupsLinks:[...new Set([...get().allGroupsLinks, data])]})
    },

    // real time crud


    addGroup: (newGroup)=>{
        set({contactGroups:[...new Set([...get().contactGroups, newGroup])]})
    },

    deleteGroup: (id)=>{
        set({
            contactGroups: get().contactGroups.filter(group => group._id !== id)
        })
    },


    

    contactGroupHandler:async(id)=>{
        // set({groupContacts:[]})
        try{

            const response = await contactsApi.getGroupContacts(id)
            const data = await response.data 
            console.log(response)
            
            set({groupContacts: data})
        }catch(err){
            console.log(err)
        }

    },
    removeMemberFromGroup:(id)=>{
        const groupContacts = get().groupContacts;
        const updatedContacts = groupContacts.groups.contacts.filter((contact) => contact._id !== id);

        set({
            groupContacts: {
            ...groupContacts,
            groups: {
                ...groupContacts.groups,
                contacts: updatedContacts,
            },
            },
        });

    },

    addContactToGroup:(data)=>{
        const existingContacts = get().groupContacts.groups.contacts || [];

        const updatedContacts = [...existingContacts, data];
        set({
            groupContacts: {
                ...get().groupContacts,
                groups: {
                    ...get().groupContacts.groups,
                    contacts: updatedContacts,
                },
            },
        });
        console.log('gggggg',get().groupContacts)
    },
    searchHandler: async(name)=>{
        
        if (name === '') {
            set({ whatsAppContacts: get().originalWhatsappContact });
        
        }else{
            try {
                const response = await contactsApi.getSearchContacts(name)
                
                const data = response.data 
                const result = data.results

                if (response.status === 200 ) {
                    if(data.STATUS === "SUCCESSFUL"){

                        set({ whatsAppContacts: result });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
            
        
    },
    searchGroup: async(name)=>{
        if (name.trim() === '') {
            // If the search input is empty, restore original campaign data
            set({ contactGroups: get().orignailcontactGroups });
        } else {
            const lowercaseName = name.toLowerCase();
            
            const matchedContactGroups = get().orignailcontactGroups.filter(group =>
                group.name.toLowerCase().includes(lowercaseName)
            );

           
            if (matchedContactGroups.length === 0) {
                set({contactGroups: []})
                try {
                   const response = await contactsApi.getSearchGroup(name)
                    const data = await response.data 
                    const result = data.results

                    if (response.status === 200 && result.STATUS === "SUCCESSFULL") {
                        set({ contactGroups: result });
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                set({ contactGroups: matchedContactGroups });
            }
        }
    },

    deleteContact:(id)=>{
        set({
            whatsAppContacts: get().whatsAppContacts.filter(contact => contact._id !== id)
        })
    },
    updateContact:(data)=>{
        set({
            whatsAppContacts: get().whatsAppContacts.map((contact) => contact._id === data._id ? data :  contact)
        })
    },
    updateQuickReply: (updatedQuickReply)=>{
       console.log('in main conversation',updatedQuickReply)
        set({
            QuickReplies: get().QuickReplies.map((quickReply) => quickReply._id === updatedQuickReply._id ? updatedQuickReply :  quickReply)
        })
    },

    // searchHandler: async(name)=>{
    //     try{

    //         const response = await ;
    //         const data = response.data;
    //         const result = data.results;
      
    //     }catch(err){

    //     }
    // }
    // searchGroup: async(name)=>{
    //     if (name.trim() === '') {
    //         // If the search input is empty, restore original campaign data
    //         set({ contactGroups: get().orignailcontactGroups });
    //     } else {
    //         const lowercaseName = name.toLowerCase();
            
    //         const matchedContactGroups = get().orignailcontactGroups.filter(group =>
    //             group.name.toLowerCase().includes(lowercaseName)
    //         );

           
    //         if (matchedContactGroups.length === 0) {
    //             set({contactGroups: []})
    //             try {
    //                const response = await contactsApi.getSearchGroup(name)
    //                 const data = await response.data 
    //                 const result = data.results

    //                 if (response.status === 200 && result.STATUS === "SUCCESSFULL") {
    //                     set({ contactGroups: result });
    //                 }
    //             } catch (err) {
    //                 console.log(err);
    //             }
    //         } else {
    //             set({ contactGroups: matchedContactGroups });
    //         }
    //     }
    // }
    

})

export default contactsViewModal;