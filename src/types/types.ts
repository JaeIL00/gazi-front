import { ReactElement } from 'react';
import { FlexAlignType, KeyboardType, TextStyle } from 'react-native/types';

// Navigation
// Navigation
export type RootStackParamList = {
    NotLoginHome: undefined;
    JoinMember: undefined;
    Login: undefined;
    RequestPermission: undefined;
    InitKeyword: undefined;
};

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
    borderColor?: string;
    borderWidth?: number;
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
export type AppTextProps = {
    text: string;
    size: number;
    color: string;
    textAlign?: TextStyle['textAlign'];
    lineHeight?: number;
};
export type ModalBackgroundProps = {
    children?: ReactElement;
};

// Molecules
// Molecules
export interface LoginTextInputProps extends SingleLineInputProps {
    title: string;
}
export interface PageTitleWithExplainProps {
    oneTitle: string;
    twoTitle: string;
    explainText?: string;
    explainSize?: number;
}
export interface TextButtonProps extends TouchButtonProps {
    text: string;
    textColor: string;
    fontSize: number;
}
export type AgreementCheckListItemProps = {
    text: string;
    check: boolean;
    index: number;
    onPressCheckList: (index: number) => void;
};
export interface IconWithMediumTextProps extends IconsProps {
    iconColor: string;
    text: string;
    textColor: string;
}
export type IconPermissionListItemProps = {
    iconType?: string;
    iconName?: string;
    title: string;
    explain: string;
    image?: string;
};

// Organisms
// Organisms
export interface MoveBackWithPageTitleProps extends PageTitleWithExplainProps {
    onPress: () => void;
}
export type ServiceAgreementProps = {
    finishSlideComponentHandler: (state: string) => void;
};
export interface AuthEmailProps extends ServiceAgreementProps {
    min: number;
    sec: number;
    resetTimeHandler: () => void;
}
export type FailLocationPermisionModalProps = {
    onPressModalButton: (state: string) => void;
};

// templates
// templates
export type InputEmailTemplateProps = {
    onPressNextStep: () => void;
    resetTimeHandler: () => void;
};
export type EmailWithPasswordProps = {
    onPressNextStep: () => void;
};
export interface NicknameTemplateProps extends EmailWithPasswordProps {}
export interface CompletedJoinTemplateProps extends EmailWithPasswordProps {}
export type RequestPemissionTemplateProps = {
    moveToScreen: (state: string) => void;
};
