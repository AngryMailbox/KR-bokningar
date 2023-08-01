import dateConvert from "./dateconvert.js";

export const filterBookings = (bookings, roomCode) => {
    const currentDate = new Date();

    // Filter out bookings where the end time (sluttid) has passed and have the same "Rumkod" as "roomCode"
    const upcomingBookings = bookings.filter((booking) => {
        const endDate = new Date(dateConvert(booking.Sluttid._, booking.Slutdatum._));
        return endDate > currentDate && booking.Rum._ === roomCode;
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
