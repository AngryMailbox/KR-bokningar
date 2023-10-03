import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        transition: 'all 1s ease-in-out',
    },


    background: {
        flex: 1,
        display: 'flex',
        resizeMode: 'cover',
        backgroundColor: 'rgba(50, 50, 50, 0.4)',
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
        backgroundColor: '#1E2127CC',
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
        backgroundColor: '#1E2127CC',
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
        height: '100%',
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
        backgroundColor: '#1E2127CC',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    progress: {
        width: 590,
        bottom: 30,
    },

    bigcardtitle: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff', // Change the text color as needed
    },

    bigcardtext: {
        fontSize: 15,
        color: '#Aff', // Change the text color as needed
    },

    bigcardtimetext: {
        fontSize: 25,
        color: '#Aff', // Change the text color as needed
    },

    progresstext: {
        fontSize: 15,
        color: '#ffa', // Change the text color as needed
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
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        transition: 'all 1s ease',
    },

    bigcardgreen: {
        height: '25%',
        marginBottom: 10,
        backgroundColor: '#00ff00', // Change the text color as needed
        borderRadius: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        transition: 'all 1s ease',
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
        backgroundColor: '#1E2127CC', // Change the card background color as needed
        elevation: 4, // For Android elevation (shadow), adjust as needed
    },

    progressbar: {
        borderRadius: 8,
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Change the chip background color as needed
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
        height: 30,
    },

    text: {
        fontSize: 15,
        color: '#777', // Change the text color as needed
    },

    time: {
        fontSize: 15,
        color: '#777', // Change the text color as needed
    },
    description: {
        fontSize: 14,
        color: '#777', // Change the text color as needed
    },

    smalltext: {
        fontSize: 14,
        color: '#fff', // Change the text color as needed
    },
});

export default styles;
