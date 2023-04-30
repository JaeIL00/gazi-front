import React from 'react';
import { Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import mapStyle from '../../styles/mapStyle';
import { mapWithMarkerStyles } from '../../styles/styles';

const MapWithMarker = () => {
    return (
        <MapView
            style={mapWithMarkerStyles.map}
            initialRegion={{
                latitude: 37.531312,
                longitude: 126.927384,
                latitudeDelta: 0.0822,
                longitudeDelta: 0.0221,
            }}
            customMapStyle={mapStyle}>
            <Marker
                coordinate={{
                    latitude: 37.531312,
                    longitude: 126.927384,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
                style={mapWithMarkerStyles.markerBox}>
                <View style={mapWithMarkerStyles.markerBoxInner}>
                    <Image
                        source={require('../../assets/icons/map-marker-range.png')}
                        style={mapWithMarkerStyles.markerRange}
                        resizeMode="contain"
                    />
                    <Image source={require('../../assets/icons/map-marker.png')} style={mapWithMarkerStyles.marker} />
                </View>
            </Marker>
        </MapView>
    );
};

export default MapWithMarker;
