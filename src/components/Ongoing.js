import React from "react";
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from '../styles/Ongoing.module.css';

const Ongoing = (bookings, isActive) => {
    return (
        <div className={styles.card}>
            <h1 className={styles.title}>Kompetensutveckling</h1>
            <div className={styles.separator}></div>
            <div className={styles.details}>
                <p className={styles.date}>Idag</p>
                <p className={styles.time}>13:00 - 14:00</p>
            </div>
            <p className={styles.elapsed}>27 min förflutet</p>
        </div>
    )
};

export default Ongoing;