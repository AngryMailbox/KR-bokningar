import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/Settings.module.js';
import { TextInput, Banner, Button } from 'react-native-paper';
import { Image } from 'react-native';
import { useRoomData } from '../components/utils/roomDataProvider.js';


const Settings = () => {
    useKeepAwake();


    const [visible, setVisible] = React.useState(false);
    const { roomName, setRoomName, roomCode, setRoomCode, saveRoomData } = useRoomData();

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
                Ange rumkod och rumnamn för att gå vidare.
            </Banner><View style={styles.settingsScreenContainer}>
                <ScrollView style={styles.settingsItem}>
                    <Text style={styles.settingsLabel}>Välj rum:</Text>
                    <TextInput mode="outlined" label="Rumkod" style={styles.settingsValue} value={roomCode}
                        onChangeText={(text) => setRoomCode(text)} />
                    <Text style={styles.settingsValue}>Ex. KONF</Text>

                    <TextInput mode="outlined" label="Rumnamn" style={styles.settingsValue} value={roomName}
                        onChangeText={(text) => setRoomName(text)} />
                    <Text style={styles.settingsValue}>Ex. Konferensrummet</Text>
                </ScrollView>
                <Button icon="content-save" mode="contained" onPress={() => saveRoomData(roomName, roomCode)}>Spara</Button>
            </View>
        </>
    );
};

export default Settings;
