import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

// Create a new context
const RoomDataContext = createContext();

export function RoomDataProvider({ children }) {
    const [roomName, setRoomName] = useState('');
    const [roomCode, setRoomCode] = useState('');

    useEffect(() => {
        loadRoomData(); // Load room data from SecureStore when the component mounts
    }, []);

    const loadRoomData = async () => {
        try {
            // Load room data from SecureStore
            const storedRoomName = await SecureStore.getItemAsync('roomName');
            const storedRoomCode = await SecureStore.getItemAsync('roomCode');

            if (storedRoomName && storedRoomCode) {
                setRoomName(storedRoomName);
                setRoomCode(storedRoomCode);
            }
        } catch (error) {
            console.error('Error loading room data:', error);
        }
    };

    const saveRoomData = async (newRoomName, newRoomCode) => {
        try {
            // Save room data to SecureStore
            await SecureStore.setItemAsync('roomName', newRoomName);
            await SecureStore.setItemAsync('roomCode', newRoomCode);
            console.log('Room data saved successfully! ' + 'Room name:', newRoomName, 'Room code:', newRoomCode);
            setRoomName(newRoomName); // Update the state with the new room name
            setRoomCode(newRoomCode); // Update the state with the new room code
        } catch (error) {
            console.error('Error saving room data:', error);
        }
    };

    // Expose the state variables and saveRoomData function through the context provider
    return (
        <RoomDataContext.Provider value={{ roomName, setRoomName, roomCode, setRoomCode, saveRoomData }}>
            {children}
        </RoomDataContext.Provider>
    );
}

// Custom hook to use the room data context
export function useRoomData() {
    return useContext(RoomDataContext);
}

export default RoomDataContext; // Don't forget to export the RoomDataContext itself
