import { useState } from "react";

const useMultiChat = () =>{
    const mutliChatType = ['all', 'unassigned', 'unanswered'];
    const [selectMutliChatType, setSelectMultiChatType] = useState('all')
    const [data, setData] = useState([])

    const handleMutliChatType =  (messageType) => {
        setSelectMultiChatType(messageType);
        switch (messageType) {
            case 'all':
              getAll()
              break;
            case 'unassigned':
              getAllUnassined()
              break;
            case 'unanswered':
              getAllUnanswerd()
              break;
            
                // Add additional cases for other message types if needed
            default:
               
              break;
        }
    }

    return { 
        mutliChatType, selectMutliChatType,data,
        handleMutliChatType
        

    }

}

export default useMultiChat