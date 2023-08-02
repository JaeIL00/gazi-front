import { ReactElement, RefObject } from 'react';
import {
    CommentTypes,
    KeywordListTypes,
    MapBoundaryTypes,
    MapLocationTypes,
    MyLikeKeywordTypes,
    PostTypes,
    uploadImageFileTypes,
} from '../common/types';
import { PageTitleWithExplainProps } from '../molecules/types';
import MapView, { Details, Region } from 'react-native-maps';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { AxiosResponse } from 'axios';
import NaverMapView, { Coord } from 'react-native-nmap';

export interface MoveBackWithPageTitleProps extends PageTitleWithExplainProps {
    onPress: () => void;
}
export type ReportModalProps = {
    isReportSuccess: boolean;
    repostId: number;
    reportMutate: (repostId: number, reportEnum: string, reason: string) => void;
    closeReportModalHandler: () => void;
    getCommentListRefetch: () => void;
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
    getCommentListRefetch: () => void;
    delReportComment: (postId: number) => void;
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
export type GoogleMapComponent = {
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
    moveToWritingScreen: () => void;
    nearPostListRefresh: () => void;
};
export type NaverMapComponentProps = {
    mapRef: RefObject<NaverMapView>;
    currentPositionRef: MapLocationTypes;
    mapBoundaryStateRef: React.MutableRefObject<MapBoundaryTypes>;
    mapCurrentPositionRef: React.MutableRefObject<MapLocationTypes>;
    mapRenderCompleteHandler: () => void;
    updateMapZoomLevel: (level: number) => void;
    moveMapBottomSheetHandler: () => void;
    findMarkerPost: (id: number) => void;
};
export type SearchLocationProps = {
    isHome: boolean;
    placeholder: string;
    isAllowLocation?: boolean;
    currentPosition?: { curLat: number; curLon: number };
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
export type HowGetPhotoSelectModalProps = {
    getImageHandler: (files: uploadImageFileTypes[]) => void;
    closePhotoSelectModalHandler: () => void;
};
export type NaverMapOnChangeParams = {
    latitude: number;
    longitude: number;
    coveringRegion: [Coord, Coord, Coord, Coord, Coord];
    zoom: number;
};
