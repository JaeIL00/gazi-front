import { FlexAlignType, StyleSheet } from 'react-native';
import Colors from './Colors';
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
export const touchButtonStyles = (
    width: number | undefined,
    height: number | undefined,
    backgroundColor: string | undefined,
    paddingHorizontal: number | undefined,
    paddingVertical: number | undefined,
    alignSelf: FlexAlignType | undefined,
) =>
    StyleSheet.create({
        container: {
            width: width && widthPercentage(width),
            height: height && hegithPercentage(height),
            backgroundColor: backgroundColor,
            paddingHorizontal: paddingHorizontal && widthPercentage(paddingHorizontal),
            paddingVertical: paddingVertical && hegithPercentage(paddingVertical),
            borderRadius: fontPercentage(5),
            alignSelf: alignSelf,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
export const pageTitleStyles = StyleSheet.create({
    title: {
        fontSize: fontPercentage(24),
        fontWeight: 'bold',
        color: Colors.TXT_BLACK,
    },
});
export const grayTextStyles = (size: number) =>
    StyleSheet.create({
        text: {
            fontSize: fontPercentage(size),
            color: Colors.TXT_GRAY,
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
export const TextButtonStyles = (color: string) =>
    StyleSheet.create({
        text: {
            color: color,
            fontWeight: '600',
            fontSize: fontPercentage(17),
        },
    });

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
