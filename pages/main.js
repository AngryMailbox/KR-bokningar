import React, { useState, useEffect } from 'react';
import { View, StatusBar, ImageBackground, Image } from 'react-native';
import styles from '../styles/Main.module.js';
import getBookings from '../components/utils/getbookings.js';
import { Card, Text } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { filterBookings, isOngoing } from '../components/utils/filterbookings.js';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoomData } from '../components/utils/roomDataProvider.js'; // Import useData hook

const Main = () => {
    useKeepAwake();
    const navigation = useNavigation(); // Get the navigation object

    const [clock, setClock] = useState(new Date());
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [isOngoingBooking, setIsOngoingBooking] = useState(false);
    let [nextBooking, setNextBooking] = useState([]);

    const backgroundImage = require('../assets/tablet-dark.png');
    const ongoingImage = require('../assets/ongoingImage.png');
    const nonOngoingImage = require('../assets/nonOngoingImage.png');
    const settingsImage = require('../assets/gear-solid.png');
    let { roomName, roomCode } = useRoomData();


    // TODO: Move to parent screen, hides status bar on component mount
    useEffect(() => {
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setHidden(true);
    }, []);

    // Fetch bookings and update clock on component mount, every 5 seconds
    useEffect((roomCode) => {
        fetchBookings();
        const interval = setInterval(() => {
            setClock(new Date());
            fetchBookings();
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [roomCode]); //Om jag tar bort roomcode härifrån så fungerar det inte... varför?


    const fetchBookings = async () => {
        try {
            const filteredBookings = filterBookings(await getBookings(), roomCode); // Filter the bookings (remove past bookings)
            setUpcomingBookings(await filteredBookings); // Set fetched bookings to state
            setIsOngoingBooking(isOngoing(filteredBookings)); // Check ongoing booking
        } catch (error) {
            throw new Error("Something went wrong in fetch bookings.\n\n" + error);
        }
    };





    if (upcomingBookings.length > 0) {
        nextBooking = upcomingBookings[0]; // The first booking will always be the next or ongoing one
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <View style={styles.parent}>
                    {/* Clock section */}
                    <View style={styles.wrapperLeft}>
                        <View style={styles.clockSection}>
                            <Text style={styles.clock}>{clock.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                        {/* Upcoming bookings list */}
                        <View style={styles.upcomingBookingsSection}>
                            <Text style={styles.upcomingBookingsText}>Kommande bokningar</Text>
                            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                                {upcomingBookings.slice(1).map((booking) => (
                                    <Card key={booking.Aktivitetsnr._} style={styles.card}>
                                        <Card.Cover style={styles.cover} source={{ uri: 'https://picsum.photos/' + (Math.floor(Math.random() * (700 - 500 + 1)) + 500).toString() }} />
                                        <Card.Content>
                                            <Text style={styles.title}>{booking.Rubrik._}</Text>
                                            <Text style={styles.date}>{booking.Startdatum._ + booking.Rum._}</Text>
                                            <Text style={styles.time}>{booking.Starttid._ + " - " + booking.Sluttid._}</Text>
                                        </Card.Content>
                                    </Card>
                                ))}
                            </ScrollView>
                        </View>
                    </View>

                    {/* Next Booking section */}
                    <View style={styles.wrapper}>
                        <View style={styles.roomDetails}>
                            {/*TODO: Ändra till inställning vilket rum*/}
                            <Text style={styles.roomName}>{roomName}</Text>
                            {/*TODO: Ändra till inställning vilket rum*/}
                            <View style={styles.statusContainer}>
                                <Image
                                    source={isOngoingBooking ? ongoingImage : nonOngoingImage}
                                    style={styles.statusImage}
                                />
                                <Text style={styles.statusText}>{isOngoingBooking ? 'Upptaget' : 'Ledigt'}</Text>
                            </View>
                        </View>
                        <View style={styles.nextBookingSection}>
                            <Card style={styles.nextBookingCard} key={nextBooking.Aktivitetsnr._}>
                                <Card.Content>
                                    <Text style={styles.title}>{nextBooking.Rubrik._}</Text>
                                    <Text style={styles.date}>{nextBooking.Startdatum._}</Text>
                                    <Text style={styles.time}>{nextBooking.Starttid._ + " - " + nextBooking.Sluttid._}</Text>
                                    <Text style={styles.description}>{nextBooking.Rum._}</Text>
                                </Card.Content>
                            </Card>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.settings} onPress={() => {
                    navigation.navigate('Inställningar'); //TODO: Change to "Settings"
                }}>
                    <Image source={settingsImage} />
                </TouchableOpacity>
            </ImageBackground>
        );
    } else {
        return (
            <>
                <View style={styles.parent}>
                    <Text>Det finns inga kommande bokningar.</Text>
                </View>
                <TouchableOpacity style={styles.settings} onPress={() => {
                    navigation.navigate('Inställningar'); //TODO: Change to "Settings"
                }}>
                    <Image source={settingsImage} />
                </TouchableOpacity>
            </>
        );
    }
}

export default Main;