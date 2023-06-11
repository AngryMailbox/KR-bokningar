//Fetch XML data from the server
const getBookings = async () => {
    const fetchXmlData = async () => {
        await fetch('https://bi.krsystem.se/booking/KONF.XML', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain',
            }
        })
            .then(async response => {
                const contentType = response.headers.get('content-type');
                const charsetMatch = contentType.match(/charset=(.*)/);
                const encoding = charsetMatch ? charsetMatch[1] : 'iso-8859-1';
                if (!response.ok) alert("Response not ok.\n\n" + response.statusText);

                const buffer = await response
                    .arrayBuffer();
                return ({ buffer, encoding });
            })
            .then(({ buffer, encoding }) => {
                const dataView = new DataView(buffer);
                const decoder = new TextDecoder(encoding);
                const xmlString = decoder.decode(dataView);
                const parser = new DOMParser();
                //const xmlDocument = parser.parseFromString(xmlString, 'application/xml')
                const json = convertXmlToJson(xmlString);
                const bookings = json?.X8162_Aktivitetsstudio_?.RADER?.RAD;
                const sortedBookings = bookings.sort((a, b) => dateConvert(a.Starttid._, a.Startdatum._) > dateConvert(b.Starttid._, b.Startdatum._));

            })
            .catch(error => {
                console.error("Something went wrong.\n\n" + error);
            }
            );

    };
}

export default getBookings;