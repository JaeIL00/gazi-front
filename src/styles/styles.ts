import { StyleSheet } from 'react-native';
import { FlexAlignType, TextStyle } from 'react-native/types';
import Colors from './Colors';
import { fontScreen, heightScreen, widthScreen } from '../utils/changeStyleSize';

// APP
export const appStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export const globalDefaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16 * widthScreen,
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
            width: width && width * widthScreen,
            height: height && height * heightScreen,
            backgroundColor: backgroundColor,
            paddingHorizontal: paddingHorizontal && paddingHorizontal * widthScreen,
            paddingVertical: paddingVertical && paddingVertical * heightScreen,
            borderRadius: borderRadius ? borderRadius * fontScreen : 5 * fontScreen,
            alignSelf: alignSelf,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: borderColor && borderColor,
            borderWidth: borderWidth && borderWidth * fontScreen,
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
            fontSize: fontSize && fontSize * fontScreen,
            width: width && width * widthScreen,
            height: height && height * heightScreen,
            color: Colors.TXT_BLACK,
            fontFamily: 'Pretendard-Medium',
        },
    });
export const SpacerStyles = (height: number | undefined, width: number | undefined) =>
    StyleSheet.create({
        size: {
            height: height && height * heightScreen,
            width: width && width * widthScreen,
        },
    });
export const appTextStyles = (size: number, color: string, textAlign: TextStyle['textAlign'] | undefined) =>
    StyleSheet.create({
        textStyle: {
            fontSize: size * fontScreen,
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
            lineHeight: lineHeight && 19 * fontScreen,
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
        borderRadius: 5 * fontScreen,
        height: 48 * heightScreen,
        backgroundColor: Colors.LIGHTGRAY,
        paddingHorizontal: 16 * widthScreen,
        justifyContent: 'center',
    },
});
export const agreementCheckListItemStyles = StyleSheet.create({
    agreeBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10 * widthScreen,
        paddingVertical: 12 * heightScreen,
    },
    agreeTitleBox: {
        flexDirection: 'row',
        width: '100%',
    },
    checkBox: {
        width: 22 * widthScreen,
        height: 22 * widthScreen,
        backgroundColor: '#E3E3E3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3 * fontScreen,
        marginRight: 10 * widthScreen,
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
        paddingBottom: 16 * heightScreen,
    },
    iconBox: {
        width: 40 * widthScreen,
        height: 40 * heightScreen,
        backgroundColor: '#E3E3E3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40 * fontScreen,
        marginRight: 18 * widthScreen,
    },
    imageSize: {
        width: 25 * widthScreen,
        height: 25 * widthScreen,
    },
    textBox: {
        justifyContent: 'center',
    },
});

// ORGANISMS
export const moveBackWithPageTitleStyles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 30 * heightScreen,
        paddingBottom: 43 * heightScreen,
    },
});
export const serviceAgreementStyles = StyleSheet.create({
    animateInner: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 14 * fontScreen,
        backgroundColor: Colors.WHITE,
        paddingTop: 33 * heightScreen,
        paddingHorizontal: 16 * widthScreen,
    },
    allAgreeBox: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10 * widthScreen,
        paddingVertical: 13 * heightScreen,
    },
    agreeBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10 * widthScreen,
        paddingVertical: 12 * heightScreen,
    },
    agreeTitleBox: {
        flexDirection: 'row',
        width: '100%',
    },
    checkBox: {
        width: 22 * widthScreen,
        height: 22 * widthScreen,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3 * fontScreen,
        marginRight: 10 * widthScreen,
    },
    listBox: {
        paddingTop: 3 * heightScreen,
        paddingBottom: 158 * heightScreen,
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
        borderRadius: 14 * fontScreen,
        backgroundColor: Colors.WHITE,
        paddingTop: 32 * heightScreen,
        paddingHorizontal: 16 * widthScreen,
    },
    backButtonBox: {
        paddingBottom: 28 * heightScreen,
    },
    inputBox: {
        height: 48 * heightScreen,
        backgroundColor: Colors.LIGHTGRAY,
        borderRadius: 5 * fontScreen,
        justifyContent: 'flex-start',
        paddingHorizontal: 16 * widthScreen,
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
        paddingLeft: 10 * widthScreen,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        bottom: -21 * heightScreen,
    },
    retryTextBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    underBar: {
        borderBottomColor: Colors.TXT_GRAY,
        borderBottomWidth: 2 * fontScreen,
    },
    finishButton: {
        width: '100%',
    },
});
export const failLocationPermisionModalStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        borderRadius: 12 * fontScreen,
        alignItems: 'center',
        paddingTop: 32 * heightScreen,
        paddingBottom: 24 * heightScreen,
        paddingHorizontal: 24 * widthScreen,
        marginHorizontal: 36 * widthScreen,
    },
    textBox: {
        alignItems: 'center',
        paddingHorizontal: 12 * widthScreen,
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
        marginRight: 6 * widthScreen,
        marginBottom: 12 * heightScreen,
    },
});
export const tabBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20 * widthScreen,
        paddingVertical: 8 * widthScreen,
        backgroundColor: Colors.BACKGROUND_DEFAULT,
        borderTopWidth: 0.5 * fontScreen,
        borderColor: Colors.BTN_GRAY,
    },
    image: {
        width: 24 * widthScreen,
        height: 24 * widthScreen,
    },
    contentBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export const nearbyPostListModalStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '120%',
        backgroundColor: Colors.BACKGROUND_DEFAULT,
        borderTopStartRadius: 14 * fontScreen,
        borderTopEndRadius: 14 * fontScreen,
        paddingHorizontal: 16 * widthScreen,
        zIndex: 1,
    },
    slideBarBox: {
        alignItems: 'center',
        paddingTop: 12 * heightScreen,
    },
    slideBar: {
        width: 24 * widthScreen,
        height: 4,
        backgroundColor: Colors.BTN_GRAY,
        borderRadius: 2 * fontScreen,
    },
    titleBox: {
        paddingVertical: 16,
    },
    grayBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        position: 'absolute',
        top: 0,
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
        width: 103 * widthScreen,
        height: 103 * widthScreen,
    },
    markerRange: {
        position: 'absolute',
        width: 103 * widthScreen,
        height: 103 * widthScreen,
    },
    marker: {
        width: 27 * widthScreen,
        height: 27 * widthScreen,
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
        borderRadius: 5 * widthScreen,
        height: 48 * heightScreen,
        backgroundColor: Colors.LIGHTGRAY,
        paddingHorizontal: 16 * widthScreen,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        paddingLeft: 10 * widthScreen,
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
        paddingLeft: 10 * widthScreen,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
export const emailWithPasswordTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emainTextBox: {
        height: 48 * heightScreen,
        paddingLeft: 16 * widthScreen,
        backgroundColor: Colors.LIGHTGRAY,
        borderRadius: 5 * fontScreen,
        justifyContent: 'center',
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10 * widthScreen,
    },
});
export const notLoginTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 99 * heightScreen,
    },
    buttonBox: {
        width: '100%',
        position: 'absolute',
        bottom: 70 * heightScreen,
    },
});
export const requestPemissionTemplateStyles = StyleSheet.create({
    choicePermission: {
        paddingTop: 13 * heightScreen,
        paddingBottom: 21 * heightScreen,
    },
    lineBar: {
        borderTopWidth: 1 * fontScreen,
        borderColor: '#EBEBEB',
    },
});
export const emailLoginTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    underBar: {
        borderBottomColor: Colors.TXT_GRAY,
        borderBottomWidth: 2 * fontScreen,
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        paddingLeft: 10 * widthScreen,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        bottom: -21 * heightScreen,
    },
});
export const initLikeKeywordTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    skipBox: {
        position: 'absolute',
        top: 30 * heightScreen,
        right: 0,
    },
    headerBox: {
        zIndex: 1,
    },
    upLinear: {
        width: '100%',
        height: 32 * heightScreen,
        position: 'absolute',
        bottom: -32 * heightScreen,
    },
    scrollBox: {
        paddingTop: 35 * heightScreen,
        paddingBottom: 168 * heightScreen,
    },
    downLinearBox: {
        height: 84 * heightScreen,
    },
    downLinear: {
        width: '100%',
        height: 32 * heightScreen,
        position: 'absolute',
        top: -32 * heightScreen,
    },
    button: {
        width: '100%',
        position: 'absolute',
        bottom: 42 * heightScreen,
    },
    androidShadow: {
        width: '100%',
        height: 42 * heightScreen,
        borderRadius: 5 * fontScreen,
        position: 'absolute',
        bottom: -4 * widthScreen,
    },
});
export const completedJoinTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: '100%',
        position: 'absolute',
        bottom: 42 * heightScreen,
    },
});
export const seviceHomeTemplateStyles = StyleSheet.create({
    toggleButtonBox: {
        position: 'absolute',
        bottom: 94 * heightScreen,
        right: 16 * widthScreen,
    },
    locationIcon: {
        width: 20 * widthScreen,
        height: 20 * widthScreen,
    },
    writeIcon: {
        width: 14.5 * widthScreen,
        height: 16 * heightScreen,
    },
});

// SCREEN
export const seviceHomeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
