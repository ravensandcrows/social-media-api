//Create the date endings i.e. 2nd 3rd 4th
const createDateSuffix = (date) => {
    let dateString = date.toString();

    // get last char of date string
    const lastCharacter = dateString.charAt(dateString.length - 1);

    if (lastCharacter === '1' && dateString !== '11') {
        dateString = `${dateString}st`;
    } 
    else if (lastCharacter === '2' && dateString !== '12') {
        dateString = `${dateString}nd`;
    } 
    else if (lastCharacter === '3' && dateString !== '13') {
        dateString = `${dateString}rd`;
    } 
    else {
        dateString = `${dateString}th`;
    }

    return dateString;
};

// formats + accepts timestamp, and an `options` object as parameters
module.exports = (timestamp,{ monthLength = 'short', dateSuffix = true } = {}) =>
{
    // create month object
    const months = {
        0: monthLength === 'short' ? 'Jan' : 'January',
        1: monthLength === 'short' ? 'Feb' : 'February',
        2: monthLength === 'short' ? 'Mar' : 'March',
        3: monthLength === 'short' ? 'Apr' : 'April',
        4: monthLength === 'short' ? 'May' : 'May',
        5: monthLength === 'short' ? 'Jun' : 'June',
        6: monthLength === 'short' ? 'Jul' : 'July',
        7: monthLength === 'short' ? 'Aug' : 'August',
        8: monthLength === 'short' ? 'Sep' : 'September',
        9: monthLength === 'short' ? 'Oct' : 'October',
        10: monthLength === 'short' ? 'Nov' : 'November',
        11: monthLength === 'short' ? 'Dec' : 'December',
    };
    const dateObj = new Date(timestamp);
    const monthFormat = months[dateObj.getMonth()];
    const dateOfMonth = dateSuffix ? createDateSuffix(dateObj.getDate()) : dateObj.getDate();
    const year = dateObj.getFullYear();
    let hour = dateObj.getHours() > 12 ? Math.floor(dateObj.getHours() - 12) : dateObj.getHours();

    // make midnight
    if (hour === 0) {hour = 12;}

    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
    
    // `am` or `pm`
    const meridiemOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';
    const timeStampFormat = `${monthFormat} ${dateOfMonth}, ${year} at ${hour}:${minutes} ${meridiemOfDay}`;

    return timeStampFormat;
};