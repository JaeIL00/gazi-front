import React, { useCallback, useRef } from 'react';
import NaverMapView, { Coord, Marker } from 'react-native-nmap';
import { mapWithMarkerStyles } from '../../../styles/organisms/styles';
import { NaverMapComponentProps } from '../../../types/organisms/types';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../recoil';
import { useIsFocused } from '@react-navigation/native';

const NaverMapComponent = ({
    mapRef,
    currentPosition,
    mapBoundaryStateRef,
    nearPostList,
    mapRenderCompleteHandler,
    updateMapZoomLevel,
    moveMapBottomSheetHandler,
    findMarkerPost,
}: NaverMapComponentProps) => {
    const isFocued = useIsFocused();
    const { isAllowLocation } = useRecoilValue(userInfoAtom);

    const initRef = useRef<boolean>(true);
    const initCountRef = useRef<number>(0);

    const onCameraChange = useCallback(
        ({ coveringRegion, zoom }: { coveringRegion: [Coord, Coord, Coord, Coord, Coord]; zoom: number }) => {
            mapBoundaryStateRef.current = {
                ...mapBoundaryStateRef.current,
                northEast: coveringRegion[2],
                southWest: coveringRegion[0],
            };
            updateMapZoomLevel(zoom);
            if (initRef.current) {
                mapRenderCompleteHandler();
                initCountRef.current = initCountRef.current + 1;
                if (initCountRef.current === 2) {
                    initRef.current = false;
                    initCountRef.current = 0;
                }
            }
        },
        [initCountRef.current, initRef.current],
    );

    return (
        <NaverMapView
            ref={mapRef}
            style={mapWithMarkerStyles.map}
            center={{
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
                zoom: 16,
            }}
            zoomControl={false}
            buildingHeight={0}
            tiltGesturesEnabled={false}
            rotateGesturesEnabled={false}
            onCameraChange={onCameraChange}
            onTouch={moveMapBottomSheetHandler}>
            <>
                {isAllowLocation && (
                    <Marker
                        coordinate={{
                            latitude: currentPosition.latitude,
                            longitude: currentPosition.longitude,
                        }}
                        image={require('../../../assets/icons/map-current-marker.png')}
                        width={103}
                        height={103}
                        anchor={{ x: 0.5, y: 0.5 }}
                    />
                )}
                {isFocued &&
                    nearPostList.map(item => {
                        const markertypeIcon = () => {
                            switch (item.headKeyword) {
                                case 1:
                                    return require('../../../assets/icons/marker-protest.png');
                                case 2:
                                    return require('../../../assets/icons/marker-delay.png');
                                case 3:
                                    return require('../../../assets/icons/marker-disaster.png');
                                case 4:
                                    return require('../../../assets/icons/marker-construction.png');
                                case 5:
                                    return require('../../../assets/icons/marker-congestion.png');
                                case 6:
                                    return require('../../../assets/icons/marker-accident.png');
                                case 7:
                                    return require('../../../assets/icons/marker-traffic-jam.png');
                                case 8:
                                    return require('../../../assets/icons/marker-festival.png');
                                case 9:
                                    return require('../../../assets/icons/marker-etc.png');
                                default:
                                    // For Debug
                                    console.log('(ERROR) Near post marker image');
                                    return;
                            }
                        };
                        return (
                            <Marker
                                key={item.postId}
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                }}
                                anchor={{ x: 0.5, y: 0.5 }}
                                width={30}
                                height={30}
                                onClick={() => findMarkerPost(item.postId)}
                                image={markertypeIcon()}
                            />
                        );
                    })}
            </>
        </NaverMapView>
    );
};

export default NaverMapComponent;
