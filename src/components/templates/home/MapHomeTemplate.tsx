import React, { RefObject, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Linking, Modal, Platform, TouchableOpacity, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import DropShadow from 'react-native-drop-shadow';
import { useRecoilValue } from 'recoil';
import MapView, { BoundingBox, Details, Region } from 'react-native-maps';
import { useInfiniteQuery } from 'react-query';
import { debounce } from 'lodash';
import SplashScreen from 'react-native-splash-screen';
import FastImage from 'react-native-fast-image';

import MediumText from '../../atoms/MediumText';
import NormalText from '../../atoms/NormalText';
import TouchButton from '../../atoms/TouchButton';
import MapWithMarker from '../../organisms/home/MapWithMarker';
import SearchLocation from '../../organisms/common/SearchLocation';
import ModalBackground from '../../atoms/ModalBackground';
import FailPermissionModal from '../../organisms/common/FailPermissionModal';
import NearbyPostListModal from '../../organisms/home/NearbyPostListModal';
import { nearByUserPostsAPI } from '../../../apis/api';
import { userAuthAtom, userInfoAtom } from '../../../recoil';
import { mapHomeTemplateStyles } from '../../../styles/templates/styles';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import colors from '../../../common/constants/colors';
import { MapBoundaryTypes, MapLocationTypes, PostTypes } from '../../../types/common/types';
import { MapHomeTemplateProps } from '../../../types/templates/types';
import TextButton from '../../molecules/TextButton';

const MapHomeTemplate = ({ isModalRef, handleModalTrigger, moveToWritingScreen }: MapHomeTemplateProps) => {
    const { accessToken } = useRecoilValue(userAuthAtom);
    const { isAllowLocation } = useRecoilValue(userInfoAtom);

    const mapRef = useRef() as RefObject<MapView>;
    const nearPostResponseIndexRef = useRef<number>(0);
    const locationPermissionRef = useRef<boolean>(false);
    const currentPositionRef = useRef<MapLocationTypes>({
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
                curLat: locationPermissionRef.current ? currentPositionRef.current.latitude : 0,
                curLon: locationPermissionRef.current ? currentPositionRef.current.longitude : 0,
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
                    SplashScreen.hide();
                } else {
                    setNearPostList([
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
    const getLocationHandler = (location: { lat: number; lng: number }) => {
        currentPositionRef.current = {
            latitude: location.lat,
            longitude: location.lng,
        };
        setTimeout(() => {
            getBoundaryMap();
        }, 500);
        setIsNearPostSearchTopBar(false);
        setSearchModal(false);
    };

    // Init first map rendering
    const isAllowPermissionInit = async () => {
        if (isAllowLocation) {
            locationPermissionRef.current = true;
            Geolocation.getCurrentPosition(info => {
                currentPositionRef.current = {
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                };
            });
        } else {
            locationPermissionRef.current = false;
        }
    };

    // Fisrt render of map
    const mapRenderCompleteHandler = async () => {
        getBoundaryMap();
    };

    // Get current user position
    const onPressGetUserPosition = debounce(async () => {
        if (isAllowLocation) {
            Geolocation.getCurrentPosition(info => {
                if (
                    info.coords.latitude !== currentPositionRef.current.latitude &&
                    info.coords.longitude !== currentPositionRef.current.longitude
                ) {
                    currentPositionRef.current = {
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                    };
                } else {
                    mapRef.current?.animateToRegion({
                        latitude: currentPositionRef.current.latitude,
                        longitude: currentPositionRef.current.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.027,
                    });
                }
            });
        } else {
            setOnLocationPermissionModal(true);
        }
    }, 300);

    // Get boundary of map
    const getBoundaryMap = useCallback(async () => {
        let boundaryValue;
        try {
            boundaryValue = (await mapRef.current?.getMapBoundaries()) as BoundingBox;
            mapBoundaryStateRef.current = {
                ...mapBoundaryStateRef.current,
                northEast: boundaryValue.northEast,
                southWest: boundaryValue.southWest,
            };
        } catch (err) {
            // For Debug
            console.log('(ERROR) Get boundary of map.', err);
        } finally {
            if (boundaryValue) {
                setIsNearPostSearchTopBar(false);
                setTimeout(() => {
                    initNearPosts();
                }, 2000);
            }
        }
    }, [isAllowLocation]);
    const initNearPosts = () => {
        nearPostResponseIndexRef.current = 0;
        remove();
        refetch();
    };

    // Find map marker post
    const findMarkerPost = (id: number) => {
        const findPost = nearPostList.filter(item => item.postId === id);
        setMarkerPost(findPost[0]);
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

    // Move to mini bottom sheet by move map
    const moveToBottomSheetMini = () => {
        if (!isBottomSheetMini) {
            setIsBottomSheetMini(true);
        }
    };
    const notBottomSheetMini = () => {
        setIsBottomSheetMini(false);
    };

    // Check map gesture
    const checkMapGesture = useCallback(
        (region: Region, details: Details) => {
            if (details.isGesture) {
                moveToBottomSheetMini();
                setIsNearPostSearchTopBar(true);
            }
            if (details.isGesture && markerPost) {
                setMarkerPost(null);
            }
        },
        [isBottomSheetMini, markerPost, setMarkerPost],
    );

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
    const checkZoomLevelWarning = useCallback(
        (region: Region) => {
            if (region.latitudeDelta > 0.15) {
                setIsFarMapLevel(true);
            } else if (region.latitudeDelta < 0.15 && region.latitudeDelta > 0.065) {
                mapBoundaryStateRef.current = {
                    ...mapBoundaryStateRef.current,
                    isNearSearch: true,
                };
                setIsFarMapLevel(false);
            } else {
                mapBoundaryStateRef.current = {
                    ...mapBoundaryStateRef.current,
                    isNearSearch: false,
                };
                setIsFarMapLevel(false);
            }
        },
        [isFarMapLevel],
    );

    useLayoutEffect(() => {
        isAllowPermissionInit();
    }, []);

    return (
        <>
            <MapWithMarker
                mapRef={mapRef}
                currentPosition={currentPositionRef.current}
                nearPostList={nearPostList}
                isAllowLocation={isAllowLocation}
                checkMapGesture={checkMapGesture}
                checkZoomLevelWarning={checkZoomLevelWarning}
                mapRenderCompleteHandler={mapRenderCompleteHandler}
                findMarkerPost={findMarkerPost}
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
                {/* Temporary planning*/}
                {/* <View>
                    <FastImage
                        source={require('../../../assets/icons/bell-fill.png')}
                        style={serviceHomeTemplateStyles.bellIcon}
                    />
                </View> */}
            </View>

            <Modal visible={searchModal} onRequestClose={() => setSearchModal(false)}>
                <View style={mapHomeTemplateStyles.searchModalBox}>
                    <SearchLocation
                        getLocationHandler={getLocationHandler}
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
                currentPosition={currentPositionRef.current}
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
                        onPress={getBoundaryMap}
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
