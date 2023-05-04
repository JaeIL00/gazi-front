import React from 'react';
import { Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import mapStyle from '../../styles/mapStyle';
import { MapWithMarkerProps } from '../../types/types';
import { mapWithMarkerStyles } from '../../styles/styles';

const MapWithMarker = ({ currentPosition, mapRef, mapRenderCompleteHandler, nearPostList }: MapWithMarkerProps) => {
    const MARKER_RANGE_IMAGE = require('../../assets/icons/map-marker-range.png');
    const MARKER_IMAGE = require('../../assets/icons/map-marker.png');

    return (
        <MapView
            ref={mapRef}
            style={mapWithMarkerStyles.map}
            initialRegion={{
                latitude: 37.531312,
                longitude: 126.927384,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}
            region={{
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}
            customMapStyle={mapStyle}
            onMapReady={mapRenderCompleteHandler}>
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
            {nearPostList.map((item, index) => (
                <Marker
                    key={item.postId + 'marker' + index}
                    coordinate={{
                        latitude: item.latitude,
                        longitude: item.longitude,
                    }}
                    anchor={{ x: 0.5, y: 0.5 }}
                    style={mapWithMarkerStyles.markerBox}>
                    {item.headKeyword.id === 1 && (
                        <Image
                            source={require('../../assets/icons/protest-marker.png')}
                            style={mapWithMarkerStyles.issueMarker}
                        />
                    )}
                    {item.headKeyword.id === 2 && (
                        <Image
                            source={require('../../assets/icons/delay-marker.png')}
                            style={mapWithMarkerStyles.issueMarker}
                        />
                    )}
                    {item.headKeyword.id === 3 && (
                        <Image
                            source={require('../../assets/icons/disaster-marker.png')}
                            style={mapWithMarkerStyles.issueMarker}
                        />
                    )}
                    {item.headKeyword.id === 4 && (
                        <Image
                            source={require('../../assets/icons/construction-marker.png')}
                            style={mapWithMarkerStyles.issueMarker}
                        />
                    )}
                    {item.headKeyword.id === 5 && (
                        <Image
                            source={require('../../assets/icons/congestion-marker.png')}
                            style={mapWithMarkerStyles.issueMarker}
                        />
                    )}
                    {item.headKeyword.id === 6 && (
                        <Image
                            source={require('../../assets/icons/traffic-jam-marker.png')}
                            style={mapWithMarkerStyles.issueMarker}
                        />
                    )}
                    {item.headKeyword.id === 7 && (
                        <Image
                            source={require('../../assets/icons/festival-marker.png')}
                            style={mapWithMarkerStyles.issueMarker}
                        />
                    )}
                    {item.headKeyword.id === 8 && (
                        <Image
                            source={require('../../assets/icons/etc-marker.png')}
                            style={mapWithMarkerStyles.issueMarker}
                        />
                    )}
                </Marker>
            ))}
        </MapView>
    );
};

export default MapWithMarker;
