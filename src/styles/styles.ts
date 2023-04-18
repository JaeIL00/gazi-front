import { StyleSheet } from 'react-native';

// App
// App
export const appStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

// Smallest
// Smallest
export const touchButtonStyles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
    },
});

// Molecules
// Molecules
export const LoginTextInputStyles = StyleSheet.create({
    errorSection: {
        flexDirection: 'row',
    },
    errorTextStyle: {
        color: 'lightgray',
    },
    correctTextStyle: {
        color: 'green',
    },
});
