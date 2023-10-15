export const convertToTime = (timestamp) =>{
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds

    let hours = date.getHours(); // Get the hours (in 24-hour format)
    const minutes = date.getMinutes(); // Get the minutes

    let ampm = 'AM';
    if (hours >= 12) {
      ampm = 'PM';
      hours %= 12;
    }
    if (hours === 0) {
      hours = 12;
    }

    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return formattedTime;
  }


export const  formatTimestamp = (timestamp)=> {
  const date = new Date(timestamp * 1000); // Convert to milliseconds

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  return date.toLocaleString('en-US', options);
}