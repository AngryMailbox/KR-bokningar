import { StyleSheet, BackHandler } from "react-native";

const styles = StyleSheet.create({

    settingsScreenContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    settingsTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingsItem: {
        marginBottom: 20,
    },
    settingsLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    settingsValue: {
        fontSize: 16,
        marginBottom: 10,
    },

    divider: {
        marginTop: 20,
        marginBottom: 20,
    }
}
);

export default styles;