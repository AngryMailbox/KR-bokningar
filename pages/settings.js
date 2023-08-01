import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/Settings.module.js';
import { TextInput, Banner, Button, Snackbar, Divider } from 'react-native-paper';
import { Image } from 'react-native';
import { useRoomData } from '../components/utils/roomDataProvider.js';
import { useKeepAwake, activateKeepAwakeAsync } from 'expo-keep-awake';
import { useOptionsData } from '../components/utils/optionsDataProvider.js';


const Settings = () => {
    useKeepAwake();
    activateKeepAwakeAsync();


    const [visible, setVisible] = React.useState(false);
    const { roomName, setRoomName, roomCode, setRoomCode, saveRoomData } = useRoomData();
    const [tempRoomName, setTempRoomName] = useState(roomName);
    const [tempRoomCode, setTempRoomCode] = useState(roomCode);
    const { options, saveOptions } = useOptionsData();

    const [screenTimeout, setScreenTimeout] = useState(options?.screenTimeout || 30); // Initialize the state with the existing value from the options, if available
    const [link, setLink] = useState(options?.link || ''); // Initialize the state with the existing value from the options, if available
    const [slideShowTime, setSlideShowTime] = useState(options?.slideShowTime || 20); // Initialize the state with the existing value from the options, if available
    const [serverSyncTime, setServerSyncTime] = useState(options?.serverSyncTime || 2); // Initialize the state with the existing value from the options, if available
    const [showSaveSnackbar, setShowSaveSnackbar] = useState(false); // State for the save snackbar

    const [tempScreenTimeout, setTempScreenTimeout] = useState(screenTimeout);
    const [tempLink, setTempLink] = useState(link);
    const [tempSlideShowTime, setTempSlideShowTime] = useState(slideShowTime);
    const [tempServerSyncTime, setTempServerSyncTime] = useState(serverSyncTime);






    const handleSave = () => {
        setRoomName(tempRoomName);
        setRoomCode(tempRoomCode);
        saveRoomData(tempRoomName, tempRoomCode);
        setShowSaveSnackbar(true);
        saveOptions({ ...options, screenTimeout: parseInt(tempScreenTimeout), link: tempLink, slideShowTime: parseInt(tempSlideShowTime), serverSyncTime: parseInt(tempServerSyncTime) }); // Save the options
    };

    const handleClearAll = () => {
        setTempRoomCode('');
        setTempRoomName('');
        setTempScreenTimeout(30);
        setTempLink('');
        setTempSlideShowTime(20);
        setTempServerSyncTime(2);
    };


    useEffect(() => {
        if (roomName.length == 0 || roomCode.length == 0) {
            setVisible(true);
        }
    }
        , []);

    return (
        <>
            <Banner
                visible={visible}
                actions={[
                    {
                        label: 'Ok',
                        onPress: () => setVisible(false),
                    },
                ]}
                icon={({ size }) => (
                    <Image
                        source={require('../assets/info.png')}
                        style={{
                            width: size,
                            height: size,
                        }} />
                )}>
                Ange rummets kod och namn för att gå vidare.
            </Banner><View style={styles.settingsScreenContainer}>
                <ScrollView style={styles.settingsItem}>
                    <Text style={styles.settingsLabel}>Välj rum:</Text>
                    <TextInput mode="outlined" label="Rumkod" style={styles.settingsValue} value={tempRoomCode}
                        onChangeText={(text) => setTempRoomCode(text)} />
                    <Text style={styles.settingsValue}>Ex. KONF</Text>

                    <TextInput mode="outlined" label="Rumnamn" style={styles.settingsValue} value={tempRoomName}
                        onChangeText={(text) => setTempRoomName(text)} />
                    <Text style={styles.settingsValue}>Ex. Konferensrummet</Text>
                    <Divider style={styles.divider} />

                    <Text style={styles.settingsLabel}>Skärmtimeout:</Text>
                    <TextInput
                        mode="outlined"
                        label="Skärmtimeout (sekunder)"
                        style={styles.settingsValue}
                        value={tempScreenTimeout.toString()}
                        onChangeText={(text) => setTempScreenTimeout(text)}
                    />
                    <Text style={styles.settingsValue}>Ex. 10</Text>

                    <TextInput mode="outlined" label="Länk till hemsida för inaktivitet" style={styles.settingsValue} value={tempLink} onChangeText={(tempLink) => setTempLink(tempLink)} />
                    <Text style={styles.settingsValue}>Ex. https://krsystem.se/intressanta-installationer/</Text>

                    <TextInput mode="outlined" label="Byte av bakgrundsbild" style={styles.settingsValue} value={tempSlideShowTime.toString()} onChangeText={(tempSlideShowTime) => setTempSlideShowTime(tempSlideShowTime)} />
                    <Text style={styles.settingsValue}>Välj hur ofta programmet ska byta bakgrundsbild. Ex. 20 (sekunder).</Text>
                    <Divider style={styles.divider} />
                    <Text style={styles.settingsLabel}>Synka:</Text>
                    <TextInput mode="outlined" label="Synkning med server" style={styles.settingsValue} value={tempServerSyncTime.toString()} onChangeText={(tempServerSyncTime) => setTempServerSyncTime(tempServerSyncTime)} />
                    <Text style={styles.settingsValue}>Välj hur frekvent programmet ska synka med servern. OBS: Ett högre värde än 10 kan göra appen instabil!</Text>
                    <Divider style={styles.divider} />
                    <Button onPress={handleClearAll}>Rensa fält</Button>

                </ScrollView>
                <Button icon="content-save" mode="contained" onPress={() => handleSave()}>Spara</Button>
            </View>
            <Snackbar
                visible={showSaveSnackbar}
                duration={1500}
                onDismiss={() => setShowSaveSnackbar(false)}
                action={{
                    label: 'Ok',
                    onPress: () => setShowSaveSnackbar(false),
                }}
            >
                Ändringarna har sparats.
            </Snackbar>
        </>
    );
};

export default Settings;
