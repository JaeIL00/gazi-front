import { StyleSheet } from 'react-native';
import Colors from './colors';
import { hegithPercentage, widthPercentage, fontPercentage } from '../utils/changeStyleSize';

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
        alignSelf: 'flex-start',
        padding: 3,
    },
});
export const pageTitleStyles = StyleSheet.create({
    title: {
        fontSize: fontPercentage(24),
        fontWeight: 'bold',
        color: Colors.BLACK,
    },
});
export const grayTextStyles = (size: number) =>
    StyleSheet.create({
        text: {
            fontSize: fontPercentage(size),
            color: Colors.GRAY,
        },
    });
export const spaceStyles = (height: number) =>
    StyleSheet.create({
        height: {
            height: hegithPercentage(height),
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
export const PageTitleWithExplainStyles = StyleSheet.create({});

// Organisms
// Organisms
export const MoveBackWithPageTitleStyles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 30,
        paddingBottom: 43,
    },
});

// Screen
// Screen
export const JoinMemberScreenStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
});
export const NotLoginHomeScreenStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
});
