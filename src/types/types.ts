import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { ReactElement } from 'react';
import { FlexAlignType, KeyboardType, TextStyle } from 'react-native/types';

//COMMON
export type KeywordListTypes = {
    id: number;
    keywordEnum: string;
    keywordName: string;
    vehicleType: string | null;
}[];

// ATOM
export type userTokenTypes = {
    accessToken: string;
    refreshToken: string;
};
export type joinMemberTypes = {
    email: string;
    password: string;
    nickName: string;
};
export type emailAuthAtomTypes = {
    number: number;
    isOk: boolean;
};

// NAVIGATION
export type RootStackParamList = {
    NotLoginHome: undefined;
    JoinMember: undefined;
    Login: undefined;
    RequestPermission: undefined;
    InitKeyword: undefined;
    ServiceHome: undefined;
    BottomTab: undefined;
};
export type BottomTabParamList = {
    ServiceHome: undefined;
    Community: undefined;
    MyProfile: undefined;
};
export interface TabBarProps extends BottomTabBarProps {}

// SMALLEST
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
    borderRadius?: number;
    flex?: number;
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

// MOLECULES
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
export type IconWithMediumTextProps = {
    iconColor: string;
    text: string;
    textColor: string;
    type: string;
    name: string;
};
export type IconPermissionListItemProps = {
    iconType?: string;
    iconName?: string;
    title: string;
    explain: string;
    image?: string;
};

// ORGANISMS
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
export type KeywordsListProps = {
    type: string;
    list: KeywordListTypes;
    isCheck: boolean[];
    checkKeywordHandler: (list: string, index: number, id: number) => void;
};

// TEMPLATES
export type InputEmailTemplateProps = {
    onPressNextStep: () => void;
    resetTimeHandler: () => void;
    didAuthEmail: () => void;
};
export type EmailWithPasswordProps = {
    onPressNextStep: () => void;
};
export interface NicknameTemplateProps extends EmailWithPasswordProps {}
export interface CompletedJoinTemplateProps extends EmailWithPasswordProps {}
export type RequestPemissionTemplateProps = {
    moveToScreen: (state: string) => void;
};
export type EmailLoginTemplateProps = {
    moveServiceHomeHandler: (state: string) => void;
};
export interface InitLikeKeywordTemplateProps extends RequestPemissionTemplateProps {}
