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
        position: 'relative',
        justifyContent: 'space-between',
    },

    titleother: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#ffffff',
        alignSelf: 'center',
    },

    wrapperLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '20%',
        padding: 20,
        backgroundColor: 'rgba(40, 40, 40, 0.6)',
        height: '100%',
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
        display: 'flex',
        alignItems: 'flex-start',
        width: '60%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        position: 'relative',
    },

    roomDetails: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '80%',
        alignItems: 'center',
        overflow: 'hidden',
        top: 30,
        right: 0,
    },

    roomName: {
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
        width: 600,
        height: 400,
        padding: 0,
        borderRadius: 0,
        elevation: 4,
        backgroundColor: '#1E2127',
    },

    bigcardtitle: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff', // Change the text color as needed
    },

    bigcardtext: {
        fontSize: 15,
        color: '#fff', // Change the text color as needed
    },

    bigcardtimetext: {
        fontSize: 25,
        color: '#fff', // Change the text color as needed
    },

    bigcardcommenttext: {
        fontSize: 10,
        color: '#999999', // Change the text color as needed
        overflow: 'hidden',
    },

    bigcardred: {
        height: '25%',
        backgroundColor: '#ff0000', // Change the text color as needed
        borderRadius: 0,
    },

    bigcardgreen: {
        height: '25%',
        marginBottom: 10,
        backgroundColor: '#00ff00', // Change the text color as needed
        borderRadius: 0,
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
        width: 'auto',
    },

    gridCard: {
        width: 350,
        margin: 8,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#rgba(255, 255, 255, 0.2)', // Change the card background color as needed
        elevation: 4, // For Android elevation (shadow), adjust as needed
    },

    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 0,
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

    chip: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Change the chip background color as needed
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
        height: 30,
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

    smalltext: {
        fontSize: 14,
        color: '#fff', // Change the text color as needed
    },
});

export default styles;
