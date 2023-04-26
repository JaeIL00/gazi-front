import { StyleSheet } from 'react-native';
import { FlexAlignType, TextStyle } from 'react-native/types';
import Colors from './Colors';
import { hegithPercentage, widthPercentage, fontPercentage } from '../utils/changeStyleSize';

// APP
export const appStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export const globalDefaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: widthPercentage(16),
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
            width: width && widthPercentage(width),
            height: height && hegithPercentage(height),
            backgroundColor: backgroundColor,
            paddingHorizontal: paddingHorizontal && widthPercentage(paddingHorizontal),
            paddingVertical: paddingVertical && hegithPercentage(paddingVertical),
            borderRadius: borderRadius ? fontPercentage(borderRadius) : fontPercentage(5),
            alignSelf: alignSelf,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: borderColor && borderColor,
            borderWidth: borderWidth && widthPercentage(borderWidth),
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
            fontSize: fontSize && fontPercentage(fontSize),
            width: width && widthPercentage(width),
            height: height && hegithPercentage(height),
            color: Colors.TXT_BLACK,
            fontFamily: 'Pretendard-Medium',
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
export const SpacerStyles = (height: number | undefined, width: number | undefined) =>
    StyleSheet.create({
        size: {
            height: height && hegithPercentage(height),
            width: width && widthPercentage(width),
        },
    });
export const appTextStyles = (size: number, color: string, textAlign: TextStyle['textAlign'] | undefined) =>
    StyleSheet.create({
        textStyle: {
            fontSize: fontPercentage(size),
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
            lineHeight: lineHeight && fontPercentage(19),
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
        borderRadius: fontPercentage(5),
        height: hegithPercentage(48),
        backgroundColor: Colors.LIGHTGRAY,
        paddingHorizontal: widthPercentage(16),
        justifyContent: 'center',
    },
});
export const agreementCheckListItemStyles = StyleSheet.create({
    agreeBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: widthPercentage(10),
        paddingVertical: hegithPercentage(12),
    },
    agreeTitleBox: {
        flexDirection: 'row',
        width: '100%',
    },
    checkBox: {
        width: widthPercentage(22),
        height: widthPercentage(22),
        backgroundColor: '#E3E3E3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: fontPercentage(3),
        marginRight: widthPercentage(10),
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
        paddingBottom: hegithPercentage(16),
    },
    iconBox: {
        width: widthPercentage(40),
        height: hegithPercentage(40),
        backgroundColor: '#E3E3E3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: fontPercentage(40),
        marginRight: widthPercentage(18),
    },
    imageSize: {
        width: widthPercentage(25),
        height: widthPercentage(25),
    },
    textBox: {
        justifyContent: 'center',
    },
});

// ORGANISMS
export const moveBackWithPageTitleStyles = StyleSheet.create({
    buttonContainer: {
        paddingTop: hegithPercentage(30),
        paddingBottom: hegithPercentage(43),
    },
});
export const serviceAgreementStyles = StyleSheet.create({
    animateInner: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: fontPercentage(14),
        backgroundColor: Colors.WHITE,
        paddingTop: hegithPercentage(33),
        paddingHorizontal: widthPercentage(16),
    },
    allAgreeBox: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: widthPercentage(10),
        paddingVertical: hegithPercentage(13),
    },
    agreeBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: widthPercentage(10),
        paddingVertical: hegithPercentage(12),
    },
    agreeTitleBox: {
        flexDirection: 'row',
        width: '100%',
    },
    checkBox: {
        width: widthPercentage(22),
        height: widthPercentage(22),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: fontPercentage(3),
        marginRight: widthPercentage(10),
    },
    listBox: {
        paddingTop: hegithPercentage(3),
        paddingBottom: hegithPercentage(158),
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
        borderRadius: fontPercentage(14),
        backgroundColor: Colors.WHITE,
        paddingTop: hegithPercentage(32),
        paddingHorizontal: widthPercentage(16),
    },
    backButtonBox: {
        paddingBottom: hegithPercentage(28),
    },
    inputBox: {
        height: hegithPercentage(48),
        backgroundColor: Colors.LIGHTGRAY,
        borderRadius: fontPercentage(5),
        justifyContent: 'flex-start',
        paddingHorizontal: widthPercentage(16),
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
        paddingLeft: widthPercentage(10),
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        bottom: hegithPercentage(-21),
    },
    retryTextBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    underBar: {
        borderBottomColor: Colors.TXT_GRAY,
        borderBottomWidth: fontPercentage(2),
    },
    finishButton: {
        width: '100%',
    },
});
export const failLocationPermisionModalStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        borderRadius: fontPercentage(12),
        alignItems: 'center',
        paddingTop: hegithPercentage(32),
        paddingBottom: hegithPercentage(24),
        paddingHorizontal: widthPercentage(24),
        marginHorizontal: widthPercentage(36),
    },
    textBox: {
        alignItems: 'center',
        paddingHorizontal: widthPercentage(12),
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
        marginRight: widthPercentage(6),
        marginBottom: hegithPercentage(12),
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
        borderRadius: fontPercentage(5),
        height: hegithPercentage(48),
        backgroundColor: Colors.LIGHTGRAY,
        paddingHorizontal: widthPercentage(16),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        paddingLeft: widthPercentage(10),
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
        paddingLeft: widthPercentage(10),
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
export const emailWithPasswordTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emainTextBox: {
        height: hegithPercentage(48),
        paddingLeft: widthPercentage(16),
        backgroundColor: Colors.LIGHTGRAY,
        borderRadius: fontPercentage(5),
        justifyContent: 'center',
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: widthPercentage(10),
    },
});
export const notLoginTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hegithPercentage(99),
    },
    buttonBox: {
        width: '100%',
        position: 'absolute',
        bottom: hegithPercentage(70),
    },
});
export const requestPemissionTemplateStyles = StyleSheet.create({
    choicePermission: {
        paddingTop: hegithPercentage(13),
        paddingBottom: hegithPercentage(21),
    },
    lineBar: {
        borderTopWidth: fontPercentage(1),
        borderColor: '#EBEBEB',
    },
});
export const emailLoginTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    underBar: {
        borderBottomColor: Colors.TXT_GRAY,
        borderBottomWidth: fontPercentage(2),
    },
    emailErrorTextBox: {
        flexDirection: 'row',
        paddingLeft: widthPercentage(10),
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        bottom: hegithPercentage(-21),
    },
});
export const initLikeKeywordTemplateStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    linear: {
        height: hegithPercentage(42),
    },
});
