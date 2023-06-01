import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';

import mapStyle from '../../styles/mapStyle';
import MapCurrentMarker from '../molecules/MapCurrentMarker';
import { MapWithMarkerProps } from '../../types/types';
import { mapWithMarkerStyles } from '../../styles/styles';

const MapWithMarker = ({
    mapRef,
    currentPosition,
    nearPostList,
    isAllowLocation,
    mapRenderCompleteHandler,
    checkZoomLevelWarning,
    checkMapGesture,
    findMarkerPost,
}: MapWithMarkerProps) => {
    return (
        <MapView
            ref={mapRef}
            style={mapWithMarkerStyles.map}
            region={{
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.027,
            }}
            maxZoomLevel={17}
            customMapStyle={mapStyle}
            showsBuildings={false}
            pitchEnabled={false}
            onRegionChangeComplete={checkZoomLevelWarning}
            onRegionChange={checkMapGesture}
            onMapReady={mapRenderCompleteHandler}>
            {isAllowLocation && (
                <MapCurrentMarker latitude={currentPosition.latitude} longitude={currentPosition.longitude} />
            )}
            {nearPostList.map(item => {
                const markertypeIcon = () => {
                    switch (item.headKeyword) {
                        case 1:
                            return require('../../assets/icons/marker-protest.png');
                        case 2:
                            return require('../../assets/icons/marker-delay.png');
                        case 3:
                            return require('../../assets/icons/marker-disaster.png');
                        case 4:
                            return require('../../assets/icons/marker-construction.png');
                        case 5:
                            return require('../../assets/icons/marker-congestion.png');
                        case 6:
                            return require('../../assets/icons/marker-accident.png');
                        case 7:
                            return require('../../assets/icons/marker-traffic-jam.png');
                        case 8:
                            return require('../../assets/icons/marker-festival.png');
                        case 9:
                            return require('../../assets/icons/marker-etc.png');
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
                        style={mapWithMarkerStyles.markerBox}
                        onPress={() => findMarkerPost(item.postId)}>
                        <FastImage source={markertypeIcon()} style={mapWithMarkerStyles.issueMarker} />
                    </Marker>
                );
            })}
        </MapView>
    );
};

export default MapWithMarker;
