import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    App: {
        display: 'flex',
        flexdirection: 'row',
        justifycontent: 'center',
        alignitems: 'center',
        height: '100',
        width: '100',
        overflow: 'hidden',
    },

    left: {
        display: 'flex',
        flexdirection: 'column',
        alignitems: 'center',
        height: '100',
        overflow: 'scroll',
        marginright: 'auto',
    },

    clock: {
        display: 'flex',
        flexdirection: 'column',
        justifycontent: 'center',
        alignitems: 'center',
        fontsize: '6rem',
        margin: '0',
    },

    right: {
        display: 'flex',
        flexdirection: 'column',
        justifycontent: 'center',
        alignitems: 'center',
        width: '60',
        height: '100',
    }

});

export default styles;