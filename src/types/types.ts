import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
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
export type SearchHistoryTypes = {
    formatted_address: string;
    name: string;

    location: { lat: number; lng: number };
};
export type MyCommentTypes = {
    content: string;
    createTime: string;
    title: string;
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
    postId: number;
};
export type uploadImageFileTypes = {
    uri: string;
    fileName: string;
    type: string;
};
export type GalleryAlbumListTypes = {
    title: string;
    count: number;
    thumbnail: string;
};
export type TemporarySaveChooseLocationTypes = {
    formatted_address: string;
    name: string;
    location: { lat: number | null; lng: number | null };
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
    vicinity: string;
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
export type PostDtoTypes = {
    title: string;
    placeName: string;
    content: string;
    latitude: number | null;
    longitude: number | null;
    keywordIdList: number[] | null;
    headKeywordId: number | null;
};
export type CommentDtoTypes = {
    postId: number;
    content: string;
    latitude: number | null;
    longitude: number | null;
    keywordIdList: number[] | null;
};
export type WritePostTypes = {
    dto: PostDtoTypes;
    files: uploadImageFileTypes[];
    thumbnail: Asset | null;
    backgroundMap: string;
};
export type WriteCommentTypes = {
    placeName: string;
    dto: CommentDtoTypes;
    files: uploadImageFileTypes[];
};
export type MyPageTabTypes = {
    title: string;
    data: {
        name: string;
        screen: string;
        isBorder: boolean;
    }[];
};
export type MyLikeKeywordTypes = {
    id: number;
    keywordEnum: string;
    vehicle: string | null;
    keywordName: string;
};
export type ImageViewTypes = {
    postTitle: string;
    postCount: number;
    fileList: {
        fileName: string;
        fileUrl: string;
    }[];
    nickName: string;
    distance: string;
    time: string;
    imageIndex: number;
};

// ATOM
export type userAuthAtomTypes = {
    accessToken: string;
    refreshToken: string;
    isLogIn: boolean;
};
export type userInfoAtomTypes = {
    memberId: number | null;
    nickname: string;
    email: string;
    isAllowLocation: boolean;
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
    ImageView: ImageViewTypes;
    ServiceMainTab?: {
        screen: string;
    };
    EditNickname: undefined;
    AccountManagement: undefined;
    LikeKeywordSetting: {
        isShortcut?: boolean;
    };
    Policies: undefined;
    ThreadItem: {
        postId: number;
        freshRePostCount?: number;
    };
    MyPostComment: undefined;
    ChangePassword: undefined;
    DeleteMember: undefined;
    None: undefined;
    WritePost:
        | {
              title: string;
              rePostCount: number;
              time: string;
              postId: number;
          }
        | undefined;
    WriteComment: {
        title: string;
        rePostCount: number;
        time: string;
        postId: number;
    };
};
export type JoinMemberParamList = {
    JoinInputEmail: undefined;
    JoinInputPassword: undefined;
    JoinInputNickname: undefined;
    JoinRequestPermission: undefined;
    JoinSettingKeyword: undefined;
};
export type ServiceMainTabParamList = {
    MapHome: undefined;
    Community: undefined;
    MyPage: undefined;
    AlarmPage: undefined;
};
export type CommunityTabParamList = {
    AllBoard: undefined;
    LikeBoard: undefined;
};
export type AlarmPageTabParamList = {
    KeywordAlarm: undefined;
    NewsAlarm: undefined;
};
export type MyPageParamList = {
    MyPageInitial: undefined;
    Policies: undefined;
    LikeKeywordSetting: undefined;
    AccountManagement: undefined;
    MyPostComment: undefined;
    DeleteMember: undefined;
    EditNickname: undefined;
};
export interface TabBarProps extends BottomTabBarProps {}

// SMALLEST
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
export type CommentImageProps = {
    fileUrl: string;
    width: number;
    height: number;
    moveImageViewScreen: () => void;
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
export type ReportModalProps = {
    isReportSuccess: boolean;
    reportTopicHandler: () => void;
    closeReportModalHandler: () => void;
};
export type ScreenWrapperProps = {
    children: ReactElement;
    isPaddingHorizontal: boolean;
};
export type PhotoGalleryProps = {
    closeGalleryHandling: () => void;
    getImageHandler: (file: uploadImageFileTypes, state: string) => void;
};
export type CommentListItemProps = {
    comment: CommentTypes;
    postTitle: string;
    postCount: number;
    firstCommentId: number | undefined;
    isReportSuccess: boolean;
    reportHandler: (repostId: number) => void;
};
export type ServiceAgreementProps = {
    finishSlideComponentHandler: (state: string) => void;
};
export type WebViewComponentProps = {
    uri: string;
    closeHandler: React.Dispatch<React.SetStateAction<string>>;
};
export type AuthEmailProps = {
    min: number;
    sec: number;
    resetTimeHandler: () => void;
    authNumberModalHanlder: (state: string) => void;
};
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
    trafficKeywordColor?: string;
};
export type MapWithMarkerProps = {
    mapRef: RefObject<MapView>;
    currentPosition: MapLocationTypes;
    nearPostList: PostTypes[];
    isAllowLocation: boolean;
    mapRenderCompleteHandler: () => void;
    checkMapGesture: (region: Region, details: Details) => void;
    checkZoomLevelWarning: (region: Region) => void;
    findMarkerPost: (id: number) => void;
};
export type PostListItemProps = {
    post: PostTypes | null;
    isBorder: boolean;
    isNearList?: boolean;
    isMarkerPost?: boolean;
};
export type NearbyPostListModalProps = {
    isModalRef: React.MutableRefObject<boolean>;
    handleModalTrigger: boolean;
    nearPostList: PostTypes[];
    markerPost: PostTypes | null;
    isBottomSheetMini: boolean;
    isBottomSheetFull: boolean;
    currentPosition: MapLocationTypes;
    mapBoundaryState: MapBoundaryTypes;
    isNearPostRefresh: boolean;
    moveToBottomSheetFull: (state: string) => void;
    notBottomSheetMini: () => void;
    onPressGetUserPosition: () => void;
    callNextPageHandler: () => void;
    moveToWritePost: () => void;
    nearPostListRefresh: () => void;
};
export type SearchLocationProps = {
    isHome: boolean;
    placeholder: string;
    isAllowLocation?: boolean;
    currentPosition?: { curLat: number; curLon: number };
    getLocationHandler: (location: { lat: number; lng: number }, placeName: string, address: string) => void;
    searchModalHandler?: (state: string) => void;
};
export type WritePostAddKeywordProps = {
    keywordModalHandler: (state: string) => void;
    getKeywordHandler: (keyword: number[]) => void;
};
export type EditMyKeywordProps = {
    myKeywordList: MyLikeKeywordTypes[];
    isShortcut: boolean;
    controlEditWindowHandler: (state: string) => void;
    getMyKeywordRefetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
    ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
};

// TEMPLATES
export type InputEmailTemplateProps = {
    navigationHandler: (state: string) => void;
};
export interface InputPasswordTemplateProps extends InputEmailTemplateProps {}
export interface InputNicknameTemplateProps extends InputEmailTemplateProps {}
export interface CompletedJoinMemberModalProps extends InputEmailTemplateProps {
    inputNickname: string;
}
export type RequestPemissionTemplateProps = {
    navigationHandler: (state: string) => void;
};
export type EmailLoginTemplateProps = {
    moveServiceHomeHandler: (state: string) => void;
};
export interface InitLikeKeywordTemplateProps extends RequestPemissionTemplateProps {}
export type MapHomeTemplateProps = {
    isModalRef: React.MutableRefObject<boolean>;
    handleModalTrigger: boolean;
    moveToWritePost: () => void;
};
export type WritePostTemplateProps = {
    navigationHandler: (state: string, postId?: number) => void;
};
export type WriteCommentTemplateProps = {
    threadInfo: {
        title: string;
        rePostCount: number;
        time: string;
        postId: number;
    };
    navigationHandler: (state: string, postId?: number, freshRePostCount?: number) => void;
};
export type EditNicknameTemplateProps = {
    moveToMyPageScreen: () => void;
};
export type MyPageTemplateProps = {
    moveToScreen: (state: string) => void;
};
export type ThreadItemTemplateProps = {
    postId: number;
    freshRePostCount?: number;
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
    isShortcut: boolean | undefined;
    moveToBackScreenHandler: () => void;
};
export type PoliciesTemplateProps = {
    moveToBackScreenHandler: () => void;
};
export type LikeKeywordBoardTemplateProps = {
    moveToKeywordSettingScreen: () => void;
};
export type KeywordAlarmTemplateProps = {
    navigationHandler: () => void;
};
