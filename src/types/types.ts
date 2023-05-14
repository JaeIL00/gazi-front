import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AxiosResponse } from 'axios';
import { ReactElement, RefObject } from 'react';
import { Asset } from 'react-native-image-picker';
import MapView, { Details, Region } from 'react-native-maps';
import { FlexAlignType, KeyboardType, TextStyle } from 'react-native/types';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

//COMMON
export type KeywordListTypes = {
    id: number;
    keywordEnum: string;
    keywordName: string;
    vehicleType: string | null;
};
export type MapLocationTypes = {
    latitude: number;
    longitude: number;
};
export type MapBoundaryTypes = {
    northEast: MapLocationTypes;
    southWest: MapLocationTypes;
    isNearSearch: boolean;
};
export type PostTypes = {
    title: string;
    distance: string;
    time: string;
    rePostCount: number;
    content: string;
    latitude: number;
    longitude: number;
    headKeyword: number;
    thumbNail: string;
    postId: number;
};
export type CommentTopicTypes = {
    title: string;
    rePostCount: number;
    placeName: string;
    time: string;
    distance: string;
    backgroundMapUrl: string;
};
export type CommentTypes = {
    backgroundMapUrl: string;
    content: string;
    distance: string;
    fileList: {
        fileName: string;
        fileUrl: string;
    }[];
    keywordIdList: number[];
    like: boolean;
    likeCount: number;
    nickName: string;
    report: boolean;
    time: string;
    id: number;
};
export type LocationResultTypes = {
    business_status: string;
    formatted_address: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
        viewport: {
            northeast: {
                lat: number;
                lng: number;
            };
            southwest: {
                lat: number;
                lng: number;
            };
        };
    };
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    photos: [];
    place_id: string;
    plus_code: [];
    rating: number;
    reference: string;
    types: [];
    user_ratings_total: number;
};
export type UploadImageTypes =
    | {
          fileName: string;
          fileSize: null | number;
          height: null | number;
          type: string;
          uri: string;
          width: null | number;
      }[]
    | Asset[];
export type PostDto = {
    title: string;
    placeName: string;
    content: string;
    latitude: number | null;
    longitude: number | null;
    keywordIdList: number[] | null;
    headKeywordId: number | null;
};
export type CommentReqTypes = {
    postId: number;
    content: string;
    latitude: number;
    longitude: number;
    keywordIdList: number[];
};
export type WritePostTypes = {
    dto: PostDto;
    files: Asset[];
    thumbnail: Asset | null;
    backgroundMap: string;
};
export type MyProfileTabTypes = {
    text: string;
    screen: string | null;
    icon: boolean;
    version: boolean;
    tab: boolean;
    borderLine: boolean;
};
export type MyLikeKeywordTypes = {
    id: number;
    keywordEnum: string;
    vehicle: string | null;
    keywordName: string;
};

// ATOM
export type userTokenAtomTypes = {
    accessToken: string;
    refreshToken: string;
};
export type userInfoAtomTypes = {
    memberId: number | null;
    nickname: string;
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
    BottomTab?: {
        screen: string;
    };
    WritePostOrComment:
        | {
              title: string;
              rePostCount: number;
              time: string;
              postId: number;
          }
        | undefined;
    EditNickname: undefined;
    AccountManagement: undefined;
    LikeKeywordSetting: undefined;
    Policies: undefined;
    ThreadItem: {
        postId: number;
    };
    MyPostComment: undefined;
    ChangePassword: undefined;
    DeleteMember: undefined;
    None: undefined;
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
    webViewHandler: (index: number) => void;
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
export type HeaderMoleculeProps = {
    isPaddingHorizontal: boolean;
    isWorkDone?: boolean;
    isNextStep: boolean;
    headerFinish: boolean;
    title: string;
    finishText: string;
    background: string;
    backHandler: (state: string) => void;
    finishFunction?: () => void;
};

// ORGANISMS
export interface MoveBackWithPageTitleProps extends PageTitleWithExplainProps {
    onPress: () => void;
}
export type ServiceAgreementProps = {
    finishSlideComponentHandler: (state: string) => void;
};
export type WebViewComponentProps = {
    uri: string;
    closeHandler: React.Dispatch<React.SetStateAction<string>>;
};
export interface AuthEmailProps extends ServiceAgreementProps {
    min: number;
    sec: number;
    resetTimeHandler: () => void;
}
export type FailPermissionModalProps = {
    permissionName: string;
    contentOne: string;
    contentTwo?: string;
    onPressModalButton: (state: string) => void;
};
export type KeywordsListProps = {
    type: string;
    list: KeywordListTypes[];
    isCheck: boolean[];
    checkKeywordHandler: (list: string, index: number, id: number) => void;
    checkTextColor: string;
    checkBorderColor: string | undefined;
    checkBackColor: string;
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
    isBorder: boolean;
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
export type SearchLocationProps = {
    getLocationHandler: (location: { lat: number; lng: number }, placeName: string) => void;
};
export type WritePostAddKeywordProps = {
    keywordModalHandler: (state: string) => void;
    getKeywordHandler: (state: string, keyword: number[]) => void;
};
export type WritePhotoProps = {
    getImageHandler: (files: Asset[]) => void;
    notAllowPermission: () => void;
};
export type EditMyKeywordProps = {
    myKeywordList: MyLikeKeywordTypes[];
    checkInitTraffic: boolean[];
    checkInitSubway: boolean[];
    checkInitIssue: boolean[];
    controlEditWindowHandler: (state: string) => void;
    getMyKeywordRefetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
    ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
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
export type WritePostOrCommentTemplateProps = {
    postThreadInfo:
        | {
              title: string;
              rePostCount: number;
              time: string;
              postId: number;
          }
        | undefined;
    moveToScreen: (state: string, postId: number | null) => void;
};
export type EditNicknameTemplateProps = {
    moveToMyProfileScreen: (state: string) => void;
};
export type MyProfileTemplateProps = {
    moveToScreen: (state: string) => void;
};
export type ThreadItemTemplateProps = {
    postId: number;
    movetoCommunityScreen: () => void;
    moveToWriteScreen: (title: string, rePostCount: number, time: string) => void;
};
export type MyPostCommentTemplateProps = {
    moveToBackScreenHandler: () => void;
};
export type AccountManagementTemplateProps = {
    moveToScreenHandler: (state: string) => void;
};
export type DeleteMemberTemplateProps = {
    moveToScreenHandler: (state: string) => void;
};
export type ChangePasswordTemplateProps = {
    moveToBackScreenHandler: () => void;
};
export type LikeKeywordSettingTemplateProps = {
    moveToBackScreenHandler: () => void;
};
export type PoliciesTemplateProps = {
    moveToBackScreenHandler: () => void;
};
