import { ReactElement } from 'react';
import { FlexAlignType, KeyboardType } from 'react-native/types';

// Navigation
// Navigation
export type RootStackParamList = {
    NotLoginHome: undefined;
    JoinMember: undefined;
};
export type NotLoginRouteName = 'JoinMember';

// Smallest
// Smallest
export type TouchButtonProps = {
    children?: ReactElement;
    onPress: () => void;
    width?: number;
    height?: number;
    backgroundColor?: string;
    paddingHorizontal?: number;
    paddingVertical?: number;
    alignSelf?: FlexAlignType;
};
export type SingleLineInputProps = {
    value: string;
    placeholder: string;
    keyboardType?: KeyboardType;
    fontSize?: number;
    maxLength?: number;
    secureTextEntry?: boolean;
    width?: number;
    height?: number;
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

// Molecules
// Molecules
export interface LoginTextInputProps extends SingleLineInputProps {
    title: string;
    firstErrorText?: string;
    firstErrorTextStyle?: boolean;
    secondErrorText?: string;
    secondErrorTextStyle?: boolean;
}
export interface PageTitleWithExplainProps {
    title: string;
    explainText?: string;
    explainSize?: number;
}
export interface MoveStepButtonProps extends TouchButtonProps {
    text: string;
    textColor: string;
}

// Organisms
// Organisms
export type InputEmailPwProps = {
    data: {
        email: string;
        password: string;
        nickname: string;
        keyword: string;
    };
    isEmail?: boolean;
    isPasswordLeng?: boolean;
    isPasswordReg?: boolean;
    onChangeEmailText: (text: string) => void;
    onChangePasswordText: (text: string) => void;
};
export interface MoveBackWithPageTitleProps extends PageTitleWithExplainProps {
    onPress: () => void;
}

// templates
// templates
export type EmailWithPasswordProps = {
    onPressNextStep: () => void;
};
export interface NicknameTemplateProps extends EmailWithPasswordProps {}
