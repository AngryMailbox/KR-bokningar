import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import styles from '../styles/Main.module.js';

const AllBookings = ({ otherBookings, time }) => {
    return (
        <View style={styles.parent}>
            {/* Clock section */}
            <View style={styles.wrapperLeft}>
                <View style={styles.clockSection}>
                    <Text style={styles.clock}>{time ? time : null}</Text>
                </View>
            </View>
            {/* Upcoming bookings list */}
            <View style={styles.gridContainer}>
                {/* Here, we use FlatList to render a grid of cards */}
                <Text style={styles.title}>Andra bokningar:</Text>
                <FlatList
                    data={otherBookings}
                    keyExtractor={(item) => item.Aktivitetsnr._}
                    numColumns={2} // Change this to the desired number of columns in the grid
                    renderItem={({ item }) => (
                        <Card style={styles.gridCard} key={item.Aktivitetsnr._}>
                            <Card.Content>
                                <Text style={styles.bigtitle}>{item.Rubrik._}</Text>
                                <Text style={styles.text}>{item.Startdatum._}</Text>
                                <Text style={styles.text}>{item.Starttid._ + " - " + item.Sluttid._}</Text>
                                <Chip style={styles.text}>{item.Rumsnamn._}</Chip >
                            </Card.Content>
                        </Card>
                    )}
                />
            </View>
        </View>
    )
}

export default AllBookings;