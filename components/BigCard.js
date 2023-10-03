import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/Card.module.js';
import { Card } from 'react-native-paper';


const BigCard = (nextBooking) => {
    return (
        <Card style={styles.card} key={nextBooking.Aktivitetsnr._}>
            <Card.Content >
                <Text style={styles.blacktitle}>{nextBooking.Rubrik._}</Text>
                <Text style={styles.text}>{nextBooking.Startdatum._}</Text>
                <Text style={styles.text}>{nextBooking.Starttid._ + " - " + nextBooking.Sluttid._}</Text>
                <Text style={styles.text}>{nextBooking.Kommentar._}</Text>
            </Card.Content>
        </Card>
    );
}

export default BigCard;
