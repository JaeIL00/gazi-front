import React from 'react';
import { Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import mapStyle from '../../styles/mapStyle';
import { MapWithMarkerProps } from '../../types/types';
import { mapWithMarkerStyles } from '../../styles/styles';

const MapWithMarker = ({
    mapRef,
    currentPosition,
    nearPostList,
    mapRenderCompleteHandler,
    isGestureforBottomSheet,
}: MapWithMarkerProps) => {
    const MARKER_RANGE_IMAGE = require('../../assets/icons/map-marker-range.png');
    const MARKER_IMAGE = require('../../assets/icons/map-marker.png');

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
            customMapStyle={mapStyle}
            showsBuildings={false}
            pitchEnabled={false}
            onMapReady={mapRenderCompleteHandler}
            onRegionChange={isGestureforBottomSheet}>
            <Marker
                coordinate={{
                    latitude: currentPosition.latitude,
                    longitude: currentPosition.longitude,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
                style={mapWithMarkerStyles.markerBox}>
                <View style={mapWithMarkerStyles.markerBoxInner}>
                    <Image source={MARKER_RANGE_IMAGE} style={mapWithMarkerStyles.markerRange} resizeMode="contain" />
                    <Image source={MARKER_IMAGE} style={mapWithMarkerStyles.marker} />
                </View>
            </Marker>
            {nearPostList.map((item, index) => {
                const markertypeIcon = () => {
                    switch (item.headKeyword.id) {
                        case 1:
                            return require('../../assets/icons/protest-marker.png');
                        case 2:
                            return require('../../assets/icons/delay-marker.png');
                        case 3:
                            return require('../../assets/icons/disaster-marker.png');
                        case 4:
                            return require('../../assets/icons/construction-marker.png');
                        case 5:
                            return require('../../assets/icons/congestion-marker.png');
                        case 6:
                            return require('../../assets/icons/traffic-jam-marker.png');
                        case 7:
                            return require('../../assets/icons/festival-marker.png');
                        case 8:
                            return require('../../assets/icons/etc-marker.png');
                        default:
                            return;
                    }
                };
                return (
                    <Marker
                        key={item.postId + 'marker' + index}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                        }}
                        anchor={{ x: 0.5, y: 0.5 }}
                        style={mapWithMarkerStyles.markerBox}>
                        <Image source={markertypeIcon()} style={mapWithMarkerStyles.issueMarker} />
                    </Marker>
                );
            })}
        </MapView>
    );
};

export default MapWithMarker;
