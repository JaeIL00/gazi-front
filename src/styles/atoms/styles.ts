import { FlexAlignType, StyleSheet, TextStyle } from 'react-native';
import { screenFont, screenHeight, screenWidth } from '../../utils/changeStyleSize';
import colors from '../../constants/colors';

export const touchButtonStyles = (
    width?: number | string,
    height?: number | string,
    backgroundColor?: string,
    paddingHorizontal?: number,
    paddingVertical?: number,
    alignSelf?: FlexAlignType,
    alignItems?: FlexAlignType,
    borderColor?: string,
    borderWidth?: number,
    borderRadius?: number,
    borderBottomWidth?: number,
    flex?: number,
    marginLeft?: number,
) =>
    StyleSheet.create({
        container: {
            width: typeof width === 'string' ? width : width && width * screenWidth,
            height: typeof height === 'string' ? height : height && height * screenHeight,
            backgroundColor: backgroundColor,
            paddingHorizontal: paddingHorizontal && paddingHorizontal * screenWidth,
            paddingVertical: paddingVertical && paddingVertical * screenHeight,
            borderRadius: borderRadius ? borderRadius * screenFont : 0,
            alignSelf: alignSelf,
            alignItems: alignItems ? alignItems : 'center',
            justifyContent: 'center',
            borderColor: borderColor && borderColor,
            borderWidth: borderWidth && borderWidth * screenFont,
            borderBottomWidth: borderBottomWidth && borderBottomWidth * screenFont,
            flex: flex && flex,
            marginLeft: marginLeft && marginLeft * screenWidth,
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
        common: {
            flex: 1,
            fontSize: fontSize ? fontSize * screenFont : 16 * screenFont,
            width: width && width * screenWidth,
            height: height && height * screenHeight,
            paddingVertical: 0,
        },
        input: {
            color: colors.TXT_BLACK,
            fontFamily: fontFamily ? fontFamily : undefined,
        },
        placeholder: {
            color: colors.TXT_LIGHTGRAY,
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
            minHeight: height && height * screenHeight,
            textAlignVertical: 'top',
        },
        input: {
            color: colors.TXT_BLACK,
            fontFamily: fontFamily ? fontFamily : undefined,
        },
        placeholder: {
            color: colors.TXT_LIGHTGRAY,
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
