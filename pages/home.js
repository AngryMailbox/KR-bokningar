import React, { useState, useEffect } from 'react';
import { View, StatusBar, ImageBackground, Image, BackHandler, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from '../styles/Main.module.js';
import getBookings, { getBookingDay } from '../components/utils/getbookings.js';

import { Card, Text, Button, Chip, Divider } from 'react-native-paper';
import { filterBookings, isOngoing } from '../components/utils/filterbookings.js';

import { useOptionsData } from '../components/utils/optionsDataProvider.js';
import { useRoomData } from '../components/utils/roomDataProvider.js';
import { useKeepAwake, activateKeepAwakeAsync } from 'expo-keep-awake';
import UserInactivity from 'react-native-user-inactivity';
import { WebView } from 'react-native-webview';
import * as NavigationBar from 'expo-navigation-bar';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import BigCard from '../components/BigCard.js';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';



import AllBookings from '../components/allbookings.js';
import { getAllBookings } from '../components/utils/getAllBookings.js';


const Home = () => {
    const [keepAwake, setKeepAwake] = useState(); // State for the keep awake button
    const [barVisibility, setBarVisibility] = useState();



    useEffect(() => {
        const enableKeepAwake = async () => {
            await activateKeepAwakeAsync();
        }
        enableKeepAwake();
    }, []);


    const navigation = useNavigation();

    const [clock, setClock] = useState(new Date());
    let [upcomingBookings, setUpcomingBookings] = useState([]);
    let [otherBookings, setOtherBookings] = useState([]); // Bookings that are in other rooms

    const ongoingImage = require('../assets/ongoingImage.png');
    const nonOngoingImage = require('../assets/nonOngoingImage.png');
    const [active, setActive] = useState(true);

    let [isOngoingBooking, setIsOngoingBooking] = useState();
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
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressMainScreen);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressMainScreen);
        };
    }, []);


    // Fetch bookings and update clock
    useEffect((roomCode) => {
        const fetchAndSetBookings = async () => {
            try {
                await fetchBookings();
            } catch (error) {
                console.error("Error fetching bookings:", error,);
            }
        };

        // Fetch bookings immediately when the component mounts
        fetchAndSetBookings();

        // Set up an interval to periodically fetch bookings
        const interval = setInterval(fetchAndSetBookings, (options?.serverSyncTime * 1000) || 2000);

        // Clean up the interval when the component unmounts or when dependencies change
        return () => {
            clearInterval(interval);
        };
    }, [roomCode, options?.serverSyncTime]); // Only include options?.serverSyncTime as a dependency

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
            // Fetch the bookings data
            const bookings = await getBookings();
            console.log("Fetched bookings:", bookings.length);

            // Filter the bookings (remove past bookings)
            const filteredBookings = await filterBookings(bookings, roomCode);
            console.log("Filtered bookings:", filteredBookings.length);


            setUpcomingBookings(filteredBookings);
            setOtherBookings(getAllBookings(bookings));
            setIsOngoingBooking(isOngoing(filteredBookings));
            setNextBooking(upcomingBookings[0]);
            nextBooking = upcomingBookings[0];

        } catch (e) {
            console.error("Error in fetch bookings (in Home)");
            throw new Error("Something went wrong in fetch bookings (in Home).\n\n" + e);
        }
    };


    const [imageSource, setImageSource] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        // Fetch and set the initial random image
        setIsOngoingBooking(isOngoing(upcomingBookings));
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
    isOngoingBooking = isOngoing(upcomingBookings);
    console.log("Is ongoing booking:", isOngoingBooking);
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
                        {(upcomingBookings.length > 0) ? (
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
                                        {upcomingBookings.slice(1).map((booking, index) => {
                                            // Get the current booking's date
                                            const currentBookingDate = getBookingDay(booking);

                                            // Check if it differs from the previous booking's date
                                            const shouldRenderDate =
                                                index === 0 || currentBookingDate !== getBookingDay(upcomingBookings[index]);

                                            return (
                                                <View style={styles.cardwrapper} key={booking.Aktivitetsnr._}>
                                                    {shouldRenderDate && <Text style={styles.text}>{currentBookingDate}</Text>}
                                                    <Card mode={'contained'} style={styles.card}>
                                                        <Card.Content>
                                                            <Text style={styles.title}>{booking.Rubrik?._}</Text>
                                                            <Text style={styles.time}>
                                                                {booking.Starttid?._ + " – " + booking.Sluttid?._}
                                                            </Text>
                                                        </Card.Content>
                                                    </Card>
                                                    <Divider
                                                        style={{
                                                            backgroundColor: 'white',
                                                            height: 0,
                                                            width: '100%',
                                                            margin: 0,
                                                            marginBottom: 10,
                                                        }}
                                                    />
                                                </View>
                                            );
                                        })}
                                    </ScrollView>
                                </View>

                                <View style={styles.roomDetails}>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        fontSizePresets={[100, 90, 80, 70, 60, 50, 40, 30, 20, 10]}
                                        mode={ResizeTextMode.preset_font_sizes}
                                        style={styles.roomName}>{roomName}</AutoSizeText>

                                </View>
                                {/* Next Booking section */}
                                <View style={styles.wrapperRight}>
                                    <View style={styles.nextBookingSection}>
                                        <Card style={styles.bigcard} key={nextBooking.Aktivitetsnr._}>
                                            {(isOngoingBooking) && <Card.Cover style={styles.bigcardred}></Card.Cover>}
                                            {(!isOngoingBooking) && <Card.Cover style={styles.bigcardgreen}></Card.Cover>}
                                            <Card.Content >
                                                <Text style={styles.bigcardtitle}>{nextBooking.Rubrik._}</Text>
                                                <Text style={styles.bigcardtext}>{getBookingDay(nextBooking)}</Text>
                                                <Text style={styles.bigcardtimetext}>{nextBooking.Starttid?._ + " – " + nextBooking.Sluttid._}</Text>
                                                <Text style={styles.bigcardcommenttext}>{nextBooking.Kommentar?._}</Text>
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