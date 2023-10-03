const dateConvert = (tid, datum) => {
    // Input validation
    if (typeof tid !== 'string' || typeof datum !== 'string') {
        alert('Invalid input. Time and date must be of type string.');
    }

    // The booking time format is HH.MM
    let bookingStartTime = tid;
    let bookingDate = datum;


    // If no point is present in the time, add one
    if (!bookingStartTime.includes('.')) {
        bookingStartTime = bookingStartTime.slice(0, 2) + '.' + bookingStartTime.slice(2);
    }


    // Substring the time to get the hours and minutes
    let [bookingHours, bookingMinutes] = bookingStartTime.split('.');

    // Pad hours and minutes with leading zeros if necessary
    bookingHours = bookingHours.padStart(2, '0');
    bookingMinutes = bookingMinutes.padStart(2, '0');

    const convertedDate = new Date(`${bookingDate}T${bookingHours}:${bookingMinutes}:00`);

    return convertedDate;
};

export default dateConvert;
