import { ReactElement } from 'react';
import { FlexAlignType, KeyboardType, TextStyle } from 'react-native';

export type TouchButtonProps = {
    children?: ReactElement;
    onPressIn?: () => void;
    onPress?: () => void;
    width?: number | string;
    height?: number | string;
    backgroundColor?: string;
    paddingHorizontal?: number;
    paddingVertical?: number;
    alignSelf?: FlexAlignType;
    alignItems?: FlexAlignType;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    borderBottomWidth?: number;
    flex?: number;
    hitSlop?:
        | {
              top?: number;
              bottom?: number;
              left?: number;
              right?: number;
          }
        | number;
    marginLeft?: number;
};

export type SingleLineInputProps = {
    value: string;
    placeholder?: string;
    keyboardType?: KeyboardType;
    fontSize?: number;
    maxLength?: number;
    secureTextEntry?: boolean;
    width?: number;
    height?: number;
    fontFamily?: string | null;
    placeFontFamily?: string | null;
    isFocus?: boolean;
    onChangeText: (text: string) => void;
    onSubmitEditing?: () => void;
};
export type MultiLineInputProps = {
    value: string;
    placeholder: string;
    fontSize?: number;
    maxLength?: number;
    width?: number;
    height?: number;
    fontFamily?: string | null;
    placeFontFamily?: string | null;
    inputFocusBlur: boolean;
    inputFocusBlurHandler: (state: string) => void;
    onChangeText: (text: string) => void;
    onSubmitEditing?: () => void;
};
export type IconsProps = {
    type: string;
    name: string;
    size: number;
    color: string;
};
export type PageTitleProps = {
    title: string;
};
export type GrayTextProps = {
    text: string;
    size: number;
};
export type AppTextProps = {
    text: string;
    size: number;
    color: string;
    textAlign?: TextStyle['textAlign'];
    lineHeight?: number;
    numberOfLines?: number;
};
export type ModalBackgroundProps = {
    children: ReactElement;
    visible: boolean;
    onRequestClose?: () => void;
};
