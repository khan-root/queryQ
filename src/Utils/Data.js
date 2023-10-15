import { Icons } from "../assets/Icons/icons";

export const socialIcons={
    facebook: {icon: Icons.FaceBook, color:'#3B5998' },
    email: {icon: Icons.EmailIcon, color: '#F65F7C' },
    whatsapp: {icon: Icons.WhatsApp, color: '#55CD6C' },
    twitter: {icon: Icons.Twitter, color: '#41A0F1' },
    instagram: {icon: Icons.Instagram, color: '#FD9A00' },
}

export const qStatus={
    all: {id: 1,statusIcon: Icons.EmailIcon, statusColor: '#32BECA', status: 0 },
    unread: {id: 2,statusIcon: Icons.BellIcon, statusColor: '#F65F7C' , status:2 },
    open: {id:3,statusIcon: Icons.ClockIcon, statusColor: '#3DA5F4', status: 0},
    hold: {id: 4,statusIcon: Icons.PauseCircleIcon, statusColor: '#FFC107', status: 1},
    close: {id: 5,statusIcon: Icons.CheckCircleIcon, statusColor: '#0ACF97', status: 3 },
}
export const qStatusOptions={
    snooze: {id: 1,statusIcon: Icons.BellIcon, statusColor: '#F65F7C' , status:2 },
    open: {id:2,statusIcon: Icons.ClockIcon, statusColor: '#3DA5F4', status: 0},
    hold: {id: 3,statusIcon: Icons.PauseCircleIcon, statusColor: '#FFC107', status: 1},
    close: {id: 4,statusIcon: Icons.CheckCircleIcon, statusColor: '#0ACF97', status: 3 },
}


export const colors = {
    high:{bg: '#FFD1DA', text: '#F65F7C'}, 
    medium:{bg: '#FFE5BC', text: '#FD9A00'}, 
    low:{bg: '#D0EBFF', text: '#3DA5F4'}, 
    
};
