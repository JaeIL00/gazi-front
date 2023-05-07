import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { ReactElement, RefObject } from 'react';
import MapView, { Details, Region } from 'react-native-maps';
import { FlexAlignType, KeyboardType, TextStyle } from 'react-native/types';

//COMMON
export type KeywordListTypes = {
    id: number;
    keywordEnum: string;
    keywordName: string;
    vehicleType: string | null;
}[];
export type MapLocationTypes = {
    latitude: number;
    longitude: number;
};
export type MapBoundaryTypes = {
    northEast: MapLocationTypes;
    southWest: MapLocationTypes;
};
export type PostTypes = {
    title: string;
    distance: string;
    time: string;
    rePostCount: number;
    content: string;
    latitude: number;
    longitude: number;
    headKeyword: {
        id: number;
        keywordEnum: string;
        vehicleType: string;
        keywordName: string;
    };
    thumbNail: string;
    postId: number;
};

// ATOM
export type userTokenAtomTypes = {
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
    WritePost: undefined;
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
    fontFamily?: string | null;
    placeFontFamily?: string | null;
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
export type MapWithMarkerProps = {
    mapRef: RefObject<MapView>;
    currentPosition: MapLocationTypes;
    nearPostList: PostTypes[];
    isAllowLocation: boolean;
    mapRenderCompleteHandler: () => void;
    checkMapGesture: (region: Region, details: Details) => void;
    checkZoomLevelWarning: (region: Region) => void;
};
export type PostListItemProps = {
    post: PostTypes;
};
export type NearbyPostListModalProps = {
    isModalRef: React.MutableRefObject<boolean>;
    handleModalTrigger: boolean;
    nearPostList: PostTypes[];
    isBottomSheetMini: boolean;
    isBottomSheetFull: boolean;
    currentPosition: MapLocationTypes;
    mapBoundaryState: MapBoundaryTypes;
    moveToBottomSheetMini: () => void;
    moveToBottomSheetFull: (state: string) => void;
    notBottomSheetMini: () => void;
    onPressGetUserPosition: () => void;
    callNextPageHandler: () => void;
    moveToWritePost: () => void;
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
export type SeviceHomeTemplateProps = {
    isModalRef: React.MutableRefObject<boolean>;
    handleModalTrigger: boolean;
    moveToWritePost: () => void;
};
export type WritePostTemplateProps = {
    moveToScreen: (state: string) => void;
};
