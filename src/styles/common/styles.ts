import { StyleSheet } from 'react-native';
import colors from '../../common/constants/colors';
import { screenFont, screenHeight, screenWidth } from '../../utils/changeStyleSize';

// APP
export const appStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export const communityTabStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: 1.5 * screenFont,
        backgroundColor: colors.BORDER_GRAY,
        position: 'absolute',
        bottom: 0,
    },
    animBar: {
        height: 1.5 * screenFont,
        backgroundColor: colors.BLACK,
    },
});
export const imageViewScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK,
    },
    backButtonShadow: {
        position: 'absolute',
        top: 5 * screenHeight,
        left: 16 * screenWidth,
        zIndex: 99,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4 * screenHeight,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4 * screenFont,
    },
    backButtonBox: {
        width: 36 * screenWidth,
        height: 36 * screenWidth,
        backgroundColor: '#171717CC',
        borderRadius: 36 * screenFont,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomTitleBox: {
        backgroundColor: '#292929CC',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 16 * screenWidth,
        paddingTop: 19 * screenHeight,
        paddingBottom: 13 * screenHeight,
    },
    bottomInfoBox: {
        paddingTop: 24 * screenHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconBox: { flexDirection: 'row', alignItems: 'center' },
    iconSize: {
        width: 12.24 * screenWidth,
        height: 12.24 * screenWidth,
    },
});
