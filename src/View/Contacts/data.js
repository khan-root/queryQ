import { BsEnvelopeFill, BsWhatsapp } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
// import { RiWhatsappLine } from 'react-icons/ri'


export const contactIcons = [
    {id: 1, icon: <BsWhatsapp /> , name: 'Whatsapp', tap_inbox_id: 16 ,bg: '#C9FFDE', iColor: '#55CD6C'},
    {id: 2, icon: <FaFacebookF /> , name: 'Facebook', tap_inbox_id: 13,bg: '#DBEFFF', iColor: '#3B5998'},
    {id: 3, icon: <BsEnvelopeFill /> , name: 'Email', tap_inbox_id: 12,bg: '#FFECEC', iColor: '#F65F7C'},
    {id: 4, icon: <FaInstagram /> , name: 'Instagram', tap_inbox_id: 0,bg: '#FDEEC1', iColor: '#FD9A00'},
    {id: 5, icon: <FaTwitter /> , name: 'Twitter',  tap_inbox_id: 0,bg:'#CBEFFF', iColor: '#03A9F4'},
]