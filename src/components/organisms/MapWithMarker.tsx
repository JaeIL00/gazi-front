import React, { RefObject, useEffect, useRef } from 'react';
import { Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import mapStyle from '../../styles/mapStyle';
import { MapWithMarkerProps } from '../../types/types';
import { mapWithMarkerStyles } from '../../styles/styles';

const MapWithMarker = ({ currentPosition }: MapWithMarkerProps) => {
    const MARKER_RANGE_IMAGE = require('../../assets/icons/map-marker-range.png');
    const MARKER_IMAGE = require('../../assets/icons/map-marker.png');

    // Move to current user position in map
    const mapRef = useRef() as RefObject<MapView>;
    useEffect(() => {
        mapRef.current?.animateToRegion({
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        });
    }, [currentPosition]);

    return (
        <MapView
            ref={mapRef}
            style={mapWithMarkerStyles.map}
            initialRegion={{
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}
            customMapStyle={mapStyle}>
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
        </MapView>
    );
};

export default MapWithMarker;
