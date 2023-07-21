import { StyleSheet } from 'react-native';
import { screenFont, screenHeight, screenWidth } from '../../utils/changeStyleSize';
import colors from '../../constants/colors';

export const writingFloatingBtnStyles = StyleSheet.create({
    dropshadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4 * screenHeight,
        },
        shadowOpacity: 0.14,
        shadowRadius: 5 * screenFont,
    },
});
export const checkBoxBackground = (is: boolean) =>
    StyleSheet.create({
        color: {
            backgroundColor: is ? colors.BLACK : '#E3E3E3',
        },
    });
export const imageButtonStyles = (width: number | string, height: number | string, borderRadius?: number) =>
    StyleSheet.create({
        image: {
            width: typeof width === 'string' ? width : width * screenWidth,
            height: typeof height === 'string' ? height : height * screenWidth,
            borderRadius: borderRadius && borderRadius * screenFont,
        },
    });
export const commentListItemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '94%',
    },
    lineSphere: {
        width: 6 * screenWidth,
        height: 6 * screenWidth,
        backgroundColor: '#D9D9D9',
        borderRadius: 6 * screenFont,
        marginRight: 14 * screenWidth,
        marginTop: 18 * screenHeight,
    },
    headerBox: {
        flexDirection: 'row',
    },
    headerInner: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
    },
    headerProfileBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerProfileImg: {
        width: 36 * screenWidth,
        height: 36 * screenWidth,
        backgroundColor: '#999',
        borderRadius: 36 * screenFont,
    },
    headerTitleBox: {
        paddingLeft: 7 * screenWidth,
    },
    contentBox: {
        paddingTop: 8 * screenHeight,
    },
    contentImg: {
        width: '100%',
        height: '100%',
        borderRadius: 5 * screenFont,
    },
    contentTwoImgBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contentTwoOverImgBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 208 * screenHeight,
    },
    contentThrHalfImg: {
        width: '49%',
    },
    contentThrQtImg: {
        width: '49%',
        justifyContent: 'space-between',
    },
    overFourImg: {
        backgroundColor: '#171717CC',
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 5 * screenFont,
        alignItems: 'center',
        justifyContent: 'center',
    },
    likeBox: {
        flexDirection: 'row',
    },
});
export const loginTextInputStyles = StyleSheet.create({
    inputBox: {
        borderRadius: 5 * screenFont,
        height: 48 * screenHeight,
        backgroundColor: colors.LIGHTGRAY,
        paddingHorizontal: 16 * screenWidth,
        justifyContent: 'center',
    },
});
export const agreementCheckListItemStyles = StyleSheet.create({
    agreeBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10 * screenWidth,
        paddingVertical: 12 * screenHeight,
    },
    agreeTitleBox: {
        flexDirection: 'row',
        width: '100%',
    },
    checkBox: {
        width: 22 * screenWidth,
        height: 22 * screenWidth,
        backgroundColor: '#E3E3E3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3 * screenFont,
        marginRight: 10 * screenWidth,
    },
});
export const iconPermissionListItemStyles = StyleSheet.create({
    itemBox: {
        flexDirection: 'row',
        paddingBottom: 19 * screenHeight,
    },
    iconBox: {
        width: 40 * screenWidth,
        height: 40 * screenHeight,
        backgroundColor: '#E3E3E3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40 * screenFont,
        marginRight: 18 * screenWidth,
    },
    imageSize: {
        width: 25 * screenWidth,
        height: 25 * screenWidth,
    },
    textBox: {
        justifyContent: 'center',
    },
});
export const headerStyles = StyleSheet.create({
    searchHeaderBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16 * screenHeight,
    },
    searchTitleBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
