import * as React from "react";
import MeetingCard from './MeetingCard';
import styles from '../styles/Bookings.module.css';

const Bookings = (props) => {
    return (
        <div className="bookings">
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