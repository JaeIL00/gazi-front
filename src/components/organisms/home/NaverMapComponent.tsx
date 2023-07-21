import React, { useCallback, useRef } from 'react';
import NaverMapView, { Marker } from 'react-native-nmap';
import { mapWithMarkerStyles } from '../../../styles/organisms/styles';
import { NaverMapComponentProps, NaverMapOnChangeParams } from '../../../types/organisms/types';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../recoil';
import MapMarkerItem from '../../molecules/MapMarkerItem';

const NaverMapComponent = ({
    mapRef,
    currentPositionRef,
    mapBoundaryStateRef,
    mapCurrentPositionRef,
    mapRenderCompleteHandler,
    updateMapZoomLevel,
    moveMapBottomSheetHandler,
    findMarkerPost,
}: NaverMapComponentProps) => {
    const { isAllowLocation } = useRecoilValue(userInfoAtom);

    const initRef = useRef<boolean>(true);
    const initCountRef = useRef<number>(0);

    const onCameraChange = useCallback(
        ({ latitude, longitude, coveringRegion, zoom }: NaverMapOnChangeParams) => {
            updateMapZoomLevel(zoom);
            mapBoundaryStateRef.current = {
                ...mapBoundaryStateRef.current,
                northEast: coveringRegion[2],
                southWest: coveringRegion[0],
            };
            mapCurrentPositionRef.current = {
                latitude,
                longitude,
            };
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
                latitude: currentPositionRef.latitude,
                longitude: currentPositionRef.longitude,
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
                            latitude: currentPositionRef.latitude,
                            longitude: currentPositionRef.longitude,
                        }}
                        image={require('../../../assets/icons/map-current-marker.png')}
                        width={103}
                        height={103}
                        anchor={{ x: 0.5, y: 0.5 }}
                    />
                )}
                <MapMarkerItem findMarkerPost={findMarkerPost} />
            </>
        </NaverMapView>
    );
};

export default NaverMapComponent;
