import { FlexAlignType, PressableProps, TextInputProps, TextProps, TextStyle } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';

export interface TouchButtonProps extends PressableProps {
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
    marginLeft?: number;
}

export interface SingleLineInputProps extends TextInputProps {
    fontSize?: number;
    width?: number;
    height?: number;
    fontFamily?: string | null;
    placeFontFamily?: string | null;
    isFocus?: boolean;
}
export interface MultiLineInputProps extends SingleLineInputProps {
    inputFocusBlur: boolean;
    inputFocusBlurHandler: (state: string) => void;
}
export interface IconsCompProps extends IconProps {
    type: string;
}
export interface AppTextProps extends TextProps {
    text: string;
    size: number;
    color: string;
    textAlign?: TextStyle['textAlign'];
    lineHeight?: number;
}
