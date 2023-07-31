const dateConvert = (tid, datum) => {
    // Input validation
    if (typeof tid !== 'string' || typeof datum !== 'string') {
        throw new Error('Invalid input. tid and datum must be strings.');
    }

    // The booking time format is HH.MM
    let bookingStartTime = tid;
    let bookingStartDate = datum;

    // Check for valid time format
    if (!/^\d{2}\.\d{2}$/.test(bookingStartTime)) {
        throw new Error('Invalid time format. Expected format: HH.MM');
    }

    // Substring the time to get the hours and minutes
    let [bookingStartHours, bookingStartMinutes] = bookingStartTime.split('.');

    // Pad hours and minutes with leading zeros if necessary
    bookingStartHours = bookingStartHours.padStart(2, '0');
    bookingStartMinutes = bookingStartMinutes.padStart(2, '0');

    const convertedDate = new Date(`${bookingStartDate}T${bookingStartHours}:${bookingStartMinutes}:00`);

    return convertedDate;
};

export default dateConvert;
