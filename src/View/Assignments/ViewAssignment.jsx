import { BsClock, BsFileEarmarkText, BsWhatsapp } from 'react-icons/bs'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { AiOutlineCalendar, AiOutlineCheck, AiOutlineClockCircle } from 'react-icons/ai'
import useAssignment from '../../ViewModel/AssignmentsViewModel/assignmentsServices'
import { BiNetworkChart } from 'react-icons/bi'
import { FaLocationDot } from 'react-icons/fa6'
import { FaFacebookF } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { IoShareSocialOutline } from 'react-icons/io5'



const ViewAssignment = (props) => {

    const {data} = props 
    const {allRules} = useAssignment()
    const groupedData = {};

    allRules.forEach(item => {
        if (!groupedData[item.condition_type]) {
            groupedData[item.condition_type] = [];
        }
        groupedData[item.condition_type].push(item);
    });
    // console.log('Time Base',groupedData.TIME_BASED)

    const transformedData = {};

if (groupedData.TIME_BASED) {
    const timeData = groupedData.TIME_BASED[0].conditions.all;

    // Define a function to convert values to time or days
    function convertToTimeOrDay(value, fact) {
        if (fact === 'hour') {
            const hour = value % 12 || 12; // Get the hour in 12-hour format
            const period = value < 12 ? 'AM' : 'PM'; // Determine 'AM' or 'PM'
            // const minutes = padStart(2, '0'); // Ensure minutes have leading zeros
            return `${hour} ${period}`;
        } 
        else if (fact === 'dow') {
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return daysOfWeek[value];
        } else {
            return value;
        }
    }
    timeData.forEach((item, index) => {
        transformedData[index] = {
            
            day: item.fact === 'dow' ? convertToTimeOrDay(item.value, item.fact) : null,
            time: item.fact === 'hour' ? convertToTimeOrDay(item.value, item.fact) : null,
        };
    });
    // console.log('transformedData',transformedData)
    // console.log('timeData',timeData)

    // Use forEach to fill the object with key-value pairs
    // timeData?.reduce((result, item, index) => {
    //         result[index] = {
    //             value: item.value,
    //             time: convertToTimeOrDay(item.value, item.fact),
    //         };
    //         return result;
    //     }, {});
    // console.log(timeData)
}
// console.log(transformedData)

    // if(groupedData.TIME_BASED){

    //     const timeData = groupedData.TIME_BASED[0].conditions.all 
    //     function convertToTimeOrDay(value, fact) {
    //     if (fact === 'hour') {
    //         return `${value}:00`;
    //     } else if (fact === 'dow') {
    //         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //         return daysOfWeek[value];
    //     } else {
    //         return value;
    //     }
    // }

    //     const transformedData = timeData?.reduce((result, item, index) => {
    //         result[index] = {
    //             value: item.value,
    //             time: convertToTimeOrDay(item.value, item.fact),
    //         };
    //         return result;
    //     }, {});
    // }
    
    let countryCode = ''
    if(groupedData.COUNTRY_BASED){
        const countryData = groupedData?.COUNTRY_BASED[0]?.conditions.all[0]?.value
        countryCode = countryData
    }


    let channelName = '';
    let channelIcon = <IoShareSocialOutline />;

    if (groupedData.CHANNEL_BASED) {
        const channelMapping = {
            wa: { name: 'WhatsApp', icon: <BsWhatsapp /> },
            fb: { name: 'Facebook', icon: <FaFacebookF /> },
            gm: { name: 'Gmail', icon: <SiGmail /> },
        };
        const channelData = groupedData.CHANNEL_BASED[0]?.conditions.all[0]?.value;

        if (channelData) {
            const channelInfo = channelMapping[channelData];
            if (channelInfo) {
                channelName = channelInfo.name;
                channelIcon = channelInfo.icon;
            }
        }
    }

    let priorityLabel = ''
    let priorityColor = '#495057'
    // 

    if (groupedData.PRIORITY_BASED) {
         const priorityMapping = {
        0: { label: 'Low', color: '#3DA5F4' },
        1: { label: 'Medium', color: '#FD9A00' },
        2: { label: 'High', color: '#F65F7C' },
    };
    const priorityData =  groupedData?.PRIORITY_BASED[0]?.conditions.all[0]?.value

        if (priorityData) {
            const priortylInfo = priorityMapping[priorityData];
            if (priortylInfo) {
                priorityLabel = priortylInfo.label;
                priorityColor = priortylInfo.color;
            }
        }
    }
  

    const tempData = [
        {
            condition:{
                type: 'Time base',
                icon:<AiOutlineClockCircle />
            },
            data:[
                { title: 'Start day of Week', time: transformedData[2], icon: <AiOutlineCalendar />},
                { title: 'End Day of Week', time: transformedData[3], icon: <AiOutlineCalendar />},
                { title: 'Start Time', time: transformedData[0], icon: <BsClock />},
                { title: 'End Time', time: transformedData[1], icon: <BsClock />},
            ]
            
        },
         {
            condition:{
                type: 'Priority base',
                icon:<AiOutlineCheck />
            },
            data:[
                { title: 'Priority', desc: priorityLabel  , icon: <AiOutlineCheck />, color:priorityColor},
                
            ]
            
        },
        {
            condition:{
                type: 'Country base',
                icon:<FaLocationDot />
            },
            data:[
                { title: 'Country Code', desc: countryCode  , icon: <AiOutlineCalendar />},
                
            ]
            
        },
        {
            condition:{
                type: 'Channel base',
                icon: <BiNetworkChart />
            },
            data:[
                { title: 'Channel', desc: channelName  , icon: channelIcon},
                
            ]
            
        },
       
        
        

    ]

    console.log('tempData',tempData)
    // const tempData = [
    //     {id:1, title: 'Rule', desc: 'keptua_full_time', icon: <BsFileEarmarkText />},
    //     {id:2, title: 'Team', desc: 'Keptua(DO NOT DELETE)', icon: <HiOutlineUserGroup />},
    //     {id:3, title: 'Start day of Week', desc: 'keptua_full_time', icon: <AiOutlineCalendar />},
    //     {id:4, title: 'End Day of Week', desc: 'Keptua(DO NOT DELETE)', icon: <AiOutlineCalendar />},
    //     {id:5, title: 'Start Time', desc: 'keptua_full_time', icon: <BsClock />},
    //     {id:6, title: 'End Time', desc: 'Keptua(DO NOT DELETE)', icon: <BsClock />},
    // ]
  return (
    <div className='viewAssignmentCanvas'>
        <div className='viewAssignmentHeader'>
            <div className='list'>
                <div className='listIcon'>
                    <span><BsFileEarmarkText /></span>
                </div>
                <div className='listDetail'>
                    <span className='title'>Rule</span>
                    <span className='desc'>{data.name}</span>
                </div>
            </div>
            <div className='list'>
                    <div className='listIcon'>
                        <span><HiOutlineUserGroup /></span>
                    </div>
                    <div className='listDetail'>
                        <span className='title'>Team</span>
                        <span className='desc'>{data.action_team}</span>
                    </div>
            </div>
        </div>
        {tempData.map((ele, i)=>(
        <>
        <div className='filterbased' key={i}>
            <div className='filterbasedHeader'>
                <span className='icon'>{ele.condition.icon}</span>
                <span className='title'>{ele.condition.type}</span>
            </div>

        </div>
        
        <div key={ele.id} className='filterbasedContainer'>
           
            {ele.data.map((data)=>(
                <div className='filterbasedContainerDetail'>
                    <div className='listIcon'>
                        <span>{data.icon}</span>
                    </div>
                    <div className='listDetail d-flex flex-column'>          
                        <span style={{color: '#495057', fontWeight:600}}>{data.title}</span>
                        <span  style={groupedData.PRIORITY_BASED ? {color: data.color, fontSize: '13px'}: {color: '#495057', fontSize: '13px'}}>{ data.desc || data.time ? data.desc || data.time.time || data.time.day: 'Not Specified'}</span>
                    </div>
                </div>
            ))}
        </div>
        </>
        ))}
    </div>
  )
}

export default ViewAssignment