import useStore from "../../store/store"

const useConversationHelper = () =>{
    const newSocketStory =  useStore((state) => state.addToStoryFromSocketData)

    return { newSocketStory }
}

export default useConversationHelper