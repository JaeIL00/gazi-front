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
    borderBottomWidth: number | undefined,
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
            borderBottomWidth: borderBottomWidth && borderBottomWidth * screenFont,
            flex: flex && flex,
        },
    });
export const singleLineInputStyles = (
    fontSize: number | undefined,
    width: number | undefined,
    height: number | undefined,
    fontFamily: string | null,
    placeFontFamily: string | null,
) =>
    StyleSheet.create({
        input: {
            fontSize: fontSize ? fontSize * screenFont : 16 * screenFont,
            width: width && width * screenWidth,
            height: height && height * screenHeight,
            color: Colors.TXT_BLACK,
            fontFamily: fontFamily ? fontFamily : undefined,
        },
        placeholder: {
            fontSize: fontSize ? fontSize * screenFont : 14 * screenFont,
            color: Colors.TXT_LIGHTGRAY,
            fontFamily: placeFontFamily ? placeFontFamily : undefined,
        },
    });

export const multiLineInputStyles = (
    fontSize: number | undefined,
    width: number | undefined,
    height: number | undefined,
    fontFamily: string | null,
    placeFontFamily: string | null,
) =>
    StyleSheet.create({
        common: {
            fontSize: fontSize ? fontSize * screenFont : 16 * screenFont,
            height: height && height * screenHeight,
            textAlignVertical: 'top',
        },
        input: {
            color: Colors.TXT_BLACK,
            fontFamily: fontFamily ? fontFamily : undefined,
        },
        placeholder: {
            color: Colors.TXT_LIGHTGRAY,
            fontFamily: placeFontFamily ? placeFontFamily : undefined,
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
        width: '100%',
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
const NEAR_LIST_HEIGHT = 565 * screenHeight;
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
        height: NEAR_LIST_HEIGHT,
        zIndex: 1,
    },
    listTouchBox: {
        position: 'absolute',
        top: 20 * screenHeight,
        width: '100%',
        height: NEAR_LIST_HEIGHT,
        paddingHorizontal: 16 * screenWidth,
        marginTop: -1,
        zIndex: 1,
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
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
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
    textBox: {
        width: '68%',
    },
    postImage: {
        width: 77 * screenWidth,
        height: 77 * screenWidth,
        borderRadius: 5 * screenFont,
    },
});
export const searchLocationStyles = StyleSheet.create({
    inputContainer: {
        paddingHorizontal: 16 * screenWidth,
    },
    inputBox: {
        width: '100%',
        borderWidth: 1 * screenFont,
        borderColor: '#D4D4D4',
        borderRadius: 28 * screenFont,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20 * screenWidth,
    },
    listItemBox: {
        flexDirection: 'row',
        width: '100%',
    },
    resultIcon: {
        width: 25 * screenWidth,
        height: 25 * screenWidth,
        marginRight: 9.5 * screenWidth,
    },
});
export const writePostAddKeywordStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND_DEFAULT,
        paddingHorizontal: 16 * screenWidth,
    },
    headerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 17 * screenHeight,
        paddingBottom: 42 * screenHeight,
    },
    titleBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    keywordListBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nextBottonBox: {
        width: '100%',
        position: 'absolute',
        bottom: 42 * screenHeight,
        alignSelf: 'center',
    },
});
export const writePhotoStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16 * screenWidth,
        position: 'absolute',
        bottom: 26 * screenHeight,
    },
    cameraIcon: {
        width: 30 * screenWidth,
        height: 30 * screenWidth,
    },
    previewBox: {
        width: 71 * screenWidth,
        height: 71 * screenWidth,
        marginLeft: 6.5 * screenWidth,
        borderWidth: 1 * screenFont,
        borderRadius: 10.9 * screenFont,
        borderColor: '#E3E3E3',
        overflow: 'hidden',
        backgroundColor: '#F6F5F5',
    },
    imageSize: {
        width: '100%',
        height: '100%',
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
    container: {
        flex: 1,
    },
    choicePermission: {
        paddingBottom: 17 * screenHeight,
    },
    lineBar: {
        borderTopWidth: 1 * screenFont,
        borderColor: '#EBEBEB',
    },
    buttonBox: {
        position: 'absolute',
        bottom: 42 * screenHeight,
        width: '100%',
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
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4 * screenHeight,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4 * screenFont,
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
export const writePostTemplateStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BACKGROUND_DEFAULT,
        flex: 1,
    },
    headerBox: {
        paddingHorizontal: 16 * screenWidth,
        paddingBottom: 12 * screenHeight,
        borderWidth: 1 * screenFont,
        borderColor: '#EBEBEB',
    },
    headerNavigateBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 17 * screenHeight,
        paddingBottom: 26 * screenHeight,
    },
    settingBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.BACKGROUND_DEFAULT,
    },
    searchHeaderBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16 * screenWidth,
        paddingTop: 17 * screenHeight,
    },
    searchTitleBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchToggleIcon: {
        width: 10 * screenWidth,
        height: 10 * screenWidth,
    },
    locationIcon: {
        width: 16 * screenWidth,
        height: 16 * screenWidth,
    },
    inputBox: {
        paddingHorizontal: 16 * screenWidth,
        height: 300 * screenHeight,
        paddingTop: 10 * screenHeight,
    },
    errorModalBack: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorModalBox: {
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        padding: 24 * screenWidth,
        borderRadius: 12 * screenFont,
    },
});
export const myProfileTemplateStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
    },
    profileBox: {
        backgroundColor: '#2B2B2B',
        paddingHorizontal: 16 * screenWidth,
        paddingTop: 43 * screenHeight,
        paddingBottom: 27 * screenHeight,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileCameraBox: {
        backgroundColor: '#5A5A5ACC',
        width: 20 * screenWidth,
        height: 20 * screenWidth,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20 * screenFont,
        bottom: 0,
        right: 0,
    },
    profileTextBox: {
        paddingLeft: 16 * screenWidth,
    },
    profileNameBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 1 * screenHeight,
    },
    penIcon: {
        width: 12 * screenWidth,
        height: 12 * screenWidth,
        marginLeft: 4 * screenWidth,
    },
    tabListBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    tabTitleBox: {
        backgroundColor: Colors.BACKGROUND_DEFAULT,
        paddingVertical: 10 * screenHeight,
        paddingHorizontal: 16 * screenWidth,
    },
    versionBox: {
        borderBottomWidth: 1 * screenFont,
        borderColor: '#EBEBEB',
        paddingHorizontal: 16 * screenWidth,
        paddingVertical: 16 * screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

// SCREEN
export const seviceHomeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export const myProfileScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
