import React, { useState, useEffect } from 'react';
import { View, StatusBar, ImageBackground, Image, BackHandler, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from '../styles/Main.module.js';
import getBookings from '../components/utils/getbookings.js';

import { Card, Text, Button, Chip, Divider } from 'react-native-paper';
import { filterBookings, isOngoing } from '../components/utils/filterbookings.js';

import { useOptionsData } from '../components/utils/optionsDataProvider.js';
import { useRoomData } from '../components/utils/roomDataProvider.js';
import { useKeepAwake, activateKeepAwakeAsync } from 'expo-keep-awake';
import UserInactivity from 'react-native-user-inactivity';
import { WebView } from 'react-native-webview';
import * as NavigationBar from 'expo-navigation-bar';
import SystemNavigationBar from 'react-native-system-navigation-bar';


import AllBookings from '../components/allbookings.js';


const Home = () => {
    const [keepAwake, setKeepAwake] = useState(); // State for the keep awake button
    const [barVisibility, setBarVisibility] = useState();



    useEffect(() => {
        const enableKeepAwake = async () => {
            await activateKeepAwakeAsync();
        }
        enableKeepAwake();
        SystemNavigationBar.navigationHide();
    }, []);


    NavigationBar.addVisibilityListener(({ visibility }) => {
        if (visibility === "visible") {
            setBarVisibility("hidden");
        }
    });
    useEffect(() => {
        navigationConfig();
    }, [barVisibility]);

    const navigationConfig = async () => {
        // Just incase it is not hidden
        NavigationBar.setBackgroundColorAsync('red');

        // Hide it
        NavigationBar.setVisibilityAsync("hidden");
    };


    const navigation = useNavigation();

    const [clock, setClock] = useState(new Date());
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [otherBookings, setOtherBookings] = useState([]); // Bookings that are in other rooms

    const ongoingImage = require('../assets/ongoingImage.png');
    const nonOngoingImage = require('../assets/nonOngoingImage.png');
    const [active, setActive] = useState(true);

    const [isOngoingBooking, setIsOngoingBooking] = useState(false);
    let [nextBooking, setNextBooking] = useState([]);
    const settingsImage = require('../assets/gear-solid.png');
    let { roomName, roomCode } = useRoomData();

    let { options } = useOptionsData();



    const handleBackButtonPressMainScreen = () => {
        // Display the confirmation prompt when the back button is pressed
        Alert.alert(
            'Bekräfta',
            'Vill du verkligen stänga programmet?',
            [
                {
                    text: 'Avbryt',
                    style: 'cancel',
                },
                {
                    text: 'Ja',
                    onPress: () => {
                        BackHandler.exitApp();
                    },
                },
            ],
            { cancelable: true }
        );
        return true; // Return true to indicate that the back button has been handled
    };

    useEffect(() => {
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setHidden(true);
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressMainScreen);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressMainScreen);
        };
    }, []);


    // Fetch bookings and update clock
    useEffect((roomCode) => {
        fetchBookings();
        const interval = setInterval(() => {
            fetchBookings();
        }, ((options?.serverSyncTime * 1000) || 2000));
        return () => {
            clearInterval(interval);
        };
    }, [roomCode, options?.serverSyncTime]); //TODO: Why the hell does this work? It should not work, but it does lol.

    useEffect(
        () => {
            const interval = setInterval(() => {
                setClock(new Date());
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
    );

    const fetchBookings = async () => {
        try {
            const bookings = await getBookings(); // Reset other bookings
            const filteredBookings = filterBookings(bookings, roomCode); // Filter the bookings (remove past bookings)
            setUpcomingBookings(await filteredBookings); // Set fetched bookings to state
            setOtherBookings(bookings);
            setIsOngoingBooking(isOngoing(filteredBookings)); // Check ongoing booking
        } catch (error) {
            throw new Error("Something went wrong in fetch bookings.\n\n" + error);
        }
    };

    const [imageSource, setImageSource] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        // Fetch and set the initial random image
        fetchRandomImage();
        const interval = setInterval(() => {
            fetchRandomImage();
            console.log("Fetching new image");
        }, ((options?.slideShowTime) * 1000 || 30000));

        // Clear the interval when the component is unmounted, looks goofy haha
        return () => clearInterval(interval);
    }, [options?.slideShowTime]);

    const fetchRandomImage = () => {
        const randomImageWidth = Math.floor(Math.random() * 100) + 1900;
        const randomImageHeight = Math.floor(Math.random() * 1000) + 1000;
        const randomImageURL = `https://picsum.photos/${randomImageWidth}/${randomImageHeight}`;
        setImageSource(randomImageURL);
        setIsImageLoaded(false);
    };

    const onImageLoad = () => {
        setIsImageLoaded(true);
    };

    const onImageError = () => {
        setIsImageLoaded(false);
    };


    nextBooking = upcomingBookings[0];
    return (
        <ImageBackground
            source={{ uri: imageSource }}
            style={styles.backgroundImage}
            onLoad={onImageLoad}
            onError={onImageError}
        >
            <UserInactivity
                isActive={active}
                timeForInactivity={options?.screenTimeout * 1000 || 30000}
                onAction={isActive => { setActive(isActive); }}
            >
                {!active && (
                    options.link ? (
                        <WebView source={{ uri: options.link }} style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 100,
                        }} />
                    ) :
                        (
                            <View style={{
                                backgroundColor: 'black',
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}></View>
                        ))}
                {active && (
                    <View style={styles.background}>
                        {upcomingBookings.length > 0 ? (
                            <View style={styles.parent}>
                                {/* Clock section */}
                                <View style={styles.wrapperLeft}>
                                    <Text style={styles.clock}>{clock.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}</Text>
                                    <Text style={styles.title}>Kommande bokningar</Text>
                                    <Divider style={{
                                        backgroundColor: 'white',
                                        height: 1,
                                        width: 200,
                                        margin: 0,
                                        marginBottom: 10,
                                    }} />
                                    <ScrollView style={styles.upcomingSection}>

                                        {upcomingBookings.slice(1).map((booking) => (
                                            <View style={styles.cardwrapper} key={booking.Aktivitetsnr._}>
                                                <Text style={styles.text}>{booking.Startdatum._}</Text>
                                                <Card mode={'contained'} style={styles.card}>
                                                    <Card.Content>
                                                        <Text style={styles.title}>{booking.Rubrik._}</Text>
                                                        <Text style={styles.time}>{booking.Starttid._ + " - " + booking.Sluttid._}</Text>
                                                    </Card.Content>
                                                </Card>
                                                <Divider style={{
                                                    backgroundColor: 'white',
                                                    height: 0,
                                                    width: '100%',
                                                    margin: 0,
                                                    marginBottom: 10,
                                                }} />
                                            </View>))
                                        }
                                    </ScrollView>
                                </View>

                                {/* Next Booking section */}
                                <View style={styles.wrapperRight}>
                                    <View style={styles.roomDetails}>
                                        <Text style={styles.roomName}>{roomName}</Text>
                                        <View style={styles.statusContainer}>
                                            <Image
                                                source={isOngoingBooking ? ongoingImage : nonOngoingImage}
                                                style={styles.statusImage}
                                            />
                                            <Text style={styles.statusText}>{isOngoingBooking ? 'Upptaget' : 'Ledigt'}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.nextBookingSection}>
                                        <Card style={styles.bigcard} key={nextBooking.Aktivitetsnr._}>
                                            <Card.Content>
                                                <Text style={styles.blacktitle}>{nextBooking.Rubrik._}</Text>
                                                <Text style={styles.text}>{nextBooking.Startdatum._}</Text>
                                                <Text style={styles.text}>{nextBooking.Starttid._ + " - " + nextBooking.Sluttid._}</Text>
                                                <Text style={styles.text}>{nextBooking.Kommentar._}</Text>
                                            </Card.Content>
                                        </Card>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <AllBookings otherBookings={otherBookings} time={clock ? (clock.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })) : '00:00'} />
                        )}

                        <TouchableOpacity style={styles.settings} onPress={() => {
                            navigation.navigate('Inställningar'); //TODO: Change to "Settings"
                        }}>
                            <Image style={styles.settings} source={settingsImage} />
                        </TouchableOpacity>
                    </View>
                )}
            </UserInactivity>
        </ImageBackground>
    );
}

export default Home;