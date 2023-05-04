import { StyleSheet } from 'react-native';
import { FlexAlignType, TextStyle } from 'react-native/types';
import Colors from './Colors';
import { screenFont, screenHeight, screenWidth } from '../utils/changeStyleSize';

// APP
export const appStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export const globalDefaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16 * screenWidth,
        backgroundColor: Colors.BACKGROUND_DEFAULT,
    },
});
export const nextStepButtonPosition = StyleSheet.create({
    button: {
        width: '100%',
        position: 'absolute',
    },
});

// SMALLEST
export const touchButtonStyles = (
    width: number | undefined,
    height: number | undefined,
    backgroundColor: string | undefined,
    paddingHorizontal: number | undefined,
    paddingVertical: number | undefined,
    alignSelf: FlexAlignType | undefined,
    borderColor: string | undefined,
    borderWidth: number | undefined,
    borderRadius: number | undefined,
    flex: number | undefined,
) =>
    StyleSheet.create({
        container: {
            width: width && width * screenWidth,
            height: height && height * screenHeight,
            backgroundColor: backgroundColor,
            paddingHorizontal: paddingHorizontal && paddingHorizontal * screenWidth,
            paddingVertical: paddingVertical && paddingVertical * screenHeight,
            borderRadius: borderRadius ? borderRadius * screenFont : 5 * screenFont,
            alignSelf: alignSelf,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: borderColor && borderColor,
            borderWidth: borderWidth && borderWidth * screenFont,
            flex: flex && flex,
        },
    });
export const singleLineInputStyles = (
    fontSize: number | undefined,
    width: number | undefined,
    height: number | undefined,
) =>
    StyleSheet.create({
        input: {
            fontSize: fontSize && fontSize * screenFont,
            width: width && width * screenWidth,
            height: height && height * screenHeight,
            color: Colors.TXT_BLACK,
            fontFamily: 'Pretendard-Medium',
        },
        placeholder: {
            fontSize: 14 * screenFont,
            fontFamily: 'Pretendard-Regular',
        },
    });
export const SpacerStyles = (height: number | undefined, width: number | undefined) =>
    StyleSheet.create({
        size: {
            height: height && height * screenHeight,
            width: width && width * screenWidth,
        },
    });
export const appTextStyles = (size: number, color: string, textAlign: TextStyle['textAlign'] | undefined) =>
    StyleSheet.create({
        textStyle: {
            fontSize: size * screenFont,
            color: color,
            textAlign: textAlign && textAlign,
        },
    });
export const boldTextStyles = StyleSheet.create({
    family: {
        fontFamily: 'Pretendard-Bold',
    },
});
export const semiBoldTextStyles = StyleSheet.create({
    family: {
        fontFamily: 'Pretendard-SemiBold',
    },
});
export const mediumTextStyles = StyleSheet.create({
    family: {
        fontFamily: 'Pretendard-Medium',
    },
});
export const normalTextStyles = (lineHeight: number | undefined) =>
    StyleSheet.create({
        family: {
            fontFamily: 'Pretendard-Regular',
            lineHeight: lineHeight && 19 * screenFont,
        },
    });
export const modalBackgroundStyles = (width: number, height: number) =>
    StyleSheet.create({
        background: {
            flex: 1,
            position: 'absolute',
            width: width,
            height: height,
            backgroundColor: '#00000099',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

// MOLECULES
export const loginTextInputStyles = StyleSheet.create({
    inputBox: {
        borderRadius: 5 * screenFont,
        height: 48 * screenHeight,
        backgroundColor: Colors.LIGHTGRAY,
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
export const checkBoxBackground = (is: boolean) =>
    StyleSheet.create({
        color: {
            backgroundColor: is ? Colors.BLACK : '#E3E3E3',
        },
    });
export const iconPermissionListItemStyles = StyleSheet.create({
    itemBox: {
        flexDirection: 'row',
        paddingBottom: 16 * screenHeight,
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

// ORGANISMS
export const moveBackWithPageTitleStyles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 30 * screenHeight,
        paddingBottom: 43 * screenHeight,
    },
});
export const serviceAgreementStyles = StyleSheet.create({
    animateInner: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 14 * screenFont,
        backgroundColor: Colors.WHITE,
        paddingTop: 33 * screenHeight,
        paddingHorizontal: 16 * screenWidth,
    },
    allAgreeBox: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10 * screenWidth,
        paddingVertical: 13 * screenHeight,
    },
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3 * screenFont,
        marginRight: 10 * screenWidth,
    },
    listBox: {
        paddingTop: 3 * screenHeight,
        paddingBottom: 158 * screenHeight,
    },
});
export const authEmailStyles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#00000060',
    },
    animateInner: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 14 * screenFont,
        backgroundColor: Colors.WHITE,
        paddingTop: 32 * screenHeight,
        paddingHorizontal: 16 * screenWidth,
    },
    backButtonBox: {
        paddingBottom: 28 * screenHeight,
    },
    inputBox: {
        height: 48 * screenHeight,
        backgroundColor: Colors.LIGHTGRAY,
        borderRadius: 5 * screenFont,
        justifyContent: 'flex-start',
        paddingHorizontal: 16 * screenWidth,
        flexDirection: 'row',
    },
    inputRange: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    timerBox: {
        justifyContent: 'center',
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        paddingLeft: 10 * screenWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        bottom: -21 * screenHeight,
    },
    retryTextBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    underBar: {
        borderBottomColor: Colors.TXT_GRAY,
        borderBottomWidth: 2 * screenFont,
    },
    finishButton: {
        width: '100%',
    },
});
export const failLocationPermisionModalStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        borderRadius: 12 * screenFont,
        alignItems: 'center',
        paddingTop: 32 * screenHeight,
        paddingBottom: 24 * screenHeight,
        paddingHorizontal: 24 * screenWidth,
        marginHorizontal: 36 * screenWidth,
    },
    textBox: {
        alignItems: 'center',
        paddingHorizontal: 12 * screenWidth,
    },
    buttonBox: {
        width: '100%',
        flexDirection: 'row',
    },
});
export const keywordsListStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
    },
    itemBox: {
        marginRight: 6 * screenWidth,
        marginBottom: 12 * screenHeight,
    },
});
export const tabBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20 * screenWidth,
        paddingVertical: 8 * screenWidth,
        backgroundColor: Colors.BACKGROUND_DEFAULT,
        borderTopWidth: 0.5 * screenFont,
        borderColor: Colors.BTN_GRAY,
    },
    image: {
        width: 24 * screenWidth,
        height: 24 * screenWidth,
    },
    contentBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export const nearbyPostListModalStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BACKGROUND_DEFAULT,
        borderTopStartRadius: 14 * screenFont,
        borderTopEndRadius: 14 * screenFont,
        paddingHorizontal: 16 * screenWidth,
        zIndex: 1,
    },
    slideBarBox: {
        alignItems: 'center',
        paddingTop: 12 * screenHeight,
    },
    slideBar: {
        width: 24 * screenWidth,
        height: 4 * screenWidth,
        backgroundColor: Colors.BTN_GRAY,
        borderRadius: 2 * screenFont,
    },
    titleBox: {
        paddingVertical: 16 * screenHeight,
    },
    grayBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        position: 'absolute',
        top: 0,
    },
    listBox: {
        paddingHorizontal: 16 * screenWidth,
        backgroundColor: Colors.BACKGROUND_DEFAULT,
        marginTop: -1,
    },
    toggleButtonBox: {
        position: 'absolute',
        bottom: 18 * screenHeight,
        right: 16 * screenWidth,
    },
    locationIcon: {
        width: 20 * screenWidth,
        height: 20 * screenWidth,
    },
    writeIcon: {
        width: 14.5 * screenWidth,
        height: 16 * screenHeight,
    },
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
export const mapWithMarkerStyles = StyleSheet.create({
    map: {
        height: '110%',
    },
    markerBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerBoxInner: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 103 * screenWidth,
        height: 103 * screenWidth,
    },
    markerRange: {
        position: 'absolute',
        width: 103 * screenWidth,
        height: 103 * screenWidth,
    },
    marker: {
        width: 27 * screenWidth,
        height: 27 * screenWidth,
    },
    issueMarker: {
        width: 25 * screenWidth,
        height: 25 * screenWidth,
    },
});
export const postListItemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    postImage: {
        width: 77 * screenWidth,
        height: 77 * screenWidth,
        borderRadius: 5 * screenFont,
    },
});

// TEMPLATES
export const nicknameTemplateStyles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
    },
    inputBox: {
        flexDirection: 'row',
        borderRadius: 5 * screenWidth,
        height: 48 * screenHeight,
        backgroundColor: Colors.LIGHTGRAY,
        paddingHorizontal: 16 * screenWidth,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        paddingLeft: 10 * screenWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
export const inputEmailTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        paddingLeft: 10 * screenWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
export const emailWithPasswordTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emainTextBox: {
        height: 48 * screenHeight,
        paddingLeft: 16 * screenWidth,
        backgroundColor: Colors.LIGHTGRAY,
        borderRadius: 5 * screenFont,
        justifyContent: 'center',
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10 * screenWidth,
    },
});
export const notLoginTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 99 * screenHeight,
    },
    buttonBox: {
        width: '100%',
        position: 'absolute',
        bottom: 70 * screenHeight,
    },
});
export const requestPemissionTemplateStyles = StyleSheet.create({
    choicePermission: {
        paddingTop: 13 * screenHeight,
        paddingBottom: 21 * screenHeight,
    },
    lineBar: {
        borderTopWidth: 1 * screenFont,
        borderColor: '#EBEBEB',
    },
});
export const emailLoginTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    underBar: {
        borderBottomColor: Colors.TXT_GRAY,
        borderBottomWidth: 2 * screenFont,
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        paddingLeft: 10 * screenWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        bottom: -21 * screenHeight,
    },
});
export const initLikeKeywordTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    skipBox: {
        position: 'absolute',
        top: 30 * screenHeight,
        right: 0,
    },
    headerBox: {
        zIndex: 1,
    },
    upLinear: {
        width: '100%',
        height: 32 * screenHeight,
        position: 'absolute',
        bottom: -32 * screenHeight,
    },
    scrollBox: {
        paddingTop: 35 * screenHeight,
        paddingBottom: 168 * screenHeight,
    },
    downLinearBox: {
        height: 84 * screenHeight,
    },
    downLinear: {
        width: '100%',
        height: 32 * screenHeight,
        position: 'absolute',
        top: -32 * screenHeight,
    },
    button: {
        width: '100%',
        position: 'absolute',
        bottom: 42 * screenHeight,
    },
    androidShadow: {
        width: '100%',
        height: 42 * screenHeight,
        borderRadius: 5 * screenFont,
        position: 'absolute',
        bottom: -4 * screenWidth,
    },
});
export const completedJoinTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: '100%',
        position: 'absolute',
        bottom: 42 * screenHeight,
    },
});
export const seviceHomeTemplateStyles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    searchLayout: {
        position: 'absolute',
        top: 16 * screenHeight,
        width: '100%',
        height: 44 * screenHeight,
        paddingHorizontal: 16 * screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropshadow: {
        flex: 1,
        shadowColor: '#1C0B22',
        shadowOffset: {
            width: 0,
            height: 4 * screenHeight,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10 * screenFont,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.BACKGROUND_DEFAULT,
        borderRadius: 28 * screenFont,
        paddingHorizontal: 19 * screenWidth,
    },
    searchIcon: {
        width: 24 * screenWidth,
        height: 24 * screenWidth,
        marginRight: 16 * screenWidth,
    },
    bellIcon: {
        width: 30 * screenWidth,
        height: 30 * screenWidth,
        marginLeft: 8 * screenWidth,
    },
});

// SCREEN
export const seviceHomeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
