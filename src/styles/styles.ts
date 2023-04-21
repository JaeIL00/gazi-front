import { StyleSheet } from 'react-native';
import { FlexAlignType } from 'react-native/types';
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
    borderColor: string | undefined,
    borderWidth: number | undefined,
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
            borderColor: borderColor && borderColor,
            borderWidth: borderWidth && widthPercentage(borderWidth),
        },
    });
export const singleLineInputStyles = (
    fontSize: number | undefined,
    width: number | undefined,
    height: number | undefined,
) =>
    StyleSheet.create({
        input: {
            fontSize: fontSize,
            width: width,
            height: height,
            color: Colors.TXT_BLACK,
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
export const SpacerStyles = (height: number) =>
    StyleSheet.create({
        height: {
            height: hegithPercentage(height),
        },
    });
export const appTextStyles = (size: number, color: string) =>
    StyleSheet.create({
        textStyle: {
            fontFamily: 'Pretendard-SemiBold',
            fontSize: fontPercentage(size),
            color: color,
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
export const normalTextStyles = StyleSheet.create({
    family: {
        fontFamily: 'Pretendard-Regular',
    },
});

// Molecules
// Molecules
export const loginTextInputStyles = StyleSheet.create({
    inputBox: {
        borderRadius: fontPercentage(5),
        height: hegithPercentage(48),
        backgroundColor: Colors.LIGHTGRAY,
        paddingHorizontal: widthPercentage(16),
        justifyContent: 'center',
    },
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

// Organisms
// Organisms
export const moveBackWithPageTitleStyles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 30,
        paddingBottom: 43,
    },
});
export const serviceAgreementStyles = StyleSheet.create({
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
        backgroundColor: '#E3E3E3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: fontPercentage(3),
        marginRight: widthPercentage(10),
    },
});

// Templates
// Templates
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
    buttonBox: {
        position: 'absolute',
        width: '100%',
        bottom: hegithPercentage(41),
    },
});

// Screen
// Screen
export const joinMemberScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    inner: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
export const notLoginHomeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hegithPercentage(99),
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
    },
});
