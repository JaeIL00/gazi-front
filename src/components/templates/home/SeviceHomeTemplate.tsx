import React, { RefObject, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Linking, Platform, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import DropShadow from 'react-native-drop-shadow';
import { useRecoilValue } from 'recoil';
import MapView, { BoundingBox, Details, Region } from 'react-native-maps';
import { useInfiniteQuery } from 'react-query';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';

import Colors from '../../../styles/Colors';
import MediumText from '../../smallest/MediumText';
import MapWithMarker from '../../organisms/MapWithMarker';
import NearbyPostListModal from '../../organisms/NearbyPostListModal';
import FailLocationPermisionModal from '../../organisms/FailLocationPermisionModal';
import { userTokenAtom } from '../../../store/atoms';
import { nearByUserPostsAPI } from '../../../queries/api';
import { SingleLineInput } from '../../smallest/SingleLineInput';
import { seviceHomeTemplateStyles } from '../../../styles/styles';
import { SeviceHomeTemplateProps, MapLocationTypes, PostTypes, MapBoundaryTypes } from '../../../types/types';
import { screenFont, screenHeight, screenWidth } from '../../../utils/changeStyleSize';

const SeviceHomeTemplate = ({ isModalRef, handleModalTrigger }: SeviceHomeTemplateProps) => {
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
    const [currentPosition, setCurrentPosition] = useState<MapLocationTypes>({
        latitude: 37.49795103144074,
        longitude: 127.02760985223079,
    });
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
    useLayoutEffect(() => {
        isAllowPermissionInit();
    }, []);

    // Fisrt render of map
    const mapRef = useRef() as RefObject<MapView>;
    const mapRenderCompleteHandler = async () => {
        try {
            const boundaryValue = (await mapRef.current?.getMapBoundaries()) as BoundingBox;
            setMapBoundaryState({
                northEast: boundaryValue.northEast,
                southWest: boundaryValue.southWest,
            });
            setTimeout(() => {
                remove();
                refetch();
            }, 1000);
        } catch (error) {
            // For Debug
            console.log('(ERROR) Fisrt render of map.', error);
        }
    };

    // Get current user position
    const [isAllowLocation, setIsAllowLocation] = useState<boolean>(false);
    const [mapBoundaryState, setMapBoundaryState] = useState<MapBoundaryTypes>({
        northEast: {
            latitude: 37.45878314300355,
            longitude: 126.8773839622736,
        },
        southWest: {
            latitude: 37.45878314300355,
            longitude: 126.8773839622736,
        },
    });
    const onPressGetUserPosition = async () => {
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
                    setTimeout(() => {
                        getBoundaryMap();
                    }, 1000);
                } else {
                    mapRef.current?.animateToRegion({
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.027,
                    });
                }
            });
        } else {
            setOnModal(true);
            setIsAllowLocation(false);
        }
    };
    const getBoundaryMap = async () => {
        let boundaryValue;
        try {
            boundaryValue = (await mapRef.current?.getMapBoundaries()) as BoundingBox;
            setMapBoundaryState({
                northEast: boundaryValue.northEast,
                southWest: boundaryValue.southWest,
            });
        } catch (err) {
            // For Debug
            console.log('(ERROR) Get boundary of map.', err);
        } finally {
            if (boundaryValue) {
                remove();
                refetch();
            }
        }
    };

    // Again request modal button Handling
    const [onModal, setOnModal] = useState<boolean>(false);
    const onPressModalButton = async (state: string) => {
        switch (state) {
            case 'CLOSE':
                setOnModal(false);
                break;
            case 'MOVE':
                setOnModal(false);
                await Linking.openSettings();
                break;
            default:
                // For Debug
                console.log('(ERROR) Again request modal button Handling. state: ', state);
        }
    };

    // Search text handling
    const [searchText, setSearchText] = useState<string>('');
    const onChangeSearchText = (text: string) => {
        setSearchText(text);
    };

    // Get post of near by user API
    const userTk = useRecoilValue(userTokenAtom);
    const [nearPostList, setNearPostList] = useState<PostTypes[]>([]);
    const { hasNextPage, isFetching, isFetchingNextPage, fetchNextPage, refetch, remove } = useInfiniteQuery(
        ['getNearPosts'],
        ({ pageParam = 0 }) =>
            nearByUserPostsAPI({
                minLat: mapBoundaryState.southWest.latitude,
                minLon: mapBoundaryState.southWest.longitude,
                maxLat: mapBoundaryState.northEast.latitude,
                maxLon: mapBoundaryState.northEast.longitude,
                curLat: currentPosition.latitude,
                curLon: currentPosition.longitude,
                accessToken: userTk.accessToken,
                page: pageParam,
            }),
        {
            enabled: false,
            getNextPageParam: (lastPage, allPages) => {
                const total = lastPage.data.data.totalPages;
                const nextPage = lastPage.data.data.pageable.pageNumber + 1;
                return nextPage > total ? undefined : nextPage;
            },
            onSuccess: data => {
                setNearPostList([...nearPostList, ...data.pages[0].data.data.content]);
            },
            onError: ({ response }) => {
                // For Debug
                console.log('(ERROR) Get post of near by user API. respense: ', response);
            },
        },
    );

    // Call next page API
    const callNextPageHandler = () => {
        if (!hasNextPage) {
            fetchNextPage();
        }
    };

    // Move to mini bottom sheet by move map
    const [isBottomSheetMini, setIsBottomSheetMini] = useState<boolean>(false);
    const moveToBottomSheetMini = () => {
        if (!isBottomSheetMini) {
            setIsBottomSheetMini(true);
        }
    };
    const notBottomSheetMini = () => {
        setIsBottomSheetMini(false);
    };
    const checkGestureforBottomSheet = useCallback(
        (region: Region, details: Details) => {
            if (details.isGesture) {
                moveToBottomSheetMini();
            }
        },
        [isBottomSheetMini],
    );

    // Move to full bottom sheet by move map
    const [isBottomSheetFull, setIsBottomSheetFull] = useState<boolean>(false);
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
    const [isFarMapLevel, setIsFarMapLevel] = useState<boolean>(false);
    const checkZoomLevelWarning = useCallback(
        (region: Region) => {
            if (region.latitudeDelta > 0.15) {
                setIsFarMapLevel(true);
            } else {
                setIsFarMapLevel(false);
            }
        },
        [isFarMapLevel],
    );

    return (
        <>
            <MapWithMarker
                mapRef={mapRef}
                currentPosition={currentPosition}
                nearPostList={nearPostList}
                isAllowLocation={isAllowLocation}
                checkGestureforBottomSheet={checkGestureforBottomSheet}
                checkZoomLevelWarning={checkZoomLevelWarning}
                mapRenderCompleteHandler={mapRenderCompleteHandler}
            />
            <View style={seviceHomeTemplateStyles.searchLayout}>
                {Platform.OS === 'android' && (
                    <DropShadow style={seviceHomeTemplateStyles.dropshadow}>
                        <View style={seviceHomeTemplateStyles.inputBox}>
                            <Image
                                source={require('../../../assets/icons/search.png')}
                                style={seviceHomeTemplateStyles.searchIcon}
                            />
                            <SingleLineInput
                                value={searchText}
                                placeholder="지금 어디로 가시나요?"
                                onChangeText={onChangeSearchText}
                                fontSize={16}
                            />
                        </View>
                    </DropShadow>
                )}
                <View>
                    <Image
                        source={require('../../../assets/icons/bell-fill.png')}
                        style={seviceHomeTemplateStyles.bellIcon}
                    />
                </View>
            </View>

            <NearbyPostListModal
                isModalRef={isModalRef}
                handleModalTrigger={handleModalTrigger}
                nearPostList={nearPostList}
                isBottomSheetMini={isBottomSheetMini}
                isBottomSheetFull={isBottomSheetFull}
                currentPosition={currentPosition}
                mapBoundaryState={mapBoundaryState}
                moveToBottomSheetMini={moveToBottomSheetMini}
                moveToBottomSheetFull={moveToBottomSheetFull}
                notBottomSheetMini={notBottomSheetMini}
                onPressGetUserPosition={onPressGetUserPosition}
                callNextPageHandler={callNextPageHandler}
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
            {onModal && <FailLocationPermisionModal onPressModalButton={onPressModalButton} />}

            {isFarMapLevel && (
                <View
                    style={{
                        paddingHorizontal: 38 * screenWidth,
                        paddingVertical: 9 * screenHeight,
                        backgroundColor: '#00000099',
                        borderRadius: 25 * screenFont,
                        position: 'absolute',
                        top: 300 * screenHeight,
                        alignSelf: 'center',
                    }}>
                    <MediumText text="사건 확인을 위해 지도를 확인해 주세요" size={14} color={Colors.WHITE} />
                </View>
            )}
        </>
    );
};

export default SeviceHomeTemplate;
