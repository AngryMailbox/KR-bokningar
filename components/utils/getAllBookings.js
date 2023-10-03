import dateConvert from "./dateconvert.js";

export const getAllBookings = (bookings) => {
    const currentDate = new Date();

    // Filter out bookings where the end time (sluttid) has passed and have the same "Rumkod" as "roomCode"
    const upcomingBookings = bookings.filter((booking) => {
        const endDate = new Date(dateConvert(booking.Sluttid._, booking.Slutdatum._));
        return endDate > currentDate;
    });
    return upcomingBookings;
};