import React, { RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Linking, Modal, Platform, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import DropShadow from 'react-native-drop-shadow';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useInfiniteQuery } from 'react-query';
import { debounce } from 'lodash';
import SplashScreen from 'react-native-splash-screen';
import FastImage from 'react-native-fast-image';
import NaverMapView from 'react-native-nmap';

import MediumText from '../../atoms/MediumText';
import NormalText from '../../atoms/NormalText';
import TouchButton from '../../atoms/TouchButton';
import TextButton from '../../molecules/TextButton';
import ModalBackground from '../../atoms/ModalBackground';
import SearchLocation from '../../organisms/common/SearchLocation';
import NaverMapComponent from '../../organisms/home/NaverMapComponent';
import NearbyPostListModal from '../../organisms/home/NearbyPostListModal';
import FailPermissionModal from '../../organisms/common/FailPermissionModal';

import colors from '../../../constants/colors';
import { nearByUserPostsAPI } from '../../../apis/api';
import { MapHomeTemplateProps } from '../../../types/templates/types';
import { mapHomeTemplateStyles } from '../../../styles/templates/styles';
import { MapBoundaryTypes, MapLocationTypes, PostTypes } from '../../../types/common/types';
import { mapLocationSearchResultAtom, nearPostListAtom, userAuthAtom, userInfoAtom } from '../../../recoil';

const MapHomeTemplate = ({ isModalRef, handleModalTrigger, moveToWritingScreen }: MapHomeTemplateProps) => {
    const { accessToken } = useRecoilValue(userAuthAtom);
    const { isAllowLocation } = useRecoilValue(userInfoAtom);
    const mapLocationSearchResult = useRecoilValue(mapLocationSearchResultAtom);
    const setRecoilNearPost = useSetRecoilState(nearPostListAtom);

    const mapRef = useRef() as RefObject<NaverMapView>;
    const nearPostResponseIndexRef = useRef<number>(0);
    const userCurrentPositionRef = useRef<MapLocationTypes>({
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
    });
    const mapCurrentPositionRef = useRef<MapLocationTypes>({
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
    });
    const mapBoundaryStateRef = useRef<MapBoundaryTypes>({
        northEast: {
            latitude: 0,
            longitude: 0,
        },
        southWest: {
            latitude: 0,
            longitude: 0,
        },
        isNearSearch: false,
    });

    const [mapZoomLevel, setMapZoomLevel] = useState<number>(0);
    const [searchModal, setSearchModal] = useState<boolean>(false);
    const [nearPostList, setNearPostList] = useState<PostTypes[]>([]);
    const [isFarMapLevel, setIsFarMapLevel] = useState<boolean>(false);
    const [markerPost, setMarkerPost] = useState<PostTypes | null>(null);
    const [isNearPostRefresh, setIsNearPostRefresh] = useState<boolean>(false);
    const [isBottomSheetMini, setIsBottomSheetMini] = useState<boolean>(false);
    const [isBottomSheetFull, setIsBottomSheetFull] = useState<boolean>(false);
    const [isNearPostSearchTopBar, setIsNearPostSearchTopBar] = useState<boolean>(false);
    const [onLocationPermissionModal, setOnLocationPermissionModal] = useState<boolean>(false);

    // Get post of near by user API
    const { hasNextPage, isFetching, fetchNextPage, refetch, remove } = useInfiniteQuery(
        'getNearPosts',
        ({ pageParam = 0 }) =>
            nearByUserPostsAPI({
                minLat: mapBoundaryStateRef.current.southWest.latitude,
                minLon: mapBoundaryStateRef.current.southWest.longitude,
                maxLat: mapBoundaryStateRef.current.northEast.latitude,
                maxLon: mapBoundaryStateRef.current.northEast.longitude,
                curLat:
                    mapZoomLevel > 12 && mapZoomLevel < 13
                        ? mapCurrentPositionRef.current.latitude
                        : userCurrentPositionRef.current.latitude,
                curLon:
                    mapZoomLevel > 12 && mapZoomLevel < 13
                        ? mapCurrentPositionRef.current.longitude
                        : userCurrentPositionRef.current.longitude,
                accessToken,
                page: pageParam,
                isNearSearch: mapBoundaryStateRef.current.isNearSearch,
            }),
        {
            enabled: false,
            getNextPageParam: (lastPage, allPages) => {
                const total = lastPage.data.data.totalPages;
                const nextPage = lastPage.data.data.pageable.pageNumber + 1;
                return nextPage === total ? undefined : nextPage;
            },
            onSuccess: data => {
                const pageNumber = data.pages[nearPostResponseIndexRef.current].data.data.pageable.pageNumber;
                const content = data.pages[nearPostResponseIndexRef.current].data.data.content;
                if (pageNumber === 0) {
                    setIsNearPostRefresh(false);
                    setIsNearPostSearchTopBar(false);
                    setNearPostList(content);
                    setRecoilNearPost(content);
                    SplashScreen.hide();
                } else {
                    setNearPostList([
                        ...nearPostList,
                        ...data.pages[nearPostResponseIndexRef.current].data.data.content,
                    ]);
                    setRecoilNearPost([
                        ...nearPostList,
                        ...data.pages[nearPostResponseIndexRef.current].data.data.content,
                    ]);
                }
                if (!data.pages[nearPostResponseIndexRef.current].data.data.last) {
                    nearPostResponseIndexRef.current = nearPostResponseIndexRef.current + 1;
                }
            },
            onError: ({ response }) => {
                setIsNearPostRefresh(false);
                // For Debug
                console.log('(ERROR) Get post of near by user API. respense: ', response);
            },
        },
    );

    // Search modal handler
    const searchModalHandler = (state: string) => {
        switch (state) {
            case 'OPEN':
                setSearchModal(true);
                break;
            case 'CLOSE':
                setSearchModal(false);
                break;
            default:
                // For Debug
                console.log('(ERROR) Search modal handler.', state);
        }
    };

    // Seach location to move map
    const moveMapLocationHandler = () => {
        mapRef.current?.animateToRegion({
            latitude: mapLocationSearchResult.location.lat,
            longitude: mapLocationSearchResult.location.lng,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
        });
        mapCurrentPositionRef.current = {
            latitude: mapLocationSearchResult.location.lat,
            longitude: mapLocationSearchResult.location.lng,
        };

        setIsNearPostSearchTopBar(false);
        setSearchModal(false);

        setTimeout(() => {
            initNearPosts();
        }, 700);
    };

    // Init first map rendering
    const isAllowPermissionInit = async () => {
        if (isAllowLocation) {
            Geolocation.getCurrentPosition(info => {
                userCurrentPositionRef.current = {
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                };
            });
        }
    };

    // Fisrt render of map
    const mapRenderCompleteHandler = async () => {
        initNearPosts();
    };

    // Get current user position
    const onPressGetUserPosition = debounce(async () => {
        if (isAllowLocation) {
            Geolocation.getCurrentPosition(info => {
                if (
                    info.coords.latitude !== userCurrentPositionRef.current.latitude &&
                    info.coords.longitude !== userCurrentPositionRef.current.longitude
                ) {
                    userCurrentPositionRef.current = {
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                    };
                } else {
                    mapRef.current?.animateToRegion({
                        latitude: userCurrentPositionRef.current.latitude,
                        longitude: userCurrentPositionRef.current.longitude,
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.004,
                    });
                }
            });
        } else {
            setOnLocationPermissionModal(true);
        }
    }, 300);

    const initNearPosts = () => {
        setIsNearPostSearchTopBar(false);
        nearPostResponseIndexRef.current = 0;
        remove();
        refetch();
    };

    // Find map marker post
    const findMarkerPost = (id: number) => {
        const findPost = nearPostList.filter(item => item.postId === id);
        setMarkerPost(findPost[0]);
        mapRef.current?.animateToRegion({
            latitude: findPost[0].latitude,
            longitude: findPost[0].longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
        });
    };

    // Near post flat list refresh
    const nearPostListRefresh = () => {
        nearPostResponseIndexRef.current = 0;
        setIsNearPostRefresh(true);
        remove();
        refetch();
    };

    // Again request modal button Handling
    const onPressModalButton = useCallback(async (state: string) => {
        switch (state) {
            case 'CLOSE':
                setOnLocationPermissionModal(false);
                break;
            case 'MOVE':
                setOnLocationPermissionModal(false);
                await Linking.openSettings();
                break;
            default:
                // For Debug
                console.log('(ERROR) Again request modal button Handling. state: ', state);
        }
    }, []);

    // Call next page API
    const callNextPageHandler = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    // Move to middle bottom sheet by call API
    const notBottomSheetMini = () => {
        setIsBottomSheetMini(false);
    };

    // Check map gesture
    const moveMapBottomSheetHandler = () => {
        setMarkerPost(null);
        setIsBottomSheetMini(true);
        setIsNearPostSearchTopBar(true);
    };

    // Move to full bottom sheet by move map
    const moveToBottomSheetFull = (state: string) => {
        switch (state) {
            case 'FULL':
                setIsBottomSheetFull(true);
                break;
            case 'NOT':
                setIsBottomSheetFull(false);
                break;
            default:
                // For Debug
                console.log('(ERROR) Move to mini bottom sheet by move map function');
        }
    };

    // Check map zoom level for warning
    const updateMapZoomLevel = (level: number) => {
        setMapZoomLevel(level);
    };

    // Naver map zoom level handler
    useEffect(() => {
        if (mapZoomLevel < 12) {
            setIsFarMapLevel(true);
            setIsNearPostSearchTopBar(false);
        } else if (mapZoomLevel > 12 && mapZoomLevel < 13) {
            setIsFarMapLevel(false);
            mapBoundaryStateRef.current = {
                ...mapBoundaryStateRef.current,
                isNearSearch: true,
            };
        } else {
            setIsFarMapLevel(false);
            mapBoundaryStateRef.current = {
                ...mapBoundaryStateRef.current,
                isNearSearch: false,
            };
        }
    }, [mapZoomLevel]);

    // Place search result handler
    useEffect(() => {
        if (mapLocationSearchResult.location.lat) {
            moveMapLocationHandler();
        }
    }, [mapLocationSearchResult]);

    useLayoutEffect(() => {
        isAllowPermissionInit();
    }, []);

    return (
        <>
            <NaverMapComponent
                mapRef={mapRef}
                currentPositionRef={userCurrentPositionRef.current}
                mapBoundaryStateRef={mapBoundaryStateRef}
                mapCurrentPositionRef={mapCurrentPositionRef}
                mapRenderCompleteHandler={mapRenderCompleteHandler}
                findMarkerPost={findMarkerPost}
                updateMapZoomLevel={updateMapZoomLevel}
                moveMapBottomSheetHandler={moveMapBottomSheetHandler}
            />
            <View style={mapHomeTemplateStyles.searchLayout}>
                {Platform.OS === 'android' && (
                    <DropShadow style={mapHomeTemplateStyles.dropshadow}>
                        <TouchButton
                            onPress={() => searchModalHandler('OPEN')}
                            backgroundColor={colors.BACKGROUND_DEFAULT}
                            borderRadius={28}
                            paddingHorizontal={19}
                            paddingVertical={12}
                            alignItems="flex-start">
                            <View style={mapHomeTemplateStyles.inputBox}>
                                <FastImage
                                    source={require('../../../assets/icons/search.png')}
                                    style={mapHomeTemplateStyles.searchIcon}
                                />
                                <NormalText text="지금 어디로 가시나요?" size={16} color={colors.TXT_LIGHTGRAY} />
                            </View>
                        </TouchButton>
                    </DropShadow>
                )}
            </View>

            <Modal visible={searchModal} onRequestClose={() => setSearchModal(false)}>
                <View style={mapHomeTemplateStyles.searchModalBox}>
                    <SearchLocation
                        placeholder="지금 어디로 가시나요?"
                        isHome={true}
                        searchModalHandler={searchModalHandler}
                    />
                </View>
            </Modal>

            <NearbyPostListModal
                isModalRef={isModalRef}
                handleModalTrigger={handleModalTrigger}
                nearPostList={nearPostList}
                markerPost={markerPost}
                isBottomSheetMini={isBottomSheetMini}
                isBottomSheetFull={isBottomSheetFull}
                currentPosition={userCurrentPositionRef.current}
                mapBoundaryState={mapBoundaryStateRef.current}
                moveToBottomSheetFull={moveToBottomSheetFull}
                notBottomSheetMini={notBottomSheetMini}
                onPressGetUserPosition={onPressGetUserPosition}
                callNextPageHandler={callNextPageHandler}
                moveToWritingScreen={moveToWritingScreen}
                nearPostListRefresh={nearPostListRefresh}
                isNearPostRefresh={isNearPostRefresh}
            />
            {isFetching && (
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ActivityIndicator size="large" />
                </View>
            )}

            <ModalBackground visible={onLocationPermissionModal} onRequestClose={() => onPressModalButton('CLOSE')}>
                <FailPermissionModal
                    permissionName="필수 권한 허용 안내"
                    contentOne="위치 권한에 대한 사용을 거부하였습니다. 서비스 사용을 원하실 경우 해당 앱의 권한을 허용해주세요"
                    onPressModalButton={onPressModalButton}
                />
            </ModalBackground>

            {isFarMapLevel && (
                <View style={mapHomeTemplateStyles.zoomWarning}>
                    <MediumText text="지도를 확대해 지금 일어나는 일을 확인해보세요!" size={14} color={colors.WHITE} />
                </View>
            )}

            {isNearPostSearchTopBar && !isFarMapLevel && Platform.OS === 'android' && (
                <DropShadow style={mapHomeTemplateStyles.mapMoveSearch}>
                    <TextButton
                        onPress={initNearPosts}
                        backgroundColor="#F8F7FA"
                        borderRadius={54}
                        borderWidth={1}
                        borderColor="#B29ECC"
                        paddingVertical={5}
                        paddingHorizontal={23}
                        text="현 지도에서 검색"
                        fontSize={14}
                        fontColor={colors.VIOLET}
                        fontWeight="medium"
                    />
                </DropShadow>
            )}
        </>
    );
};

export default MapHomeTemplate;
