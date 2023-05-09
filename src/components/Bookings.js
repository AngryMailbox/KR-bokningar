import * as React from "react";
import MeetingCard from './MeetingCard';

const Bookings = (props) => {
    return (
        <div className="bookings">
            {/* Map over the bookings array and render a MeetingCard for each booking */}
            {props.bookings.map((booking) => (
                <MeetingCard
                    key={booking.Rubrik._}
                    title={booking.Rubrik._}
                    date={booking.Startdatum._}
                    startTime={booking.Starttid._}
                    endTime={booking.Sluttid._}
                />
            ))}
        </div>
    );
};

export default Bookings;