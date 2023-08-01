import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },


    background: {
        flex: 1,
        display: 'flex',
        resizeMode: 'cover',
        backgroundColor: 'rgba(50, 50, 50, 0.9)',
    },

    parent: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    wrapperLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '20%',
        padding: 20,
        backgroundColor: 'rgba(40, 40, 40, 0.6)',
    },

    clock: {
        fontSize: 60,
        color: '#ffffff',
        padding: 20,
    },

    upcomingSection: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },

    upcomingBookingsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        alignSelf: 'center',
    },

    scrollViewContent: {
        flexGrow: 1,
    },


    card: {
        width: '100%',
        height: 'auto',
        marginVertical: 0,
        padding: 0,
        borderRadius: 8,
        backgroundColor: 'transparent',
    },

    cardcover: {
        marginTop: 0,
        padding: 0,
        height: 'auto',
        borderRadius: 0,
    },

    bigtitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#ffffff',
    },


    wrapperRight: {
        alignSelf: 'flex-end',
        display: 'flex',
        alignItems: 'flex-start',
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },

    roomDetails: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        marginTop: 20,
    },

    roomName: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    statusContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    statusImage: {
        width: 10,
        height: 10,
        marginRight: 5,
    },

    statusText: {
        fontSize: 15,
        color: '#ffffff',
    },

    nextBookingSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardwrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },

    bigcard: {
        width: 500,
        height: 300,
        padding: 10,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: '#rgba(255, 245, 245, 0.9)',
    },

    settings: {
        position: 'absolute',
        width: 20,
        height: 20,
        bottom: 5,
        right: 5,
    },

    gridContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },

    gridCard: {
        width: 300,
        margin: 8,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff', // Change the card background color as needed
        elevation: 4, // For Android elevation (shadow), adjust as needed
    },

    whitetitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff', // Change the text color as needed
    },

    blacktitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000', // Change the text color as needed
    },

    text: {
        fontSize: 15,
        color: '#666', // Change the text color as needed
    },

    time: {
        fontSize: 15,
        color: '#666', // Change the text color as needed
    },
    description: {
        fontSize: 14,
        color: '#666', // Change the text color as needed
    },
});

export default styles;
