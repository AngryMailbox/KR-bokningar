//Check if there are any future meetings
useEffect(() => {
    if (upcomingBookings.length > 0) {
        upcomingBookings.forEach(booking => {
            let currentTime = new Date();
            let bookingEnd = dateConvert(booking.Sluttid._, booking.Slutdatum._);
            //check if the current time is between the start and end time of the booking
            if (currentTime > bookingEnd && upcomingBookings.includes(booking)) {
                setCurrentMeeting(booking);
                //setUpcomingBookings(upcomingBookings.filter(item => item !== booking));
            }
        });
    }
}, [currentTime, upcomingBookings]);