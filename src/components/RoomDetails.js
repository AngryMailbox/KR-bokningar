import React from "react";
import styles from "../styles/RoomDetails.module.css";

const RoomDetails = ({ bookings, isactive }) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Nya konferensrummet</h1>
            <div className={styles.active}>
                <div className={styles.dot}></div>
                <p className={styles.text}>Ledigt</p>
            </div>
        </div>
    )
}

export default RoomDetails;