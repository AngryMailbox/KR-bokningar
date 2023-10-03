import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
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

    const contextValue = useMemo(() => {
        return { roomName, setRoomName, roomCode, setRoomCode, saveRoomData };
    }, [roomName, setRoomName, roomCode, setRoomCode, saveRoomData]);

    // Expose the state variables and saveRoomData function through the context provider
    return (
        <RoomDataContext.Provider value={contextValue}>
            {children}
        </RoomDataContext.Provider>
    );
}

// Custom hook to use the room data context
export const useRoomData = () => {
    const context = useContext(RoomDataContext);
    if (!context) {
        throw new Error('useRoomData must be used within an RoomDataProvider');
    }
    return context;
}

export default RoomDataContext; // Don't forget to export the RoomDataContext itself
