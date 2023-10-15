import {devtools } from 'zustand/middleware'
import conversationViewModal from '../ViewModel/ConversationViewModel/Conversation';
import teamViewModal from '../ViewModel/TeamViewModal/Team';
import { create } from 'zustand';
import contactsViewModal from '../ViewModel/ContactsViewModel/Contacts';
import assignmentViewModal from '../ViewModel/AssignmentsViewModel/Assignments';
import boradcastViewModal from '../ViewModel/BraodcastViewModel/Broadcast';
import dashboardViewModel from '../ViewModel/DashboardViewModel/Dashboard';
import offCanvasServices from '../Utils/offCanvasServices';
const useStore = create(devtools((set, get)=>({
    ...dashboardViewModel(set, get),
    ...conversationViewModal(set, get),
    ...teamViewModal(set, get),
    ...contactsViewModal(set, get),
    ...assignmentViewModal(set, get),
    ...boradcastViewModal(set, get),
    ...offCanvasServices(set, get)
})))

export default useStore