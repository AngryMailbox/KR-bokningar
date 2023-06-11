//check if there is a meeting going on in the bookings map
useEffect(() => {
    if (bookings.length > 0) {
        bookings.forEach(booking => {
            let currentTime = new Date();
            let bookingStart = dateConvert(booking.Starttid._, booking.Startdatum._);
            let bookingEnd = dateConvert(booking.Sluttid._, booking.Slutdatum._);

            //check if the current time is between the start and end time of the booking
            if (currentTime >= bookingStart && currentTime < bookingEnd) {
                setIsActive(true);
                setCurrentMeeting(booking);
                console.log("Current meeting: " + booking.Rubrik._);
            }
        });
    }
}, [bookings]);