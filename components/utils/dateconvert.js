const dateConvert = (tid, datum) => {

    if (tid === undefined || datum === undefined) return null;

    //the booking time format is HH.MM
    let bookingStartTime = tid
    let bookingStartDate = datum

    //substring the time to get the hours and minutes
    if (bookingStartTime.length < 5) bookingStartTime = "0" + bookingStartTime; //append 0 to string if it is less than 5 characters (fix for format H.MM)
    let bookingStartHours = bookingStartTime.substring(0, 2);
    let bookingStartMinutes = bookingStartTime.substring(3, 5);

    return new Date(bookingStartDate + "T" + bookingStartHours + ":" + bookingStartMinutes + ":00");
}

export default dateConvert;