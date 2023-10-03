import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, Chip, Divider, ProgressBar } from 'react-native-paper';
import styles from '../styles/Main.module.js';
import { getBookingDay } from './utils/getbookings.js';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import dateConvert from './utils/dateconvert.js';
import { isOngoingBooking } from './utils/filterbookings.js';

const AllBookings = ({ otherBookings, time }) => {

    const elapsedTimePercentage = (startTime, startDate, endTime, endDate) => {
        const start = new Date(dateConvert(startTime, startDate));
        const end = new Date(dateConvert(endTime, endDate));
        const current = new Date();
        const elapsed = current - start;
        const total = end - start;
        return elapsed / total;
    };


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
                <Text style={styles.titleother}>Bokningar i andra rum:</Text>
                <FlatList
                    data={otherBookings}
                    keyExtractor={(booking) => booking.Aktivitetsnr._}
                    numColumns={3} // Change this to the desired number of columns in the grid
                    renderItem={({ item: booking }) => (
                        //if isOngoingBooking is true, then the card will be rendered
                        isOngoingBooking(booking) ?
                            (
                                <Card
                                    mode={'contained'}
                                    key={booking.Aktivitetsnr._}
                                    style={styles.gridCard}
                                >
                                    <Card.Content style={styles.content}>
                                        <AutoSizeText
                                            style={styles.title}
                                            numberOfLines={1}
                                            minFontSize={21}
                                            mode={ResizeTextMode.min_font_size}
                                        >
                                            {booking.Rubrik._}
                                        </AutoSizeText>
                                        <ProgressBar
                                            progress={elapsedTimePercentage(
                                                booking.Starttid._,
                                                booking.Startdatum._,
                                                booking.Sluttid._,
                                                booking.Slutdatum._
                                            )}
                                            color={'red'}
                                        />
                                        <Text style={styles.smalltext}>{getBookingDay(booking)}</Text>
                                        <Text style={styles.smalltext}>
                                            {booking.Starttid._ + ' – ' + booking.Sluttid._}
                                        </Text>
                                        <Chip mode={'flat'} style={styles.chip}>
                                            {booking.Rumsnamn._}
                                        </Chip>
                                    </Card.Content>
                                </Card>
                            ) : null

                    )}
                />
            </View>
        </View>
    )
}

export default AllBookings;