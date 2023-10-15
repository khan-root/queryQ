
import { colors, socialIcons } from "../../../Utils/Data";


const priorityMapping = {
    0: 'low',
    1: 'medium',
    2: 'high',
};
export function namesAlpha (userInfo, priority, channelIcon){
    const firstLetter = userInfo?.name.charAt(0).toUpperCase();
    const priorityName = priorityMapping[priority];
    const { bg: bgColor, text: textColor } = colors[priorityName] || { bg: '#ffffff', text: '#000000' };
    const iconData = socialIcons[channelIcon.label.toLowerCase()]; // Convert label to lowercase for case-insensitive matching
    if (!iconData) {
        return null; // Return null or a default icon if the label is not recognized
    }
    const { icon, color } = iconData;


    return{
        firstLetter,
        bgColor,
        textColor,
        icon,
        color,
    }
}

export function userNamesAlphas (userInfo, priority){
    const firstLetter = userInfo?.name.charAt(0).toUpperCase();
    const priorityName = priorityMapping[priority];
    const { bg: bgColor, text: textColor } = colors[priorityName] || { bg: '#ffffff', text: '#000000' };

    return{
        firstLetter,
        bgColor,
        textColor,
    }
}
export function priorityAlphas (priority){
    const priorityName = priorityMapping[priority];
    const { text: textColor } = colors[priorityName] || { text: '#000000' };

    const dropdownItems = Object.entries(priorityMapping)
    .filter(([key, name]) => name !== priorityName &&  key !== priority)
    .map(([key, name]) => ({
      name,
      key,
      color: colors[name]?.text || '#000000'
    }));

    return{
        textColor,
        priorityName,
        dropdownItems
    }
}

