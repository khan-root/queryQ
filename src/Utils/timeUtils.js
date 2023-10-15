import moment from "moment/moment";

// export const formatDateTime = (dayIndex, hourIndex) => {
//     if (dayIndex < 0 || dayIndex > 6 || hourIndex < 0 || hourIndex > 23) {
//     return 'Invalid date or time';
//   }

//   const dayOfWeek = moment().day(dayIndex).format('ddd');
//   const hourOfDay = hourIndex !== null && hourIndex >= 0 && hourIndex <= 23 ? moment().hour(hourIndex).format('ha') : '';
//   const formattedDateTime = `${dayOfWeek}, ${hourOfDay}`;
//   return formattedDateTime;
// };

export const formatDateTime = (timestamp) => {
  // Convert the Unix timestamp to a Moment.js object
  const momentObject = moment.unix(timestamp);

  // Format the Moment.js object to "ddd, ha" (e.g., "Mon, 9AM")
  const formattedDate = momentObject.format('ddd, ha');

  return formattedDate;
};