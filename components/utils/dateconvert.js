const dateConvert = (tid, datum) => {
    // Input validation
    if (typeof tid !== 'string' || typeof datum !== 'string') {
        alert('Invalid input. Time and date must be of type string.');
    }

    // The booking time format is HH.MM
    let bookingStartTime = tid;
    let bookingStartDate = datum;



    // Substring the time to get the hours and minutes
    let [bookingStartHours, bookingStartMinutes] = bookingStartTime.split('.');

    // Pad hours and minutes with leading zeros if necessary
    bookingStartHours = bookingStartHours.padStart(2, '0');
    bookingStartMinutes = bookingStartMinutes.padStart(2, '0');

    const convertedDate = new Date(`${bookingStartDate}T${bookingStartHours}:${bookingStartMinutes}:00`);

    return convertedDate;
};

export default dateConvert;
