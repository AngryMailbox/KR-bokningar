import dateConvert from "./dateconvert.js";

/**
 * Filter out bookings that have passed and have the same "Rumkod" as "roomCode"
 * @param {Array} bookings Array of bookings
 * @param {String} roomCode Room code
 * @returns {Array} Array of bookings that have the same "Rumkod" as "roomCode"
 */
export const filterBookings = (bookings, roomCode) => {
    const currentDate = new Date();

    // Filter out bookings where the end time (sluttid) has passed and have the same "Rumkod" as "roomCode"
    const upcomingBookings = bookings.filter((booking) => {
        const endDate = new Date(dateConvert(booking.Sluttid._, booking.Slutdatum._));
        return endDate > currentDate && booking.Rum._.toString() === roomCode.toString();
    });
    return upcomingBookings;
};

export const isOngoing = (bookings) => {
    if (bookings.length === 0) {
        return false;
    }

    const booking = bookings[0];

    const currentDate = new Date();

    const startTime = new Date(dateConvert(booking.Starttid._, booking.Startdatum._));
    const endTime = new Date(dateConvert(booking.Sluttid._, booking.Startdatum._));

    return startTime < currentDate && endTime > currentDate;
};

export const isOngoingBooking = (booking) => {
    const currentDate = new Date();

    const startTime = new Date(dateConvert(booking.Starttid._, booking.Startdatum._));
    const endTime = new Date(dateConvert(booking.Sluttid._, booking.Startdatum._));

    return startTime < currentDate && endTime > currentDate;
};