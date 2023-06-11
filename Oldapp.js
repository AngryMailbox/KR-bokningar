import React, { useState, useEffect } from 'react-native';
import styles from './App.module.css';

const App = () => {
    const [bookings, setBookings] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [clock, setClock] = useState(new Date());
    let currentTime = clock.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
    const [isActive, setIsActive] = useState(false);
    const [currentMeeting, setCurrentMeeting] = useState(null);
    const [roomCode, setRoomCode] = useState("");
    const [roomName, setRoomName] = useState("");
    const searchParams = new URLSearchParams(document.location.search);

    useEffect(() => {
        setRoomCode(searchParams.get('rum'));
        setRoomName(searchParams.get('name'));
    }, [searchParams])

    useEffect(() => {
        const interval = setInterval(
            () => setClock(new Date()), 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    if (upcomingBookings) return (
        <View className={styles.App}>
            <View className={styles.left}>
                <Text className={styles.clock}>{currentTime}</Text>
                <Text>Kommande bokningar</Text>
                <Bookings bookings={upcomingBookings} />
            </View>
            <View className={styles.right}>
                <RoomDetails roomName={roomName} isActive={isActive} />
                <Ongoing booking={currentMeeting} isActive={isActive} />
            </View>
        </View>
    )
    else return (
        <View className={styles.App}>
            Det finns inga kommande bokningar.
        </View>
    );
}

export default App;