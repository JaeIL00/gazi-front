import React, { RefObject, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Linking, Modal, Platform, TouchableOpacity, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import DropShadow from 'react-native-drop-shadow';
import { useRecoilValue } from 'recoil';
import MapView, { BoundingBox, Details, Region } from 'react-native-maps';
import { useInfiniteQuery } from 'react-query';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import { debounce } from 'lodash';
import SplashScreen from 'react-native-splash-screen';

import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import NormalText from '../../smallest/NormalText';
import TouchButton from '../../smallest/TouchButton';
import MapWithMarker from '../../organisms/MapWithMarker';
import SearchLocation from '../../organisms/SearchLocation';
import ModalBackground from '../../smallest/ModalBackground';
import FailPermissionModal from '../../organisms/FailPermissionModal';
import NearbyPostListModal from '../../organisms/NearbyPostListModal';
import { userTokenAtom } from '../../../store/atoms';
import { nearByUserPostsAPI } from '../../../queries/api';
import { serviceHomeTemplateStyles } from '../../../styles/styles';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';
import { SeviceHomeTemplateProps, MapLocationTypes, PostTypes, MapBoundaryTypes } from '../../../types/types';

const SeviceHomeTemplate = ({ isModalRef, handleModalTrigger, moveToWritePost }: SeviceHomeTemplateProps) => {
    const { accessToken } = useRecoilValue(userTokenAtom);

    const indexNumber = useRef<number>(0);
    const mapRef = useRef() as RefObject<MapView>;

    const [searchModal, setSearchModal] = useState<boolean>(false);
    const [nearPostList, setNearPostList] = useState<PostTypes[]>([]);
    const [isFarMapLevel, setIsFarMapLevel] = useState<boolean>(false);
    const [markerPost, setMarkerPost] = useState<PostTypes | null>(null);
    const [isAllowLocation, setIsAllowLocation] = useState<boolean>(false);
    const [isBottomSheetMini, setIsBottomSheetMini] = useState<boolean>(false);
    const [isBottomSheetFull, setIsBottomSheetFull] = useState<boolean>(false);
    const [isNearPostSearchTopBar, setIsNearPostSearchTopBar] = useState<boolean>(false);
    const [onLocationPermissionModal, setOnLocationPermissionModal] = useState<boolean>(false);
    const [currentPosition, setCurrentPosition] = useState<MapLocationTypes>({
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
    });
    const [mapBoundaryState, setMapBoundaryState] = useState<MapBoundaryTypes>({
        northEast: {
            latitude: 37.45878314300355,
            longitude: 126.8773839622736,
        },
        southWest: {
            latitude: 37.45878314300355,
            longitude: 126.8773839622736,
        },
        isNearSearch: false,
    });

    // Get post of near by user API
    const { hasNextPage, isFetching, fetchNextPage, refetch, remove } = useInfiniteQuery(
        ['getNearPosts'],
        ({ pageParam = 0 }) =>
            nearByUserPostsAPI({
                minLat: mapBoundaryState.southWest.latitude,
                minLon: mapBoundaryState.southWest.longitude,
                maxLat: mapBoundaryState.northEast.latitude,
                maxLon: mapBoundaryState.northEast.longitude,
                curLat: currentPosition.latitude,
                curLon: currentPosition.longitude,
                accessToken,
                page: pageParam,
                isNearSearch: mapBoundaryState.isNearSearch,
            }),
        {
            enabled: false,
            getNextPageParam: (lastPage, allPages) => {
                const total = lastPage.data.data.totalPages;
                const nextPage = lastPage.data.data.pageable.pageNumber + 1;
                return nextPage === total ? undefined : nextPage;
            },
            onSuccess: data => {
                const pageNumber = data.pages[indexNumber.current].data.data.pageable.pageNumber;
                if (pageNumber === 0) {
                    setNearPostList(data.pages[indexNumber.current].data.data.content);
                    SplashScreen.hide();
                } else {
                    setNearPostList([...nearPostList, ...data.pages[indexNumber.current].data.data.content]);
                }
                if (!data.pages[indexNumber.current].data.data.last) {
                    indexNumber.current = indexNumber.current + 1;
                }
            },
            onError: ({ response }) => {
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
        setCurrentPosition({
            latitude: location.lat,
            longitude: location.lng,
        });
        setTimeout(() => {
            getBoundaryMap();
        }, 500);
        setIsNearPostSearchTopBar(false);
        setSearchModal(false);
    };

    // Check Location Permission
    const checkLocationPermission = async (): Promise<boolean> => {
        try {
            const locationPermmission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            const isAllow = locationPermmission === RESULTS.GRANTED;
            return isAllow;
        } catch (err) {
            // For Debug
            console.log('(ERROR) Check Location Permission.', err);
            return false;
        }
    };

    // Init first map rendering
    const isAllowPermissionInit = async () => {
        const isOkPermission = await checkLocationPermission();
        if (isOkPermission) {
            Geolocation.getCurrentPosition(info => {
                setCurrentPosition({
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                });
                setIsAllowLocation(true);
            });
        }
    };

    // Fisrt render of map
    const mapRenderCompleteHandler = async () => {
        getBoundaryMap();
    };

    // Get current user position
    const onPressGetUserPosition = debounce(async () => {
        const isOkPermission = await checkLocationPermission();
        if (isOkPermission) {
            Geolocation.getCurrentPosition(info => {
                if (
                    info.coords.latitude !== currentPosition.latitude &&
                    info.coords.longitude !== currentPosition.longitude
                ) {
                    setCurrentPosition({
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                    });
                    setIsAllowLocation(true);
                } else {
                    mapRef.current?.animateToRegion({
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.027,
                    });
                    setIsNearPostSearchTopBar(false);
                }
            });
        } else {
            setOnLocationPermissionModal(true);
            setIsAllowLocation(false);
        }
    }, 300);

    // Get boundary of map
    const getBoundaryMap = useCallback(async () => {
        let boundaryValue;
        try {
            boundaryValue = (await mapRef.current?.getMapBoundaries()) as BoundingBox;
            setMapBoundaryState({
                ...mapBoundaryState,
                northEast: boundaryValue.northEast,
                southWest: boundaryValue.southWest,
            });
        } catch (err) {
            // For Debug
            console.log('(ERROR) Get boundary of map.', err);
        } finally {
            if (boundaryValue) {
                setIsNearPostSearchTopBar(false);
                initNearPosts();
            }
        }
    }, []);
    const initNearPosts = () => {
        indexNumber.current = 0;
        remove();
        refetch();
    };

    // Find map marker post
    const findMarkerPost = (id: number) => {
        const findPost = nearPostList.filter(item => item.postId === id);
        setMarkerPost(findPost[0]);
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
                setMapBoundaryState({
                    ...mapBoundaryState,
                    isNearSearch: true,
                });
                setIsFarMapLevel(false);
            } else {
                setMapBoundaryState({
                    ...mapBoundaryState,
                    isNearSearch: false,
                });
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
                currentPosition={currentPosition}
                nearPostList={nearPostList}
                isAllowLocation={isAllowLocation}
                checkMapGesture={checkMapGesture}
                checkZoomLevelWarning={checkZoomLevelWarning}
                mapRenderCompleteHandler={mapRenderCompleteHandler}
                findMarkerPost={findMarkerPost}
            />
            <View style={serviceHomeTemplateStyles.searchLayout}>
                {Platform.OS === 'android' && (
                    <DropShadow style={serviceHomeTemplateStyles.dropshadow}>
                        <TouchableOpacity onPress={() => searchModalHandler('OPEN')} activeOpacity={1}>
                            <View style={serviceHomeTemplateStyles.inputBox}>
                                <Image
                                    source={require('../../../assets/icons/search.png')}
                                    style={serviceHomeTemplateStyles.searchIcon}
                                />
                                <NormalText text="지금 어디로 가시나요?" size={16} color={Colors.TXT_LIGHTGRAY} />
                            </View>
                        </TouchableOpacity>
                    </DropShadow>
                )}
                {/* Temporary planning*/}
                {/* <View>
                    <Image
                        source={require('../../../assets/icons/bell-fill.png')}
                        style={serviceHomeTemplateStyles.bellIcon}
                    />
                </View> */}
            </View>

            <Modal visible={searchModal} onRequestClose={() => setSearchModal(false)}>
                <View style={{ backgroundColor: '#fff', paddingTop: 16 * screenHeight }}>
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
                currentPosition={currentPosition}
                mapBoundaryState={mapBoundaryState}
                moveToBottomSheetFull={moveToBottomSheetFull}
                notBottomSheetMini={notBottomSheetMini}
                onPressGetUserPosition={onPressGetUserPosition}
                callNextPageHandler={callNextPageHandler}
                moveToWritePost={moveToWritePost}
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
                <View style={serviceHomeTemplateStyles.zoomWarning}>
                    <MediumText text="지도를 확대해 지금 일어나는 일을 확인해보세요!" size={14} color={Colors.WHITE} />
                </View>
            )}

            {isNearPostSearchTopBar && !isFarMapLevel && Platform.OS === 'android' && (
                <DropShadow style={serviceHomeTemplateStyles.mapMoveSearch}>
                    <TouchButton
                        onPress={getBoundaryMap}
                        backgroundColor="#F8F7FA"
                        borderRadius={54 * screenFont}
                        borderWidth={1 * screenFont}
                        borderColor="#B29ECC"
                        paddingVertical={5 * screenHeight}
                        paddingHorizontal={23 * screenWidth}>
                        <MediumText text="현 지도에서 검색" size={14} color={Colors.VIOLET} />
                    </TouchButton>
                </DropShadow>
            )}
        </>
    );
};

export default SeviceHomeTemplate;
