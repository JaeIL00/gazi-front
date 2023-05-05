import React, { RefObject, useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Image, Linking, Platform, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import DropShadow from 'react-native-drop-shadow';
import { useRecoilValue } from 'recoil';
import MapView, { BoundingBox, Details, Region } from 'react-native-maps';
import { useInfiniteQuery } from 'react-query';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';

import MapWithMarker from '../../organisms/MapWithMarker';
import NearbyPostListModal from '../../organisms/NearbyPostListModal';
import FailLocationPermisionModal from '../../organisms/FailLocationPermisionModal';
import { userTokenAtom } from '../../../store/atoms';
import { nearByUserPostsAPI } from '../../../queries/api';
import { SingleLineInput } from '../../smallest/SingleLineInput';
import { seviceHomeTemplateStyles } from '../../../styles/styles';
import { SeviceHomeTemplateProps, MapLocationTypes, PostTypes, MapBoundaryTypes } from '../../../types/types';

const SeviceHomeTemplate = ({ isModalRef, handleModalTrigger }: SeviceHomeTemplateProps) => {
    // Check Location Permission
    const checkLocationPermission = async () => {
        try {
            const locationPermmission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            const isAllow = locationPermmission === RESULTS.GRANTED;
            return isAllow;
        } catch (err) {
            // For Debug
            console.log('(ERROR) Check Location Permission.', err);
        }
    };

    // Get current user position
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
                } else {
                    mapRef.current?.animateToRegion({
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    });
                }
            });
            setTimeout(() => {
                getBoundaryMap();
            }, 1000);
        } else {
            setOnModal(true);
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
    const [searchText, setSearchText] = useState('');
    const onChangeSearchText = (text: string) => {
        setSearchText(text);
    };

    // Get post of near by user API
    const mapRef = useRef() as RefObject<MapView>;
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

    // Fisrt render of map
    const mapRenderCompleteHandler = async () => {
        const boundaryValue = (await mapRef.current?.getMapBoundaries()) as BoundingBox;
        setMapBoundaryState({
            northEast: boundaryValue.northEast,
            southWest: boundaryValue.southWest,
        });
        setTimeout(() => {
            remove();
            refetch();
        }, 1000);
    };

    // Move to mini bottom sheet by move map
    const [isBottomSheetMini, setIsBottomSheetMini] = useState(false);
    const moveToBottomSheetMini = () => {
        if (!isBottomSheetMini) {
            setIsBottomSheetMini(true);
        }
    };
    const notBottomSheetMini = () => {
        setIsBottomSheetMini(false);
    };
    const isGestureforBottomSheet = useCallback(
        (region: Region, details: Details) => {
            if (details.isGesture) {
                moveToBottomSheetMini();
            }
        },
        [isBottomSheetMini],
    );

    // Move to mini bottom sheet by move map
    const [isBottomSheetFull, setIsBottomSheetFull] = useState(false);
    const moveToBottomSheetFull = (state: string) => {
        switch (state) {
            case 'FULL':
                setIsBottomSheetFull(true);
                break;
            case 'NOT':
                setIsBottomSheetFull(false);
                break;
            default:
                console.log('(ERROR) Move to mini bottom sheet by move map function');
        }
    };

    return (
        <>
            <MapWithMarker
                mapRef={mapRef}
                currentPosition={currentPosition}
                nearPostList={nearPostList}
                isGestureforBottomSheet={isGestureforBottomSheet}
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
        </>
    );
};

export default SeviceHomeTemplate;
