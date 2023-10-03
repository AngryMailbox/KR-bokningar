import xmlconverter from "./xmlconverter.js";
import dateConvert from "./dateconvert.js";
import convertToUtf8 from "./encoding.js";
import get from "./getarraybytes.js"


const getBookings = async () => {
    try {
        let data = await get('https://bi.krsystem.se/booking/KONF.XML');

        // Convert ISO-8859-1 bytes to UTF-8 string
        const utf8String = convertToUtf8(new Uint8Array(data));

        const jsonObj = xmlconverter(utf8String);

        let bookings = jsonObj?.X8162_Aktivitetsstudio_?.RADER?.RAD;
        bookings = bookings.sort((a, b) => {
            const dateA = dateConvert(a.Starttid._, a.Startdatum._);
            const dateB = dateConvert(b.Starttid._, b.Startdatum._);


            if (dateA < dateB) {
                return -1;
            } else if (dateA > dateB) {
                return 1;
            } else {
                return 0;
            }
        });


        //TODO: This also converts the hours and minutes to XX.XX format
        for (let i = 0; i < bookings.length; i++) {
            bookings[i].Starttid._ = dateConvert(bookings[i].Starttid._, bookings[i].Startdatum._).getHours() + '.' + dateConvert(bookings[i].Starttid._, bookings[i].Startdatum._).getMinutes();
            bookings[i].Sluttid._ = dateConvert(bookings[i].Sluttid._, bookings[i].Slutdatum._).getHours() + '.' + dateConvert(bookings[i].Sluttid._, bookings[i].Slutdatum._).getMinutes();


            // Pad hours and minutes with leading zeros if necessary before and after the '.' character
            bookings[i].Starttid._ = bookings[i].Starttid._.split('.').map((time) => time.padStart(2, '0')).join('.');
            bookings[i].Sluttid._ = bookings[i].Sluttid._.split('.').map((time) => time.padStart(2, '0')).join('.');
        }

        return bookings;
    } catch (error) {
        console.error("Error fetching bookings in getBookings.js:");
        throw new Error("Something went wrong.\n\n");
    }
};

/**
 * Returns today if the booking is today, tomorrow if the booking is tomorrow, and the date of the booking if it is any other day. 
 */
export const getBookingDay = (booking) => {
    const currentDate = new Date();
    const bookingDate = dateConvert(booking.Starttid._, booking.Startdatum._);
    if (currentDate.getDate() === bookingDate.getDate() && currentDate.getMonth() === bookingDate.getMonth() && currentDate.getFullYear() === bookingDate.getFullYear()) {
        return "Idag";
    }

    //Do the same for dates that are tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.getDate() === bookingDate.getDate() && tomorrow.getMonth() === bookingDate.getMonth() && tomorrow.getFullYear() === bookingDate.getFullYear()) {
        return "Imorgon";
    }

    else return booking.Startdatum._;
}

export default getBookings;
