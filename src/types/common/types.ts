import { Asset } from 'react-native-image-picker';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export type AlarmHistoryTypes = {
    body: string;
    id: number;
    notificationEnum: string;
    title: string;
};
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
    post: boolean;
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

// RECOIL
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
    isAuthorizationPass: boolean;
};
