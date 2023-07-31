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


        return bookings;
    } catch (error) {
        throw new Error("Something went wrong.\n\n" + error);
    }
};

export default getBookings;
