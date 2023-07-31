import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },

    parent: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
    },

    wrapperLeft: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },

    clock: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    upcomingBookingsSection: {
        flex: 1, //TODO: Adjust this to change the size of the upcoming bookings section. Style fix later.
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
        height: 120,
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: '#ffffff',
    },

    cover: {
        height: 'auto',
        borderRadius: 8,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    date: {
        fontSize: 15,
    },

    time: {
        fontSize: 15,
    },


    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },

    roomDetails: {
        display: 'flex',
        flexDirection: 'column',
    },

    roomName: {
        fontSize: 25,
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

    nextBookingCard: {
        width: 500,
        height: 300,
        padding: 10,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: '#ffffff',
    },

    settings: {
        position: 'absolute',
        width: 20,
        height: 20,
        bottom: 10,
        right: 10,
    },
});

export default styles;
